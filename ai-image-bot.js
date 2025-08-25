const cron = require('cron');
const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();

// Import fetch for Node.js
const fetch = require('node-fetch');

// Import models
const Product = require('./models/Product');
const User = require('./models/User');

// AI Image Generator Bot for Bharat Vastra
class AIImageBot {
  constructor() {
    this.isRunning = false;
    this.generatedImages = new Map();
    this.imageQueue = [];
    this.stats = {
      totalGenerated: 0,
      successful: 0,
      failed: 0,
      lastRun: null
    };
    
    // Free AI APIs (no copyright issues)
    this.aiProviders = [
      {
        name: 'HuggingFace',
        url: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || 'hf_demo'}`,
          'Content-Type': 'application/json'
        }
      },
      {
        name: 'Replicate',
        url: 'https://api.replicate.com/v1/predictions',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_KEY || 'r8_demo'}`,
          'Content-Type': 'application/json'
        }
      }
    ];
    
    this.setupDirectories();
    this.setupCronJobs();
  }

  async setupDirectories() {
    const dirs = [
      'uploads/ai-generated',
      'uploads/ai-generated/products',
      'uploads/ai-generated/categories',
      'uploads/ai-generated/backgrounds',
      'uploads/ai-generated/patterns',
      'uploads/ai-generated/logos'
    ];
    
    for (const dir of dirs) {
      await fs.ensureDir(dir);
    }
  }

  setupCronJobs() {
    // Generate product images every 6 hours
    this.productImageJob = new cron.CronJob('0 */6 * * *', () => {
      this.generateProductImages();
    });

    // Generate category images every 12 hours
    this.categoryImageJob = new cron.CronJob('0 */12 * * *', () => {
      this.generateCategoryImages();
    });

    // Generate background patterns every 24 hours
    this.patternJob = new cron.CronJob('0 0 * * *', () => {
      this.generateBackgroundPatterns();
    });

    // Cleanup old images every week
    this.cleanupJob = new cron.CronJob('0 0 * * 0', () => {
      this.cleanupOldImages();
    });
  }

  async start() {
    if (this.isRunning) {
      console.log('AI Image Bot is already running');
      return;
    }

    console.log('🚀 Starting AI Image Generator Bot for Bharat Vastra...');
    this.isRunning = true;

    // Start cron jobs
    this.productImageJob.start();
    this.categoryImageJob.start();
    this.patternJob.start();
    this.cleanupJob.start();

    // Initial generation
    await this.generateProductImages();
    await this.generateCategoryImages();
    await this.generateBackgroundPatterns();

    console.log('✅ AI Image Bot is now running in the background');
  }

  async stop() {
    console.log('🛑 Stopping AI Image Generator Bot...');
    this.isRunning = false;

    this.productImageJob.stop();
    this.categoryImageJob.stop();
    this.patternJob.stop();
    this.cleanupJob.stop();

    console.log('✅ AI Image Bot stopped');
  }

  async generateProductImages() {
    try {
      console.log('🎨 Generating product images...');
      
      const products = await Product.find({ 
        $or: [
          { images: { $exists: false } },
          { images: { $size: 0 } },
          { 'images.0': { $regex: /placeholder|default/i } }
        ]
      }).limit(10);

      for (const product of products) {
        await this.generateProductImage(product);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limiting
      }

      this.stats.lastRun = new Date();
      console.log(`✅ Generated ${products.length} product images`);
    } catch (error) {
      console.error('❌ Error generating product images:', error);
    }
  }

  async generateProductImage(product) {
    try {
      const prompt = this.createProductPrompt(product);
      const imageBuffer = await this.generateImage(prompt);
      
      if (imageBuffer) {
        const filename = `product-${product._id}-${uuidv4()}.jpg`;
        const filepath = path.join('uploads/ai-generated/products', filename);
        
        // Process and optimize image
        const processedBuffer = await this.processImage(imageBuffer, {
          width: 800,
          height: 800,
          quality: 85
        });
        
        await fs.writeFile(filepath, processedBuffer);
        
        // Update product with new image
        product.images = [filename];
        await product.save();
        
        this.stats.successful++;
        console.log(`✅ Generated image for product: ${product.name}`);
      }
    } catch (error) {
      console.error(`❌ Error generating image for product ${product.name}:`, error);
      this.stats.failed++;
    }
  }

  async generateCategoryImages() {
    try {
      console.log('🏷️ Generating category images...');
      
      const categories = [
        'Sarees', 'Lehengas', 'Anarkalis', 'Salwar Kameez', 'Kurtis',
        'Jewelry', 'Bangles', 'Necklaces', 'Earrings', 'Rings',
        'Accessories', 'Bags', 'Footwear', 'Dupattas', 'Blouses'
      ];

      for (const category of categories) {
        await this.generateCategoryImage(category);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      console.log(`✅ Generated ${categories.length} category images`);
    } catch (error) {
      console.error('❌ Error generating category images:', error);
    }
  }

  async generateCategoryImage(category) {
    try {
      const prompt = this.createCategoryPrompt(category);
      const imageBuffer = await this.generateImage(prompt);
      
      if (imageBuffer) {
        const filename = `category-${category.toLowerCase().replace(/\s+/g, '-')}-${uuidv4()}.jpg`;
        const filepath = path.join('uploads/ai-generated/categories', filename);
        
        const processedBuffer = await this.processImage(imageBuffer, {
          width: 600,
          height: 400,
          quality: 80
        });
        
        await fs.writeFile(filepath, processedBuffer);
        console.log(`✅ Generated category image: ${category}`);
      }
    } catch (error) {
      console.error(`❌ Error generating category image for ${category}:`, error);
    }
  }

  async generateBackgroundPatterns() {
    try {
      console.log('🎭 Generating background patterns...');
      
      const patterns = [
        'indian-mandala-pattern',
        'traditional-floral-design',
        'geometric-indian-pattern',
        'spiritual-symbols',
        'ethnic-border-design',
        'divine-geometric-pattern',
        'sacred-geometry',
        'chakra-inspired-pattern'
      ];

      for (const pattern of patterns) {
        await this.generatePatternImage(pattern);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`✅ Generated ${patterns.length} background patterns`);
    } catch (error) {
      console.error('❌ Error generating background patterns:', error);
    }
  }

  async generatePatternImage(pattern) {
    try {
      const prompt = this.createPatternPrompt(pattern);
      const imageBuffer = await this.generateImage(prompt);
      
      if (imageBuffer) {
        const filename = `pattern-${pattern}-${uuidv4()}.png`;
        const filepath = path.join('uploads/ai-generated/patterns', filename);
        
        const processedBuffer = await this.processImage(imageBuffer, {
          width: 512,
          height: 512,
          quality: 90,
          format: 'png'
        });
        
        await fs.writeFile(filepath, processedBuffer);
        console.log(`✅ Generated pattern: ${pattern}`);
      }
    } catch (error) {
      console.error(`❌ Error generating pattern ${pattern}:`, error);
    }
  }

  createProductPrompt(product) {
    const basePrompt = `High-quality product photography of ${product.name}`;
    const style = product.category || 'traditional indian clothing';
    const colors = product.colors ? `in ${product.colors.join(', ')} colors` : '';
    const material = product.material ? `made of ${product.material}` : '';
    
    return `${basePrompt}, ${style}, ${colors}, ${material}, professional studio lighting, white background, high resolution, detailed texture, elegant composition, suitable for e-commerce, no watermarks, no text overlay`;
  }

  createCategoryPrompt(category) {
    const prompts = {
      'Sarees': 'Elegant Indian saree collection, silk fabric, traditional designs, vibrant colors, draped beautifully, studio lighting, white background',
      'Lehengas': 'Bridal lehenga collection, heavy embroidery, mirror work, traditional patterns, rich fabrics, elegant styling',
      'Anarkalis': 'Traditional anarkali suits, flowy designs, intricate embroidery, elegant cuts, studio photography',
      'Salwar Kameez': 'Contemporary salwar kameez, comfortable fit, modern designs, traditional elements, clean background',
      'Kurtis': 'Casual kurtis, cotton fabric, simple designs, everyday wear, comfortable fit, natural lighting',
      'Jewelry': 'Traditional Indian jewelry, gold and silver pieces, intricate designs, elegant presentation, black background',
      'Bangles': 'Colorful glass bangles, traditional designs, stacked presentation, white background, high detail',
      'Necklaces': 'Traditional Indian necklaces, heavy work, precious stones, elegant display, studio lighting',
      'Earrings': 'Traditional Indian earrings, jhumka designs, precious metals, elegant presentation',
      'Rings': 'Traditional Indian rings, precious stones, intricate designs, elegant display, macro photography',
      'Accessories': 'Indian fashion accessories, bags, clutches, traditional designs, elegant presentation',
      'Bags': 'Traditional Indian bags, embroidered designs, leather and fabric, elegant styling',
      'Footwear': 'Traditional Indian footwear, juttis, mojris, embroidered designs, elegant presentation',
      'Dupattas': 'Elegant dupattas, silk and chiffon, traditional prints, flowing fabric, studio photography',
      'Blouses': 'Traditional blouse designs, intricate embroidery, perfect fit, elegant styling, white background'
    };

    return prompts[category] || `Beautiful ${category.toLowerCase()} collection, traditional Indian design, elegant presentation, studio lighting, white background`;
  }

  createPatternPrompt(pattern) {
    const prompts = {
      'indian-mandala-pattern': 'Traditional Indian mandala pattern, intricate geometric design, sacred geometry, symmetrical composition, detailed line work, spiritual symbols, monochromatic design',
      'traditional-floral-design': 'Traditional Indian floral pattern, intricate flower designs, paisley motifs, elegant curves, detailed botanical elements, symmetrical composition',
      'geometric-indian-pattern': 'Geometric Indian pattern, traditional motifs, symmetrical design, intricate line work, cultural symbols, mathematical precision',
      'spiritual-symbols': 'Indian spiritual symbols, om symbol, lotus flower, chakra symbols, sacred geometry, spiritual energy, detailed line work',
      'ethnic-border-design': 'Traditional Indian border pattern, intricate edge design, cultural motifs, symmetrical composition, detailed craftsmanship',
      'divine-geometric-pattern': 'Divine geometric pattern, sacred geometry, spiritual mathematics, intricate line work, cosmic symbols, symmetrical design',
      'sacred-geometry': 'Sacred geometry pattern, mathematical precision, spiritual symbols, intricate line work, cosmic harmony, symmetrical composition',
      'chakra-inspired-pattern': 'Chakra-inspired pattern, seven chakras, energy centers, spiritual symbols, vibrant colors, harmonious design'
    };

    return prompts[pattern] || `Beautiful ${pattern}, traditional Indian design, intricate details, elegant composition`;
  }

  async generateImage(prompt) {
    for (const provider of this.aiProviders) {
      try {
        const imageBuffer = await this.callAIProvider(provider, prompt);
        if (imageBuffer) {
          return imageBuffer;
        }
      } catch (error) {
        console.log(`Provider ${provider.name} failed, trying next...`);
        continue;
      }
    }
    
    // Fallback: Generate a simple pattern using canvas
    return await this.generateFallbackImage(prompt);
  }

  async callAIProvider(provider, prompt) {
    try {
      if (provider.name === 'HuggingFace') {
        return await this.callHuggingFace(provider, prompt);
      } else if (provider.name === 'Replicate') {
        return await this.callReplicate(provider, prompt);
      }
    } catch (error) {
      console.error(`Error calling ${provider.name}:`, error);
      return null;
    }
  }

  async callHuggingFace(provider, prompt) {
    const response = await fetch(provider.url, {
      method: 'POST',
      headers: provider.headers,
      body: JSON.stringify({ inputs: prompt })
    });

    if (response.ok) {
      return await response.buffer();
    }
    return null;
  }

  async callReplicate(provider, prompt) {
    const response = await fetch(provider.url, {
      method: 'POST',
      headers: provider.headers,
      body: JSON.stringify({
        version: "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
        input: {
          prompt: prompt,
          negative_prompt: "blurry, low quality, watermark, text",
          num_inference_steps: 20,
          guidance_scale: 7.5
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      // Poll for completion
      return await this.pollReplicateResult(result.id, provider.headers);
    }
    return null;
  }

  async pollReplicateResult(predictionId, headers) {
    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: headers
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.status === 'succeeded') {
          const imageUrl = result.output[0];
          const imageResponse = await fetch(imageUrl);
          return await imageResponse.buffer();
        } else if (result.status === 'failed') {
          break;
        }
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
    }

    return null;
  }

  async generateFallbackImage(prompt) {
    try {
      const Jimp = require('jimp');
      
      // Create a simple geometric pattern using Jimp
      const width = 512;
      const height = 512;
      
      // Create a new image with white background
      const image = new Jimp(width, height, 0xFFFFFFFF);
      
      // Add some geometric patterns based on the prompt
      const color = 0x333333FF;
      const accentColor = 0x666666FF;
      
      // Draw a grid pattern
      for (let x = 0; x < width; x += 40) {
        image.setPixelColor(color, x, 0);
        image.setPixelColor(color, x, height - 1);
      }
      for (let y = 0; y < height; y += 40) {
        image.setPixelColor(color, 0, y);
        image.setPixelColor(color, width - 1, y);
      }
      
      // Draw circles
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Outer circle
      for (let angle = 0; angle < 360; angle += 1) {
        const x = centerX + Math.cos(angle * Math.PI / 180) * 100;
        const y = centerY + Math.sin(angle * Math.PI / 180) * 100;
        if (x >= 0 && x < width && y >= 0 && y < height) {
          image.setPixelColor(color, Math.round(x), Math.round(y));
        }
      }
      
      // Inner circle
      for (let angle = 0; angle < 360; angle += 1) {
        const x = centerX + Math.cos(angle * Math.PI / 180) * 50;
        const y = centerY + Math.sin(angle * Math.PI / 180) * 50;
        if (x >= 0 && x < width && y >= 0 && y < height) {
          image.setPixelColor(accentColor, Math.round(x), Math.round(y));
        }
      }
      
      // Convert to buffer
      return await image.getBufferAsync(Jimp.MIME_JPEG);
    } catch (error) {
      console.error('Error generating fallback image:', error);
      return null;
    }
  }

  async processImage(imageBuffer, options = {}) {
    const {
      width = 800,
      height = 800,
      quality = 85,
      format = 'jpeg'
    } = options;

    try {
      let sharpInstance = sharp(imageBuffer)
        .resize(width, height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        });

      if (format === 'jpeg') {
        sharpInstance = sharpInstance.jpeg({ quality });
      } else if (format === 'png') {
        sharpInstance = sharpInstance.png({ quality });
      }

      return await sharpInstance.toBuffer();
    } catch (error) {
      console.error('Error processing image:', error);
      return imageBuffer;
    }
  }

  async cleanupOldImages() {
    try {
      console.log('🧹 Cleaning up old AI-generated images...');
      
      const directories = [
        'uploads/ai-generated/products',
        'uploads/ai-generated/categories',
        'uploads/ai-generated/backgrounds',
        'uploads/ai-generated/patterns'
      ];

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30); // Keep images for 30 days

      for (const dir of directories) {
        const files = await fs.readdir(dir);
        
        for (const file of files) {
          const filepath = path.join(dir, file);
          const stats = await fs.stat(filepath);
          
          if (stats.mtime < cutoffDate) {
            await fs.remove(filepath);
            console.log(`🗑️ Removed old file: ${file}`);
          }
        }
      }

      console.log('✅ Cleanup completed');
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
    }
  }

  getStats() {
    return {
      ...this.stats,
      isRunning: this.isRunning,
      queueLength: this.imageQueue.length
    };
  }

  async generateCustomImage(prompt, options = {}) {
    try {
      console.log(`🎨 Generating custom image: ${prompt}`);
      
      const imageBuffer = await this.generateImage(prompt);
      
      if (imageBuffer) {
        const filename = `custom-${uuidv4()}.jpg`;
        const filepath = path.join('uploads/ai-generated', filename);
        
        const processedBuffer = await this.processImage(imageBuffer, {
          width: options.width || 800,
          height: options.height || 800,
          quality: options.quality || 85
        });
        
        await fs.writeFile(filepath, processedBuffer);
        
        this.stats.successful++;
        console.log(`✅ Generated custom image: ${filename}`);
        
        return filename;
      }
    } catch (error) {
      console.error('❌ Error generating custom image:', error);
      this.stats.failed++;
      throw error;
    }
  }
}

// Create and export the bot instance
const aiImageBot = new AIImageBot();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await aiImageBot.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await aiImageBot.stop();
  process.exit(0);
});

module.exports = aiImageBot;

// Start the bot if this file is run directly
if (require.main === module) {
  aiImageBot.start().catch(console.error);
}
