#!/bin/bash

# Start Bharat Vastra application (both server and client)

echo "Starting Bharat Vastra application..."

# Start the server in the background
echo "Starting server on port 5001..."
PORT=5001 node server.js &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Start the client in the background
echo "Starting React client on port 3000..."
cd client && npm start &
CLIENT_PID=$!

echo "Application started!"
echo "Server: http://localhost:5001"
echo "Client: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both server and client"

# Wait for user to stop
wait
