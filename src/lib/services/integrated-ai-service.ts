import { getAIConfig } from '../ai-config';
import { GeminiClient } from '../ai/gemini-client';
import { GrokClient } from '../ai/grok-client';

// 既存のサービスから型定義をインポート
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

export interface BusinessEssenceAnalysis {
  category: string;
  essentialQualities: string[];
  weightings: Record<string, number>;
  analysisPrompt: string;
}

export interface ReviewAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  keywords: string[];
  essenceScore: number;
  qualityFactors: Record<string, number>;
}

export interface CompanyRegistrationData {
  name: string;
  description: string;
  category: string;
  location: string;
  website?: string;
  phone?: string;
  businessHours?: Record<string, { open: string; close: string; closed: boolean }>;
}

export interface RestaurantSearchResult {
  name: string;
  description: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  address: string;
  recommendationReason: string;
}

/**
 * 統合AIサービス - すべてのAI機能を一元管理
 */
export class IntegratedAIService {
  private geminiClient: GeminiClient;
  private grokClient: GrokClient;

  constructor() {
    this.geminiClient = new GeminiClient(getAIConfig('gemini'));
    this.grokClient = new GrokClient(getAIConfig('grok'));
  }

  // === レビュー生成・収集機能 ===

  /**
   * 模擬的な外部レビューデータを生成
   */
  async generateMockReviews(restaurantName: string, location: string = '東京'): Promise<ExternalReview[]> {
    try {
      const prompt = `レストラン「${restaurantName}」（場所：${location}）に関する、以下のプラットフォームからのリアルなレビューを模擬的に生成してください：
- 食べログ (tabelog)
- ぐるなび (gurunavi) 
- Retty
- Google Reviews

各プラットフォームから2-3件ずつ、合計10件程度のレビューを生成してください。

以下のJSON形式で回答してください：
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
}`;

      const response = await this.geminiClient.generateStructuredContent(prompt);
      const parsedResponse = await this.parseAIResponse(response, { reviews: this.getFallbackReviews(restaurantName) });
      
      return parsedResponse.reviews.map((review: ExternalReview) => ({
        ...review,
        id: `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));
    } catch (error) {
      console.error('AIレビュー生成エラー:', error);
      return this.getFallbackReviews(restaurantName);
    }
  }

  /**
   * Twitter風の口コミを生成
   */
  async generateTwitterPosts(restaurantName: string): Promise<TwitterPost[]> {
    try {
      const prompt = `レストラン「${restaurantName}」について、Twitterで実際に投稿されそうなリアルな口コミツイートを10件生成してください。

以下のJSON形式で回答してください：
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
}`;

      const response = await this.grokClient.generateStructuredContent(prompt);
      const parsedResponse = await this.parseAIResponse(response, { posts: this.getFallbackTwitterPosts(restaurantName) });
      
      return parsedResponse.posts.map((post: TwitterPost) => ({
        ...post,
        id: `twitter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));
    } catch (error) {
      console.error('Twitterポスト生成エラー:', error);
      return this.getFallbackTwitterPosts(restaurantName);
    }
  }

  // === レビュー分析機能 ===

