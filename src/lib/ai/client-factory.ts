import { GeminiClient } from './gemini-client';
import { GrokClient } from './grok-client';
import { getAIConfig } from '../ai-config';

export interface AIClient {
  generateContent(prompt: string): Promise<string>;
  generateText(prompt: string): Promise<string>; // Alias for generateContent
  generateStructuredContent(prompt: string, schema?: Record<string, unknown>): Promise<string>;
  enhanceText(text: string, type: 'grammar' | 'summary' | 'detailed'): Promise<string>;
}

export class AIClientFactory {
  static createClient(provider?: 'gemini' | 'grok'): AIClient {
    const config = getAIConfig(provider);
    
    switch (config.provider) {
      case 'gemini':
        return new GeminiClient(config);
      case 'grok':
        return new GrokClient(config);
      default:
        throw new Error(`Unsupported AI provider: ${config.provider}`);
    }
  }

  static async createClientWithFallback(): Promise<AIClient> {
    // デフォルトプロバイダーを試す
    try {
      const defaultClient = this.createClient();
      // 簡単なテストリクエストでAPIが利用可能か確認
      await defaultClient.generateContent('テスト');
      return defaultClient;
    } catch (error) {
      console.warn('Default provider failed, trying fallback...');
      
      // フォールバックプロバイダーを試す
      const fallbackProvider = getAIConfig().provider === 'gemini' ? 'grok' : 'gemini';
      try {
        const fallbackClient = this.createClient(fallbackProvider);
        await fallbackClient.generateContent('テスト');
        return fallbackClient;
      } catch (fallbackError) {
        throw new Error('すべてのAIプロバイダーが利用できません');
      }
    }
  }
}

// 便利関数をエクスポート
export function getAIClient(provider?: 'gemini' | 'grok'): AIClient {
  return AIClientFactory.createClient(provider);
}

export async function getAIClientWithFallback(): Promise<AIClient> {
  return AIClientFactory.createClientWithFallback();
}