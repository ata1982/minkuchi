# Minkuchi - 企業・商品レビューサイト

地域の人々による本物の口コミで、信頼できるサービスを見つけるプラットフォーム

## 🌟 概要

Minkuchiは企業や商品に対するユーザーレビューを収集・表示する口コミプラットフォームです。将来的には他のレビューサイトやGoogleマップのレビューも統合する予定です。

## 🚀 技術スタック

- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript
- **認証**: Firebase Auth（Google OAuth）
- **データベース**: Firebase Firestore
- **ホスティング**: Render（静的サイト）
- **画像管理**: Firebase Storage

## 📁 プロジェクト構造

```
minkuchi/
├── static-site/
│   ├── index.html                 # トップページ
│   ├── styles.css                 # メインCSS
│   ├── companies.css              # 企業・商品・カテゴリページ用CSS
│   ├── script.js                  # メインJavaScript
│   │
│   ├── companies/
│   │   └── index.html            # 企業一覧ページ
│   │
│   ├── products/
│   │   └── index.html            # 商品一覧ページ
│   │
│   ├── categories/
│   │   └── index.html            # カテゴリ一覧ページ
│   │
│   ├── data/
│   │   ├── companies.json        # 企業データ
│   │   └── products.json         # 商品データ
│   │
│   └── assets/
│       └── js/
│           ├── auth.js           # Firebase認証機能
│           ├── companies.js      # 企業一覧機能
│           └── products.js       # 商品一覧機能
│
├── package.json
├── render-static.yaml             # Render設定ファイル
└── README.md
```

## ✨ 実装済み機能

- [x] **トップページ**: ヒーローセクション、特徴紹介、カテゴリ表示
- [x] **企業一覧ページ**: フィルタ、検索、ソート、ページネーション機能
- [x] **商品一覧ページ**: カテゴリ・価格フィルタ、検索、ソート機能
- [x] **カテゴリ一覧ページ**: 企業・商品カテゴリの一覧表示
- [x] **Firebase認証**: Google OAuthによるログイン・ログアウト
- [x] **レスポンシブデザイン**: モバイル対応
- [x] **通知システム**: ユーザーアクション時の通知表示

## 🔮 今後の実装予定

- [ ] 企業・商品詳細ページ
- [ ] レビュー投稿・編集機能
- [ ] ユーザープロフィールページ
- [ ] 検索結果ページ
- [ ] レビューの「参考になった」機能
- [ ] GoogleマップAPI連携
- [ ] 他口コミサイトAPI連携

## 🛠️ セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd minkuchi
```

### 2. Firebase設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成
2. Authentication > Sign-in method で Google を有効化
3. Firestore Database を作成
4. プロジェクト設定 > 全般 > マイアプリ で Web アプリを追加
5. 設定オブジェクトを `static-site/assets/js/auth.js` に追加

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 3. ローカル開発

```bash
# Live Server拡張を使用（VS Code）
# または任意のローカルサーバーで static-site/ ディレクトリを配信
```

### 4. Renderデプロイ

1. [Render](https://render.com/) でアカウント作成
2. New > Static Site を選択
3. GitHubリポジトリを連携
4. 設定:
   - **Build Command**: （空欄）
   - **Publish directory**: `static-site`

## 📊 データ構造

### 企業データ (companies.json)

```json
{
  "id": "company-id",
  "name": "企業名",
  "slug": "url-slug",
  "industry": "業界",
  "founded": 2015,
  "employees": "50-100名",
  "location": "東京都渋谷区",
  "description": "企業説明",
  "rating": 4.2,
  "reviewCount": 45,
  "ratings": {
    "workEnvironment": 4.0,
    "compensation": 3.8,
    "management": 4.5,
    "growth": 4.3
  }
}
```

### 商品データ (products.json)

```json
{
  "id": "product-id",
  "name": "商品名",
  "slug": "url-slug",
  "manufacturer": "メーカー名",
  "category": "カテゴリ",
  "price": 89800,
  "description": "商品説明",
  "rating": 4.5,
  "reviewCount": 234,
  "ratings": {
    "overall": 4.5,
    "quality": 4.6,
    "value": 4.1,
    "design": 4.7
  }
}
```

## 🎨 デザインシステム

### カラーパレット

- **プライマリ**: #2563eb
- **セカンダリ**: #6b7280
- **成功**: #10b981
- **警告**: #f59e0b
- **エラー**: #ef4444

### タイポグラフィ

- **フォント**: Noto Sans JP
- **ウェイト**: 400 (Regular), 500 (Medium), 600 (Semi Bold), 700 (Bold)

## 🔒 セキュリティ

- Firebase Authによる認証
- Firestore Security Rulesによるデータ保護
- XSS対策
- CSRF対策

## 📱 レスポンシブ対応

- **デスクトップ**: 1200px以上
- **タブレット**: 768px - 1199px
- **モバイル**: 767px以下

## 🧪 ブラウザサポート

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

1. フォークしてください
2. フィーチャーブランチを作成してください (`git checkout -b feature/AmazingFeature`)
3. 変更をコミットしてください (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュしてください (`git push origin feature/AmazingFeature`)
5. プルリクエストを開いてください

## 📞 サポート

質問や問題がある場合は、[Issues](https://github.com/your-username/minkuchi/issues) を作成してください。

---

© 2025 Minkuchi. All rights reserved.