import { getAIClient } from '@/lib/ai/client-factory'

export interface ConversationContext {
  userId?: string
  location?: string
  preferences?: {
    cuisine?: string[]
    priceRange?: string
    distance?: number
    dietary?: string[]
  }
  conversationHistory: ConversationMessage[]
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    suggestions?: string[]
    recommendations?: CompanyRecommendation[]
    actions?: Array<{
      type: string
      label: string
      data: Record<string, unknown>
    }>
  }
}

export interface CompanyRecommendation {
  id: string
  name: string
  category: string
  rating: number
  description: string
  distance?: number
  priceRange?: string
  imageUrl?: string
  reasons: string[]
  confidence: number
}

export interface ConversationAction {
  type: 'search' | 'reserve' | 'directions' | 'reviews' | 'call'
  label: string
  data: Record<string, unknown>
}

export class AIConciergeChatService {
  private aiClient = getAIClient()
  private context: ConversationContext

  constructor(initialContext?: Partial<ConversationContext>) {
    this.context = {
      conversationHistory: [],
      ...initialContext
    }
  }

  /**
   * ユーザーメッセージを処理し、AI応答を生成
   */
  async processMessage(userMessage: string): Promise<ConversationMessage> {
    // ユーザーメッセージを履歴に追加
    const userMsg: ConversationMessage = {
      id: this.generateMessageId(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    this.context.conversationHistory.push(userMsg)

    try {
      // 意図解析
      const intent = await this.analyzeIntent(userMessage)
      
      // コンテキスト情報の抽出
      const extractedInfo = await this.extractInformation(userMessage)
      
      // 応答生成
      const response = await this.generateResponse(userMessage, intent, extractedInfo)
      
      // AIメッセージを履歴に追加
      const aiMsg: ConversationMessage = {
        id: this.generateMessageId(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        ...(response.metadata && { metadata: response.metadata })
      }
      this.context.conversationHistory.push(aiMsg)

      return aiMsg
    } catch (error) {
      console.error('AI応答生成エラー:', error)
      return this.getErrorResponse()
    }
  }

  /**
   * ユーザーの意図を分析
   */
  private async analyzeIntent(message: string): Promise<{
    type: 'search' | 'recommendation' | 'information' | 'booking' | 'complaint' | 'other'
    confidence: number
    entities: string[]
  }> {
    const prompt = `
以下のユーザーメッセージから意図を分析してください：

メッセージ: "${message}"

以下のJSONフォーマットで回答してください：
{
  "type": "search/recommendation/information/booking/complaint/other",
  "confidence": 0.0-1.0,
  "entities": ["抽出されたエンティティ1", "エンティティ2"]
}

意図の種類：
- search: 店舗・サービス検索
- recommendation: おすすめ求め
- information: 情報問い合わせ
- booking: 予約関連
- complaint: 苦情・問題報告
- other: その他
`

    try {
      const response = await this.aiClient.generateText(prompt)
      return JSON.parse(response)
    } catch (error) {
      return {
        type: 'other',
        confidence: 0.5,
        entities: []
      }
    }
  }

  /**
   * メッセージから情報を抽出
   */
  private async extractInformation(message: string): Promise<{
    location?: string
    cuisine?: string
    priceRange?: string
    time?: string
    partySize?: number
    dietary?: string[]
  }> {
    const prompt = `
以下のメッセージから具体的な情報を抽出してください：

メッセージ: "${message}"

以下のJSONフォーマットで回答してください：
{
  "location": "場所（あれば）",
  "cuisine": "料理ジャンル（あれば）",
  "priceRange": "予算帯（あれば）",
  "time": "時間（あれば）",
  "partySize": 人数（あれば）,
  "dietary": ["食事制限（あれば）"]
}
`

    try {
      const response = await this.aiClient.generateText(prompt)
      return JSON.parse(response)
    } catch (error) {
      return {}
    }
  }

  /**
   * AI応答を生成
   */
  private async generateResponse(
    userMessage: string,
    intent: {
      type: 'search' | 'recommendation' | 'information' | 'booking' | 'complaint' | 'other'
      confidence: number
      entities: string[]
    },
    extractedInfo: {
      location?: string
      cuisine?: string
      priceRange?: string
      time?: string
      partySize?: number
      dietary?: string[]
    }
  ): Promise<{
    content: string
    metadata?: {
      suggestions?: string[]
      recommendations?: CompanyRecommendation[]
      actions?: ConversationAction[]
    }
  }> {
    const conversationHistory = this.context.conversationHistory
      .slice(-5) // 直近5メッセージのみ使用
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n')

    const prompt = `
あなたは優秀なAIコンシェルジュです。地域のレストランや企業について詳しく、ユーザーの要望に対して最適な提案を行います。

会話履歴:
${conversationHistory}

現在のユーザーメッセージ: "${userMessage}"
意図: ${intent.type}
抽出情報: ${JSON.stringify(extractedInfo)}

以下の点を考慮して回答してください：
1. 親しみやすく丁寧な口調
2. 具体的で実用的な情報提供
3. 必要に応じて追加質問
4. 関連する店舗やサービスの推薦

回答は200文字以内で、自然な日本語で答えてください。
`

    try {
      const content = await this.aiClient.generateText(prompt)
      
      // メタデータ生成（推薦、アクションなど）
      const metadata = await this.generateMetadata(intent, extractedInfo)
      
      return { content, metadata }
    } catch (error) {
      return {
        content: '申し訳ございません。少し時間をおいて再度お試しください。'
      }
    }
  }

  /**
   * メタデータ生成（推薦、アクションボタンなど）
   */
  private async generateMetadata(intent: any, extractedInfo: any): Promise<any> {
    const metadata: any = {}

    // 検索・推薦の場合は店舗推薦を生成
    if (intent.type === 'search' || intent.type === 'recommendation') {
      metadata.recommendations = await this.generateRecommendations(extractedInfo)
    }

    // 実行可能アクションを生成
    metadata.actions = this.generateActions(intent, extractedInfo)

    // 会話継続のためのサジェスト
    metadata.suggestions = this.generateSuggestions(intent)

    return metadata
  }

  /**
   * 店舗推薦を生成
   */
  private async generateRecommendations(extractedInfo: any): Promise<CompanyRecommendation[]> {
    // 実際の実装では、データベースから条件に合う店舗を検索
    // ここではサンプル推薦を返す
    const sampleRecommendations: CompanyRecommendation[] = [
      {
        id: '1',
        name: 'カフェ・ド・パリ',
        category: 'フレンチレストラン',
        rating: 4.5,
        description: '本格的なフレンチ料理を気軽に楽しめるカジュアルレストラン',
        distance: 0.5,
        priceRange: '3000-5000円',
        imageUrl: '/api/placeholder/200/150',
        reasons: ['高評価', '好立地', '雰囲気が良い'],
        confidence: 0.9
      },
      {
        id: '2',
        name: 'サクラ美容院',
        category: '美容院',
        rating: 4.2,
        description: '最新のトレンドを取り入れたスタイリッシュな美容院',
        distance: 0.8,
        priceRange: '5000-8000円',
        imageUrl: '/api/placeholder/200/150',
        reasons: ['技術力高い', '清潔', 'スタッフ親切'],
        confidence: 0.85
      }
    ]

    return sampleRecommendations.slice(0, 3) // 最大3件
  }

  /**
   * アクションボタンを生成
   */
  private generateActions(intent: any, extractedInfo: any): ConversationAction[] {
    const actions: ConversationAction[] = []

    if (intent.type === 'search' || intent.type === 'recommendation') {
      actions.push({
        type: 'search',
        label: '詳細検索',
        data: extractedInfo
      })
    }

    if (extractedInfo.location) {
      actions.push({
        type: 'directions',
        label: '道順を見る',
        data: { location: extractedInfo.location }
      })
    }

    return actions
  }

  /**
   * 会話継続サジェスト生成
   */
  private generateSuggestions(intent: any): string[] {
    const suggestions: { [key: string]: string[] } = {
      search: [
        '他の条件でも探す',
        '営業時間を確認',
        '口コミを見る'
      ],
      recommendation: [
        '予算を変えて探す',
        '別のジャンルも見る',
        'イベント情報を確認'
      ],
      information: [
        '関連する店舗を探す',
        '最新情報を確認',
        'レビューを投稿'
      ]
    }

    return suggestions[intent.type] || ['他に何かお手伝いできることはありますか？']
  }

  /**
   * エラー応答生成
   */
  private getErrorResponse(): ConversationMessage {
    return {
      id: this.generateMessageId(),
      role: 'assistant',
      content: '申し訳ございません。システムに一時的な問題が発生しています。しばらく時間をおいて再度お試しください。',
      timestamp: new Date()
    }
  }

  /**
   * メッセージID生成
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * 会話履歴取得
   */
  getConversationHistory(): ConversationMessage[] {
    return this.context.conversationHistory
  }

  /**
   * コンテキストクリア
   */
  clearContext(): void {
    this.context.conversationHistory = []
  }

  /**
   * 多言語対応応答生成
   */
  async generateMultilingualResponse(
    userMessage: string,
    targetLanguage: 'ja' | 'en' | 'ko' | 'zh' = 'ja'
  ): Promise<ConversationMessage> {
    const languageNames = {
      ja: '日本語',
      en: 'English',
      ko: '한국어',
      zh: '中文'
    }

    const prompt = `
以下のメッセージに対して、${languageNames[targetLanguage]}で親切かつ有用な回答を生成してください。

ユーザーメッセージ: "${userMessage}"
回答言語: ${languageNames[targetLanguage]}

レストランや企業のAIコンシェルジュとして、以下の点を考慮してください：
1. 文化的な違いに配慮
2. その言語圏の一般的な表現を使用
3. 丁寧で親しみやすい口調
4. 具体的で実用的な情報提供

200文字以内で回答してください。
`

    try {
      const content = await this.aiClient.generateText(prompt)
      
      return {
        id: this.generateMessageId(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        metadata: {
          suggestions: this.getLanguageSpecificSuggestions(targetLanguage)
        }
      }
    } catch (error) {
      return this.getErrorResponse()
    }
  }

  /**
   * 言語別サジェスト
   */
  private getLanguageSpecificSuggestions(language: string): string[] {
    const suggestions = {
      ja: ['他の条件で探す', '営業時間を確認', '口コミを見る'],
      en: ['Search with different criteria', 'Check opening hours', 'Read reviews'],
      ko: ['다른 조건으로 검색', '영업시간 확인', '리뷰 보기'],
      zh: ['用其他条件搜索', '查看营业时间', '查看评价']
    }

    return suggestions[language as keyof typeof suggestions] || suggestions.ja
  }
}