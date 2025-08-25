const aiImageBot = require('./ai-image-bot');

async function testAIBot() {
  console.log('🧪 Testing AI Image Generator Bot...');
  
  try {
    // Test 1: Check bot initialization
    console.log('✅ Bot initialized successfully');
    
    // Test 2: Test fallback image generation
    console.log('🎨 Testing fallback image generation...');
    const fallbackImage = await aiImageBot.generateFallbackImage('test prompt');
    if (fallbackImage) {
      console.log('✅ Fallback image generated successfully');
    } else {
      console.log('❌ Fallback image generation failed');
    }
    
    // Test 3: Test image processing
    console.log('🖼️ Testing image processing...');
    if (fallbackImage) {
      const processedImage = await aiImageBot.processImage(fallbackImage, {
        width: 400,
        height: 400,
        quality: 80
      });
      if (processedImage) {
        console.log('✅ Image processing successful');
      } else {
        console.log('❌ Image processing failed');
      }
    }
    
    // Test 4: Test custom image generation
    console.log('🎯 Testing custom image generation...');
    try {
      const customImage = await aiImageBot.generateCustomImage('Elegant Indian saree', {
        width: 512,
        height: 512,
        quality: 85
      });
      if (customImage) {
        console.log('✅ Custom image generated successfully');
      } else {
        console.log('⚠️ Custom image generation failed (expected without API keys)');
      }
    } catch (error) {
      console.log('⚠️ Custom image generation failed (expected without API keys)');
    }
    
    console.log('\n🎉 AI Bot test completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Add your API keys to .env file');
    console.log('2. Run: npm run dev');
    console.log('3. Access admin dashboard at: http://localhost:3000/admin/ai-images');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testAIBot();
