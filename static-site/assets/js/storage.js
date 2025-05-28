class StorageManager {
  // ユーザー情報保存
  static setUser(user) {
    try {
      localStorage.setItem(APP_CONFIG.storageKeys.user, JSON.stringify(user));
    } catch (error) {
      console.error('ユーザー情報保存エラー:', error);
    }
  }

  // ユーザー情報取得
  static getUser() {
    try {
      const userData = localStorage.getItem(APP_CONFIG.storageKeys.user);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('ユーザー情報取得エラー:', error);
      return null;
    }
  }

  // ユーザー情報削除
  static clearUser() {
    try {
      localStorage.removeItem(APP_CONFIG.storageKeys.user);
    } catch (error) {
      console.error('ユーザー情報削除エラー:', error);
    }
  }

  // トークン保存
  static setToken(token) {
    try {
      localStorage.setItem(APP_CONFIG.storageKeys.token, token);
    } catch (error) {
      console.error('トークン保存エラー:', error);
    }
  }

  // トークン取得
  static getToken() {
    try {
      return localStorage.getItem(APP_CONFIG.storageKeys.token);
    } catch (error) {
      console.error('トークン取得エラー:', error);
      return null;
    }
  }

  // トークン削除
  static clearToken() {
    try {
      localStorage.removeItem(APP_CONFIG.storageKeys.token);
    } catch (error) {
      console.error('トークン削除エラー:', error);
    }
  }

  // 設定保存
  static setPreferences(preferences) {
    try {
      localStorage.setItem(APP_CONFIG.storageKeys.preferences, JSON.stringify(preferences));
    } catch (error) {
      console.error('設定保存エラー:', error);
    }
  }

  // 設定取得
  static getPreferences() {
    try {
      const prefs = localStorage.getItem(APP_CONFIG.storageKeys.preferences);
      return prefs ? JSON.parse(prefs) : {};
    } catch (error) {
      console.error('設定取得エラー:', error);
      return {};
    }
  }

  // 全データクリア
  static clearAll() {
    try {
      Object.values(APP_CONFIG.storageKeys).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('データクリアエラー:', error);
    }
  }
}

// グローバルに公開
window.StorageManager = StorageManager;