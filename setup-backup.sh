#!/bin/bash

# Bharat Vastra - Backup Service Setup Script
# This script sets up the automated backup service

echo "Setting up Bharat Vastra Automated Backup Service..."

# Get the current directory
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLIST_FILE="$CURRENT_DIR/com.bharatvastra.backup.plist"
LAUNCH_AGENTS_DIR="$HOME/Library/LaunchAgents"

# Create LaunchAgents directory if it doesn't exist
mkdir -p "$LAUNCH_AGENTS_DIR"

# Copy the plist file to LaunchAgents
cp "$PLIST_FILE" "$LAUNCH_AGENTS_DIR/"

# Load the service
launchctl load "$LAUNCH_AGENTS_DIR/com.bharatvastra.backup.plist"

if [ $? -eq 0 ]; then
    echo "✅ Backup service installed and started successfully!"
    echo "📝 The service will automatically backup your project every 11 minutes"
    echo "📋 Logs will be saved to: $CURRENT_DIR/backup.log"
    echo ""
    echo "To check the service status, run:"
    echo "  launchctl list | grep bharatvastra"
    echo ""
    echo "To stop the service, run:"
    echo "  launchctl unload $LAUNCH_AGENTS_DIR/com.bharatvastra.backup.plist"
    echo ""
    echo "To start the service again, run:"
    echo "  launchctl load $LAUNCH_AGENTS_DIR/com.bharatvastra.backup.plist"
else
    echo "❌ Failed to install backup service"
    exit 1
fi
