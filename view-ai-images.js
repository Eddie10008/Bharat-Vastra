const fs = require('fs-extra');
const path = require('path');

async function viewAIImages() {
  console.log('🎨 Bharat Vastra AI-Generated Images Summary\n');
  
  try {
    const baseDir = 'uploads/ai-generated';
    const directories = [
      'categories',
      'patterns', 
      'products',
      'backgrounds'
    ];
    
    let totalImages = 0;
    
    for (const dir of directories) {
      const dirPath = path.join(baseDir, dir);
      try {
        const files = await fs.readdir(dirPath);
        totalImages += files.length;
        
        console.log(`📁 ${dir.toUpperCase()} (${files.length} images):`);
        
        // Group files by type
        const fileGroups = {};
        files.forEach(file => {
          const type = file.split('-')[0];
          if (!fileGroups[type]) fileGroups[type] = [];
          fileGroups[type].push(file);
        });
        
        Object.entries(fileGroups).forEach(([type, fileList]) => {
          console.log(`   ${type}: ${fileList.length} images`);
          fileList.slice(0, 3).forEach(file => {
            console.log(`     - ${file}`);
          });
          if (fileList.length > 3) {
            console.log(`     ... and ${fileList.length - 3} more`);
          }
        });
        console.log('');
      } catch (error) {
        console.log(`📁 ${dir.toUpperCase()}: No images found`);
      }
    }
    
    console.log(`🎉 Total AI-Generated Images: ${totalImages}`);
    console.log('\n🌐 Website Access:');
    console.log('   Frontend: http://localhost:3000');
    console.log('   Admin Dashboard: http://localhost:3000/admin/ai-images');
    console.log('   API Endpoints: http://localhost:5001/api/ai-images');
    
    console.log('\n📱 How to Use:');
    console.log('   1. The AI images are automatically used as fallbacks');
    console.log('   2. When product images fail to load, AI images appear');
    console.log('   3. Category pages use AI-generated category images');
    console.log('   4. Background patterns are used for decorative elements');
    console.log('   5. Access admin dashboard to manage and generate more images');
    
    console.log('\n🔧 Next Steps:');
    console.log('   1. Add API keys to .env for better AI generation');
    console.log('   2. Customize prompts for specific image styles');
    console.log('   3. Set up automatic generation schedules');
    console.log('   4. Monitor image usage and quality');
    
  } catch (error) {
    console.error('Error viewing AI images:', error);
  }
}

viewAIImages();
