import { getAIConfig } from '../ai-config';
import { GeminiClient } from '../ai/gemini-client';
import { GrokClient } from '../ai/grok-client';

export interface ExternalReview {
  id: string;
  restaurantName: string;
  reviewerName: string;
  rating: number;
  content: string;
  source: 'tabelog' | 'gurunavi' | 'retty' | 'twitter' | 'google' | 'yelp';
  date: string;
  platform: string;
  url?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  verified: boolean;
}

export interface TwitterPost {
  id: string;
  username: string;
  content: string;
  date: string;
  likes: number;
  retweets: number;
  hashtags: string[];
  mentions: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  restaurantMentions: string[];
}

export class AIReviewScraperService {
  private geminiClient: GeminiClient | null = null;
  private grokClient: GrokClient | null = null;

  private getGeminiClient(): GeminiClient | null {
    try {
      if (!this.geminiClient) {
        this.geminiClient = new GeminiClient(getAIConfig('gemini'));
      }
      return this.geminiClient;
    } catch (error) {
      console.warn('GeminiClientの初期化に失敗しました:', error);
      return null;
    }
  }

  private getGrokClient(): GrokClient | null {
    try {
      if (!this.grokClient) {
        this.grokClient = new GrokClient(getAIConfig('grok'));
      }
      return this.grokClient;
    } catch (error) {
      console.warn('GrokClientの初期化に失敗しました:', error);
      return null;
    }
  }

