#!/bin/bash

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SOVEREIGN DEPLOYMENT ORCHESTRATOR v2.0
# Project: Paranjape Blue Ridge
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

set -e  # Exit on any error

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SOVEREIGN DEPLOYMENT ORCHESTRATOR v2.0"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Phase 1: Pre-flight Checks ──
echo "🔍 Phase 1: Pre-flight Checks..."

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci || npm install
fi

# Credential check — 3 sources
CRED_FOUND=false
if [ -n "$GCP_SERVICE_ACCOUNT" ]; then
    echo "   ✅ Credentials: GCP_SERVICE_ACCOUNT env var"
    CRED_FOUND=true
elif [ -f "scripts/google-service-account.json" ]; then
    echo "   ✅ Credentials: scripts/google-service-account.json"
    CRED_FOUND=true
elif [ -f "credentials/service_account.json" ]; then
    echo "   ✅ Credentials: credentials/service_account.json"
    CRED_FOUND=true
fi

if [ "$CRED_FOUND" = false ]; then
    echo "   ⚠️  No credentials found. Indexing will be skipped."
fi

# ── Phase 2: Security Audit ──
echo ""
echo "🔒 Phase 2: Security Audit..."

# Check that credentials aren't tracked by git
if git ls-files --cached | grep -q "service-account\|service_account"; then
    echo "   ⛔ WARNING: Credential files are tracked by git!"
    echo "   Run: git rm --cached <file> to untrack"
else
    echo "   ✅ No credentials tracked in git"
fi

# ── Phase 3: Indexing Sweep ──
if [ "$CRED_FOUND" = true ]; then
    echo ""
    echo "📡 Phase 3: Sovereign Indexing Sweep..."
    node scripts/sovereign-indexing.js
else
    echo ""
    echo "⏭️  Phase 3: Skipped (no credentials)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ SOVEREIGN DEPLOYMENT COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
