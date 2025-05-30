import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { AIConfig } from '../ai-config';

export class GeminiClient {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor(config: AIConfig) {
    if (!config.apiKey) {
      throw new Error('Gemini APIキーが設定されていません');
    }
    this.client = new GoogleGenerativeAI(config.apiKey);
    this.model = config.model;
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.8,  // バランスの取れた創造性
          topP: 0.9,         // 適度な多様性
          topK: 40,          
          maxOutputTokens: 8192,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
          }
        ]
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      if (!response.text()) {
        throw new Error('AIからの応答が空です');
      }
      
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // エラーの詳細を確認
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Gemini APIキーが無効です');
        }
        if (error.message.includes('quota')) {
          throw new Error('Gemini APIの利用制限に達しました');
        }
        if (error.message.includes('blocked')) {
          throw new Error('コンテンツがセーフティフィルターでブロックされました');
        }
      }
      
      throw new Error(`Gemini APIでエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateStructuredContent(prompt: string, schema?: Record<string, unknown>): Promise<string> {
    try {
      // 構造化されたコンテンツ生成のためのプロンプト最適化
      const structuredPrompt = schema 
        ? `${prompt}

以下のJSONスキーマに厳密に従って回答してください。他の形式での出力は行わず、有効なJSONのみを返してください：
${JSON.stringify(schema, null, 2)}`
        : `${prompt}

有効なJSON形式で回答してください。`;
      
      const response = await this.generateContent(structuredPrompt);
      
      // JSON形式の応答を検証
      try {
        JSON.parse(response);
        return response;
      } catch (parseError) {
        console.warn('JSON解析に失敗、レスポンスをクリーンアップしています');
        
        // JSONの開始と終了を見つけてクリーンアップ
        const jsonStart = response.indexOf('{');
        const jsonEnd = response.lastIndexOf('}');
        
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          const cleanedResponse = response.substring(jsonStart, jsonEnd + 1);
          JSON.parse(cleanedResponse); // 再度検証
          return cleanedResponse;
        }
        
        throw new Error('有効なJSON応答を生成できませんでした');
      }
    } catch (error) {
      console.error('Structured content generation error:', error);
      throw error;
    }
  }

  async enhanceText(text: string, type: 'grammar' | 'summary' | 'detailed'): Promise<string> {
    if (!text || text.trim().length === 0) {
      throw new Error('改善するテキストが空です');
    }
    
    let enhancePrompt = '';
    
    switch (type) {
      case 'grammar':
        enhancePrompt = `以下のテキストの文法を修正し、自然で読みやすい日本語に改善してください。元の意味は保持してください：\n\n${text}`;
        break;
      case 'summary':
        enhancePrompt = `以下のテキストの重要なポイントを要約し、簡潔でわかりやすい文章にしてください：\n\n${text}`;
        break;
      case 'detailed':
        enhancePrompt = `以下のテキストをより詳細で具体的な内容に拡張してください。関連する情報や例を追加して充実させてください：\n\n${text}`;
        break;
      default:
        throw new Error(`未対応の改善タイプです: ${type}`);
    }
    
    return this.generateContent(enhancePrompt);
  }

  // generateTextメソッドを追加（generateContentのエイリアス）
  async generateText(prompt: string): Promise<string> {
    return this.generateContent(prompt);
  }

  // レート制限対応のための待機機能
  private async waitForRateLimit(retryAfterSeconds: number = 1): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, retryAfterSeconds * 1000));
  }

  // リトライ機能付きの生成メソッド
  async generateContentWithRetry(prompt: string, maxRetries: number = 3): Promise<string> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.generateContent(prompt);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < maxRetries) {
          console.warn(`Gemini API呼び出し失敗 (試行 ${attempt}/${maxRetries}):`, lastError.message);
          await this.waitForRateLimit(Math.pow(2, attempt)); // 指数バックオフ
        }
      }
    }
    
    throw lastError || new Error('最大リトライ回数に達しました');
  }
}