export interface AIConfig {
  provider: 'gemini' | 'grok';
  apiKey: string;
  model: string;
  apiUrl?: string;
}

export interface AIProviderConfig {
  gemini: {
    apiKey: string;
    model: string;
  };
  grok: {
    apiKey: string;
    model: string;
    apiUrl: string;
  };
}

export const aiConfig: AIProviderConfig = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp',
  },
  grok: {
    apiKey: process.env.XAI_API_KEY || '',
    model: process.env.XAI_MODEL || 'grok-3',
    apiUrl: process.env.XAI_API_URL || 'https://api.x.ai/v1',
  },
};

export const getDefaultProvider = (): 'gemini' | 'grok' => {
  return (process.env.AI_DEFAULT_PROVIDER as 'gemini' | 'grok') || 'gemini';
};

export const getAIConfig = (provider?: 'gemini' | 'grok'): AIConfig => {
  const selectedProvider = provider || getDefaultProvider();
  
  // APIキーの存在チェック
  if (selectedProvider === 'gemini' && !aiConfig.gemini.apiKey) {
    console.warn('Gemini APIキーが設定されていません。Grokにフォールバックします。');
    if (aiConfig.grok.apiKey) {
      return getAIConfig('grok');
    }
    throw new Error('利用可能なAIプロバイダーがありません。APIキーを確認してください。');
  }
  
  if (selectedProvider === 'grok' && !aiConfig.grok.apiKey) {
    console.warn('Grok APIキーが設定されていません。Geminiにフォールバックします。');
    if (aiConfig.gemini.apiKey) {
      return getAIConfig('gemini');
    }
    throw new Error('利用可能なAIプロバイダーがありません。APIキーを確認してください。');
  }
  
  switch (selectedProvider) {
    case 'gemini':
      return {
        provider: 'gemini',
        apiKey: aiConfig.gemini.apiKey,
        model: aiConfig.gemini.model,
      };
    case 'grok':
      return {
        provider: 'grok',
        apiKey: aiConfig.grok.apiKey,
        model: aiConfig.grok.model,
        apiUrl: aiConfig.grok.apiUrl,
      };
    default:
      throw new Error(`Unsupported AI provider: ${selectedProvider}`);
  }
};

// AI設定の状態を確認する関数
export const checkAIConfiguration = (): {
  geminiAvailable: boolean;
  grokAvailable: boolean;
  defaultProvider: string;
  hasValidConfig: boolean;
} => {
  const geminiAvailable = Boolean(aiConfig.gemini.apiKey);
  const grokAvailable = Boolean(aiConfig.grok.apiKey);
  const defaultProvider = getDefaultProvider();
  const hasValidConfig = geminiAvailable || grokAvailable;
  
  return {
    geminiAvailable,
    grokAvailable,
    defaultProvider,
    hasValidConfig
  };
};