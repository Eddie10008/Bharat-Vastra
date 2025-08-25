const aiImageBot = require('./ai-image-bot');

// Start the AI Image Bot automatically
async function startAIBot() {
  try {
    console.log('🤖 Starting AI Image Generator Bot...');
    await aiImageBot.start();
    console.log('✅ AI Image Bot is now running in the background');
  } catch (error) {
    console.error('❌ Error starting AI Image Bot:', error);
  }
}

// Start the bot
startAIBot();
