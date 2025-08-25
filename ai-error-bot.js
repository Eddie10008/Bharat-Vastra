#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class AIErrorBot {
  constructor() {
    this.projectRoot = process.cwd();
    this.clientPath = path.join(this.projectRoot, 'client');
    this.serverPath = this.projectRoot;
    this.lastCheck = Date.now();
    this.errorLog = [];
    this.fixesApplied = [];
    this.fileHashes = new Map();
    
    console.log('🤖 AI Error Bot initialized');
    console.log('📍 Project root:', this.projectRoot);
    console.log('⏰ Check interval: 108 seconds');
    console.log('🔍 Monitoring for errors...\n');
  }

  async start() {
    // Initial check
    await this.performHealthCheck();
    
    // Start periodic checks
    setInterval(async () => {
      await this.performHealthCheck();
    }, 108000); // 108 seconds
  }

  async performHealthCheck() {
    console.log(`\n🔍 AI Error Bot Health Check - ${new Date().toLocaleTimeString()}`);
    console.log('=' .repeat(50));

    const checks = [
      this.checkDependencies(),
      this.checkTailwindConfig(),
      this.checkCSSErrors(),
      this.checkPortConflicts(),
      this.checkBuildErrors(),
      this.checkLintingErrors(),
      this.checkFilePermissions(),
      this.checkEnvironmentVariables(),
      this.checkFileChanges()
    ];

    await Promise.all(checks);
    
    this.logSummary();
  }

  async checkFileChanges() {
    try {
      console.log('📝 Checking for file changes...');
      
      const criticalFiles = [
        'package.json',
        'client/package.json',
        'client/src/index.css',
        'client/tailwind.config.js'
      ];
      
      for (const file of criticalFiles) {
        const filePath = path.join(this.projectRoot, file);
        if (fs.existsSync(filePath)) {
          const currentHash = this.getFileHash(filePath);
          const previousHash = this.fileHashes.get(file);
          
          if (previousHash && previousHash !== currentHash) {
            console.log(`📝 File changed: ${file}`);
            await this.handleFileChange(file);
          }
          
          this.fileHashes.set(file, currentHash);
        }
      }
      
    } catch (error) {
      console.log('❌ File change check failed:', error.message);
      this.errorLog.push(`File change error: ${error.message}`);
    }
  }

  getFileHash(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return `${stats.mtime.getTime()}-${stats.size}`;
    } catch (e) {
      return '0';
    }
  }

  async handleFileChange(filePath) {
    if (filePath.includes('package.json')) {
      await this.checkDependencies();
    } else if (filePath.includes('tailwind.config.js')) {
      await this.checkTailwindConfig();
    } else if (filePath.includes('.css')) {
      await this.checkCSSErrors();
    }
  }

  async checkDependencies() {
    try {
      console.log('📦 Checking dependencies...');
      
      // Check if node_modules exists
      const clientNodeModules = path.join(this.clientPath, 'node_modules');
      const serverNodeModules = path.join(this.serverPath, 'node_modules');
      
      if (!fs.existsSync(clientNodeModules)) {
        console.log('⚠️  Client node_modules missing, installing...');
        await this.runCommand('cd client && npm install');
        this.fixesApplied.push('Installed client dependencies');
      }
      
      if (!fs.existsSync(serverNodeModules)) {
        console.log('⚠️  Server node_modules missing, installing...');
        await this.runCommand('npm install');
        this.fixesApplied.push('Installed server dependencies');
      }
      
      // Check for outdated packages
      try {
        const clientOutdated = await this.runCommand('cd client && npm outdated --json');
        if (clientOutdated && clientOutdated !== '{}') {
          console.log('⚠️  Client has outdated packages');
          this.errorLog.push('Client has outdated packages');
        }
      } catch (e) {
        // npm outdated returns non-zero exit code when there are outdated packages
      }
      
    } catch (error) {
      console.log('❌ Dependency check failed:', error.message);
      this.errorLog.push(`Dependency error: ${error.message}`);
    }
  }

  async checkTailwindConfig() {
    try {
      console.log('🎨 Checking Tailwind configuration...');
      
      const tailwindConfigPath = path.join(this.clientPath, 'tailwind.config.js');
      
      if (!fs.existsSync(tailwindConfigPath)) {
        console.log('❌ Tailwind config missing');
        this.errorLog.push('Tailwind config missing');
        return;
      }
      
      // Check if content paths are correct
      const config = require(tailwindConfigPath);
      if (!config.content || !config.content.includes('./src/**/*.{js,jsx,ts,tsx}')) {
        console.log('⚠️  Tailwind content paths may be incorrect');
        this.errorLog.push('Tailwind content paths may be incorrect');
      }
      
    } catch (error) {
      console.log('❌ Tailwind config check failed:', error.message);
      this.errorLog.push(`Tailwind config error: ${error.message}`);
    }
  }

  async checkCSSErrors() {
    try {
      console.log('🎨 Checking CSS for errors...');
      
      const cssPath = path.join(this.clientPath, 'src/index.css');
      
      if (!fs.existsSync(cssPath)) {
        console.log('❌ index.css missing');
        this.errorLog.push('index.css missing');
        return;
      }
      
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      
      // Check for undefined Tailwind classes
      const undefinedClasses = this.findUndefinedTailwindClasses(cssContent);
      
      if (undefinedClasses.length > 0) {
        console.log('⚠️  Found undefined Tailwind classes:', undefinedClasses);
        await this.fixUndefinedClasses(cssContent, cssPath, undefinedClasses);
      }
      
    } catch (error) {
      console.log('❌ CSS check failed:', error.message);
      this.errorLog.push(`CSS error: ${error.message}`);
    }
  }

  findUndefinedTailwindClasses(cssContent) {
    try {
      const tailwindConfig = require(path.join(this.clientPath, 'tailwind.config.js'));
      const definedColors = new Set();
      
      // Extract defined colors from config
      if (tailwindConfig.theme && tailwindConfig.theme.extend && tailwindConfig.theme.extend.colors) {
        Object.keys(tailwindConfig.theme.extend.colors).forEach(colorName => {
          definedColors.add(colorName);
          // Add numbered variants
          for (let i = 50; i <= 900; i += 50) {
            definedColors.add(`${colorName}-${i}`);
          }
        });
      }
      
      // Find all color classes in CSS
      const colorClassRegex = /(from|to|via|bg|text|border|ring|shadow)-([a-zA-Z0-9-]+)/g;
      const foundClasses = new Set();
      let match;
      
      while ((match = colorClassRegex.exec(cssContent)) !== null) {
        foundClasses.add(match[2]);
      }
      
      // Return undefined classes
      return Array.from(foundClasses).filter(className => !definedColors.has(className));
    } catch (error) {
      console.log('⚠️  Could not parse Tailwind config:', error.message);
      return [];
    }
  }

  async fixUndefinedClasses(cssContent, cssPath, undefinedClasses) {
    console.log('🔧 Fixing undefined classes...');
    
    let fixedContent = cssContent;
    const replacements = {
      'divine-purple': 'secondary',
      'divine-gold': 'accent',
      'primary': 'primary' // Keep primary as it should be defined
    };
    
    undefinedClasses.forEach(className => {
      const baseClass = className.split('-')[0];
      const replacement = replacements[baseClass];
      
      if (replacement) {
        const regex = new RegExp(`${baseClass}-`, 'g');
        fixedContent = fixedContent.replace(regex, `${replacement}-`);
        console.log(`  🔄 Replaced ${baseClass}- with ${replacement}-`);
      }
    });
    
    if (fixedContent !== cssContent) {
      fs.writeFileSync(cssPath, fixedContent);
      this.fixesApplied.push(`Fixed undefined Tailwind classes: ${undefinedClasses.join(', ')}`);
      console.log('✅ CSS classes fixed');
    }
  }

  async checkPortConflicts() {
    try {
      console.log('🔌 Checking port conflicts...');
      
      const ports = [3000, 3001, 5000, 5001];
      
      for (const port of ports) {
        try {
          const result = await this.runCommand(`lsof -ti:${port}`);
          if (result.trim()) {
            console.log(`⚠️  Port ${port} is in use by process: ${result.trim()}`);
            this.errorLog.push(`Port ${port} conflict`);
          }
        } catch (e) {
          // Port is free
        }
      }
      
    } catch (error) {
      console.log('❌ Port check failed:', error.message);
      this.errorLog.push(`Port check error: ${error.message}`);
    }
  }

  async checkBuildErrors() {
    try {
      console.log('🏗️  Checking build errors...');
      
      // Try to build the client
      try {
        await this.runCommand('cd client && npm run build', { timeout: 30000 });
        console.log('✅ Build successful');
      } catch (error) {
        console.log('❌ Build failed:', error.message);
        this.errorLog.push(`Build error: ${error.message}`);
        
        // Try to fix common build issues
        await this.fixBuildErrors();
      }
      
    } catch (error) {
      console.log('❌ Build check failed:', error.message);
      this.errorLog.push(`Build check error: ${error.message}`);
    }
  }

  async fixBuildErrors() {
    console.log('🔧 Attempting to fix build errors...');
    
    // Clear cache
    try {
      await this.runCommand('cd client && rm -rf node_modules/.cache');
      console.log('  🧹 Cleared cache');
    } catch (e) {}
    
    // Reinstall dependencies
    try {
      await this.runCommand('cd client && npm install');
      console.log('  📦 Reinstalled dependencies');
      this.fixesApplied.push('Reinstalled client dependencies');
    } catch (e) {}
  }

  async checkLintingErrors() {
    try {
      console.log('🔍 Checking linting errors...');
      
      try {
        await this.runCommand('cd client && npm run lint', { timeout: 15000 });
        console.log('✅ No linting errors');
      } catch (error) {
        console.log('⚠️  Linting errors found');
        this.errorLog.push('Linting errors detected');
        
        // Try to auto-fix
        try {
          await this.runCommand('cd client && npm run lint -- --fix');
          console.log('  🔧 Auto-fixed linting errors');
          this.fixesApplied.push('Auto-fixed linting errors');
        } catch (e) {
          console.log('  ❌ Could not auto-fix linting errors');
        }
      }
      
    } catch (error) {
      console.log('❌ Linting check failed:', error.message);
      this.errorLog.push(`Linting error: ${error.message}`);
    }
  }

  async checkFilePermissions() {
    try {
      console.log('🔐 Checking file permissions...');
      
      const criticalFiles = [
        'package.json',
        'client/package.json',
        'server.js',
        'client/src/index.js'
      ];
      
      for (const file of criticalFiles) {
        const filePath = path.join(this.projectRoot, file);
        if (fs.existsSync(filePath)) {
          try {
            fs.accessSync(filePath, fs.constants.R_OK);
          } catch (e) {
            console.log(`⚠️  Permission issue with ${file}`);
            this.errorLog.push(`Permission issue: ${file}`);
          }
        }
      }
      
    } catch (error) {
      console.log('❌ Permission check failed:', error.message);
      this.errorLog.push(`Permission error: ${error.message}`);
    }
  }

  async checkEnvironmentVariables() {
    try {
      console.log('🌍 Checking environment variables...');
      
      const envPath = path.join(this.projectRoot, '.env');
      const envExamplePath = path.join(this.projectRoot, 'env.example');
      
      if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
        console.log('⚠️  .env file missing, copying from env.example');
        fs.copyFileSync(envExamplePath, envPath);
        this.fixesApplied.push('Created .env file from env.example');
      }
      
    } catch (error) {
      console.log('❌ Environment check failed:', error.message);
      this.errorLog.push(`Environment error: ${error.message}`);
    }
  }

  async runCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      exec(command, { 
        cwd: this.projectRoot,
        timeout: options.timeout || 10000,
        ...options 
      }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  logSummary() {
    console.log('\n📊 Health Check Summary');
    console.log('=' .repeat(30));
    
    if (this.errorLog.length === 0 && this.fixesApplied.length === 0) {
      console.log('✅ All systems operational - No issues found');
    } else {
      if (this.errorLog.length > 0) {
        console.log('❌ Issues detected:');
        this.errorLog.forEach(error => console.log(`  • ${error}`));
      }
      
      if (this.fixesApplied.length > 0) {
        console.log('🔧 Fixes applied:');
        this.fixesApplied.forEach(fix => console.log(`  • ${fix}`));
      }
    }
    
    // Clear logs for next check
    this.errorLog = [];
    this.fixesApplied = [];
    
    console.log(`\n⏰ Next check in 108 seconds...\n`);
  }
}

// Start the bot
const bot = new AIErrorBot();
bot.start().catch(console.error);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 AI Error Bot shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 AI Error Bot shutting down...');
  process.exit(0);
});
