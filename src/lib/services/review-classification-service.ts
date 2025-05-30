import { Review } from '@/types/index'
import { getBusinessEssenceConfig } from '@/lib/business-essence-config'
import { GeminiClient } from '../ai/gemini-client'
import { getAIConfig } from '../ai-config'

export interface ClassifiedReview extends Review {
  isEssence: boolean
  essenceScore: number
  classification: 'essence' | 'other'
  classificationReason?: string
}

interface BusinessEssenceConfig {
  name: string
  essenceAspects: string[]
  otherAspects: string[]
  essenceKeywords: string[]
  otherKeywords: string[]
}

class ReviewClassificationService {
  private geminiClient: GeminiClient | null = null

  private getGeminiClient(): GeminiClient | null {
    try {
      if (!this.geminiClient) {
        this.geminiClient = new GeminiClient(getAIConfig('gemini'))
      }
      return this.geminiClient
    } catch (error) {
      console.warn('GeminiClientの初期化に失敗しました:', error)
      return null
    }
  }

  /**
   * レビューを本質評価とその他に分類
   */
  async classifyReviews(reviews: Review[], categoryId: string): Promise<ClassifiedReview[]> {
    const config = getBusinessEssenceConfig(categoryId)
    
    if (!config) {
      // 設定がない場合は全て「その他」として分類
      return reviews.map(review => ({
        ...review,
        isEssence: false,
        essenceScore: 0,
        classification: 'other' as const
      }))
    }

    const classifiedReviews = await Promise.all(
      reviews.map(review => this.classifySingleReview(review, config))
    )

    return classifiedReviews
  }

  /**
   * 単一レビューの分類
   */
  private async classifySingleReview(
    review: Review, 
    config: BusinessEssenceConfig
  ): Promise<ClassifiedReview> {
    try {
      // キーワードベースの基本分類
      const keywordScore = this.calculateKeywordScore(review, config)
      
      // AI分析による詳細分類
      const aiClassification = await this.analyzeWithAI(review, config)
      
      // 最終スコア計算（キーワード50% + AI分析50%）
      const finalScore = (keywordScore + aiClassification.score) / 2
      const isEssence = finalScore > 0.6
      
      return {
        ...review,
        isEssence,
        essenceScore: finalScore,
        classification: isEssence ? 'essence' : 'other',
        classificationReason: aiClassification.reason
      }
    } catch (error) {
      console.error('レビュー分類エラー:', error)
      // エラー時はキーワードベースのみで分類
      const keywordScore = this.calculateKeywordScore(review, config)
      const isEssence = keywordScore > 0.6
      
      return {
        ...review,
        isEssence,
        essenceScore: keywordScore,
        classification: isEssence ? 'essence' : 'other'
      }
    }
  }

  /**
   * キーワードベースのスコア計算
   */
  private calculateKeywordScore(review: Review, config: BusinessEssenceConfig): number {
    const text = `${review.title} ${review.content}`.toLowerCase()
    
    let essenceScore = 0
    let otherScore = 0
    
    // 本質キーワードのマッチング
    config.essenceKeywords.forEach((keyword: string) => {
      if (text.includes(keyword.toLowerCase())) {
        essenceScore += 1
      }
    })
    
    // その他キーワードのマッチング
    config.otherKeywords.forEach((keyword: string) => {
      if (text.includes(keyword.toLowerCase())) {
        otherScore += 1
      }
    })
    
    const totalMatches = essenceScore + otherScore
    if (totalMatches === 0) return 0.5 // 中性
    
    return essenceScore / totalMatches
  }

  /**
   * AI分析による分類
   */
  private async analyzeWithAI(review: Review, config: BusinessEssenceConfig): Promise<{
    score: number
    reason: string
  }> {
    const geminiClient = this.getGeminiClient()
    
    if (!geminiClient) {
      return {
        score: 0.5,
        reason: 'AIクライアントが利用できないため、キーワードベースで判定'
      }
    }

    try {
      const prompt = `
以下のレビューを分析し、${config.name}における本質的な評価かどうかを判定してください。

業種: ${config.name}
本質的な評価軸: ${config.essenceAspects.join(', ')}
その他の評価軸: ${config.otherAspects.join(', ')}

レビュー:
タイトル: ${review.title}
内容: ${review.content}

以下のJSON形式で回答してください：
{
  "score": 0.0〜1.0の数値（1.0に近いほど本質的）,
  "reason": "判定理由を簡潔に説明"
}
`

      const response = await geminiClient.generateContent(prompt)
      const result = JSON.parse(response)
      
      return {
        score: Math.max(0, Math.min(1, result.score)),
        reason: result.reason || '分析完了'
      }
    } catch (error) {
      console.error('AI分析エラー:', error)
      return {
        score: 0.5,
        reason: 'AI分析に失敗したため、キーワードベースで判定'
      }
    }
  }

  /**
   * 本質評価のみを取得
   */
  getEssenceReviews(classifiedReviews: ClassifiedReview[]): ClassifiedReview[] {
    return classifiedReviews.filter(review => review.isEssence)
  }

  /**
   * その他評価のみを取得
   */
  getOtherReviews(classifiedReviews: ClassifiedReview[]): ClassifiedReview[] {
    return classifiedReviews.filter(review => !review.isEssence)
  }

  /**
   * 統計情報を取得
   */
  getClassificationStats(classifiedReviews: ClassifiedReview[]) {
    const essenceCount = classifiedReviews.filter(r => r.isEssence).length
    const otherCount = classifiedReviews.length - essenceCount
    const essenceAvgRating = essenceCount > 0 
      ? classifiedReviews.filter(r => r.isEssence)
          .reduce((sum, r) => sum + r.rating, 0) / essenceCount
      : 0
    const otherAvgRating = otherCount > 0
      ? classifiedReviews.filter(r => !r.isEssence)
          .reduce((sum, r) => sum + r.rating, 0) / otherCount
      : 0

    return {
      total: classifiedReviews.length,
      essenceCount,
      otherCount,
      essencePercentage: classifiedReviews.length > 0 
        ? (essenceCount / classifiedReviews.length) * 100 
        : 0,
      essenceAvgRating: Math.round(essenceAvgRating * 10) / 10,
      otherAvgRating: Math.round(otherAvgRating * 10) / 10
    }
  }
}

export const reviewClassificationService = new ReviewClassificationService()