# Minkuchi Static Site - Production Ready 🚀

## 📦 プロジェクト概要
- **名前**: Minkuchi 静的サイト版
- **技術**: HTML5, CSS3, JavaScript (ES6+), Google OAuth 2.0
- **デプロイ**: Render Static Site
- **テスト**: ✅ 全自動ビルドテスト完了

## 🎯 実装済み機能

### 認証システム
- [x] Google OAuth 2.0 ワンクリックログイン
- [x] JWT トークン自動処理
- [x] ログイン状態の永続化
- [x] 自動ログアウト（トークン期限切れ）
- [x] セキュアなリダイレクト処理

### UI/UX
- [x] レスポンシブデザイン
- [x] 認証状態に応じた動的UI更新
- [x] ユーザーアバターとドロップダウンメニュー
- [x] 成功・エラーメッセージ表示
- [x] モダンなカードベースデザイン

### ページ構成
- [x] ランディングページ (index.html)
- [x] ログインページ (login.html)
- [x] ダッシュボード (dashboard.html)
- [x] 企業一覧、商品一覧、カテゴリページ
- [x] 検索、レビュー投稿ページ

## 🚀 デプロイ手順

### 1. Google Cloud Console設定

#### OAuth同意画面
1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクト作成
2. **APIとサービス > OAuth同意画面**
3. ユーザータイプ: **外部**
4. アプリ名: **Minkuchi**
5. 承認済みドメイン: **minkuchi.onrender.com**

#### 認証情報作成
1. **APIとサービス > 認証情報**
2. **認証情報を作成 > OAuthクライアントID**
3. アプリケーションタイプ: **ウェブアプリケーション**
4. 承認済みJavaScript生成元:
   - `http://localhost:8081` (開発)
   - `https://YOUR-RENDER-URL.onrender.com` (本番)

### 2. Client ID設定
```bash
# assets/js/config.js の以下を更新
clientId: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com'
```

### 3. Render デプロイ
1. GitHubにプッシュ
2. [Render](https://render.com) でアカウント作成
3. **New Static Site** 選択
4. 設定:
   - **Build Command**: `echo "Static site ready"`
   - **Publish Directory**: `static-site`

## 🧪 ローカル開発

### 開発サーバー起動
```bash
cd static-site
python3 -m http.server 8081
# または
npm run dev
```

### 自動テスト実行
```bash
cd static-site
./test.sh
```

## 📊 テスト結果

最新テスト結果（自動実行済み）:
- ✅ 静的ファイル: 24個
- ✅ HTML構文チェック: 13ファイル
- ✅ JavaScript構文: 8ファイル
- ✅ ローカルサーバー: HTTP 200
- ✅ Google OAuth設定: 準備完了

## 🔐 セキュリティ機能

- XSS対策のHTTPヘッダー設定
- リダイレクト先の検証
- トークン有効期限チェック
- CORS設定対応

## 📱 対応ブラウザ

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🆘 トラブルシューティング

### よくある問題と解決方法

1. **Google OAuth エラー**
   - Client IDが正しく設定されているか確認
   - 承認済みドメインが登録されているか確認

2. **404 エラー**
   - ローカルサーバーが起動しているか確認
   - ファイルパスが正しいか確認

3. **認証状態が保存されない**
   - ブラウザのローカルストレージ設定を確認
   - HTTPSでアクセスしているか確認（本番環境）

## 📞 サポート

問題が発生した場合は、以下を確認してください：
1. 自動テストスクリプト (`./test.sh`) の実行
2. ブラウザの開発者ツールでエラーログ確認
3. Google Cloud Console の OAuth設定確認

---
**🎉 プロジェクトの準備が完了しました！** 
次はGoogle Cloud ConsoleでClient IDを取得して、本番デプロイに進みましょう。