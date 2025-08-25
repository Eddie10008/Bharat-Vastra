const ImprovedAIGenerator = require('./improved-ai-generator');
const fs = require('fs-extra');
const path = require('path');

async function generateAccurateImages() {
  console.log('🎨 Generating Accurate Product Images for Bharat Vastra...\n');
  
  try {
    const generator = new ImprovedAIGenerator();
    
    // Ensure directories exist
    await fs.ensureDir('uploads/ai-generated/products');
    await fs.ensureDir('uploads/ai-generated/categories');
    
    console.log('🏷️ Generating accurate category images...');
    
    // Generate accurate category images
    const categories = [
      'Sarees', 'Lehengas', 'Kurtis', 'Jewelry'
    ];
    
    for (const category of categories) {
      console.log(`\n🎨 Generating ${category} images...`);
      
      for (let i = 0; i < 8; i++) {
        const productName = `${category} Product ${i + 1}`;
        const filename = await generator.generateAccurateProductImage(productName, category);
        
        if (filename) {
          console.log(`✅ Generated: ${filename}`);
        }
        
        // Wait between generations
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Generate specific product images for your website
    console.log('\n🛍️ Generating specific product images...');
    
    const specificProducts = [
      {
        name: 'Elegant Silk Saree with Zari Work',
        category: 'Sarees',
        description: 'Traditional silk saree with intricate zari work'
      },
      {
        name: 'Bridal Lehenga Set with Dupatta',
        category: 'Lehengas',
        description: 'Heavy bridal lehenga with embroidery and mirror work'
      },
      {
        name: 'Traditional Kundan Necklace Set',
        category: 'Jewelry',
        description: 'Traditional kundan jewelry set with precious stones'
      },
      {
        name: 'Cotton Kurta with Embroidery',
        category: 'Kurtis',
        description: 'Comfortable cotton kurta with beautiful embroidery'
      },
      {
        name: 'Designer Anarkali Suit',
        category: 'Lehengas',
        description: 'Elegant anarkali suit with modern design'
      },
      {
        name: 'Gold Temple Jewelry Set',
        category: 'Jewelry',
        description: 'Traditional temple jewelry in pure gold'
      },
      {
        name: 'Party Wear Saree',
        category: 'Sarees',
        description: 'Glamorous party wear saree with sequin work'
      },
      {
        name: 'Casual Cotton Kurti',
        category: 'Kurtis',
        description: 'Everyday wear cotton kurti with simple design'
      }
    ];
    
    for (const product of specificProducts) {
      console.log(`🎨 Generating: ${product.name}`);
      const filename = await generator.generateAccurateProductImage(product.name, product.category);
      
      if (filename) {
        console.log(`✅ Generated: ${filename}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n🎉 Accurate image generation completed!');
    console.log('\n📊 Generated Images Summary:');
    
    // List generated images
    try {
      const files = await fs.readdir('uploads/ai-generated/products');
      const accurateFiles = files.filter(file => file.startsWith('accurate-'));
      
      console.log(`\n📁 Accurate Product Images: ${accurateFiles.length}`);
      accurateFiles.slice(0, 10).forEach(file => {
        console.log(`   - ${file}`);
      });
      if (accurateFiles.length > 10) {
        console.log(`   ... and ${accurateFiles.length - 10} more`);
      }
    } catch (error) {
      console.log('📁 No accurate images found');
    }
    
    console.log('\n🚀 Next steps:');
    console.log('1. Restart your website: npm run dev');
    console.log('2. The accurate images will now be used as fallbacks');
    console.log('3. Product images will match their categories');
    console.log('4. No more mismatched images like headphones for sarees!');
    
  } catch (error) {
    console.error('❌ Error generating accurate images:', error);
  }
}

// Run the accurate image generation
generateAccurateImages();
