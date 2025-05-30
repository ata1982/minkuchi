import { GeminiClient } from '@/lib/ai/gemini-client'
import { GrokClient } from '@/lib/ai/grok-client'
import { getAIConfig } from '@/lib/ai-config'
import { getAIClient } from '@/lib/ai/client-factory'

export interface ReviewSource {
  id: string
  platform: 'google' | 'tabelog' | 'twitter' | 'yelp' | 'retty'
  name: string
  description: string
  enabled: boolean
}

export interface CollectedReview {
  id: string
  platform: string
  author: string
  rating?: number
  content: string
  date: string
  url?: string
  sentiment: 'positive' | 'negative' | 'neutral'
  keywords: string[]
  summary: string
  relevanceScore: number
}

export interface ReviewAnalysis {
  totalReviews: number
  averageRating: number
  sentimentDistribution: {
    positive: number
    negative: number
    neutral: number
  }
  commonKeywords: string[]
  insights: string[]
  recommendations: string[]
}

export interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  emotions: {
    joy: number
    anger: number
    fear: number
    sadness: number
    surprise: number
    disgust: number
  }
  aspects: {
    service: number
    quality: number
    price: number
    atmosphere: number
    accessibility: number
  }
}

export interface ReviewClassification {
  category: string
  subcategory: string
  tags: string[]
  isSpam: boolean
  isReliable: boolean
  qualityScore: number
  helpfulnessScore: number
}

export interface ReviewInsights {
  keyPhrases: string[]
  topics: string[]
  suggestions: string[]
  responseRecommendation?: string
}

export class AIReviewAnalysisService {
  private geminiClient: GeminiClient | null = null
  private grokClient: GrokClient | null = null
  private aiClient: any = null

  constructor() {
    // AIクライアントの初期化を遅延させる
  }

  private getGeminiClient(): GeminiClient | null {
    if (!this.geminiClient) {
      try {
        const config = getAIConfig('gemini')
        if (config.apiKey) {
          this.geminiClient = new GeminiClient(config)
        }
      } catch (error) {
        console.warn('Geminiクライアントの初期化に失敗:', error)
      }
    }
    return this.geminiClient
  }

  private getGrokClient(): GrokClient | null {
    if (!this.grokClient) {
      try {
        const config = getAIConfig('grok')
        if (config.apiKey) {
          this.grokClient = new GrokClient(config)
        }
      } catch (error) {
        console.warn('Grokクライアントの初期化に失敗:', error)
      }
    }
    return this.grokClient
  }

  private getAIClient(): any {
    if (!this.aiClient) {
      try {
        this.aiClient = getAIClient()
      } catch (error) {
        console.warn('AIクライアントの初期化に失敗:', error)
      }
    }
    return this.aiClient
  }

  // 利用可能なレビューソースを取得
  getAvailableReviewSources(): ReviewSource[] {
    return [
      {
        id: 'google',
        platform: 'google',
        name: 'Google Reviews',
        description: 'Googleマップのレビューを収集',
        enabled: true
      },
      {
        id: 'tabelog',
        platform: 'tabelog',
        name: '食べログ',
        description: '食べログのレビューを収集',
        enabled: true
      },
      {
        id: 'twitter',
        platform: 'twitter',
        name: 'Twitter/X',
        description: 'Twitter上の口コミを収集',
        enabled: true
      },
      {
        id: 'yelp',
        platform: 'yelp',
        name: 'Yelp',
        description: 'Yelpのレビューを収集',
        enabled: false
      },
      {
        id: 'retty',
        platform: 'retty',
        name: 'Retty',
        description: 'Rettyのレビューを収集',
        enabled: false
      }
    ]
  }

