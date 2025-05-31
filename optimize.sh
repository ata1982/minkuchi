#!/bin/bash

# Minkuchi Performance Optimization Script
echo "⚡ Optimizing Minkuchi for Production"
echo "===================================="

# Clean caches
echo "🧹 Cleaning caches..."
rm -rf .next
rm -rf node_modules/.cache
npm cache clean --force

# Reinstall dependencies for fresh start
echo "📦 Reinstalling dependencies..."
rm -rf node_modules
npm install

# Run build with optimizations
echo "🔨 Building optimized production version..."
NODE_ENV=production npm run build

# Run type checking
echo "🔍 Running type checks..."
npx tsc --noEmit

echo ""
echo "✨ Optimization completed!"
echo "📊 Build statistics:"
ls -la .next/static/ | head -10
echo ""
echo "🚀 Ready for deployment!"