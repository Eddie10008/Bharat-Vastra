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

module.exports = router;
