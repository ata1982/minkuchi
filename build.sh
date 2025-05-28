#!/bin/bash

echo "🚀 Static site deployment starting..."

# 静的サイトファイルの確認
echo "📁 Checking static-site directory..."
ls -la static-site/

# ファイル数の確認
FILE_COUNT=$(find static-site -name "*.html" -o -name "*.js" -o -name "*.css" | wc -l)
echo "✅ Found $FILE_COUNT static files"

# index.htmlの存在確認
if [[ -f "static-site/index.html" ]]; then
    echo "✅ index.html found"
else
    echo "❌ index.html not found"
    exit 1
fi

echo "🎉 Static site ready for deployment!"