const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Product = require('../models/Product');
const { auth, isSeller, isVerified } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  query('brand').optional().isString().withMessage('Brand must be a string'),
  query('sort').optional().isIn(['price_asc', 'price_desc', 'newest', 'rating', 'popularity']).withMessage('Invalid sort option')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      brand,
      sort = 'newest',
      search,
      occasion,
      material,
      size,
      color,
      isWholesale = false
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };

    if (category) filter.category = category;
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (isWholesale === 'true') filter.isWholesale = true;
    if (occasion) filter['specifications.occasion'] = { $in: [occasion] };
    if (material) filter['specifications.material'] = { $in: [material] };
    if (size) filter['clothingDetails.sizes'] = { $in: [size] };
    if (color) filter['clothingDetails.colors'] = { $in: [color] };

    // Price filter
    if (minPrice || maxPrice) {
      filter['price.retail'] = {};
      if (minPrice) filter['price.retail'].$gte = parseFloat(minPrice);
      if (maxPrice) filter['price.retail'].$lte = parseFloat(maxPrice);
    }

    // Search filter
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'price_asc':
        sortObj = { 'price.retail': 1 };
        break;
      case 'price_desc':
        sortObj = { 'price.retail': -1 };
        break;
      case 'rating':
        sortObj = { 'ratings.average': -1 };
        break;
      case 'popularity':
        sortObj = { 'ratings.count': -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const products = await Product.find(filter)
      .populate('seller', 'businessName firstName lastName')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
        hasNextPage: skip + products.length < total,
        hasPrevPage: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'businessName firstName lastName isVerified');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Increment view count (you might want to track this)
    // product.views = (product.views || 0) + 1;
    // await product.save();

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Seller/Wholesaler)
router.post('/', [
  auth,
  isSeller,
  isVerified,
  body('name').trim().isLength({ min: 3 }).withMessage('Product name must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn([
    'sari', 'salwar-kameez', 'anarkali-salwar-kameez', 'lehenga', 'ghagra-choli',
    'sharara-suit', 'kurta', 'sherwani', 'dhoti-kurta', 'angarkha', 'dhoti',
    'dupatta', 'men-pajamas', 'patiala-sets', 'achkan', 'blouse', 'co-ord-sets',
    'gharara', 'kurta-sets', 'lungi', 'pakistani-dresses', 'palazzo-pants', 'bandhgala',
    'bangles', 'necklaces', 'earrings', 'maang-tikka', 'mangalsutra',
    'kundan', 'meenakari', 'polki'
  ]).withMessage('Invalid category'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('price.retail').isFloat({ min: 0 }).withMessage('Retail price must be a positive number'),
  body('price.wholesale').optional().isFloat({ min: 0 }).withMessage('Wholesale price must be a positive number'),
  body('stock.total').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productData = {
      ...req.body,
      seller: req.user.id,
      stock: {
        ...req.body.stock,
        available: req.body.stock.total
      }
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

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Product owner)
router.put('/:id', [
  auth,
  isSeller,
  isVerified,
  body('name').optional().trim().isLength({ min: 3 }).withMessage('Product name must be at least 3 characters'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price.retail').optional().isFloat({ min: 0 }).withMessage('Retail price must be a positive number'),
  body('price.wholesale').optional().isFloat({ min: 0 }).withMessage('Wholesale price must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user owns this product
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Update product error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Product owner)
router.delete('/:id', [auth, isSeller, isVerified], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user owns this product
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Delete product error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/seller/my-products
// @desc    Get seller's own products
// @access  Private (Seller/Wholesaler)
router.get('/seller/my-products', [auth, isSeller], async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { seller: req.user.id };
    if (status) filter.status = status;

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

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({
      isFeatured: true,
      status: 'active'
    })
    .populate('seller', 'businessName firstName lastName')
    .sort({ 'ratings.average': -1 })
    .limit(parseInt(limit));

    res.json(products);

  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/categories/:category
// @desc    Get products by category
// @access  Public
router.get('/categories/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12, sort = 'newest' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'price_asc':
        sortObj = { 'price.retail': 1 };
        break;
      case 'price_desc':
        sortObj = { 'price.retail': -1 };
        break;
      case 'rating':
        sortObj = { 'ratings.average': -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    const products = await Product.find({
      category,
      status: 'active'
    })
    .populate('seller', 'businessName firstName lastName')
    .sort(sortObj)
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Product.countDocuments({ category, status: 'active' });

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total
      }
    });

  } catch (error) {
    console.error('Get category products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
