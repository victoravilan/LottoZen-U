#!/bin/bash
# ============================================================
# LottoZen Ultra - Build Script for Google Play Store
# ============================================================
# This script:
# 1. Builds the web assets (Vite)
# 2. Syncs them to Android assets folder
# 3. Generates a release AAB (Android App Bundle)
# ============================================================

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================="
echo "  LottoZen Ultra - Build for Play Store"
echo "=========================================="
echo ""

# Step 1: Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "[1/4] Installing dependencies..."
    npm install
else
    echo "[1/4] Dependencies OK"
fi

# Step 2: Build web assets
echo "[2/4] Building web assets (Vite)..."
npm run build

# Step 3: Sync to Android
echo "[3/4] Syncing to Android assets..."
rm -rf android/app/src/main/assets/assets
rm -f android/app/src/main/assets/index.html
cp -r dist/* android/app/src/main/assets/

# Step 4: Build AAB
echo "[4/4] Building AAB (Android App Bundle)..."
cd android
./gradlew bundleRelease

AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
if [ -f "$AAB_PATH" ]; then
    echo ""
    echo "=========================================="
    echo "  BUILD SUCCESSFUL!"
    echo "=========================================="
    echo "  AAB file: $AAB_PATH"
    echo "  Size: $(du -h $AAB_PATH | cut -f1)"
    echo ""
    echo "  Next steps:"
    echo "  1. Sign the AAB with your keystore"
    echo "  2. Upload to Google Play Console"
    echo "=========================================="
else
    echo "ERROR: AAB not found at expected path"
    exit 1
fi
