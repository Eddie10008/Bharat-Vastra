const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const aiImageBot = require('../ai-image-bot');
const Product = require('../models/Product');
const fs = require('fs-extra');
const path = require('path');

// Get AI bot status and statistics
router.get('/status', async (req, res) => {
  try {
    const stats = aiImageBot.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching AI bot status',
      error: error.message
    });
  }
});

// Start the AI bot
router.post('/start', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can start the AI bot'
      });
    }

    await aiImageBot.start();
    res.json({
      success: true,
      message: 'AI Image Bot started successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error starting AI bot',
      error: error.message
    });
  }
});

// Stop the AI bot
router.post('/stop', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can stop the AI bot'
      });
    }

    await aiImageBot.stop();
    res.json({
      success: true,
      message: 'AI Image Bot stopped successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error stopping AI bot',
      error: error.message
    });
  }
});

// Generate custom image
router.post('/generate', auth, async (req, res) => {
  try {
    const { prompt, options = {} } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }

    const filename = await aiImageBot.generateCustomImage(prompt, options);
    
    res.json({
      success: true,
      data: {
        filename,
        url: `/uploads/ai-generated/${filename}`
      },
      message: 'Image generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating image',
      error: error.message
    });
  }
});

// Generate product image
router.post('/generate-product/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is admin or the product owner
    if (req.user.role !== 'admin' && product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to generate images for this product'
      });
    }

    await aiImageBot.generateProductImage(product);
    
    res.json({
      success: true,
      message: 'Product image generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating product image',
      error: error.message
    });
  }
});

// Generate category image
router.post('/generate-category', auth, async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category is required'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can generate category images'
      });
    }

    await aiImageBot.generateCategoryImage(category);
    
    res.json({
      success: true,
      message: 'Category image generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating category image',
      error: error.message
    });
  }
});

// Generate background pattern
router.post('/generate-pattern', auth, async (req, res) => {
  try {
    const { pattern } = req.body;

    if (!pattern) {
      return res.status(400).json({
        success: false,
        message: 'Pattern type is required'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can generate background patterns'
      });
    }

    await aiImageBot.generatePatternImage(pattern);
    
    res.json({
      success: true,
      message: 'Background pattern generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating background pattern',
      error: error.message
    });
  }
});

// Get generated images list
router.get('/images', auth, async (req, res) => {
  try {
    const { type = 'all', limit = 50 } = req.query;
    
    const directories = {
      'products': 'uploads/ai-generated/products',
      'categories': 'uploads/ai-generated/categories',
      'patterns': 'uploads/ai-generated/patterns',
      'backgrounds': 'uploads/ai-generated/backgrounds'
    };

    let images = [];

    if (type === 'all') {
      for (const [key, dir] of Object.entries(directories)) {
        try {
          const files = await fs.readdir(dir);
          const fileStats = await Promise.all(
            files.slice(0, limit).map(async (file) => {
              const filepath = path.join(dir, file);
              const stats = await fs.stat(filepath);
              return {
                filename: file,
                type: key,
                url: `/${dir}/${file}`,
                size: stats.size,
                created: stats.mtime
              };
            })
          );
          images.push(...fileStats);
        } catch (error) {
          console.log(`Directory ${dir} not found or empty`);
        }
      }
    } else if (directories[type]) {
      try {
        const files = await fs.readdir(directories[type]);
        const fileStats = await Promise.all(
          files.slice(0, limit).map(async (file) => {
            const filepath = path.join(directories[type], file);
            const stats = await fs.stat(filepath);
            return {
              filename: file,
              type,
              url: `/${directories[type]}/${file}`,
              size: stats.size,
              created: stats.mtime
            };
          })
        );
        images = fileStats;
      } catch (error) {
        console.log(`Directory ${directories[type]} not found or empty`);
      }
    }

    // Sort by creation date (newest first)
    images.sort((a, b) => new Date(b.created) - new Date(a.created));

    res.json({
      success: true,
      data: images.slice(0, limit)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching generated images',
      error: error.message
    });
  }
});

// Delete generated image
router.delete('/images/:filename', auth, async (req, res) => {
  try {
    const { filename } = req.params;
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete generated images'
      });
    }

    // Find the file in any of the directories
    const directories = [
      'uploads/ai-generated/products',
      'uploads/ai-generated/categories',
      'uploads/ai-generated/patterns',
      'uploads/ai-generated/backgrounds'
    ];

    let fileFound = false;
    for (const dir of directories) {
      const filepath = path.join(dir, filename);
      if (await fs.pathExists(filepath)) {
        await fs.remove(filepath);
        fileFound = true;
        break;
      }
    }

    if (!fileFound) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
});

// Bulk generate images for products without images
router.post('/bulk-generate', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can perform bulk generation'
      });
    }

    const { type = 'products', limit = 10 } = req.body;

    let count = 0;
    
    if (type === 'products') {
      const products = await Product.find({ 
        $or: [
          { images: { $exists: false } },
          { images: { $size: 0 } },
          { 'images.0': { $regex: /placeholder|default/i } }
        ]
      }).limit(limit);

      for (const product of products) {
        await aiImageBot.generateProductImage(product);
        count++;
        await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limiting
      }
    } else if (type === 'categories') {
      const categories = [
        'Sarees', 'Lehengas', 'Anarkalis', 'Salwar Kameez', 'Kurtis',
        'Jewelry', 'Bangles', 'Necklaces', 'Earrings', 'Rings'
      ].slice(0, limit);

      for (const category of categories) {
        await aiImageBot.generateCategoryImage(category);
        count++;
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    } else if (type === 'patterns') {
      const patterns = [
        'indian-mandala-pattern',
        'traditional-floral-design',
        'geometric-indian-pattern',
        'spiritual-symbols',
        'ethnic-border-design'
      ].slice(0, limit);

      for (const pattern of patterns) {
        await aiImageBot.generatePatternImage(pattern);
        count++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    res.json({
      success: true,
      message: `Generated ${count} ${type} images successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error performing bulk generation',
      error: error.message
    });
  }
});

// Get AI bot configuration
router.get('/config', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view configuration'
      });
    }

    const config = {
      providers: aiImageBot.aiProviders.map(p => ({ name: p.name, url: p.url })),
      cronJobs: {
        productImages: '0 */6 * * *', // Every 6 hours
        categoryImages: '0 */12 * * *', // Every 12 hours
        backgroundPatterns: '0 0 * * *', // Daily
        cleanup: '0 0 * * 0' // Weekly
      },
      directories: [
        'uploads/ai-generated/products',
        'uploads/ai-generated/categories',
        'uploads/ai-generated/patterns',
        'uploads/ai-generated/backgrounds'
      ]
    };

    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching configuration',
      error: error.message
    });
  }
});

module.exports = router;
