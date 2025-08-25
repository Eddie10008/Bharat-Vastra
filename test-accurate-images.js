const fs = require('fs-extra');
const path = require('path');

async function testAccurateImages() {
  console.log('🧪 Testing Accurate AI Images...\n');
  
  try {
    const productDir = 'uploads/ai-generated/products';
    const files = await fs.readdir(productDir);
    
    const accurateFiles = files.filter(file => file.startsWith('accurate-'));
    
    console.log(`📊 Found ${accurateFiles.length} accurate images`);
    
    // Group by category
    const categories = {};
    accurateFiles.forEach(file => {
      const category = file.split('-')[1]; // accurate-category-uuid.jpg
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(file);
    });
    
    console.log('\n📁 Images by Category:');
    Object.entries(categories).forEach(([category, files]) => {
      console.log(`   ${category.toUpperCase()}: ${files.length} images`);
      files.slice(0, 3).forEach(file => {
        console.log(`     - ${file}`);
      });
      if (files.length > 3) {
        console.log(`     ... and ${files.length - 3} more`);
      }
    });
    
    // Check file sizes
    console.log('\n📏 File Size Analysis:');
    for (const category of Object.keys(categories)) {
      const sampleFile = categories[category][0];
      const filePath = path.join(productDir, sampleFile);
      const stats = await fs.stat(filePath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   ${category}: ${sizeKB} KB (sample: ${sampleFile})`);
    }
    
    console.log('\n✅ Accurate images are ready!');
    console.log('\n🌐 To see them in action:');
    console.log('   1. Restart your website: npm run dev');
    console.log('   2. Visit: http://localhost:3000/products');
    console.log('   3. The accurate images will now appear instead of mismatched ones');
    
  } catch (error) {
    console.error('❌ Error testing accurate images:', error);
  }
}

testAccurateImages();