  /**
   * レビュー内容の感情分析
   */
  async analyzeReviewSentiment(reviewContent: string): Promise<ReviewAnalysis> {
    try {
      const prompt = `以下のレビューの詳細分析を行ってください：

"${reviewContent}"

以下のJSON形式で回答してください：
{
  "sentiment": "positive",
  "confidence": 0.95,
  "keywords": ["重要なキーワード1", "キーワード2", "キーワード3"],
  "essenceScore": 85,
  "qualityFactors": {
    "taste": 90,
    "service": 80,
    "atmosphere": 85,
    "value": 75
  }
}`;

      const response = await this.geminiClient.generateStructuredContent(prompt);
      const fallbackData: ReviewAnalysis = {
        sentiment: 'neutral',
        confidence: 0.5,
        keywords: [],
        essenceScore: 50,
        qualityFactors: { taste: 50, service: 50, atmosphere: 50, value: 50 }
      };
      return await this.parseAIResponse(response, fallbackData);
    } catch (error) {
      console.error('感情分析エラー:', error);
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        keywords: [],
        essenceScore: 50,
        qualityFactors: { taste: 50, service: 50, atmosphere: 50, value: 50 }
      };
    }
  }

  /**
   * ビジネス本質分析
   */
  async analyzeBusinessEssence(category: string, description: string): Promise<BusinessEssenceAnalysis> {
    try {
      const prompt = `カテゴリ「${category}」のビジネス「${description}」について、本質的な品質要素を分析してください。

以下のJSON形式で回答してください：
{
  "category": "${category}",
  "essentialQualities": ["品質要素1", "品質要素2", "品質要素3"],
  "weightings": {
    "taste": 40,
    "service": 30,
    "atmosphere": 20,
    "value": 10
  },
  "analysisPrompt": "この企業の本質的価値を評価するための分析指針"
}`;

      const response = await this.geminiClient.generateStructuredContent(prompt);
      const fallbackData: BusinessEssenceAnalysis = {
        category,
        essentialQualities: ['品質', 'サービス', '雰囲気'],
        weightings: { taste: 25, service: 25, atmosphere: 25, value: 25 },
        analysisPrompt: '総合的な顧客体験を評価してください。'
      };
      return await this.parseAIResponse(response, fallbackData);
    } catch (error) {
      console.error('ビジネス本質分析エラー:', error);
      return {
        category,
        essentialQualities: ['品質', 'サービス', '雰囲気'],
        weightings: { taste: 25, service: 25, atmosphere: 25, value: 25 },
        analysisPrompt: '総合的な顧客体験を評価してください。'
      };
    }
  }

  // === 企業登録支援機能 ===

  /**
   * AI支援による企業情報抽出・最適化
   */
  async optimizeCompanyRegistration(rawData: Partial<CompanyRegistrationData>): Promise<CompanyRegistrationData> {
    try {
      const prompt = `以下の企業情報を整理・最適化してください：

入力データ: ${JSON.stringify(rawData)}

以下のJSON形式で最適化された企業情報を回答してください：
{
  "name": "正式企業名",
  "description": "魅力的な企業説明文",
  "category": "適切なカテゴリ",
  "location": "正規化された住所",
  "website": "ウェブサイトURL（あれば）",
  "phone": "電話番号（あれば）",
  "businessHours": {
    "monday": {"open": "09:00", "close": "18:00", "closed": false},
    "tuesday": {"open": "09:00", "close": "18:00", "closed": false}
  }
}`;

      const response = await this.geminiClient.generateStructuredContent(prompt);
      const fallbackData: CompanyRegistrationData = {
        name: rawData.name || '企業名',
        description: rawData.description || '企業の説明',
        category: rawData.category || 'その他',
        location: rawData.location || '東京都'
      };
      return await this.parseAIResponse(response, fallbackData);
    } catch (error) {
      console.error('企業登録最適化エラー:', error);
      return {
        name: rawData.name || '企業名',
        description: rawData.description || '企業の説明',
        category: rawData.category || 'その他',
        location: rawData.location || '東京都'
      };
    }
  }

  // === レストラン検索機能 ===

  /**
   * AI支援レストラン検索
   */
  async searchRestaurants(query: string, location: string, preferences?: string[]): Promise<RestaurantSearchResult[]> {
    try {
      const prompt = `検索クエリ「${query}」、場所「${location}」${preferences ? `、好み「${preferences.join(', ')}」` : ''}に基づいて、適切なレストランを提案してください。

以下のJSON形式で回答してください：
{
  "restaurants": [
    {
      "name": "レストラン名",
      "description": "説明",
      "cuisine": "料理ジャンル",
      "priceRange": "価格帯",
      "rating": 4.5,
      "address": "住所",
      "recommendationReason": "推薦理由"
    }
  ]
}`;

      const response = await this.geminiClient.generateStructuredContent(prompt);
      const parsedResponse = await this.parseAIResponse(response, { restaurants: [] });
      return parsedResponse.restaurants || [];
    } catch (error) {
      console.error('レストラン検索エラー:', error);
      return [];
    }
  }

  // === ユーティリティメソッド ===

  /**
   * 複数ソースからのレビュー統合収集
   */
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
      const [externalReviews, twitterPosts] = await Promise.all([
        this.generateMockReviews(restaurantName, location),
        this.generateTwitterPosts(restaurantName)
      ]);

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

  // === プライベートメソッド ===

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
      }
    ];
  }

  private cleanJsonResponse(response: string): string {
    let cleaned = response.replace(/```json/g, '').replace(/```/g, '');
    cleaned = cleaned.replace(/\n/g, ' ').replace(/\t/g, ' ');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    
    return cleaned;
  }

  private async parseAIResponse<T>(response: string, fallbackData: T): Promise<T> {
    try {
      const cleaned = this.cleanJsonResponse(response);
      return JSON.parse(cleaned);
    } catch (error) {
      console.log('JSON解析失敗、フォールバックデータを使用:', error);
      return fallbackData;
    }
  }
}

// シングルトンインスタンス
export const integratedAIService = new IntegratedAIService();