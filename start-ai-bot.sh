#!/bin/bash

# AI Error Bot Startup Script
# This script starts the AI Error Bot with proper logging and error handling

echo "🤖 Starting AI Error Bot..."
echo "📍 Project: Bharat Vastra"
echo "⏰ Check interval: 108 seconds"
echo "📝 Logs will be saved to ai-bot.log"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    exit 1
fi

# Check if the bot script exists
if [ ! -f "ai-error-bot.js" ]; then
    echo "❌ Error: ai-error-bot.js not found"
    exit 1
fi

# Make sure the script is executable
chmod +x ai-error-bot.js

# Start the bot with logging
echo "🚀 Launching AI Error Bot..."
echo "Press Ctrl+C to stop the bot"
echo ""

# Run the bot and log output
node ai-error-bot.js 2>&1 | tee ai-bot.log
