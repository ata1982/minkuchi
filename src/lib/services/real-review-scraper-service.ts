import { getAIConfig } from '../ai-config';
import { GeminiClient } from '../ai/gemini-client';
import { GrokClient } from '../ai/grok-client';

export interface ExternalReview {
  id: string;
  restaurantName: string;
  reviewerName: string;
  rating: number;
  content: string;
  source: 'tabelog' | 'gurunavi' | 'retty' | 'twitter' | 'google' | 'yelp' | 'blog' | 'instagram';
  date: string;
  platform: string;
  url?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  verified: boolean;
  trustScore: number; // 0-100の信頼度スコア
  riskFlags: string[]; // リスクフラグ（サクラ、嫌がらせなど）
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
  trustScore: number;
  riskFlags: string[];
}

export interface ReviewFilterResults {
  trustedReviews: ExternalReview[];
  suspiciousHighReviews: ExternalReview[]; // 上位5%の疑わしいレビュー
  suspiciousLowReviews: ExternalReview[]; // 下位5%の疑わしいレビュー
  allTwitterPosts: TwitterPost[];
  statistics: {
    totalReviews: number;
    trustedCount: number;
    suspiciousHighCount: number;
    suspiciousLowCount: number;
    averageRating: number;
    averageTrustScore: number;
  };
}

export class RealReviewScraperService {
  private geminiClient: GeminiClient | null = null;
  private grokClient: GrokClient | null = null;

  constructor() {
    // AI clients are initialized lazily to avoid errors during build
  }

  private getGeminiClient(): GeminiClient | null {
    try {
      if (!this.geminiClient) {
        const config = getAIConfig('gemini');
        if (config.apiKey) {
          this.geminiClient = new GeminiClient(config);
        }
      }
      return this.geminiClient;
    } catch (error) {
      console.warn('GeminiClient initialization failed:', error);
      return null;
    }
  }

  private getGrokClient(): GrokClient | null {
    try {
      if (!this.grokClient) {
        const config = getAIConfig('grok');
        if (config.apiKey) {
          this.grokClient = new GrokClient(config);
        }
      }
      return this.grokClient;
    } catch (error) {
      console.warn('GrokClient initialization failed:', error);
      return null;
    }
  }

  // Google Maps風のリアルなレビューを生成（実際のスクレイピングの代替）
  async fetchGoogleMapsReviews(restaurantName: string, location: string): Promise<ExternalReview[]> {
    try {
      const prompt = `Google Maps上の「${restaurantName}」（${location}）のリアルなレビューを20件生成してください。
実際のGoogle Mapsレビューの特徴を正確に反映してください：

- 様々な評価（1-5星）で、現実的な分布
- 短文から長文まで様々な長さ
- 具体的な体験談（料理名、価格、待ち時間など）
- 実際のユーザー名（ひらがな、カタカナ、英語混在）
- 投稿日付（過去2年以内）
- 写真投稿の言及
- サービス、料理、雰囲気、コスパに関する具体的なコメント

以下のJSON形式で回答してください：
{
  "reviews": [
    {
      "reviewerName": "実際のユーザー名",
      "rating": 1-5,
      "content": "具体的なレビュー内容",
      "date": "YYYY-MM-DD",
      "platform": "Google Maps",
      "source": "google",
      "verified": true/false,
      "trustScore": 1-100,
      "riskFlags": ["potential_fake", "extreme_positive", "competitor_attack"]
    }
  ]
}`;

      const client = this.getGeminiClient();
      if (!client) {
        throw new Error('Gemini client is not available');
      }
      const response = await client.generateStructuredContent(prompt);
      const parsedResponse = await this.parseAIResponse(response, { reviews: [] });
      
      return parsedResponse.reviews.map((review: any) => ({
        ...review,
        id: `google_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        restaurantName,
        sentiment: this.determineSentiment(review.rating),
        keywords: this.extractKeywords(review.content),
        url: `https://maps.google.com/place/${encodeURIComponent(restaurantName)}`
      }));
    } catch (error) {
      console.error('Google Maps レビュー取得エラー:', error);
      return [];
    }
  }

