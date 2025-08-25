# 🤖 AI Error Bot

An intelligent monitoring and auto-fixing bot that checks your Bharat Vastra application every 108 seconds and automatically resolves common issues.

## ✨ Features

### 🔍 **Automatic Health Checks**
- **Dependencies**: Monitors missing or outdated npm packages
- **Tailwind CSS**: Validates configuration and content paths
- **CSS Errors**: Detects and fixes undefined Tailwind classes
- **Port Conflicts**: Identifies port usage issues
- **Build Errors**: Tests build process and clears cache if needed
- **Linting**: Checks and auto-fixes code style issues
- **File Permissions**: Validates critical file access
- **Environment**: Ensures .env file exists
- **File Changes**: Monitors critical files for modifications

### 🔧 **Auto-Fix Capabilities**
- Installs missing dependencies automatically
- Fixes undefined Tailwind CSS classes
- Clears build cache when needed
- Auto-fixes linting errors
- Creates missing .env files
- Reinstalls corrupted dependencies

### 📊 **Real-time Monitoring**
- Runs every 108 seconds (sacred number in Hinduism)
- File change detection
- Comprehensive error logging
- Fix application tracking
- Detailed health summaries

## 🚀 Quick Start

### 1. Start the AI Error Bot
```bash
# Run the bot
npm run ai-error-bot

# Or run directly
node ai-error-bot.js
```

### 2. Monitor the Output
The bot will display real-time status updates:
```
🤖 AI Error Bot initialized
📍 Project root: /Users/eddieprasad/Bharat Vastra
⏰ Check interval: 108 seconds
🔍 Monitoring for errors...

🔍 AI Error Bot Health Check - 10:30:45 PM
==================================================
📦 Checking dependencies...
✅ All dependencies installed
🎨 Checking Tailwind configuration...
✅ Tailwind config valid
🎨 Checking CSS for errors...
✅ No CSS errors found
🔌 Checking port conflicts...
✅ No port conflicts
🏗️  Checking build errors...
✅ Build successful
🔍 Checking linting errors...
✅ No linting errors
🔐 Checking file permissions...
✅ All permissions valid
🌍 Checking environment variables...
✅ Environment setup complete
📝 Checking for file changes...
✅ No recent changes

📊 Health Check Summary
==============================
✅ All systems operational - No issues found

⏰ Next check in 108 seconds...
```

## 🔧 What It Fixes

### CSS Issues
- **Undefined Tailwind Classes**: Automatically replaces undefined color classes
  - `divine-purple-600` → `secondary-600`
  - `divine-gold-500` → `accent-500`
- **Missing CSS Files**: Detects and reports missing stylesheets

### Dependency Issues
- **Missing node_modules**: Auto-installs missing dependencies
- **Outdated Packages**: Detects and reports outdated packages
- **Corrupted Installations**: Reinstalls dependencies when needed

### Build Issues
- **Cache Problems**: Clears build cache automatically
- **Compilation Errors**: Attempts to fix common build failures
- **Port Conflicts**: Identifies and reports port usage

### Code Quality
- **Linting Errors**: Auto-fixes code style issues
- **File Permissions**: Validates critical file access
- **Environment Setup**: Ensures proper .env configuration

## 📁 File Monitoring

The bot monitors these critical files for changes:
- `package.json` (server dependencies)
- `client/package.json` (client dependencies)
- `client/src/index.css` (main stylesheet)
- `client/tailwind.config.js` (Tailwind configuration)

## 🎯 Error Detection Examples

### CSS Error Detection
```
⚠️  Found undefined Tailwind classes: ['divine-purple-600', 'divine-gold-500']
🔧 Fixing undefined classes...
  🔄 Replaced divine-purple- with secondary-
  🔄 Replaced divine-gold- with accent-
✅ CSS classes fixed
```

### Dependency Issues
```
⚠️  Client node_modules missing, installing...
📦 Installed client dependencies
```

### Build Issues
```
❌ Build failed: Module build failed
🔧 Attempting to fix build errors...
  🧹 Cleared cache
  📦 Reinstalled dependencies
```

## 🔄 Integration with Development

### Run Alongside Development
```bash
# Terminal 1: Start the AI Error Bot
npm run ai-error-bot

# Terminal 2: Start your development server
npm run dev
```

### Background Monitoring
The bot runs independently and won't interfere with your development workflow. It only acts when it detects issues.

## 📊 Health Check Summary

After each 108-second cycle, the bot provides a comprehensive summary:

```
📊 Health Check Summary
==============================
✅ All systems operational - No issues found

OR

❌ Issues detected:
  • Client has outdated packages
  • Port 3000 conflict
🔧 Fixes applied:
  • Fixed undefined Tailwind classes: divine-purple-600, divine-gold-500
  • Installed client dependencies
```

## 🛑 Stopping the Bot

Press `Ctrl+C` to gracefully stop the bot:
```
🛑 AI Error Bot shutting down...
```

## 🔧 Customization

### Modify Check Interval
Edit the interval in `ai-error-bot.js`:
```javascript
setInterval(async () => {
  await this.performHealthCheck();
}, 108000); // Change this value (in milliseconds)
```

### Add Custom Checks
Extend the `performHealthCheck()` method to add your own checks:
```javascript
const checks = [
  this.checkDependencies(),
  this.checkTailwindConfig(),
  this.checkCSSErrors(),
  // Add your custom check here
  this.yourCustomCheck()
];
```

### Custom Fix Strategies
Add new fix methods to handle specific issues:
```javascript
async yourCustomFix() {
  // Your custom fix logic
  console.log('🔧 Applied custom fix');
  this.fixesApplied.push('Custom fix applied');
}
```

## 🎨 Sacred Number: 108

The 108-second interval is inspired by the sacred number 108 in Hinduism:
- 108 beads in a mala (prayer beads)
- 108 Upanishads (sacred texts)
- 108 energy lines converging to form the heart chakra
- 108 sacred sites in India

This creates a mindful, spiritual approach to error monitoring and fixing.

## 🚨 Troubleshooting

### Bot Won't Start
1. Ensure Node.js is installed
2. Check file permissions: `chmod +x ai-error-bot.js`
3. Verify the script exists: `ls -la ai-error-bot.js`

### Bot Not Detecting Issues
1. Check if the bot has proper file access
2. Verify Tailwind config path is correct
3. Ensure critical files exist in expected locations

### Bot Making Unwanted Changes
1. Review the fix logic in the bot
2. Check the replacements object in `fixUndefinedClasses()`
3. Test changes in a development environment first

## 📝 Logging

The bot provides detailed logging for all operations:
- ✅ Success messages
- ⚠️  Warning messages  
- ❌ Error messages
- 🔧 Fix application messages
- 📊 Summary reports

## 🤝 Contributing

To enhance the AI Error Bot:
1. Add new check methods
2. Improve fix strategies
3. Add more file monitoring
4. Enhance error detection
5. Optimize performance

## 📄 License

This AI Error Bot is part of the Bharat Vastra project and follows the same MIT license.

---

**May the AI Error Bot keep your codebase healthy and your development flow smooth! 🧘‍♂️✨**
