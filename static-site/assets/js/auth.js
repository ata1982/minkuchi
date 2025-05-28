// Firebase認証機能

// Firebase設定（実際の設定値に置き換えてください）
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Firebase初期化
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    var auth = firebase.auth();
    var db = firebase.firestore();
} else {
    console.warn('Firebase SDKが読み込まれていません');
}

// Google認証プロバイダー
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

// ログイン処理
function signInWithGoogle() {
    if (!auth) {
        console.error('Firebase Auth が初期化されていません');
        return;
    }

    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log('ログイン成功:', user);
            
            // ユーザー情報をFirestoreに保存
            return saveUserToFirestore(user);
        })
        .then(() => {
            updateAuthUI();
            showNotification('ログインしました', 'success');
        })
        .catch((error) => {
            console.error('認証エラー:', error);
            
            let errorMessage = 'ログインに失敗しました。';
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = 'ログインがキャンセルされました。';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = 'ポップアップがブロックされました。ポップアップを許可してください。';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'ネットワークエラーが発生しました。';
                    break;
            }
            
            showNotification(errorMessage, 'error');
        });
}

// ログアウト処理
function signOut() {
    if (!auth) {
        console.error('Firebase Auth が初期化されていません');
        return;
    }

    auth.signOut().then(() => {
        console.log('ログアウト成功');
        updateAuthUI();
        showNotification('ログアウトしました', 'info');
    }).catch((error) => {
        console.error('ログアウトエラー:', error);
        showNotification('ログアウトに失敗しました', 'error');
    });
}

// ユーザー情報をFirestoreに保存
async function saveUserToFirestore(user) {
    if (!db) {
        console.error('Firestore が初期化されていません');
        return;
    }

    try {
        const userRef = db.collection('users').doc(user.uid);
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // 既存ユーザーかチェック
        const doc = await userRef.get();
        if (!doc.exists) {
            userData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            userData.reviewCount = 0;
        }

        await userRef.set(userData, { merge: true });
        console.log('ユーザー情報を保存しました');
    } catch (error) {
        console.error('ユーザー情報の保存に失敗:', error);
    }
}

// 認証状態の監視
if (auth) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('ログイン中:', user);
            updateAuthUI(user);
        } else {
            console.log('未ログイン');
            updateAuthUI();
        }
    });
}

// UI更新
function updateAuthUI(user = null) {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (!loginBtn || !userMenu) return;

    if (user) {
        // ログイン状態
        loginBtn.classList.add('hidden');
        userMenu.classList.remove('hidden');
        
        if (userName) {
            userName.textContent = user.displayName || user.email;
        }

        // ユーザーアバターがある場合は表示
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar && user.photoURL) {
            userAvatar.src = user.photoURL;
            userAvatar.style.display = 'block';
        }
    } else {
        // 未ログイン状態
        loginBtn.classList.remove('hidden');
        userMenu.classList.add('hidden');
        
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar) {
            userAvatar.style.display = 'none';
        }
    }
}

// 現在のユーザーを取得
function getCurrentUser() {
    return auth ? auth.currentUser : null;
}

// ユーザーがログインしているかチェック
function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

// ログイン必須ページのアクセス制御
function requireAuth() {
    if (!isUserLoggedIn()) {
        showNotification('この機能を利用するにはログインが必要です', 'warning');
        return false;
    }
    return true;
}

// 通知表示
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 通知要素を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;

    // ページに追加
    document.body.appendChild(notification);

    // 自動で削除
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    // ログインボタン
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', signInWithGoogle);
    }
    
    // ログアウトボタン
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', signOut);
    }

    // レビュー投稿ボタンなど、ログインが必要な機能
    const reviewButtons = document.querySelectorAll('.review-btn, .review-action');
    reviewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!requireAuth()) {
                e.preventDefault();
            }
        });
    });
});

// ユーザープロフィール取得
async function getUserProfile(userId) {
    if (!db) return null;

    try {
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        }
        return null;
    } catch (error) {
        console.error('ユーザープロフィールの取得に失敗:', error);
        return null;
    }
}

