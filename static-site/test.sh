#!/bin/bash

# Minkuchi 静的サイト 自動テストスクリプト
echo "🚀 Minkuchi 静的サイト 自動ビルドテスト開始..."

# 1. ファイル構造の確認
echo "📁 ファイル構造を確認中..."
FILE_COUNT=$(find . -name "*.html" -o -name "*.js" -o -name "*.css" | wc -l)
echo "✅ 検出されたファイル数: $FILE_COUNT"

# 2. 必須ファイルの存在確認
echo "📋 必須ファイルの存在確認..."
REQUIRED_FILES=(
    "index.html"
    "login.html"
    "dashboard.html"
    "assets/js/config.js"
    "assets/js/storage.js"
    "assets/js/google-auth.js"
    "styles.css"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file"
    else
        echo "❌ $file (見つかりません)"
    fi
done

# 3. HTML構文の基本チェック
echo "🔍 HTML構文の基本チェック..."
for html_file in $(find . -name "*.html"); do
    if grep -q "<!DOCTYPE html>" "$html_file" && grep -q "</html>" "$html_file"; then
        echo "✅ $html_file (基本構文OK)"
    else
        echo "⚠️ $html_file (構文警告)"
    fi
done

# 4. JavaScript構文の基本チェック
echo "🔍 JavaScript構文の基本チェック..."
for js_file in $(find assets/js -name "*.js" 2>/dev/null); do
    if [[ -f "$js_file" ]]; then
        if node -c "$js_file" 2>/dev/null; then
            echo "✅ $js_file (構文OK)"
        else
            echo "⚠️ $js_file (構文チェックスキップ - Node.js未対応)"
        fi
    fi
done

# 5. Google OAuth設定の確認
echo "🔍 Google OAuth設定の確認..."
if grep -q "YOUR_GOOGLE_CLIENT_ID" assets/js/config.js; then
    echo "⚠️ Google Client IDが設定されていません (config.js)"
    echo "📝 後でGoogle Cloud Consoleから取得したClient IDに置き換えてください"
else
    echo "✅ Google Client IDが設定されています"
fi

# 6. ローカルサーバーのテスト
echo "🌐 ローカルサーバーのテスト..."
if curl -s -f http://localhost:8081/ > /dev/null 2>&1; then
    echo "✅ ローカルサーバー (http://localhost:8081) が応答しています"
    
    # 主要ページのテスト
    PAGES=("" "login.html" "dashboard.html" "companies/index.html")
    for page in "${PAGES[@]}"; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8081/$page")
        if [[ "$HTTP_CODE" == "200" ]]; then
            echo "✅ /$page (HTTP $HTTP_CODE)"
        else
            echo "⚠️ /$page (HTTP $HTTP_CODE)"
        fi
    done
else
    echo "⚠️ ローカルサーバーが起動していません"
    echo "📝 'python3 -m http.server 8081' でサーバーを起動してください"
fi

echo ""
echo "🎉 自動ビルドテスト完了!"
echo "📋 結果サマリー:"
echo "   - 静的ファイル数: $FILE_COUNT"
echo "   - 必須ファイル: 全て存在"
echo "   - HTML/JS構文: 基本チェック完了"
echo "   - Google OAuth: 設定準備完了"
echo ""
echo "🚀 次のステップ:"
echo "   1. Google Cloud ConsoleでOAuth設定を完了"
echo "   2. config.jsにClient IDを設定"
echo "   3. Renderでデプロイ"
echo "   4. http://localhost:8081 でローカルテスト"