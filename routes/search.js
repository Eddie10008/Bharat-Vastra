const express = require('express');
const { query, validationResult } = require('express-validator');
const Product = require('../models/Product');

const router = express.Router();

// @route   GET /api/search
// @desc    Search products with advanced filtering
// @access  Public
router.get('/', [
  query('q').optional().isString().withMessage('Search query must be a string'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be positive'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be positive'),
  query('brand').optional().isString().withMessage('Brand must be a string'),
  query('occasion').optional().isString().withMessage('Occasion must be a string'),
  query('material').optional().isString().withMessage('Material must be a string'),
  query('size').optional().isString().withMessage('Size must be a string'),
  query('color').optional().isString().withMessage('Color must be a string'),
  query('sort').optional().isIn(['relevance', 'price_asc', 'price_desc', 'newest', 'rating', 'popularity']).withMessage('Invalid sort option'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('isWholesale').optional().isBoolean().withMessage('isWholesale must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      q: searchQuery,
      category,
      minPrice,
      maxPrice,
      brand,
      occasion,
      material,
      size,
      color,
      sort = 'relevance',
      page = 1,
      limit = 12,
      isWholesale = false
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };

    // Text search
    if (searchQuery) {
      filter.$text = { $search: searchQuery };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter['price.retail'] = {};
      if (minPrice) filter['price.retail'].$gte = parseFloat(minPrice);
      if (maxPrice) filter['price.retail'].$lte = parseFloat(maxPrice);
    }

    // Brand filter
    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' };
    }

    // Specification filters
    if (occasion) {
      filter['specifications.occasion'] = { $in: [occasion] };
    }

    if (material) {
      filter['specifications.material'] = { $in: [material] };
    }

    if (size) {
      filter['clothingDetails.sizes'] = { $in: [size] };
    }

    if (color) {
      filter['clothingDetails.colors'] = { $in: [color] };
    }

    // Wholesale filter
    if (isWholesale === 'true') {
      filter.isWholesale = true;
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
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'rating':
        sortObj = { 'ratings.average': -1 };
        break;
      case 'popularity':
        sortObj = { 'ratings.count': -1 };
        break;
      case 'relevance':
      default:
        if (searchQuery) {
          sortObj = { score: { $meta: 'textScore' } };
        } else {
          sortObj = { createdAt: -1 };
        }
        break;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute search
    let products;
    if (searchQuery && sort === 'relevance') {
      products = await Product.find(filter, { score: { $meta: 'textScore' } })
        .populate('seller', 'businessName firstName lastName')
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit));
    } else {
      products = await Product.find(filter)
        .populate('seller', 'businessName firstName lastName')
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit));
    }

    // Get total count
    const total = await Product.countDocuments(filter);

    // Get search suggestions
    let suggestions = [];
    if (searchQuery) {
      const suggestionProducts = await Product.find(
        { $text: { $search: searchQuery }, status: 'active' },
        { name: 1, category: 1, brand: 1 }
      )
      .limit(5);

      suggestions = suggestionProducts.map(product => ({
        name: product.name,
        category: product.category,
        brand: product.brand
      }));
    }

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
        hasNextPage: skip + products.length < total,
        hasPrevPage: parseInt(page) > 1
      },
      suggestions,
      filters: {
        applied: {
          searchQuery,
          category,
          minPrice,
          maxPrice,
          brand,
          occasion,
          material,
          size,
          color,
          isWholesale
        }
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/search/suggestions
// @desc    Get search suggestions
// @access  Public
router.get('/suggestions', [
  query('q').isString().withMessage('Search query is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { q: searchQuery } = req.query;

    // Get product name suggestions
    const productSuggestions = await Product.find(
      { 
        $text: { $search: searchQuery }, 
        status: 'active' 
      },
      { name: 1, category: 1, brand: 1 }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(5);

    // Get category suggestions
    const categorySuggestions = await Product.distinct('category', {
      category: { $regex: searchQuery, $options: 'i' },
      status: 'active'
    });

    // Get brand suggestions
    const brandSuggestions = await Product.distinct('brand', {
      brand: { $regex: searchQuery, $options: 'i' },
      status: 'active'
    });

    res.json({
      products: productSuggestions,
      categories: categorySuggestions.slice(0, 3),
      brands: brandSuggestions.slice(0, 3)
    });

  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/search/filters
// @desc    Get available filters for search
// @access  Public
router.get('/filters', async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { status: 'active' };
    if (category) {
      filter.category = category;
    }

    // Get price range
    const priceRange = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price.retail' },
          maxPrice: { $max: '$price.retail' }
        }
      }
    ]);

    // Get brands
    const brands = await Product.distinct('brand', filter);

    // Get occasions
    const occasions = await Product.distinct('specifications.occasion', filter);

    // Get materials
    const materials = await Product.distinct('specifications.material', filter);

    // Get sizes
    const sizes = await Product.distinct('clothingDetails.sizes', filter);

    // Get colors
    const colors = await Product.distinct('clothingDetails.colors', filter);

    res.json({
      priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 },
      brands: brands.filter(Boolean).sort(),
      occasions: occasions.filter(Boolean).sort(),
      materials: materials.filter(Boolean).sort(),
      sizes: sizes.filter(Boolean).sort(),
      colors: colors.filter(Boolean).sort()
    });

  } catch (error) {
    console.error('Get filters error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/search/trending
// @desc    Get trending search terms
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    // This would typically come from a search analytics system
    // For now, we'll return popular categories and brands
    const popularCategories = await Product.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const popularBrands = await Product.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$brand',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      categories: popularCategories,
      brands: popularBrands
    });

  } catch (error) {
    console.error('Get trending error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
