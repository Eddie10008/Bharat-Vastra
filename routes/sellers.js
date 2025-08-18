const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { auth, isSeller } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/sellers/dashboard
// @desc    Get seller dashboard data
// @access  Private (Seller)
router.get('/dashboard', [auth, isSeller], async (req, res) => {
  try {
    const sellerId = req.user.id;

    // Get basic stats
    const totalProducts = await Product.countDocuments({ seller: sellerId });
    const activeProducts = await Product.countDocuments({ seller: sellerId, status: 'active' });
    const totalOrders = await Order.countDocuments({ seller: sellerId });
    const pendingOrders = await Order.countDocuments({ seller: sellerId, status: 'pending' });

    // Get recent orders
    const recentOrders = await Order.find({ seller: sellerId })
      .populate('customer', 'firstName lastName email')
      .populate('items.product', 'name images price')
      .sort({ orderDate: -1 })
      .limit(5);

    // Get top selling products
    const topProducts = await Product.aggregate([
      { $match: { seller: sellerId } },
      { $lookup: { from: 'orders', localField: '_id', foreignField: 'items.product', as: 'orders' } },
      { $addFields: { totalSold: { $size: '$orders' } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // Calculate revenue (simplified)
    const revenueData = await Order.aggregate([
      { $match: { seller: sellerId, status: { $in: ['delivered', 'shipped'] } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$orderDate" } },
          revenue: { $sum: "$total" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 6 }
    ]);

    res.json({
      stats: {
        totalProducts,
        activeProducts,
        totalOrders,
        pendingOrders
      },
      recentOrders,
      topProducts,
      revenueData
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/sellers/business-details
// @desc    Update business details
// @access  Private (Seller)
router.put('/business-details', [
  auth,
  isSeller,
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  body('businessType').isIn(['individual', 'partnership', 'corporation', 'llc']).withMessage('Invalid business type'),
  body('gstNumber').optional().isString().withMessage('GST number must be a string'),
  body('panNumber').optional().isString().withMessage('PAN number must be a string'),
  body('businessAddress.street').trim().notEmpty().withMessage('Business street address is required'),
  body('businessAddress.city').trim().notEmpty().withMessage('Business city is required'),
  body('businessAddress.state').trim().notEmpty().withMessage('Business state is required'),
  body('businessAddress.zipCode').trim().notEmpty().withMessage('Business zip code is required'),
  body('businessPhone').isMobilePhone().withMessage('Please enter a valid business phone number'),
  body('businessEmail').isEmail().normalizeEmail().withMessage('Please enter a valid business email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        businessName: req.body.businessName,
        businessType: req.body.businessType,
        gstNumber: req.body.gstNumber,
        panNumber: req.body.panNumber,
        businessAddress: req.body.businessAddress,
        businessPhone: req.body.businessPhone,
        businessEmail: req.body.businessEmail
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Business details updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update business details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/sellers/upload-documents
// @desc    Upload verification documents
// @access  Private (Seller)
router.post('/upload-documents', [
  auth,
  isSeller,
  body('documents').isArray().withMessage('Documents must be an array'),
  body('documents.*.type').isString().withMessage('Document type is required'),
  body('documents.*.url').isURL().withMessage('Document URL must be valid')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id);
    
    // Add new documents
    user.verificationDocuments.push(...req.body.documents);
    await user.save();

    res.status(201).json({
      message: 'Documents uploaded successfully',
      verificationDocuments: user.verificationDocuments
    });

  } catch (error) {
    console.error('Upload documents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/sellers/analytics
// @desc    Get seller analytics
// @access  Private (Seller)
router.get('/analytics', [auth, isSeller], async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    const sellerId = req.user.id;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Sales analytics
    const salesData = await Order.aggregate([
      {
        $match: {
          seller: sellerId,
          orderDate: { $gte: startDate },
          status: { $in: ['delivered', 'shipped'] }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          sales: { $sum: "$total" },
          orders: { $sum: 1 },
          items: { $sum: { $reduce: { input: "$items", initialValue: 0, in: { $add: ["$$value", "$$this.quantity"] } } } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Product performance
    const productPerformance = await Product.aggregate([
      { $match: { seller: sellerId } },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'items.product',
          as: 'orders'
        }
      },
      {
        $addFields: {
          totalSold: {
            $reduce: {
              input: '$orders',
              initialValue: 0,
              in: {
                $add: [
                  '$$value',
                  {
                    $reduce: {
                      input: {
                        $filter: {
                          input: '$$this.items',
                          cond: { $eq: ['$$this.product', '$_id'] }
                        }
                      },
                      initialValue: 0,
                      in: { $add: ['$$value', '$$this.quantity'] }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 }
    ]);

    // Category performance
    const categoryPerformance = await Product.aggregate([
      { $match: { seller: sellerId } },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'items.product',
          as: 'orders'
        }
      },
      {
        $group: {
          _id: '$category',
          products: { $sum: 1 },
          totalSold: { $sum: { $size: '$orders' } }
        }
      },
      { $sort: { totalSold: -1 } }
    ]);

    res.json({
      salesData,
      productPerformance,
      categoryPerformance
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/sellers/orders
// @desc    Get seller's orders with filtering
// @access  Private (Seller)
router.get('/orders', [auth, isSeller], async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { seller: req.user.id };
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.orderDate = {};
      if (startDate) filter.orderDate.$gte = new Date(startDate);
      if (endDate) filter.orderDate.$lte = new Date(endDate);
    }

    const orders = await Order.find(filter)
      .populate('customer', 'firstName lastName email phone')
      .populate('items.product', 'name images price')
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalOrders: total
      }
    });

  } catch (error) {
    console.error('Get seller orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/sellers/products
// @desc    Get seller's products with analytics
// @access  Private (Seller)
router.get('/products', [auth, isSeller], async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { seller: req.user.id };
    if (status) filter.status = status;
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total
      }
    });

  } catch (error) {
    console.error('Get seller products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/sellers/products
// @desc    Create a new product
// @access  Private (Seller)
router.post('/products', [auth, isSeller], async (req, res) => {
  try {
    const productData = {
      ...req.body,
      seller: req.user.id
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/sellers/products/:id
// @desc    Update a product
// @access  Private (Seller)
router.put('/products/:id', [auth, isSeller], async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/sellers/products/:id
// @desc    Get a specific product
// @access  Private (Seller)
router.get('/products/:id', [auth, isSeller], async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/sellers/orders/:id/status
// @desc    Update order status
// @access  Private (Seller)
router.put('/orders/:id/status', [auth, isSeller], async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      { 
        status,
        $push: {
          statusHistory: {
            status,
            note: `Status updated to ${status}`,
            updatedBy: req.user.id
          }
        }
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/sellers/orders/bulk-status
// @desc    Update multiple order statuses
// @access  Private (Seller)
router.put('/orders/bulk-status', [auth, isSeller], async (req, res) => {
  try {
    const { orderIds, status } = req.body;

    const result = await Order.updateMany(
      { _id: { $in: orderIds }, seller: req.user.id },
      { 
        status,
        $push: {
          statusHistory: {
            status,
            note: `Bulk status update to ${status}`,
            updatedBy: req.user.id
          }
        }
      }
    );

    res.json({
      message: `${result.modifiedCount} orders updated successfully`,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Bulk update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/sellers/products/bulk-action
// @desc    Perform bulk actions on products
// @access  Private (Seller)
router.post('/products/bulk-action', [auth, isSeller], async (req, res) => {
  try {
    const { productIds, action } = req.body;

    let updateData = {};
    switch (action) {
      case 'activate':
        updateData = { status: 'active' };
        break;
      case 'deactivate':
        updateData = { status: 'inactive' };
        break;
      case 'delete':
        await Product.deleteMany({ _id: { $in: productIds }, seller: req.user.id });
        return res.json({ message: 'Products deleted successfully' });
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

    const result = await Product.updateMany(
      { _id: { $in: productIds }, seller: req.user.id },
      updateData
    );

    res.json({
      message: `${result.modifiedCount} products updated successfully`,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Bulk action error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Dropshipping routes
// @route   GET /api/sellers/dropshipping/suppliers
// @desc    Get dropshipping suppliers
// @access  Private (Seller)
router.get('/dropshipping/suppliers', [auth, isSeller], async (req, res) => {
  try {
    // This would typically fetch from a dropshipping suppliers collection
    // For now, returning mock data
    const suppliers = [
      {
        _id: '1',
        name: 'Fashion Supplier Co.',
        type: 'wholesale',
        email: 'contact@fashionsupplier.com',
        phone: '+1234567890',
        location: 'Mumbai, India',
        status: 'active',
        productCount: 150,
        lastSync: new Date()
      },
      {
        _id: '2',
        name: 'Jewelry Wholesale',
        type: 'jewelry',
        email: 'info@jewelrywholesale.com',
        phone: '+1234567891',
        location: 'Jaipur, India',
        status: 'active',
        productCount: 75,
        lastSync: new Date()
      }
    ];

    res.json({ suppliers });

  } catch (error) {
    console.error('Get suppliers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/sellers/dropshipping/products
// @desc    Get dropshipping products
// @access  Private (Seller)
router.get('/dropshipping/products', [auth, isSeller], async (req, res) => {
  try {
    // This would typically fetch from a dropshipping products collection
    // For now, returning mock data
    const products = [
      {
        _id: '1',
        name: 'Silk Saree Collection',
        category: 'sari',
        price: 299.99,
        stock: 50,
        status: 'available',
        supplier: { name: 'Fashion Supplier Co.' },
        image: 'https://via.placeholder.com/300x400'
      },
      {
        _id: '2',
        name: 'Kundan Necklace Set',
        category: 'necklaces',
        price: 199.99,
        stock: 25,
        status: 'available',
        supplier: { name: 'Jewelry Wholesale' },
        image: 'https://via.placeholder.com/300x400'
      }
    ];

    res.json({ products });

  } catch (error) {
    console.error('Get dropshipping products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/sellers/dropshipping/suppliers/:id/sync
// @desc    Sync supplier data
// @access  Private (Seller)
router.post('/dropshipping/suppliers/:id/sync', [auth, isSeller], async (req, res) => {
  try {
    // This would typically sync with the supplier's API
    // For now, just returning success
    res.json({ message: 'Supplier synced successfully' });

  } catch (error) {
    console.error('Sync supplier error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/sellers/dropshipping/products/:id/import
// @desc    Import dropshipping product
// @access  Private (Seller)
router.post('/dropshipping/products/:id/import', [auth, isSeller], async (req, res) => {
  try {
    // This would typically import the product from dropshipping supplier
    // For now, just returning success
    res.json({ message: 'Product imported successfully' });

  } catch (error) {
    console.error('Import product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