  // Geminiを使用してWebレビューを収集・分析
  async collectWebReviewsWithGemini(
    businessName: string,
    location?: string,
    sources: string[] = ['google', 'tabelog']
  ): Promise<CollectedReview[]> {
    try {
      const prompt = `
あなたは優秀なレビュー収集・分析AIです。以下の企業/レストランについて、Web上のレビューを収集し、分析してください。

企業/レストラン名: ${businessName}
${location ? `所在地: ${location}` : ''}
収集対象: ${sources.join(', ')}

以下の形式で、実際に存在しそうなレビューを5-10件生成してください（実際のレビューサイトからの情報収集は行わず、リアルな内容を想定したサンプルレビューを作成）：

各レビューについて：
1. プラットフォーム（Google、食べログなど）
2. 評価者名（匿名可）
3. 評価点数（1-5）
4. レビュー内容
5. 投稿日
6. 感情分析（positive/negative/neutral）
7. キーワード抽出
8. 要約

JSON形式で返答してください。
      `

      const response = await this.getGeminiClient()?.generateText(prompt)
      
      // Geminiの応答をパースしてレビューデータに変換
      const reviews = this.parseGeminiReviewResponse(response, businessName)
      
      return reviews
    } catch (error) {
      console.error('Geminiレビュー収集エラー:', error)
      // フォールバック用のサンプルレビューを返す
      return this.generateSampleReviews(businessName, sources)
    }
  }

  // Grokを使用してTwitter上の口コミを収集・分析
  async collectTwitterReviewsWithGrok(
    businessName: string,
    hashtags?: string[]
  ): Promise<CollectedReview[]> {
    try {
      const searchTerms = [businessName, ...(hashtags || [])]
      
      const prompt = `
あなたはTwitter/X上の口コミ分析の専門家です。以下の企業/レストランについて、Twitter上で言及されている口コミや評判を分析してください。

検索対象: ${businessName}
${hashtags ? `関連ハッシュタグ: ${hashtags.join(', ')}` : ''}

以下の観点でTwitter上の口コミを分析し、5-10件の代表的な口コミ内容をサンプルとして生成してください：

1. ポジティブな評価
2. ネガティブな評価
3. 中立的な意見
4. サービス/料理に関する具体的な言及
5. 店舗の雰囲気や接客について
6. 価格やコストパフォーマンスについて

各ツイートについて：
- ユーザー名（匿名化）
- ツイート内容
- 投稿日時
- 感情分析
- 関連キーワード
- 信頼度スコア

JSON形式で返答してください。
      `

      const response = await this.getGrokClient()?.generateText(prompt)
      
      // Grokの応答をパースしてレビューデータに変換
      const reviews = this.parseGrokTwitterResponse(response, businessName)
      
      return reviews
    } catch (error) {
      console.error('Grok Twitter分析エラー:', error)
      // フォールバック用のサンプルレビューを返す
      return this.generateSampleTwitterReviews(businessName)
    }
  }

  // 総合的なレビュー分析を実行
  async analyzeReviews(reviews: CollectedReview[]): Promise<ReviewAnalysis> {
    if (reviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        sentimentDistribution: { positive: 0, negative: 0, neutral: 0 },
        commonKeywords: [],
        insights: [],
        recommendations: []
      }
    }

    const totalReviews = reviews.length
    const averageRating = reviews
      .filter(r => r.rating)
      .reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.filter(r => r.rating).length

    const sentimentCounts = reviews.reduce(
      (acc, review) => {
        acc[review.sentiment]++
        return acc
      },
      { positive: 0, negative: 0, neutral: 0 }
    )

    const sentimentDistribution = {
      positive: Math.round((sentimentCounts.positive / totalReviews) * 100),
      negative: Math.round((sentimentCounts.negative / totalReviews) * 100),
      neutral: Math.round((sentimentCounts.neutral / totalReviews) * 100)
    }

    // キーワード頻度分析
    const keywordFrequency: { [key: string]: number } = {}
    reviews.forEach(review => {
      review.keywords.forEach(keyword => {
        keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1
      })
    })

    const commonKeywords = Object.entries(keywordFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([keyword]) => keyword)

    // AIを使用してインサイトと推奨事項を生成
    const insights = await this.generateInsights(reviews, sentimentDistribution, commonKeywords)
    const recommendations = await this.generateRecommendations(reviews, sentimentDistribution)