  // Geminiを使用して模擬的な外部レビューデータを生成・解析
  async generateMockReviewsWithGemini(restaurantName: string, location: string = '東京'): Promise<ExternalReview[]> {
    const geminiClient = this.getGeminiClient();
    
    if (!geminiClient) {
      console.warn('GeminiClientが利用できないため、フォールバックデータを使用します');
      return this.getFallbackReviews(restaurantName);
    }

    try {
      const prompt = `レストラン「${restaurantName}」（場所：${location}）に関する、以下のプラットフォームからのリアルなレビューを模擬的に生成してください：
- 食べログ (tabelog)
- ぐるなび (gurunavi) 
- Retty
- Google Reviews

各プラットフォームから2-3件ずつ、合計10件程度のレビューを生成してください。

以下のJSON形式で回答してください。バッククォートやマークダウンは使わず、純粋なJSONのみで返答してください：
{
  "reviews": [
    {
      "id": "unique_id",
      "restaurantName": "${restaurantName}",
      "reviewerName": "レビュアー名",
      "rating": 1-5の数値,
      "content": "レビュー内容（日本語、リアルな感想）",
      "source": "tabelog",
      "date": "YYYY-MM-DD",
      "platform": "プラットフォーム名",
      "sentiment": "positive",
      "keywords": ["キーワード1", "キーワード2"],
      "verified": true
    }
  ]
}

重要：回答は純粋なJSON形式のみで、マークダウン記法は一切使用しないでください。

レビューは以下の特徴を持つようにしてください：
- 各プラットフォームの特色を反映
- 様々な評価（1-5星）を含む
- リアルな日本語の口調
- 料理、サービス、雰囲気などの具体的な言及
- ポジティブ、ネガティブ、中立の感想を混在`;

      const response = await geminiClient.generateStructuredContent(prompt);
      const parsedResponse = await this.parseAIResponse(response, { reviews: this.getFallbackReviews(restaurantName) });
      
      return parsedResponse.reviews.map((review: Record<string, unknown>) => ({
        ...review,
        id: `gemini_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));
    } catch (error) {
      console.error('Gemini レビュー生成エラー:', error);
      return this.getFallbackReviews(restaurantName);
    }
  }

  // Grokを使用してTwitter風の口コミを生成
  async generateTwitterPostsWithGrok(restaurantName: string, hashtag: string = ''): Promise<TwitterPost[]> {
    const grokClient = this.getGrokClient();
    
    if (!grokClient) {
      console.warn('GrokClientが利用できないため、フォールバックデータを使用します');
      return this.getFallbackTwitterPosts(restaurantName);
    }

    try {
      const prompt = `レストラン「${restaurantName}」について、Twitterで実際に投稿されそうなリアルな口コミツイートを10件生成してください。

以下の要素を含めてください：
- 様々なユーザータイプ（グルメ好き、一般客、インフルエンサーなど）
- 異なる感情（満足、不満、普通）
- リアルなTwitterの文体（絵文字、略語、ハッシュタグ含む）
- 料理の写真投稿を想定したコメント
- ${hashtag ? `#${hashtag}` : '#グルメ'} などのハッシュタグ

以下のJSON形式で回答してください。バッククォートやマークダウンは使わず、純粋なJSONのみで返答してください：
{
  "posts": [
    {
      "id": "tweet_id",
      "username": "ユーザー名",
      "content": "ツイート内容（日本語、Twitter風の文体）",
      "date": "YYYY-MM-DD",
      "likes": 数値,
      "retweets": 数値,
      "hashtags": ["ハッシュタグ1", "ハッシュタグ2"],
      "mentions": ["メンション先"],
      "sentiment": "positive",
      "restaurantMentions": ["${restaurantName}"]
    }
  ]
}

重要：回答は純粋なJSON形式のみで、マークダウン記法は一切使用しないでください。`;

      const response = await grokClient.generateStructuredContent(prompt);
      const parsedResponse = await this.parseAIResponse(response, { posts: this.getFallbackTwitterPosts(restaurantName) });
      
      return parsedResponse.posts.map((post: Record<string, unknown>) => ({
        ...post,
        id: `grok_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));
    } catch (error) {
      console.error('Grok Twitter生成エラー:', error);
      return this.getFallbackTwitterPosts(restaurantName);
    }
  }

  // レビューの感情分析（Gemini使用）
  async analyzeReviewSentiment(reviewContent: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    keywords: string[];
  }> {
    const geminiClient = this.getGeminiClient();
    
    if (!geminiClient) {
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        keywords: []
      };
    }

    try {
      const prompt = `以下のレビューの感情分析を行ってください：

"${reviewContent}"

以下のJSON形式で回答してください。バッククォートやマークダウンは使わず、純粋なJSONのみで返答してください：
{
  "sentiment": "positive",
  "confidence": 0.95,
  "keywords": ["重要なキーワード1", "キーワード2", "キーワード3"]
}

重要：回答は純粋なJSON形式のみで、マークダウン記法は一切使用しないでください。`;

      const response = await geminiClient.generateStructuredContent(prompt);
      const fallbackData = {
        sentiment: 'neutral' as const,
        confidence: 0.5,
        keywords: []
      };
      return await this.parseAIResponse(response, fallbackData);
    } catch (error) {
      console.error('感情分析エラー:', error);
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        keywords: []
      };
    }
  }

  // 複数ソースからのレビュー統合
  async collectAllReviews(restaurantName: string, location?: string): Promise<{
    externalReviews: ExternalReview[];
    twitterPosts: TwitterPost[];
    summary: {
      totalReviews: number;
      averageRating: number;
      sentimentDistribution: Record<string, number>;
      topKeywords: string[];
    }
  }> {
    try {
      // 並列でGeminiとGrokを使用してデータ収集
      const [externalReviews, twitterPosts] = await Promise.all([
        this.generateMockReviewsWithGemini(restaurantName, location),
        this.generateTwitterPostsWithGrok(restaurantName)
      ]);

      // 統計情報の計算
      const allReviews = [...externalReviews];
      const totalReviews = allReviews.length + twitterPosts.length;
      const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
      
      const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
      [...externalReviews, ...twitterPosts].forEach(item => {
        sentimentCounts[item.sentiment]++;
      });

      const allKeywords = externalReviews.flatMap(review => review.keywords);
      const keywordCounts: Record<string, number> = {};
      allKeywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
      
      const topKeywords = Object.entries(keywordCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([keyword]) => keyword);

      return {
        externalReviews,
        twitterPosts,
        summary: {
          totalReviews,
          averageRating: Math.round(averageRating * 10) / 10,
          sentimentDistribution: sentimentCounts,
          topKeywords
        }
      };
    } catch (error) {
      console.error('レビュー収集エラー:', error);
      throw new Error('レビューの収集に失敗しました');
    }
  }

  // フォールバック用のサンプルレビュー
  private getFallbackReviews(restaurantName: string): ExternalReview[] {
    return [
      {
        id: 'fallback_1',
        restaurantName,
        reviewerName: 'グルメ太郎',
        rating: 4,
        content: '美味しい料理とサービスが良かったです。また行きたいと思います。',
        source: 'tabelog',
        date: '2024-12-01',
        platform: '食べログ',
        sentiment: 'positive',
        keywords: ['美味しい', 'サービス', 'また行きたい'],
        verified: true
      },
      {
        id: 'fallback_2',
        restaurantName,
        reviewerName: '食べ歩き花子',
        rating: 3,
        content: '普通の味でした。値段の割には物足りない感じがします。',
        source: 'gurunavi',
        date: '2024-11-28',
        platform: 'ぐるなび',
        sentiment: 'neutral',
        keywords: ['普通', '値段', '物足りない'],
        verified: false
      }
    ];
  }

  // フォールバック用のサンプルTwitter投稿
  private getFallbackTwitterPosts(restaurantName: string): TwitterPost[] {
    return [
      {
        id: 'twitter_fallback_1',
        username: 'foodie_tokyo',
        content: `${restaurantName}で美味しいランチ！🍽️ サービスも最高でした✨ #グルメ #ランチ #美味しい`,
        date: '2024-12-01',
        likes: 25,
        retweets: 5,
        hashtags: ['グルメ', 'ランチ', '美味しい'],
        mentions: [],
        sentiment: 'positive',
        restaurantMentions: [restaurantName]
      },
      {
        id: 'twitter_fallback_2',
        username: 'tokyoeater',
        content: `${restaurantName}、期待してたけど普通だった😅 悪くはないけど特別感はなし。`,
        date: '2024-11-30',
        likes: 8,
        retweets: 1,
        hashtags: [],
        mentions: [],
        sentiment: 'neutral',
        restaurantMentions: [restaurantName]
      }
    ];
  }

  // JSONレスポンスをクリーンアップするヘルパーメソッド
  private cleanJsonResponse(response: string): string {
    // まず、すべてのマークダウンブロックを除去
    let cleaned = response.replace(/```json/g, '').replace(/```/g, '');
    
    // 改行文字やタブを正規化
    cleaned = cleaned.replace(/\n/g, ' ').replace(/\t/g, ' ');
    
    // 複数の空白を単一の空白に
    cleaned = cleaned.replace(/\s+/g, ' ');
    
    // 先頭と末尾の空白を除去
    cleaned = cleaned.trim();
    
    // 最初の{から最後の}までを抽出（より確実に）
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    
    // 日本語の括弧を英語の括弧に変換
    cleaned = cleaned.replace(/（/g, '(').replace(/）/g, ')');
    
    // その他の特殊文字をクリーンアップ
    cleaned = cleaned.replace(/'/g, "'").replace(/"/g, '"').replace(/"/g, '"');
    
    return cleaned;
  }

  // より安全なJSON解析メソッド
  private async parseAIResponse(response: string, fallbackData: Record<string, unknown>): Promise<Record<string, unknown>> {
    try {
      const cleaned = this.cleanJsonResponse(response);
      return JSON.parse(cleaned);
    } catch (error) {
      console.log('JSON解析失敗、別の方法を試行:', error);
      
      // バックアップ解析方法
      try {
        // 正規表現でJSONを抽出
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const extracted = this.cleanJsonResponse(jsonMatch[0]);
          return JSON.parse(extracted);
        }
      } catch (secondError) {
        console.log('バックアップ解析も失敗:', secondError);
      }
      
      // すべて失敗した場合はフォールバックデータを返す
      return fallbackData;
    }
  }
}

export const aiReviewScraperService = new AIReviewScraperService();