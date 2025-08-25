const aiImageBot = require('./ai-image-bot');
const fs = require('fs-extra');
const path = require('path');

async function generateWebsiteImages() {
  console.log('🎨 Generating images for Bharat Vastra website...');
  
  try {
    // Start the AI bot
    await aiImageBot.start();
    console.log('✅ AI Bot started successfully');
    
    // Generate category images
    console.log('\n🏷️ Generating category images...');
    const categories = [
      'Sarees', 'Lehengas', 'Anarkalis', 'Salwar Kameez', 'Kurtis',
      'Jewelry', 'Bangles', 'Necklaces', 'Earrings', 'Rings',
      'Accessories', 'Bags', 'Footwear', 'Dupattas', 'Blouses'
    ];
    
    for (const category of categories) {
      console.log(`🎨 Generating image for: ${category}`);
      try {
        await aiImageBot.generateCategoryImage(category);
        console.log(`✅ Generated: ${category}`);
        // Wait between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.log(`⚠️ Failed to generate ${category}: ${error.message}`);
      }
    }
    
    // Generate background patterns
    console.log('\n🎭 Generating background patterns...');
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
      console.log(`🎨 Generating pattern: ${pattern}`);
      try {
        await aiImageBot.generatePatternImage(pattern);
        console.log(`✅ Generated: ${pattern}`);
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (error) {
        console.log(`⚠️ Failed to generate ${pattern}: ${error.message}`);
      }
    }
    
    // Generate sample product images
    console.log('\n🛍️ Generating sample product images...');
    const sampleProducts = [
      {
        name: 'Silk Saree with Gold Border',
        category: 'Sarees',
        colors: ['Red', 'Gold'],
        material: 'Silk'
      },
      {
        name: 'Bridal Lehenga with Embroidery',
        category: 'Lehengas',
        colors: ['Pink', 'Silver'],
        material: 'Silk'
      },
      {
        name: 'Traditional Anarkali Suit',
        category: 'Anarkalis',
        colors: ['Blue', 'Gold'],
        material: 'Cotton'
      },
      {
        name: 'Designer Salwar Kameez',
        category: 'Salwar Kameez',
        colors: ['Green', 'White'],
        material: 'Cotton'
      },
      {
        name: 'Casual Cotton Kurti',
        category: 'Kurtis',
        colors: ['Yellow', 'White'],
        material: 'Cotton'
      },
      {
        name: 'Gold Necklace Set',
        category: 'Jewelry',
        colors: ['Gold'],
        material: 'Gold'
      },
      {
        name: 'Glass Bangles Set',
        category: 'Bangles',
        colors: ['Red', 'Green', 'Blue'],
        material: 'Glass'
      },
      {
        name: 'Traditional Jhumka Earrings',
        category: 'Earrings',
        colors: ['Gold', 'Silver'],
        material: 'Gold'
      }
    ];
    
    for (const product of sampleProducts) {
      console.log(`🎨 Generating product image: ${product.name}`);
      try {
        await aiImageBot.generateProductImage(product);
        console.log(`✅ Generated: ${product.name}`);
        await new Promise(resolve => setTimeout(resolve, 2500));
      } catch (error) {
        console.log(`⚠️ Failed to generate ${product.name}: ${error.message}`);
      }
    }
    
    // Generate custom images for website sections
    console.log('\n🌐 Generating website section images...');
    const websiteImages = [
      {
        prompt: 'Traditional Indian fashion banner with elegant typography, rich colors, professional design',
        filename: 'website-banner.jpg'
      },
      {
        prompt: 'Indian jewelry collection display, elegant presentation, studio lighting',
        filename: 'jewelry-banner.jpg'
      },
      {
        prompt: 'Traditional Indian wedding collection, bridal wear, elegant styling',
        filename: 'wedding-collection.jpg'
      },
      {
        prompt: 'Indian ethnic wear showcase, traditional designs, modern presentation',
        filename: 'ethnic-collection.jpg'
      },
      {
        prompt: 'Bharat Vastra logo design, traditional Indian elements, elegant typography',
        filename: 'logo-variation.jpg'
      }
    ];
    
    for (const image of websiteImages) {
      console.log(`🎨 Generating: ${image.filename}`);
      try {
        const filename = await aiImageBot.generateCustomImage(image.prompt, {
          width: 1200,
          height: 400,
          quality: 90
        });
        console.log(`✅ Generated: ${filename}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.log(`⚠️ Failed to generate ${image.filename}: ${error.message}`);
      }
    }
    
    console.log('\n🎉 Website image generation completed!');
    console.log('\n📊 Generated Images Summary:');
    
    // List generated images
    const directories = [
      'uploads/ai-generated/products',
      'uploads/ai-generated/categories',
      'uploads/ai-generated/patterns'
    ];
    
    for (const dir of directories) {
      try {
        const files = await fs.readdir(dir);
        console.log(`\n📁 ${dir}: ${files.length} images`);
        files.slice(0, 5).forEach(file => {
          console.log(`   - ${file}`);
        });
        if (files.length > 5) {
          console.log(`   ... and ${files.length - 5} more`);
        }
      } catch (error) {
        console.log(`📁 ${dir}: No images found`);
      }
    }
    
    console.log('\n🚀 Next steps:');
    console.log('1. Start your website: npm run dev');
    console.log('2. Access admin dashboard: http://localhost:3000/admin/ai-images');
    console.log('3. View generated images in the gallery');
    console.log('4. Images will automatically be used throughout your platform');
    
  } catch (error) {
    console.error('❌ Error generating website images:', error);
  } finally {
    // Stop the bot
    await aiImageBot.stop();
    console.log('\n🛑 AI Bot stopped');
  }
}

// Run the image generation
generateWebsiteImages();
