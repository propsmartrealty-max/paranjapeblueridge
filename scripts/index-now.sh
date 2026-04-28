#!/bin/bash

echo "🚀 INITIALIZING SOVEREIGN INDEXING PROTOCOL..."
echo "--------------------------------------------"

# Ensure we are in the project root
cd "$(dirname "$0")/.."

# Check if service account exists
if [ ! -f "credentials/service_account.json" ]; then
    echo "❌ ERROR: credentials/service_account.json not found!"
    exit 1
fi

# Run the indexing script
node scripts/force-index.js

echo "--------------------------------------------"
echo "✅ PROTOCOL COMPLETE. Check terminal output above for success logs."