// ユーザーのレビュー数更新
async function updateUserReviewCount(userId, increment = 1) {
    if (!db) return;

    try {
        const userRef = db.collection('users').doc(userId);
        await userRef.update({
            reviewCount: firebase.firestore.FieldValue.increment(increment),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('レビュー数の更新に失敗:', error);
    }
}

// AuthManagerクラス
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.isInitialized = false;
    this.init();
  }

  // 初期化
  async init() {
    try {
      // Google Sign-In初期化を待つ
      await this.waitForGoogleAPI();
      
      // Google Sign-In設定
      google.accounts.id.initialize({
        client_id: APP_CONFIG.google.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // 保存されたユーザー情報を読み込み
      this.loadStoredUser();
      
      // 認証状態の更新
      this.updateAuthUI();
      
      this.isInitialized = true;
      console.log('認証システム初期化完了');
      
    } catch (error) {
      console.error('認証システム初期化エラー:', error);
    }
  }

  // Google API読み込み待機
  waitForGoogleAPI() {
    return new Promise((resolve, reject) => {
      const checkGoogle = () => {
        if (typeof google !== 'undefined' && google.accounts) {
          resolve();
        } else {
          setTimeout(checkGoogle, 100);
        }
      };
      checkGoogle();
      
      // 10秒でタイムアウト
      setTimeout(() => reject(new Error('Google API読み込みタイムアウト')), 10000);
    });
  }

  // ログイン処理
  async signIn() {
    try {
      if (!this.isInitialized) {
        await this.init();
      }

      // Google Sign-Inポップアップ表示
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('Google Sign-In not displayed');
          // 代替ログイン方法（ワンタップが表示されない場合）
          this.showSignInButton();
        }
      });
      
    } catch (error) {
      console.error('ログインエラー:', error);
      this.showError('ログインに失敗しました');
    }
  }

  // 代替ログインボタン表示
  showSignInButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      // Google Sign-Inボタンに置き換え
      google.accounts.id.renderButton(loginBtn, {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        locale: 'ja'
      });
    }
  }

  // 認証情報レスポンス処理
  async handleCredentialResponse(response) {
    try {
      // JWTトークンをデコード
      const userInfo = this.parseJWT(response.credential);
      
      if (!userInfo) {
        throw new Error('ユーザー情報の取得に失敗');
      }

      // ユーザー情報を整形
      const user = {
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        verified_email: userInfo.email_verified,
        loginAt: new Date().toISOString()
      };

      // ログイン成功処理
      await this.onLoginSuccess(user, response.credential);
      
    } catch (error) {
      console.error('認証レスポンス処理エラー:', error);
      this.showError('認証処理に失敗しました');
    }
  }

  // JWTトークンパース
  parseJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('JWT解析エラー:', error);
      return null;
    }
  }

  // ログイン成功時の処理
  async onLoginSuccess(user, token) {
    try {
      // ユーザー情報をローカルストレージに保存
      StorageManager.setUser(user);
      StorageManager.setToken(token);
      
      // 現在のユーザー情報を更新
      this.currentUser = user;
      
      // UI更新
      this.updateAuthUI();
      
      // 成功メッセージ
      this.showSuccess(`ようこそ、${user.name}さん！`);
      
      // リダイレクト処理
      const redirectPath = this.getRedirectPath();
      if (redirectPath) {
        setTimeout(() => {
          window.location.href = redirectPath;
        }, 1500);
      }
      
      console.log('ログイン成功:', user);
      
    } catch (error) {
      console.error('ログイン成功処理エラー:', error);
    }
  }

  // ログアウト処理
  async signOut() {
    try {
      // Google Sign-Outを実行
      if (google && google.accounts && google.accounts.id) {
        google.accounts.id.disableAutoSelect();
      }
      
      // ローカルデータを削除
      StorageManager.clearUser();
      StorageManager.clearToken();
      
      // 現在のユーザー情報をクリア
      this.currentUser = null;
      
      // UI更新
      this.updateAuthUI();
      
      // 成功メッセージ
      this.showSuccess('ログアウトしました');
      
      // ログインページにリダイレクト
      setTimeout(() => {
        window.location.href = APP_CONFIG.redirectPaths.afterLogout;
      }, 1000);
      
      console.log('ログアウト成功');
      
    } catch (error) {
      console.error('ログアウトエラー:', error);
      this.showError('ログアウトに失敗しました');
    }
  }

  // 保存されたユーザー情報を読み込み
  loadStoredUser() {
    const user = StorageManager.getUser();
    const token = StorageManager.getToken();
    
    if (user && token) {
      // トークンの有効性をチェック（簡易版）
      if (this.isTokenValid(token)) {
        this.currentUser = user;
        console.log('保存されたユーザー情報を読み込み:', user);
      } else {
        // 無効なトークンの場合はクリア
        this.signOut();
      }
    }
  }

  // トークン有効性チェック（簡易版）
  isTokenValid(token) {
    try {
      const payload = this.parseJWT(token);
      if (!payload) return false;
      
      // 有効期限チェック
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch (error) {
      return false;
    }
  }

  // リダイレクト先を取得
  getRedirectPath() {
    // URLパラメータから取得
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect && this.isValidRedirectPath(redirect)) {
      return redirect;
    }
    
    // デフォルトのリダイレクト先
    return APP_CONFIG.redirectPaths.afterLogin;
  }

  // 有効なリダイレクトパスかチェック
  isValidRedirectPath(path) {
    // セキュリティ: 内部パスのみ許可
    return path.startsWith('/') && !path.startsWith('//');
  }

  // 認証が必要なページかチェック
  requiresAuth() {
    const currentPath = window.location.pathname;
    return APP_CONFIG.redirectPaths.requireAuth.some(path => 
      currentPath === path || currentPath.startsWith(path.replace('.html', ''))
    );
  }

  // 認証状態チェック
  isAuthenticated() {
    return this.currentUser !== null;
  }

  // 現在のユーザー取得
  getCurrentUser() {
    return this.currentUser;
  }

  // UI更新
  updateAuthUI() {
    const loginBtns = document.querySelectorAll('.btn-ghost, .btn-primary');
    const userMenu = document.getElementById('userMenu');
    const userInfo = document.getElementById('userInfo');
    
    if (this.isAuthenticated()) {
      // ログイン済み表示
      loginBtns.forEach(btn => {
        if (btn.textContent.includes('ログイン') || btn.textContent.includes('新規登録')) {
          btn.style.display = 'none';
        }
      });
      
      // ユーザーメニューを表示（存在する場合）
      if (userMenu) userMenu.classList.remove('hidden');
      
      // ユーザー情報を表示
      this.createUserMenu();
      
    } else {
      // 未ログイン表示
      loginBtns.forEach(btn => {
        if (btn.textContent.includes('ログイン') || btn.textContent.includes('新規登録')) {
          btn.style.display = 'block';
        }
      });
      
      if (userMenu) userMenu.classList.add('hidden');
      if (userInfo) userInfo.innerHTML = '';
      
      // ログインイベントを設定
      this.setupLoginEvents();
    }
  }

  // ユーザーメニューを作成
  createUserMenu() {
    const authSection = document.querySelector('.header-auth');
    if (!authSection || !this.currentUser) return;
    
    // 既存のユーザーメニューがあれば削除
    const existingMenu = document.getElementById('userMenu');
    if (existingMenu) existingMenu.remove();
    
    // ユーザーメニューを作成
    const userMenu = document.createElement('div');
    userMenu.id = 'userMenu';
    userMenu.className = 'user-menu';
    userMenu.innerHTML = `
      <div class="user-info">
        <img src="${this.currentUser.picture || '/assets/images/default-avatar.png'}" 
             alt="Profile" class="user-avatar">
        <span class="user-name">${this.currentUser.name || this.currentUser.email}</span>
      </div>
      <div class="dropdown">
        <button class="dropdown-toggle">▼</button>
        <div class="dropdown-menu">
          <a href="/dashboard.html">ダッシュボード</a>
          <a href="/profile.html">プロフィール</a>
          <button id="logoutBtn">ログアウト</button>
        </div>
      </div>
    `;
    
    // CSSスタイルを追加
    userMenu.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
    `;
    
    authSection.innerHTML = '';
    authSection.appendChild(userMenu);
    
    // ログアウトボタンのイベントリスナー
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.signOut());
    }
  }

  // ログインイベントを設定
  setupLoginEvents() {
    const loginBtns = document.querySelectorAll('.btn-ghost, .btn-primary');
    loginBtns.forEach(btn => {
      if (btn.textContent.includes('ログイン')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.signIn();
        });
      } else if (btn.textContent.includes('新規登録')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.signIn(); // 新規登録もログインと同じ処理
        });
      }
    });
  }

  // エラーメッセージ表示
  showError(message) {
    this.showMessage(message, 'error');
  }

  // 成功メッセージ表示
  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  // メッセージ表示
  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 1000;
      max-width: 300px;
      color: white;
      font-weight: 500;
      ${type === 'error' ? 'background: #f44336;' : ''}
      ${type === 'success' ? 'background: #4caf50;' : ''}
      ${type === 'info' ? 'background: #2196f3;' : ''}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.remove();
    }, type === 'error' ? 5000 : 3000);
  }
}

// グローバル認証マネージャー初期化
window.authManager = new AuthManager();