const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Define all categories
const categories = {
  'indian-attire': {
    name: 'Indian Attire',
    subcategories: [
      { id: 'sari', name: 'Sari', description: 'Traditional Indian sarees' },
      { id: 'salwar-kameez', name: 'Salwar Kameez', description: 'Traditional Indian suits' },
      { id: 'anarkali-salwar-kameez', name: 'Anarkali Salwar Kameez', description: 'Elegant Anarkali suits' },
      { id: 'lehenga', name: 'Lehenga', description: 'Bridal and party lehengas' },
      { id: 'ghagra-choli', name: 'Ghagra Choli', description: 'Traditional Ghagra Choli sets' },
      { id: 'sharara-suit', name: 'Sharara Suit', description: 'Modern Sharara suits' },
      { id: 'kurta', name: 'Kurta', description: 'Traditional and modern kurtas' },
      { id: 'sherwani', name: 'Sherwani', description: 'Traditional Sherwani for men' },
      { id: 'dhoti-kurta', name: 'Dhoti Kurta', description: 'Traditional Dhoti Kurta sets' },
      { id: 'angarkha', name: 'Angarkha', description: 'Traditional Angarkha' },
      { id: 'dhoti', name: 'Dhoti', description: 'Traditional Dhoti' },
      { id: 'dupatta', name: 'Dupatta', description: 'Beautiful Dupattas' },
      { id: 'men-pajamas', name: 'Men Pajamas', description: 'Traditional men pajamas' },
      { id: 'patiala-sets', name: 'Patiala Sets', description: 'Patiala suits and sets' },
      { id: 'achkan', name: 'Achkan', description: 'Traditional Achkan' },
      { id: 'blouse', name: 'Blouse', description: 'Designer blouses' },
      { id: 'co-ord-sets', name: 'Co-ord Sets', description: 'Co-ordinated sets' },
      { id: 'gharara', name: 'Gharara', description: 'Traditional Gharara' },
      { id: 'kurta-sets', name: 'Kurta Sets', description: 'Kurta sets and combinations' },
      { id: 'lungi', name: 'Lungi', description: 'Traditional Lungi' },
      { id: 'pakistani-dresses', name: 'Pakistani Dresses', description: 'Pakistani traditional dresses' },
      { id: 'palazzo-pants', name: 'Palazzo Pants', description: 'Comfortable palazzo pants' },
      { id: 'bandhgala', name: 'Bandhgala', description: 'Traditional Bandhgala' }
    ]
  },
  'jewelry': {
    name: 'Indian Jewelry',
    subcategories: [
      { id: 'bangles', name: 'Bangles', description: 'Traditional Indian bangles' },
      { id: 'necklaces', name: 'Necklaces', description: 'Beautiful necklaces and neckpieces' },
      { id: 'earrings', name: 'Earrings', description: 'Traditional earrings including Jhumkas' },
      { id: 'maang-tikka', name: 'Maang Tikka', description: 'Traditional Maang Tikka' },
      { id: 'mangalsutra', name: 'Mangalsutra', description: 'Sacred Mangalsutra' },
      { id: 'kundan', name: 'Kundan', description: 'Kundan jewelry sets' },
      { id: 'meenakari', name: 'Meenakari', description: 'Meenakari jewelry' },
      { id: 'polki', name: 'Polki', description: 'Polki jewelry sets' }
    ]
  }
};

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/categories/:categoryId
// @desc    Get specific category with product count
// @access  Public
router.get('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    if (!categories[categoryId]) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = categories[categoryId];
    
    // Get product count for each subcategory
    const subcategoriesWithCount = await Promise.all(
      category.subcategories.map(async (subcat) => {
        const count = await Product.countDocuments({
          category: subcat.id,
          status: 'active'
        });
        return {
          ...subcat,
          productCount: count
        };
      })
    );

    res.json({
      ...category,
      subcategories: subcategoriesWithCount
    });

  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/categories/:categoryId/products
// @desc    Get products by category
// @access  Public
router.get('/:categoryId/products', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 12, sort = 'newest', subcategory } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    if (!categories[categoryId]) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Build filter
    const filter = { status: 'active' };
    
    if (subcategory) {
      // Check if subcategory belongs to this category
      const subcatExists = categories[categoryId].subcategories.find(
        subcat => subcat.id === subcategory
      );
      if (subcatExists) {
        filter.category = subcategory;
      } else {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
    } else {
      // Get all subcategories for this category
      const subcategoryIds = categories[categoryId].subcategories.map(subcat => subcat.id);
      filter.category = { $in: subcategoryIds };
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
      default:
        sortObj = { createdAt: -1 };
    }

    const products = await Product.find(filter)
      .populate('seller', 'businessName firstName lastName')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      category: categories[categoryId],
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

// @route   GET /api/categories/popular
// @desc    Get popular categories based on product count
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const popularCategories = await Product.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$category',
          productCount: { $sum: 1 }
        }
      },
      { $sort: { productCount: -1 } },
      { $limit: 10 }
    ]);

    // Map category IDs to category names
    const categoryMap = {};
    Object.values(categories).forEach(category => {
      category.subcategories.forEach(subcat => {
        categoryMap[subcat.id] = {
          name: subcat.name,
          description: subcat.description,
          mainCategory: category.name
        };
      });
    });

    const result = popularCategories.map(item => ({
      categoryId: item._id,
      productCount: item.productCount,
      ...categoryMap[item._id]
    }));

    res.json(result);

  } catch (error) {
    console.error('Get popular categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
