# Minkuchi Static Site - Render Deployment Guide

## 🚀 Render デプロイ手順

このプロジェクトは **静的サイト** として設計されています。

### 1. Render でのサービス作成

1. [Render Dashboard](https://dashboard.render.com/) にアクセス
2. **New Static Site** を選択
3. GitHubリポジトリを接続

### 2. デプロイ設定

#### 必須設定:
- **Name**: `minkuchi-static`
- **Build Command**: `echo "Static site ready"`
- **Publish Directory**: `static-site`
- **Auto-Deploy**: Yes

#### 環境変数 (必要に応じて):
なし（静的サイトのため）

### 3. カスタムドメイン (オプション)
- `minkuchi.onrender.com`

### 4. デプロイ後の確認

✅ デプロイ成功後、以下URLで確認:
- メインページ: `https://your-site.onrender.com/`
- ログインページ: `https://your-site.onrender.com/login.html`
- ダッシュボード: `https://your-site.onrender.com/dashboard.html`

## ⚠️ 重要な注意事項

- このプロジェクトは **静的サイト** です
- Next.jsプロジェクトではありません
- `static-site` フォルダのみがデプロイされます

## 🔧 トラブルシューティング

### "No pages or app directory" エラーが発生した場合:
1. **Build Command** を確認: `echo "Static site ready"`
2. **Publish Directory** を確認: `static-site`
3. サービスタイプが **Static Site** であることを確認

### Google OAuth設定:
デプロイ後、`static-site/assets/js/config.js` でClient IDを更新してください。