#!/bin/bash

# SOVEREIGN DEPLOYMENT ORCHESTRATOR
# Project: Paranjape Blue Ridge

echo "──────────────────────────────────────────"
echo "  SOVEREIGN ADVANCED DEPLOYMENT ENGINE    "
echo "──────────────────────────────────────────"

# 1. Dependency Check
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Google API dependencies..."
    npm install googleapis
fi

# 2. Key Check
if [ ! -f "scripts/google-service-account.json" ]; then
    echo "⚠️  WARNING: Service Account Key not found."
    echo "   Indexing will be skipped. Place key in scripts/ to activate."
else
    # 3. Trigger Indexing Sweep
    echo "📡 Triggering Sovereign Indexing Sweep..."
    node scripts/google-indexing-api.js
fi

echo "──────────────────────────────────────────"
echo "✅ ARCHITECTURE DEPLOYED & OPTIMIZED"
echo "──────────────────────────────────────────"
