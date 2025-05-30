# 🌟 Minkuchi - AI支援レビュープラットフォーム

> 次世代のAI駆動型地域サービス・企業・商品包括レビュープラットフォーム

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)](https://www.prisma.io/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green)](https://web.dev/progressive-web-apps/)

## 📋 目次

- [✨ 機能概要](#-機能概要)
- [🚀 主要機能](#-主要機能)
- [🛠️ 技術スタック](#️-技術スタック)
- [📦 インストール](#-インストール)
- [🔧 開発環境のセットアップ](#-開発環境のセットアップ)
- [🏗️ プロジェクト構造](#️-プロジェクト構造)
- [🎯 使用方法](#-使用方法)
- [🔐 環境変数](#-環境変数)
- [📱 PWA対応](#-pwa対応)
- [🌍 多言語対応](#-多言語対応)
- [🤖 AI機能](#-ai機能)
- [📊 分析機能](#-分析機能)
- [🔄 リアルタイム機能](#-リアルタイム機能)
- [🧪 テスト](#-テスト)
- [🚀 デプロイメント](#-デプロイメント)
- [📈 パフォーマンス](#-パフォーマンス)
- [🤝 コントリビューション](#-コントリビューション)
- [📄 ライセンス](#-ライセンス)

## ✨ 機能概要

**Minkuchi**は、AI技術を活用した次世代のレビュープラットフォームです。地域のサービス、企業、商品に関する包括的なレビューシステムを提供し、ユーザーと企業の両方にとって価値のある情報交換の場を創造します。

### 🎯 主要な価値提案

- **AI支援レビュー**: 感情分析と自動分類による質の高いレビュー体験
- **企業向け分析**: 高度なダッシュボードによるビジネスインサイト
- **リアルタイム通知**: WebSocketベースのリアルタイム更新
- **多言語対応**: 日本語、英語、韓国語、中国語に対応
- **PWA対応**: オフライン機能付きのモバイルアプリ体験

## 🚀 主要機能

### 🔍 レビューシステム
- **感情分析付きレビュー**: AIによる感情スコア算出
- **自動カテゴリ分類**: レビュー内容の自動分類
- **画像アップロード**: 複数画像対応のレビュー投稿
- **評価システム**: 5段階評価 + 詳細項目評価

### 🏢 企業機能
- **AI支援企業登録**: 自動情報補完による簡単登録
- **分析ダッシュボード**: リアルタイム統計とグラフ
- **レビュー管理**: レビューへの返信と管理機能
- **業績追跡**: 時系列での評価変動追跡

### 🤖 AI機能
- **AIコンシェルジュ**: 多言語対応のチャットボット
- **自動レビュー収集**: Web スクレイピングによる情報収集
- **感情分析**: 高精度な感情認識システム
- **推薦エンジン**: パーソナライズされた企業推薦

### 📱 ユーザー体験
- **レスポンシブデザイン**: モバイルファースト設計
- **ダークモード**: システム設定連動
- **高速検索**: エラスティック検索対応
- **ソーシャル認証**: Google、Apple、LINE ログイン

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 15**: React フレームワーク
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: ユーティリティファーストCSS
- **Framer Motion**: アニメーション
- **React Query**: データフェッチング
- **Zustand**: 状態管理

### バックエンド
- **Next.js API Routes**: サーバーサイド API
- **Prisma**: データベース ORM
- **SQLite/PostgreSQL**: データベース
- **NextAuth.js**: 認証システム
- **Socket.io**: リアルタイム通信

### AI・ML
- **OpenAI GPT**: 自然言語処理
- **Google Gemini**: マルチモーダル AI
- **Grok AI**: 高速推論
- **TensorFlow.js**: クライアントサイドML

### インフラ・ツール
- **Vercel**: ホスティング・デプロイ
- **Docker**: コンテナ化
- **GitHub Actions**: CI/CD
- **Sentry**: エラー監視
- **Cloudflare**: CDN・セキュリティ

## 📦 インストール

### 前提条件

- **Node.js** 18.0.0 以上
- **npm** または **yarn** または **pnpm**
- **Git**

### クローンとインストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/minkuchi.git
cd minkuchi

# 依存関係をインストール
npm install
# または
yarn install
# または
pnpm install
```

## 🔧 開発環境のセットアップ

### 1. 環境変数の設定

```bash
# .env.local ファイルを作成
cp .env.example .env.local
```

### 2. データベースの初期化

```bash
# Prisma データベースの設定
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 3. 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev
# または
yarn dev
# または
pnpm dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で確認できます。

## 🏗️ プロジェクト構造

```
minkuchi/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # グローバルスタイル
│   │   ├── layout.tsx      # ルートレイアウト
│   │   ├── page.tsx        # ホームページ
│   │   ├── admin/          # 管理者機能
│   │   ├── api/            # API ルート
│   │   ├── auth/           # 認証ページ
│   │   ├── companies/      # 企業ページ
│   │   ├── dashboard/      # ダッシュボード
│   │   └── search/         # 検索機能
│   ├── components/         # Reactコンポーネント
│   │   ├── ui/            # 基本UIコンポーネント
│   │   ├── layout/        # レイアウトコンポーネント
│   │   ├── dashboard/     # ダッシュボード用
│   │   └── admin/         # 管理者用
│   ├── contexts/          # React Context
│   ├── lib/              # ユーティリティ
│   │   ├── ai/           # AI関連機能
│   │   ├── services/     # ビジネスロジック
│   │   ├── auth.ts       # 認証設定
│   │   ├── prisma.ts     # Prisma クライアント
│   │   └── utils.ts      # 共通ユーティリティ
│   └── types/            # TypeScript型定義
├── prisma/               # データベーススキーマ
├── public/               # 静的ファイル
│   ├── icons/           # PWAアイコン
│   ├── manifest.json    # PWAマニフェスト
│   ├── sw.js           # Service Worker
│   └── offline.html    # オフラインページ
├── docs/                # ドキュメント
├── tests/               # テストファイル
└── package.json         # プロジェクト設定
```

## 🎯 使用方法

### ユーザー向け機能

#### 1. アカウント作成・ログイン
```typescript
// ソーシャルログイン
import { signIn } from 'next-auth/react'

const handleGoogleLogin = () => {
  signIn('google', { callbackUrl: '/dashboard' })
}
```

#### 2. レビュー投稿
```typescript
// レビューフォームの使用
import { ReviewForm } from '@/components/ReviewForm'

<ReviewForm 
  companyId="company-id"
  onSubmit={handleReviewSubmit}
  enableAI={true}
/>
```

#### 3. AIコンシェルジュ
```typescript
// AIチャット機能
import { AIConciergeChat } from '@/components/AIConciergeChat'

<AIConciergeChat 
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
/>
```

### 企業向け機能

#### 1. 企業登録
```typescript
// AI支援企業登録
import { AICompanyRegistrationForm } from '@/components/AICompanyRegistrationForm'

<AICompanyRegistrationForm onComplete={handleRegistration} />
```

#### 2. 分析ダッシュボード
```typescript
// 高度な分析表示
import { AdvancedAnalyticsDashboard } from '@/components/dashboard/AdvancedAnalyticsDashboard'

<AdvancedAnalyticsDashboard companyId={companyId} />
```

## 🔐 環境変数

### 必須環境変数

```bash
# データベース
DATABASE_URL="postgresql://username:password@localhost:5432/minkuchi"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth プロバイダー
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI API
OPENAI_API_KEY="your-openai-api-key"
GEMINI_API_KEY="your-gemini-api-key"
GROK_API_KEY="your-grok-api-key"

# その他
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

### オプション環境変数

```bash
# アナリティクス
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
SENTRY_DSN="your-sentry-dsn"

# 外部サービス
MAPBOX_TOKEN="your-mapbox-token"
CLOUDFLARE_API_TOKEN="your-cloudflare-token"
```

## 📱 PWA対応

### Service Worker機能

- **オフライン対応**: キャッシュによるオフライン閲覧
- **プッシュ通知**: リアルタイム通知配信
- **バックグラウンド同期**: オフライン時のデータ同期
- **アプリのような体験**: ホーム画面への追加対応

### PWAの有効化

```javascript
// Service Worker 登録（自動実行）
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// プッシュ通知の許可
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: 'your-vapid-key'
})
```

## 🌍 多言語対応

### サポート言語

- 🇯🇵 **日本語** (ja) - メイン言語
- 🇺🇸 **英語** (en)
- 🇰🇷 **韓国語** (ko)
- 🇨🇳 **中国語** (zh)

### 使用方法

```typescript
// 多言語AIレスポンス
const response = await aiService.generateMultilingualResponse(
  message, 
  'en' // 言語コード
)

// 言語切り替え
const { locale, setLocale } = useLocale()
setLocale('ko')
```

## 🤖 AI機能

### 1. 感情分析エンジン

```typescript
import { AIReviewAnalysisService } from '@/lib/services/ai-review-analysis-service'

const analysisService = new AIReviewAnalysisService()
const analysis = await analysisService.analyzeReview(reviewText)

// 結果
{
  sentiment: 'positive' | 'negative' | 'neutral',
  score: 0.85,
  emotions: ['joy', 'satisfaction'],
  categories: ['service', 'quality'],
  keywords: ['excellent', 'fast', 'friendly']
}
```

### 2. 企業推薦システム

```typescript
const recommendations = await aiService.getPersonalizedRecommendations({
  userId: 'user-id',
  location: { lat: 35.6762, lng: 139.6503 },
  preferences: ['restaurant', 'cafe'],
  budget: 3000
})
```

### 3. 自動レビュー収集

```typescript
const scraper = new RealReviewScraperService()
const reviews = await scraper.collectReviews({
  companyName: '株式会社サンプル',
  platforms: ['google', 'yelp', 'tabelog']
})
```

## 📊 分析機能

### 企業向けダッシュボード

- **リアルタイム統計**: 最新のレビュー状況
- **感情分析グラフ**: 時系列での感情変動
- **競合比較**: 同業他社との比較分析
- **キーワード分析**: 頻出キーワードとトレンド
- **地域分析**: エリア別の評価分布

### カスタムメトリクス

```typescript
// カスタム分析の実装
const metrics = await analytics.getCustomMetrics({
  companyId,
  dateRange: { from: '2024-01-01', to: '2024-12-31' },
  metrics: ['sentiment_trend', 'category_breakdown', 'competitor_analysis']
})
```

## 🔄 リアルタイム機能

### WebSocket通信

```typescript
// リアルタイム通知の受信
import { useSocket } from '@/contexts/SocketContext'

const { socket, isConnected } = useSocket()

useEffect(() => {
  socket?.on('new_review', (review) => {
    setReviews(prev => [review, ...prev])
    showNotification('新しいレビューが投稿されました')
  })
  
  return () => socket?.off('new_review')
}, [socket])
```

### 通知システム

- **リアルタイム通知**: WebSocketベースの即座通知
- **プッシュ通知**: PWA対応のブラウザ通知
- **メール通知**: 重要な更新のメール配信
- **企業向け通知**: 新しいレビューやメンション

## 🧪 テスト

### テスト環境の準備

```bash
# テスト用データベース
npx prisma db push --force-reset
npx prisma db seed

# テスト実行
npm run test
npm run test:watch
npm run test:coverage
```

### テストの種類

- **ユニットテスト**: Jest + React Testing Library
- **統合テスト**: API エンドポイントのテスト
- **E2Eテスト**: Playwright による自動テスト
- **パフォーマンステスト**: Lighthouse CI

## 🚀 デプロイメント

### Vercel デプロイ (推奨)

```bash
# Vercel CLI インストール
npm i -g vercel

# デプロイ実行
vercel

# 本番環境設定
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
```

### Docker デプロイ

```bash
# Docker イメージビルド
docker build -t minkuchi .

# コンテナ実行
docker run -p 3000:3000 minkuchi
```

### 環境別設定

```bash
# 開発環境
npm run dev

# ステージング環境
npm run build
npm run start

# 本番環境
npm run build
npm run start:prod
```

## 📈 パフォーマンス

### 最適化機能

- **画像最適化**: Next.js Image コンポーネント
- **コード分割**: 動的インポートによる最適化
- **キャッシング**: Redis による高速化
- **CDN**: Cloudflare による配信最適化
- **Service Worker**: キャッシュによる高速化

### パフォーマンス指標

- **Lighthouse Score**: 95+ 目標
- **Core Web Vitals**: 全て Green 維持
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

### 開発フロー

1. **Fork** このリポジトリ
2. **Feature ブランチ**を作成 (`git checkout -b feature/amazing-feature`)
3. **変更をコミット** (`git commit -m 'Add some amazing feature'`)
4. **ブランチにプッシュ** (`git push origin feature/amazing-feature`)
5. **Pull Request** を作成

### コーディング規約

- **TypeScript**: 厳密な型付けを実施
- **ESLint**: 設定済みルールに従う
- **Prettier**: 自動フォーマット適用
- **コミットメッセージ**: Conventional Commits 準拠

### 課題報告

バグレポートや機能リクエストは [Issues](https://github.com/your-username/minkuchi/issues) で受け付けています。

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

---

## 🙏 謝辞

- **Next.js チーム**: 素晴らしいフレームワークの提供
- **Vercel**: 優れたホスティングプラットフォーム
- **OpenAI**: AI機能の基盤技術
- **コミュニティ**: フィードバックと貢献

---

## 📞 サポート

- **ドキュメント**: [docs.minkuchi.jp](https://docs.minkuchi.jp)
- **コミュニティ**: [Discord](https://discord.gg/minkuchi)
- **サポート**: [support@minkuchi.jp](mailto:support@minkuchi.jp)
- **X (Twitter)**: [@minkuchi_jp](https://twitter.com/minkuchi_jp)

---

<div align="center">

**🌟 Minkuchi で、レビューの未来を創造しましょう！ 🌟**

[ウェブサイト](https://minkuchi.jp) • [ドキュメント](https://docs.minkuchi.jp) • [API リファレンス](https://api.minkuchi.jp)

</div>