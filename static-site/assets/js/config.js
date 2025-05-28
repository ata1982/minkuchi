// アプリケーション設定
const APP_CONFIG = {
  // Google OAuth設定
  google: {
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // 実際のクライアントIDに置き換え
    scopes: ['email', 'profile']
  },
  
  // 環境設定
  environment: {
    development: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    production: window.location.hostname.includes('onrender.com')
  },
  
  // URLパス
  redirectPaths: {
    afterLogin: '/dashboard.html',
    afterLogout: '/login.html',
    requireAuth: ['/dashboard.html', '/profile.html', '/review/index.html']
  },
  
  // ローカルストレージキー
  storageKeys: {
    user: 'minkuchi_user',
    token: 'minkuchi_token',
    preferences: 'minkuchi_preferences'
  }
};

// グローバルに公開
window.APP_CONFIG = APP_CONFIG;