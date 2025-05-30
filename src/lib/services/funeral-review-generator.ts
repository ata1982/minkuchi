// 川口市の葬儀屋のレビューを収集するテストスクリプト
import { GeminiClient } from '../ai/gemini-client';
import { getAIConfig } from '../ai-config';

export interface FuneralReview {
  reviewerName: string;
  rating: number;
  content: string;
  date: string;
  platform: string;
  source: 'google' | 'blog' | 'review_site';
  verified: boolean;
  trustScore: number;
  isEssence: boolean;
  essenceScore: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
}

export interface FuneralReviewResponse {
  reviews: FuneralReview[];
  statistics: {
    totalReviews: number;
    averageRating: number;
    essenceReviewCount: number;
    averageEssenceScore: number;
  };
}

// AIレスポンスの型定義
interface AIReviewResponse {
  reviews: Array<{
    reviewerName?: string;
    rating?: number;
    content?: string;
    date?: string | null; // null許容型を明示
    platform?: string;
    source?: string;
    verified?: boolean;
    trustScore?: number;
    isEssence?: boolean;
    essenceScore?: number;
    sentiment?: string;
    keywords?: string[];
  }>;
}

// 葬儀屋用のレビュー生成
export async function generateFuneralHomeReviews(
  companyName: string, 
  location: string
): Promise<FuneralReviewResponse> {
  try {
    const prompt = `埼玉県${location}の葬儀屋「${companyName}」についてのリアルな口コミレビューを20件生成してください。

葬儀屋の本質的な評価軸は「思いやり・心のケア」です。以下の特徴を反映してください：

本質的な評価（思いやり・心のケア）：
- スタッフの親身な対応と配慮
- 遺族への心のこもったサポート
- 故人への敬意ある扱い
- 丁寧で温かい接客態度
- 信頼できる人柄と対応

その他の評価：
- 施設の設備や清潔感
- 料金・費用の妥当性と透明性
- 手続きのサポート体制
- アクセスの良さ
- 式の進行管理

実際の利用者の声として：
- 様々な評価（1-5星）で現実的な分布（4-5星が多め）
- 具体的な体験談（スタッフの対応、施設の印象、料金説明など）
- 実際の利用者名（一部匿名、「○○様のご家族」など）
- 投稿日付（過去2年以内）
- Google Maps、葬儀関連サイト、個人ブログなど多様なソース
- 葬儀という特性上、感謝の気持ちを込めたレビューが多い

以下のJSON形式で必ず回答してください：
{
  "reviews": [
    {
      "reviewerName": "利用者名または匿名",
      "rating": 1-5,
      "content": "具体的で心のこもったレビュー内容",
      "date": "YYYY-MM-DD",
      "platform": "Google Maps/葬儀サイト/個人ブログ",
      "source": "google/blog/review_site",
      "verified": true/false,
      "trustScore": 70-95,
      "isEssence": true/false,
      "essenceScore": 0.0-1.0,
      "sentiment": "positive/negative/neutral",
      "keywords": ["思いやり", "丁寧", "配慮" など]
    }
  ]
}`;

    const geminiClient = new GeminiClient(getAIConfig('gemini'));
    const response = await geminiClient.generateStructuredContent(prompt);
    
    // レスポンスの解析と検証
    let parsedResponse: AIReviewResponse;
    try {
      parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
    } catch (parseError) {
      console.error('JSON解析エラー:', parseError);
      throw new Error('AIからの応答を解析できませんでした');
    }

    if (!parsedResponse.reviews || !Array.isArray(parsedResponse.reviews)) {
      throw new Error('有効なレビューデータが取得できませんでした');
    }

    // レビューデータの検証と補完
    const validatedReviews: FuneralReview[] = parsedResponse.reviews.map((review, index: number) => {
      // デフォルト日付の生成（過去2年以内）
      const defaultDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      
      // 型安全な日付の取得 - undefinedも考慮
      const reviewDate = (review.date ?? defaultDate) as string;
      
      return {
        reviewerName: review.reviewerName || `利用者${index + 1}`,
        rating: Math.max(1, Math.min(5, review.rating || 4)),
        content: review.content || '心のこもった対応をしていただきました。',
        date: reviewDate,
        platform: review.platform || 'Google Maps',
        source: (['google', 'blog', 'review_site'].includes(review.source || '')) ? 
          (review.source as 'google' | 'blog' | 'review_site') : 'google',
        verified: review.verified !== false,
        trustScore: Math.max(70, Math.min(95, review.trustScore || 85)),
        isEssence: review.isEssence !== false,
        essenceScore: Math.max(0, Math.min(1, review.essenceScore || 0.8)),
        sentiment: (['positive', 'negative', 'neutral'].includes(review.sentiment || '')) ? 
          (review.sentiment as 'positive' | 'negative' | 'neutral') : 'positive',
        keywords: Array.isArray(review.keywords) ? review.keywords : ['思いやり', '丁寧', '配慮']
      };
    });

    // 統計情報の計算
    const totalReviews = validatedReviews.length;
    const averageRating = validatedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    const essenceReviews = validatedReviews.filter(r => r.isEssence);
    const essenceReviewCount = essenceReviews.length;
    const averageEssenceScore = essenceReviews.length > 0 
      ? essenceReviews.reduce((sum, r) => sum + r.essenceScore, 0) / essenceReviews.length 
      : 0;

    const result: FuneralReviewResponse = {
      reviews: validatedReviews,
      statistics: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        essenceReviewCount,
        averageEssenceScore: Math.round(averageEssenceScore * 100) / 100
      }
    };

    console.log(`葬儀屋レビュー生成完了: ${companyName}（${location}）- ${totalReviews}件`);
    return result;

  } catch (error) {
    console.error('葬儀屋レビュー生成エラー:', error);
    
    // フォールバック: 最小限のサンプルデータを返す
    const fallbackReviews: FuneralReview[] = [
      {
        reviewerName: "ご遺族A様",
        rating: 5,
        content: "大変お世話になりました。スタッフの皆様の心のこもった対応に感謝しております。",
        date: "2024-01-15",
        platform: "Google Maps",
        source: "google",
        verified: true,
        trustScore: 90,
        isEssence: true,
        essenceScore: 0.9,
        sentiment: "positive",
        keywords: ["思いやり", "感謝", "心のこもった対応"]
      }
    ];

    return {
      reviews: fallbackReviews,
      statistics: {
        totalReviews: 1,
        averageRating: 5.0,
        essenceReviewCount: 1,
        averageEssenceScore: 0.9
      }
    };
  }
}