  // ブログレビューを模擬的に取得
  async fetchBlogReviews(restaurantName: string): Promise<ExternalReview[]> {
    try {
      const prompt = `「${restaurantName}」についての個人ブログやグルメサイトのレビューを10件生成してください。
実際のブログレビューの特徴：

- 詳細で個人的な体験談
- 料理の写真や詳細な説明
- 価格、サービス、雰囲気の総合評価
- ブロガーらしい文体と表現
- 具体的な訪問日時や状況

以下のJSON形式で回答してください：
{
  "reviews": [
    {
      "reviewerName": "ブロガー名",
      "rating": 1-5,
      "content": "詳細なレビュー内容",
      "date": "YYYY-MM-DD",
      "platform": "個人ブログ/グルメサイト",
      "source": "blog",
      "verified": true/false,
      "trustScore": 1-100,
      "riskFlags": []
    }
  ]
}`;

      const client = this.getGeminiClient();
      if (!client) {
        throw new Error('Gemini client is not available');
      }
      const response = await client.generateStructuredContent(prompt);
      const parsedResponse = await this.parseAIResponse(response, { reviews: [] });
      
      return parsedResponse.reviews.map((review: any) => ({
        ...review,
        id: `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        restaurantName,
        sentiment: this.determineSentiment(review.rating),
        keywords: this.extractKeywords(review.content),
        url: `https://example-blog.com/review/${encodeURIComponent(restaurantName)}`
      }));
    } catch (error) {
      console.error('ブログレビュー取得エラー:', error);
      return [];
    }
  }

  // レビューの信頼性分析とフィルタリング
  async analyzeReviewTrustworthiness(reviews: ExternalReview[]): Promise<ReviewFilterResults> {
    // 評価による分布分析
    const sortedByRating = [...reviews].sort((a, b) => b.rating - a.rating);
    const totalCount = reviews.length;
    
    // 上位5%と下位5%を特定
    const top5PercentCount = Math.ceil(totalCount * 0.05);
    const bottom5PercentCount = Math.ceil(totalCount * 0.05);
    
    const suspiciousHighReviews: ExternalReview[] = [];
    const suspiciousLowReviews: ExternalReview[] = [];
    const trustedReviews: ExternalReview[] = [];

    // 上位5%の高評価レビューを分析
    for (let i = 0; i < top5PercentCount && i < sortedByRating.length; i++) {
      const review = sortedByRating[i];
      if (review && review.rating >= 4.5) {
        const analysis = await this.analyzeSuspiciousContent(review, 'high');
        suspiciousHighReviews.push({
          ...review,
          trustScore: analysis.trustScore,
          riskFlags: analysis.riskFlags
        });
      } else if (review) {
        trustedReviews.push(review);
      }
    }

    // 下位5%の低評価レビューを分析
    const lowRatingReviews = sortedByRating.slice(-bottom5PercentCount);
    for (const review of lowRatingReviews) {
      if (review && review.rating <= 2) {
        const analysis = await this.analyzeSuspiciousContent(review, 'low');
        suspiciousLowReviews.push({
          ...review,
          trustScore: analysis.trustScore,
          riskFlags: analysis.riskFlags
        });
      } else if (review) {
        trustedReviews.push(review);
      }
    }

    // 中間レビューは信頼できるとして扱う
    const middleReviews = sortedByRating.slice(top5PercentCount, -bottom5PercentCount);
    trustedReviews.push(...middleReviews);

    // 統計計算
    const averageRating = trustedReviews.reduce((sum, r) => sum + r.rating, 0) / trustedReviews.length;
    const averageTrustScore = trustedReviews.reduce((sum, r) => sum + (r.trustScore || 75), 0) / trustedReviews.length;

    return {
      trustedReviews,
      suspiciousHighReviews,
      suspiciousLowReviews,
      allTwitterPosts: [], // 別途Twitter分析で追加
      statistics: {
        totalReviews: totalCount,
        trustedCount: trustedReviews.length,
        suspiciousHighCount: suspiciousHighReviews.length,
        suspiciousLowCount: suspiciousLowReviews.length,
        averageRating: Math.round(averageRating * 10) / 10,
        averageTrustScore: Math.round(averageTrustScore)
      }
    };
  }

