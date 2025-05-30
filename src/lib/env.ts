import 'dotenv/config';

// 環境変数の初期化と検証
export function initializeEnvironment() {
  const requiredEnvVars = [
    'GEMINI_API_KEY',
    'XAI_API_KEY',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`警告: 以下の環境変数が設定されていません: ${missingVars.join(', ')}`);
    console.warn('AI機能が制限される可能性があります。');
  }

  return {
    hasGemini: !!process.env.GEMINI_API_KEY,
    hasGrok: !!process.env.XAI_API_KEY,
  };
}

// 開発環境でのデバッグ用
if (process.env.NODE_ENV === 'development') {
  console.log('AI Config Status:', {
    defaultProvider: process.env.AI_DEFAULT_PROVIDER || 'gemini',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasGrokKey: !!process.env.XAI_API_KEY,
    geminiModel: process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp',
    grokModel: process.env.XAI_MODEL || 'grok-3',
  });
}