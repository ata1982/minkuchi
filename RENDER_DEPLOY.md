# Minkuchi - Render デプロイマニュアル

## 🚀 クイックデプロイガイド

### 前提条件
- GitHub アカウント
- Render アカウント
- 各種APIキー（OpenAI、ElevenLabs等）

### 1. データベース作成

1. [Render Dashboard](https://dashboard.render.com) にログイン
2. "New +" → "PostgreSQL" を選択
3. 設定：
   - **Name**: `minkuchi-db`
   - **Database**: `minkuchi`
   - **User**: `minkuchi_user`
   - **Region**: `Singapore`
   - **Plan**: `Free` (開発用) / `Starter` (本番用)

4. 作成後、**Internal Database URL** をコピーして保存

### 2. Web Service作成

1. "New +" → "Web Service" を選択
2. GitHubリポジトリを接続
3. 基本設定：
   ```
   Name: minkuchi
   Region: Singapore
   Branch: main
   Runtime: Node
   Build Command: npm install --ignore-scripts && npx prisma generate && npm run build
   Start Command: npm start
   ```

### 3. 環境変数設定

以下の環境変数を設定：

#### 必須設定
```bash
NODE_ENV=production
PORT=10000
DATABASE_URL=[Step1で取得したInternal Database URL]
NEXTAUTH_SECRET=[32文字のランダム文字列]
NEXTAUTH_URL=https://your-app.onrender.com
```

#### APIキー（プロジェクトで使用している場合）
```bash
OPENAI_API_KEY=your-openai-key
ELEVENLABS_API_KEY=your-elevenlabs-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. GitHub Secrets設定

GitHub リポジトリ → Settings → Secrets and variables → Actions

以下のSecretsを追加：
```bash
RENDER_DEPLOY_HOOK_URL=[Render Deploy Hook URL]
HEALTH_CHECK_URL=https://your-app.onrender.com/api/health
```

Deploy Hook URLの取得方法：
1. Render Web Service → Settings → Deploy Hook
2. URLをコピー

## 🔧 トラブルシューティング

### よくある問題

#### 1. ビルドエラー
```bash
# 解決策
Build Command: npm install --ignore-scripts && npx prisma generate && npm run build
```

#### 2. データベース接続エラー
- **Internal Database URL** を使用していることを確認
- 環境変数名が `DATABASE_URL` であることを確認

#### 3. 起動エラー
```bash
# 確認事項
- PORT=10000 が設定されているか
- NEXTAUTH_SECRET が設定されているか
- Start Command が npm start になっているか
```

### デバッグコマンド

ローカル環境での確認：
```bash
# 依存関係のインストール
npm ci

# Prisma Client生成
npx prisma generate

# 型チェック
npm run type-check

# リント確認
npm run lint

# ビルドテスト
npm run build

# 本番環境シミュレーション
NODE_ENV=production npm start
```

## 📊 監視とメンテナンス

### ヘルスチェック
アプリケーションの状態確認：
```
GET https://your-app.onrender.com/api/health
```

レスポンス例：
```json
{
  "status": "ok",
  "timestamp": "2025-05-25T12:00:00.000Z",
  "database": "connected",
  "environment": "production",
  "uptime": 3600,
  "version": "1.0.0"
}
```

### ログ監視
1. Render Dashboard → サービス → Logs
2. GitHub Actions → Actions タブでビルド状況確認

### パフォーマンス最適化
- Bundle Analyzer実行: `npm run analyze`
- Response Time監視
- Database接続数確認

## 🔄 デプロイフロー

### 自動デプロイ
1. コード変更をプッシュ: `git push origin main`
2. GitHub Actionsが自動実行：
   - TypeScript型チェック
   - ESLint実行
   - テスト実行
   - ビルド確認
   - Renderデプロイトリガー
   - デプロイ検証

### 手動デプロイ
1. GitHub → Actions → "Deploy to Render"
2. "Run workflow" をクリック

## 🚨 緊急時対応

### ロールバック手順
1. Render Dashboard → Deploys
2. 前のデプロイを選択 → "Redeploy"

### 緊急停止
1. Render Dashboard → Settings
2. "Suspend Service" をクリック

## 📈 スケーリング

### 無料プランの制限
- 750時間/月
- 512MB RAM
- 一定時間後スリープ

### 有料プランへの移行
1. Settings → Plan
2. "Starter" または "Standard" を選択
3. 24/7運用、より多いメモリ

## 🎯 チェックリスト

### デプロイ前
- [ ] GitHub リポジトリが最新
- [ ] 環境変数設定完了
- [ ] Build Command確認
- [ ] GitHub Secrets設定

### デプロイ後
- [ ] サイト正常表示
- [ ] ヘルスチェック成功
- [ ] データベース接続確認
- [ ] GitHub Actions動作確認