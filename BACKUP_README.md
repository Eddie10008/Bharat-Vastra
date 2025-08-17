# Bharat Vastra - Automated Backup System

This document explains the automated backup system for the Bharat Vastra project.

## Overview

The backup system automatically commits and pushes all changes to GitHub every 11 minutes, ensuring your project is always backed up and version controlled.

## Files

- `backup-script.sh` - The main backup script that runs every 11 minutes
- `com.bharatvastra.backup.plist` - macOS launchd service configuration
- `setup-backup.sh` - Installation script for the backup service
- `backup.log` - Log file containing backup activity (created automatically)

## Installation

### Automatic Installation

Run the setup script to install the backup service:

```bash
./setup-backup.sh
```

This will:
1. Copy the service configuration to your LaunchAgents directory
2. Start the backup service
3. Configure it to run automatically on system startup

### Manual Installation

If you prefer to install manually:

1. Copy the plist file to LaunchAgents:
   ```bash
   cp com.bharatvastra.backup.plist ~/Library/LaunchAgents/
   ```

2. Load the service:
   ```bash
   launchctl load ~/Library/LaunchAgents/com.bharatvastra.backup.plist
   ```

## How It Works

1. **Every 11 minutes**, the script checks for changes in your project
2. If changes are detected, it:
   - Adds all modified files to git
   - Creates a commit with timestamp
   - Pushes to GitHub repository
3. All activity is logged to `backup.log`

## Management Commands

### Check Service Status
```bash
launchctl list | grep bharatvastra
```

### Stop the Backup Service
```bash
launchctl unload ~/Library/LaunchAgents/com.bharatvastra.backup.plist
```

### Start the Backup Service
```bash
launchctl load ~/Library/LaunchAgents/com.bharatvastra.backup.plist
```

### View Backup Logs
```bash
tail -f backup.log
```

### Manual Backup
You can also run a manual backup anytime:
```bash
./backup-script.sh
```

## GitHub Repository

The project is backed up to: https://github.com/Eddie10008/Bharat-Vastra.git

## Backup Schedule

- **Frequency**: Every 11 minutes
- **Trigger**: Only when changes are detected
- **Commit Message**: "Auto-backup: YYYY-MM-DD HH:MM:SS"

## Logging

All backup activity is logged to `backup.log` with timestamps:
- INFO: Normal operations
- SUCCESS: Successful backups
- ERROR: Failed operations

## Troubleshooting

### Service Not Starting
1. Check if the plist file is in the correct location:
   ```bash
   ls ~/Library/LaunchAgents/com.bharatvastra.backup.plist
   ```

2. Check the log file for errors:
   ```bash
   cat backup.log
   ```

### Git Authentication Issues
If you encounter git authentication problems:
1. Ensure you have proper GitHub credentials configured
2. Consider using SSH keys or personal access tokens
3. Check the backup.log for specific error messages

### Path Issues
If the script can't find the project directory:
1. Verify the path in `backup-script.sh` matches your actual project location
2. Update the path if necessary and restart the service

## Security Notes

- The backup script only commits and pushes code changes
- Environment files (`.env`) are excluded via `.gitignore`
- Node modules and build artifacts are also excluded
- Only source code and configuration files are backed up

## Customization

### Change Backup Frequency
To change the backup interval, edit `backup-script.sh` and modify the sleep duration:
```bash
sleep 660  # 11 minutes (660 seconds)
```

### Change Log Location
Modify the `LOG_FILE` variable in `backup-script.sh`:
```bash
LOG_FILE="/path/to/your/log/file"
```

### Add Custom Exclusions
Edit `.gitignore` to exclude additional files from backup.

## Support

If you encounter issues with the backup system:
1. Check the `backup.log` file for error messages
2. Verify your GitHub repository access
3. Ensure the project directory path is correct
4. Check that the launchd service is properly loaded