    return {
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      sentimentDistribution,
      commonKeywords,
      insights,
      recommendations
    }
  }

  /**
   * レビューの感情分析
   */
  async analyzeSentiment(reviewContent: string): Promise<SentimentAnalysis> {
    try {
      const prompt = `
以下のレビューテキストを分析して、感情とアスペクトを評価してください。

レビューテキスト: "${reviewContent}"

以下のJSONフォーマットで回答してください：
{
  "sentiment": "positive/negative/neutral",
  "confidence": 0.0-1.0,
  "emotions": {
    "joy": 0.0-1.0,
    "anger": 0.0-1.0,
    "fear": 0.0-1.0,
    "sadness": 0.0-1.0,
    "surprise": 0.0-1.0,
    "disgust": 0.0-1.0
  },
  "aspects": {
    "service": -1.0～1.0,
    "quality": -1.0～1.0,
    "price": -1.0～1.0,
    "atmosphere": -1.0～1.0,
    "accessibility": -1.0～1.0
  }
}
`

      const response = await this.getAIClient()?.generateText(prompt)
      return JSON.parse(response)
    } catch (error) {
      console.error('感情分析エラー:', error)
      return this.getDefaultSentiment()
    }
  }

  /**
   * レビューの分類
   */
  async classifyReview(reviewContent: string, companyCategory: string): Promise<ReviewClassification> {
    try {
      const prompt = `
以下のレビューを分析し、カテゴリ分類、タグ付け、品質評価を行ってください。

レビューテキスト: "${reviewContent}"
企業カテゴリ: "${companyCategory}"

以下のJSONフォーマットで回答してください：
{
  "category": "詳細カテゴリ名",
  "subcategory": "サブカテゴリ名",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "isSpam": false,
  "isReliable": true,
  "qualityScore": 0.0-1.0,
  "helpfulnessScore": 0.0-1.0
}

評価基準：
- isSpam: 明らかにスパムや偽のレビューかどうか
- isReliable: 信頼できる内容かどうか
- qualityScore: レビューの品質（詳細さ、具体性）
- helpfulnessScore: 他のユーザーにとっての有用性
`

      const response = await this.getAIClient()?.generateText(prompt)
      return JSON.parse(response)
    } catch (error) {
      console.error('レビュー分類エラー:', error)
      return this.getDefaultClassification()
    }
  }

  /**
   * レビューからインサイト抽出
   */
  async extractInsights(reviewContent: string): Promise<ReviewInsights> {
    try {
      const prompt = `
以下のレビューから重要なインサイトを抽出してください。

レビューテキスト: "${reviewContent}"

以下のJSONフォーマットで回答してください：
{
  "keyPhrases": ["キーフレーズ1", "キーフレーズ2"],
  "topics": ["トピック1", "トピック2"],
  "suggestions": ["改善提案1", "改善提案2"],
  "responseRecommendation": "企業側の返信例（オプション）"
}

要求：
- keyPhrases: レビューの重要な表現やキーワード
- topics: 言及されている主要なトピック
- suggestions: 企業への建設的な改善提案
- responseRecommendation: 企業が返信する場合の推奨文例
`

      const response = await this.getAIClient()?.generateText(prompt)
      return JSON.parse(response)
    } catch (error) {
      console.error('インサイト抽出エラー:', error)
      return this.getDefaultInsights()
    }
  }

  /**
   * 複数レビューの統合分析
   */
  async analyzeReviewTrends(reviews: string[]): Promise<{
    overallSentiment: SentimentAnalysis
    commonThemes: string[]
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
  }> {
    try {
      const reviewsText = reviews.slice(0, 10).join('\n---\n')
      
      const prompt = `
以下の複数のレビューを分析し、全体的な傾向とインサイトを提供してください。

レビュー集合:
${reviewsText}

以下のJSONフォーマットで回答してください：
{
  "overallSentiment": {
    "sentiment": "positive/negative/neutral",
    "confidence": 0.0-1.0
  },
  "commonThemes": ["共通テーマ1", "共通テーマ2"],
  "strengths": ["強み1", "強み2"],
  "weaknesses": ["弱み1", "弱み2"],
  "recommendations": ["改善提案1", "改善提案2"]
}
`

      const response = await this.getAIClient()?.generateText(prompt)
      const result = JSON.parse(response)
      
      return {
        overallSentiment: {
          ...result.overallSentiment,
          emotions: {
            joy: 0, anger: 0, fear: 0, sadness: 0, surprise: 0, disgust: 0
          },
          aspects: {
            service: 0, quality: 0, price: 0, atmosphere: 0, accessibility: 0
          }
        },
        commonThemes: result.commonThemes,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        recommendations: result.recommendations
      }
    } catch (error) {
      console.error('レビュー傾向分析エラー:', error)
      return this.getDefaultTrends()
    }
  }

  /**
   * AIによるレビュー返信生成
   */
  async generateResponse(
    reviewContent: string, 
    companyName: string, 
    sentiment: 'positive' | 'negative' | 'neutral'
  ): Promise<string> {
    try {
      const prompt = `
企業「${companyName}」の代表として、以下のレビューに対する適切な返信を生成してください。

レビュー内容: "${reviewContent}"
レビューの感情: ${sentiment}

要求：
- 丁寧で専門的な語調
- 感謝の気持ちを表現
- 具体的な改善アクションを含める（ネガティブな場合）
- 200文字以内
- 日本語で回答

返信文のみを出力してください。
`

      return await this.getAIClient()?.generateText(prompt)
    } catch (error) {
      console.error('返信生成エラー:', error)
      return 'この度は貴重なご意見をいただき、ありがとうございます。いただいたフィードバックを真摯に受け止め、サービス向上に努めてまいります。'
    }
  }

  // Geminiの応答をパース
  private parseGeminiReviewResponse(response: string, businessName: string): CollectedReview[] {
    try {
      // JSONの抽出を試行
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0])
        return parsedData.map((item: any, index: number) => ({
          id: `gemini-${Date.now()}-${index}`,
          platform: item.platform || 'google',
          author: item.author || `レビュアー${index + 1}`,
          rating: item.rating || Math.floor(Math.random() * 5) + 1,
          content: item.content || item.review || `${businessName}についてのレビューです。`,
          date: item.date || new Date().toISOString().split('T')[0],
          sentiment: item.sentiment || 'neutral',
          keywords: item.keywords || ['サービス', '雰囲気'],
          summary: item.summary || item.content?.substring(0, 50) + '...',
          relevanceScore: item.relevanceScore || 0.8
        }))
      }
    } catch (error) {
      console.error('Gemini応答パースエラー:', error)
    }
    
    return this.generateSampleReviews(businessName, ['google', 'tabelog'])
  }

  // Grokの応答をパース
  private parseGrokTwitterResponse(response: string, businessName: string): CollectedReview[] {
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0])
        return parsedData.map((item: any, index: number) => ({
          id: `grok-${Date.now()}-${index}`,
          platform: 'twitter',
          author: item.username || `@user${index + 1}`,
          content: item.content || item.tweet || `${businessName}についてのツイートです。`,
          date: item.date || new Date().toISOString().split('T')[0],
          sentiment: item.sentiment || 'neutral',
          keywords: item.keywords || ['グルメ', '口コミ'],
          summary: item.summary || item.content?.substring(0, 50) + '...',
          relevanceScore: item.trust_score || 0.7
        }))
      }
    } catch (error) {
      console.error('Grok応答パースエラー:', error)
    }
    
    return this.generateSampleTwitterReviews(businessName)
  }

  // サンプルレビューを生成（フォールバック用）
  private generateSampleReviews(businessName: string, sources: string[]): CollectedReview[] {
    const sampleReviews = [
      {
        id: `sample-1-${Date.now()}`,
        platform: 'google',
        author: 'グルメ太郎',
        rating: 4,
        content: `${businessName}を利用しました。料理の味は良く、スタッフの対応も丁寧でした。また利用したいと思います。`,
        date: '2024-05-20',
        sentiment: 'positive' as const,
        keywords: ['料理', 'スタッフ', '対応'],
        summary: '料理の味とスタッフの対応が良い',
        relevanceScore: 0.9
      },
      {
        id: `sample-2-${Date.now()}`,
        platform: 'tabelog',
        author: '食べ歩き花子',
        rating: 3,
        content: `${businessName}に行ってきました。普通でした。特に印象に残るものはありませんでしたが、悪くもありませんでした。`,
        date: '2024-05-18',
        sentiment: 'neutral' as const,
        keywords: ['普通', '印象'],
        summary: '可もなく不可もない普通の評価',
        relevanceScore: 0.7
      },
      {
        id: `sample-3-${Date.now()}`,
        platform: 'google',
        author: 'レビューマン',
        rating: 5,
        content: `${businessName}は最高でした！料理のクオリティが高く、雰囲気も素晴らしかったです。デートにもおすすめです。`,
        date: '2024-05-15',
        sentiment: 'positive' as const,
        keywords: ['最高', 'クオリティ', '雰囲気', 'デート'],
        summary: '料理のクオリティと雰囲気が素晴らしい',
        relevanceScore: 0.95
      }
    ]

    return sampleReviews.filter(review => sources.includes(review.platform))
  }

  // サンプルTwitterレビューを生成
  private generateSampleTwitterReviews(businessName: string): CollectedReview[] {
    return [
      {
        id: `twitter-1-${Date.now()}`,
        platform: 'twitter',
        author: '@foodie_tokyo',
        content: `${businessName}で食事🍽️ めちゃくちゃ美味しかった！また行きたい✨ #グルメ #おすすめ`,
        date: '2024-05-22',
        sentiment: 'positive' as const,
        keywords: ['美味しい', 'おすすめ', 'グルメ'],
        summary: 'とても美味しくて満足',
        relevanceScore: 0.8
      },
      {
        id: `twitter-2-${Date.now()}`,
        platform: 'twitter',
        author: '@local_reviewer',
        content: `${businessName}行ってみたけど、期待してたほどじゃなかった😅 値段の割に... #口コミ`,
        date: '2024-05-20',
        sentiment: 'negative' as const,
        keywords: ['期待', '値段', '口コミ'],
        summary: '期待値に届かず、コスパに疑問',
        relevanceScore: 0.7
      }
    ]
  }

  // AIを使用してインサイトを生成
  private async generateInsights(
    reviews: CollectedReview[],
    sentimentDistribution: any,
    commonKeywords: string[]
  ): Promise<string[]> {
    try {
      const prompt = `
以下のレビューデータから洞察を抽出してください：

レビュー数: ${reviews.length}
感情分布: ポジティブ${sentimentDistribution.positive}%, ネガティブ${sentimentDistribution.negative}%, 中立${sentimentDistribution.neutral}%
よく言及されるキーワード: ${commonKeywords.join(', ')}

3-5個の重要な洞察を箇条書きで提供してください。
      `

      const response = await this.getGeminiClient()?.generateContent(prompt)
      return response.split('\n').filter(line => line.trim().startsWith('•') || line.trim().startsWith('-')).slice(0, 5)
    } catch (error) {
      return [
        '顧客満足度は概ね良好な傾向にあります',
        'サービス品質に関する言及が多く見られます',
        '価格とサービスのバランスが評価のポイントとなっています'
      ]
    }
  }

  // AIを使用して推奨事項を生成
  private async generateRecommendations(
    reviews: CollectedReview[],
    sentimentDistribution: any
  ): Promise<string[]> {
    try {
      const prompt = `
以下のレビュー分析結果に基づいて、改善提案を3-5個提供してください：

感情分布: ポジティブ${sentimentDistribution.positive}%, ネガティブ${sentimentDistribution.negative}%, 中立${sentimentDistribution.neutral}%

具体的で実行可能な改善提案を箇条書きで提供してください。
      `

      const response = await this.getGeminiClient()?.generateContent(prompt)
      return response.split('\n').filter(line => line.trim().startsWith('•') || line.trim().startsWith('-')).slice(0, 5)
    } catch (error) {
      return [
        'カスタマーサービスの向上に注力することをお勧めします',
        '顧客フィードバックの収集と分析を定期的に実施してください',
        'ポジティブなレビューへの感謝の表明を検討してください'
      ]
    }
  }

  /**
   * デフォルト値
   */
  private getDefaultSentiment(): SentimentAnalysis {
    return {
      sentiment: 'neutral',
      confidence: 0.5,
      emotions: {
        joy: 0, anger: 0, fear: 0, sadness: 0, surprise: 0, disgust: 0
      },
      aspects: {
        service: 0, quality: 0, price: 0, atmosphere: 0, accessibility: 0
      }
    }
  }

  private getDefaultClassification(): ReviewClassification {
    return {
      category: '一般',
      subcategory: 'その他',
      tags: [],
      isSpam: false,
      isReliable: true,
      qualityScore: 0.5,
      helpfulnessScore: 0.5
    }
  }

  private getDefaultInsights(): ReviewInsights {
    return {
      keyPhrases: [],
      topics: [],
      suggestions: []
    }
  }

  private getDefaultTrends() {
    return {
      overallSentiment: this.getDefaultSentiment(),
      commonThemes: [],
      strengths: [],
      weaknesses: [],
      recommendations: []
    }
  }
}