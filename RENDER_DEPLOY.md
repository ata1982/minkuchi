# Minkuchi - Render 自動デプロイマニュアル（完全版）

## 🚀 Next.js動的サイト → Render自動デプロイ 完全ガイド

このマニュアルでは、minkuchiプロジェクトをRenderで本番運用し、GitHub Actionsで自動デプロイを実現する手順を説明します。

---

## 📋 事前準備

### 対象プロジェクト
- ✅ Next.js 14.2.3 (App Router)
- ✅ TypeScript + Prisma + PostgreSQL  
- ✅ NextAuth.js (Google OAuth)
- ✅ Node.js 18以上
- ✅ GitHub リポジトリ

### 必要なアカウント
- [x] GitHub アカウント
- [ ] Render アカウント（無料プランでも可）
- [x] Google Cloud Console（OAuth用）
- [ ] 各種APIキー（OpenAI、ElevenLabs等）

---

## 🗃️ STEP 1: Renderデータベース作成

### 1-1. PostgreSQLデータベース作成
1. [Render Dashboard](https://dashboard.render.com) にログイン
2. **「New +」** → **「PostgreSQL」** を選択
3. 基本設定：
   ```
   Name: minkuchi-db
   Database: minkuchi_db  
   Username: minkuchi_user
   Region: Singapore (日本の場合)
   Plan: Free (開発用) / Starter (本番用)
   ```
4. **「Create Database」** をクリック

### 1-2. データベース接続情報の取得
作成完了後、以下の情報をメモ：
```
✅ 取得済み例：
Internal Database URL: postgresql://minkuchi_user:zauMsX2euIH4gw7If4s9MA33PrXCZ2Fc@dpg-d0ptfqmmcj7s73egvh20-a/minkuchi_db
External Database URL: postgresql://minkuchi_user:zauMsX2euIH4gw7If4s9MA33PrXCZ2Fc@dpg-d0ptfqmmcj7s73egvh20-a.singapore-postgres.render.com/minkuchi_db
```

---

## 🚀 STEP 2: Render Web Service作成

### 2-1. Web Service設定
1. **「New +」** → **「Web Service」** を選択
2. **「Build and deploy from a Git repository」** を選択
3. GitHub連携を許可
4. **minkuchi** リポジトリを選択

### 2-2. 基本設定
```bash
Name: minkuchi
Region: Singapore (データベースと同じリージョン)
Branch: main
Runtime: Node
```

### 2-3. ビルド・起動設定
```bash
Build Command:
npm install --ignore-scripts && npx prisma generate && npx prisma migrate deploy && npm run build

Start Command:
npm start

Instance Type: Free (開発用) / Starter (本番用)
```

⚠️ **重要**: `--ignore-scripts` でHuskyエラーを回避

---

## ⚙️ STEP 3: Render環境変数設定

### 3-1. 必須環境変数
**Environment Variables** セクションで以下を設定：

```bash
# 基本設定
PORT=10000
NODE_ENV=production
CI=true

# データベース設定
DATABASE_URL=postgresql://[username]:[password]@[hostname]/[database]

# NextAuth.js設定
NEXTAUTH_SECRET=[your-generated-secret-key]
AUTH_SECRET=[your-generated-secret-key]
NEXTAUTH_URL=https://minkuchi.onrender.com
AUTH_TRUST_HOST=minkuchi.onrender.com

# Google OAuth設定
GOOGLE_CLIENT_ID=[your-google-client-id].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-[your-google-client-secret]
```

### 3-2. プロジェクト固有の環境変数
必要に応じて追加：
```bash
# AI API設定
OPENAI_API_KEY=sk-your-openai-key
ELEVENLABS_API_KEY=your-elevenlabs-key
GEMINI_API_KEY=your-gemini-key
```

### 3-3. 初回デプロイ実行
**「Deploy Web Service」** をクリックしてデプロイ開始

---

## 🔄 STEP 4: GitHub Actions自動デプロイ設定

### 4-1. Render情報取得

#### Deploy Hook URL取得
1. Render Dashboard → minkuchi service → **Settings** → **Deploy Hook**
2. URLをコピー：
   ```
   例: https://api.render.com/deploy/srv-d0pf1v6uk2gs739imbl0?key=Msy0EkzTTyk
   ```

#### Service ID取得
ブラウザURL から `srv-xxxxxxxxxxxxxxxxxx` 部分をコピー：
```
例: srv-d0pf1v6uk2gs739imbl0
```

#### API Key取得
1. Render Dashboard → **Account Settings** → **API Keys**
2. **「Create API Key」** → キーをコピー

### 4-2. GitHub Secrets設定
1. GitHub リポジトリ → **Settings** → **Secrets and variables** → **Actions**
2. **「New repository secret」** で以下のSecretsを追加：

```bash
# Render設定
RENDER_DEPLOY_HOOK_URL = https://api.render.com/deploy/srv-[service-id]?key=[deploy-key]
RENDER_SERVICE_ID = srv-[service-id]
RENDER_API_KEY = rnd_[api-key]

# データベース・認証
DATABASE_URL = postgresql://[username]:[password]@[hostname]/[database]
NEXTAUTH_SECRET = [your-generated-secret-key]
NEXTAUTH_URL = https://minkuchi.onrender.com

# Google OAuth
GOOGLE_CLIENT_ID = [your-google-client-id].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = GOCSPX-[your-google-client-secret]

# ヘルスチェック
HEALTH_CHECK_URL = https://minkuchi.onrender.com/api/health
```

### 4-3. GitHub Actionsワークフロー
✅ **作成済み**: `.github/workflows/deploy.yml`

ワークフローの機能：
- **テスト実行**: TypeScript型チェック、ESLint、ビルドテスト
- **自動デプロイ**: mainブランチプッシュ時にRenderデプロイ
- **デプロイ検証**: ヘルスチェックで動作確認

---

## 🔧 STEP 5: トラブルシューティング

### 5-1. 一般的なエラーと解決法

#### ❌ Huskyエラー
```
sh: 1: husky: not found
```
**解決**: Build Command に `--ignore-scripts` を追加済み ✅

#### ❌ ポートエラー  
```
PORT is not a non-negative number
```
**解決**: 環境変数を個別に設定（1つの変数に複数設定しない）

#### ❌ データベース接続エラー
```
Can't reach database server
```
**解決**: DATABASE_URLの形式確認
```
postgresql://username:password@hostname:port/database
```

#### ❌ Bundle Analyzerエラー
```
Cannot find module '@next/bundle-analyzer'
```
**解決済み**: `next.config.js`で条件分岐により解決 ✅

### 5-2. ログ確認方法
- Render Dashboard → minkuchi → **Logs** タブ
- **Live tail** でリアルタイム監視  
- エラー時は **All logs** で詳細確認

---

## 📊 STEP 6: 運用とメンテナンス

### 6-1. 自動デプロイフロー
```
1. ローカル開発 → コード変更
2. Git Push → git push origin main  
3. GitHub Actions → 自動テスト・ビルド
4. Render Deploy → 本番環境更新
5. ヘルスチェック → 動作確認
```

### 6-2. 監視ポイント
- **Render Logs**: エラー・パフォーマンス監視
- **GitHub Actions**: ビルド成功率確認
- **Database Usage**: ストレージ・接続数監視
- **Response Time**: サイト速度測定

### 6-3. スケーリング

#### 無料プランの制限
- 750時間/月のサーバー稼働時間
- 512MB RAM
- 一定時間後の自動スリープ

#### 有料プランへの移行タイミング
- 24/7運用が必要
- メモリ不足エラー頻発
- パフォーマンス向上が必要

---

## 🎯 STEP 7: デプロイ完了チェックリスト

### ✅ 事前準備
- [x] GitHubリポジトリが最新
- [x] package.jsonに必要スクリプト存在
- [x] Prisma設定完了
- [x] Google OAuth実装完了

### ✅ Render設定
- [x] PostgreSQLデータベース作成完了
- [x] Internal Database URL取得
- [x] Web Service作成完了
- [x] Build/Start Command設定
- [x] 全環境変数設定完了

### ✅ GitHub Actions設定
- [x] GitHub Secrets設定完了
- [x] ワークフローファイル作成
- [ ] テスト・ビルドが成功
- [ ] 自動デプロイが動作

### ✅ デプロイ後確認
- [ ] サイトが正常表示（https://minkuchi.onrender.com）
- [ ] ヘルスチェックAPI動作（/api/health）
- [ ] データベース接続確認
- [ ] Googleログイン動作確認
- [ ] 既存Credentialsログイン動作確認

---

## 🆘 よくある問題と解決法

### Q: ビルドは成功するが起動に失敗
**A**: 環境変数の設定ミス。DATABASE_URLとポート設定を確認

### Q: GitHub Actionsが動かない  
**A**: Secretsの名前とワークフローファイルの記述が一致しているか確認

### Q: データベース接続エラー
**A**: Internal Database URLを使用。External URLは開発用のみ

### Q: Google OAuth「redirect_uri_mismatch」エラー
**A**: Google Cloud ConsoleのリダイレクトURIを確認
```
正しい設定: https://minkuchi.onrender.com/api/auth/callback/google
```

### Q: 無料プランでスリープしてしまう
**A**: 有料プランに移行、または外部監視サービスでping送信

---

## 🔗 関連リンク

- [Render Dashboard](https://dashboard.render.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

## 🎉 まとめ

このマニュアルに従えば、minkuchiプロジェクトをRenderで本番運用し、GitHub Actionsで自動デプロイを実現できます。

### 成功のポイント:
1. **段階的な設定** - データベース → Webサービス → 自動化
2. **エラー対応** - ログを確認して適切に対処  
3. **継続的監視** - 運用開始後も定期的なメンテナンス

他のNext.jsプロジェクトでも同様の手順で導入可能です！