  // 疑わしいコンテンツの分析
  private async analyzeSuspiciousContent(review: ExternalReview, type: 'high' | 'low'): Promise<{
    trustScore: number;
    riskFlags: string[];
  }> {
    try {
      const prompt = `以下のレビューが${type === 'high' ? 'サクラレビュー' : '嫌がらせレビュー'}である可能性を分析してください：

レビュー内容: "${review.content}"
評価: ${review.rating}星
投稿者: ${review.reviewerName}

以下の観点で分析してください：
${type === 'high' ? `
- 過度に褒めすぎていないか
- 具体性に欠けていないか
- 不自然な表現はないか
- 身内の可能性はないか
` : `
- 過度に批判的でないか
- 具体的な問題点があるか
- 感情的すぎないか
- 競合他社の嫌がらせの可能性はないか
`}

以下のJSON形式で回答してください：
{
  "trustScore": 1-100の信頼度,
  "riskFlags": ["具体的なリスク要因"],
  "reasoning": "分析理由"
}`;

      const client = this.getGeminiClient();
      if (!client) {
        throw new Error('Gemini client is not available');
      }
      const response = await client.generateStructuredContent(prompt);
      const analysis = await this.parseAIResponse(response, {
        trustScore: 50,
        riskFlags: type === 'high' ? ['potential_fake'] : ['potential_attack'],
        reasoning: '分析不可'
      });

      return {
        trustScore: analysis.trustScore,
        riskFlags: analysis.riskFlags
      };
    } catch (error) {
      console.error('信頼性分析エラー:', error);
      return {
        trustScore: 50,
        riskFlags: type === 'high' ? ['potential_fake'] : ['potential_attack']
      };
    }
  }

  // 包括的なレビュー収集とフィルタリング
  async collectAndFilterReviews(restaurantName: string, location: string = '東京'): Promise<ReviewFilterResults> {
    try {
      // 複数ソースからレビューを収集
      const [googleReviews, blogReviews, twitterPosts] = await Promise.all([
        this.fetchGoogleMapsReviews(restaurantName, location),
        this.fetchBlogReviews(restaurantName),
        this.generateTwitterPostsWithGrok(restaurantName) // 既存のTwitter生成機能を使用
      ]);

      // 全レビューを統合
      const allReviews = [...googleReviews, ...blogReviews];

      // 信頼性分析とフィルタリング
      const filterResults = await this.analyzeReviewTrustworthiness(allReviews);
      filterResults.allTwitterPosts = twitterPosts;

      return filterResults;
    } catch (error) {
      console.error('レビュー収集・フィルタリングエラー:', error);
      throw new Error('レビューの収集とフィルタリングに失敗しました');
    }
  }

  // ...existing helper methods...

  private determineSentiment(rating: number): 'positive' | 'negative' | 'neutral' {
    if (rating >= 4) return 'positive';
    if (rating <= 2) return 'negative';
    return 'neutral';
  }

  private extractKeywords(content: string): string[] {
    // 簡単なキーワード抽出（実際はより高度な自然言語処理を使用）
    const keywords = content.match(/[ぁ-んァ-ヶー一-龯]{2,}/g) || [];
    return keywords.slice(0, 5);
  }

  // 既存のTwitter生成機能を使用
  private async generateTwitterPostsWithGrok(restaurantName: string): Promise<TwitterPost[]> {
    try {
      const prompt = `レストラン「${restaurantName}」について、Twitterで実際に投稿されそうなリアルな口コミツイートを10件生成してください。

以下の要素を含めてください：
- 様々なユーザータイプ（グルメ好き、一般客、インフルエンサーなど）
- 異なる感情（満足、不満、普通）
- リアルなTwitterの文体（絵文字、略語、ハッシュタグ含む）
- 料理の写真投稿を想定したコメント
- #グルメ などのハッシュタグ

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
      "restaurantMentions": ["${restaurantName}"],
      "trustScore": 70,
      "riskFlags": []
    }
  ]
}`;

      const client = this.getGrokClient();
      if (!client) {
        throw new Error('Grok client is not available');
      }
      const response = await client.generateStructuredContent(prompt);
      const parsedResponse = await this.parseAIResponse(response, { posts: [] });
      
      return parsedResponse.posts.map((post: any) => ({
        ...post,
        id: `twitter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        restaurantMentions: [restaurantName]
      }));
    } catch (error) {
      console.error('Twitter投稿生成エラー:', error);
      return [];
    }
  }

  // 既存のJSON解析機能
  private async parseAIResponse(response: string, fallbackData: any): Promise<any> {
    try {
      const cleaned = this.cleanJsonResponse(response);
      return JSON.parse(cleaned);
    } catch (error) {
      console.log('JSON解析失敗:', error);
      return fallbackData;
    }
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
}

export const realReviewScraperService = new RealReviewScraperService();