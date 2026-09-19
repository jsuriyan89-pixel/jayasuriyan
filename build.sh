#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Checking environment for Node.js / npm..."
if command -v npm &> /dev/null; then
    echo "npm found. Building latest production bundle..."
    npm install
    npm run build
else
    echo "npm not found in this environment. Using pre-built dist/ bundle from repository."
fi

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Build complete!"
