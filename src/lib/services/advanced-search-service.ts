import Fuse from 'fuse.js'
import { Company, Review } from '@/types'

export interface SearchFilters {
  category?: string
  location?: string
  rating?: number
  priceRange?: [number, number]
  tags?: string[]
  distance?: number
  businessHours?: {
    day: string
    isOpen: boolean
  }
  verified?: boolean
  hasReviews?: boolean
}

export interface LocationCoords {
  latitude: number
  longitude: number
}

export interface SearchResult<T> {
  item: T
  score: number
  matches?: Array<{
    indices: [number, number][]
    value: string
    key: string
  }>
  distance?: number
}

export interface SearchOptions {
  query?: string
  filters?: SearchFilters
  location?: LocationCoords
  sortBy?: 'relevance' | 'rating' | 'distance' | 'newest' | 'reviews'
  limit?: number
  offset?: number
}

export class AdvancedSearchService {
  private companyFuse: Fuse<Company>
  private reviewFuse: Fuse<Review>
  private companies: Company[]
  private reviews: Review[]

  constructor(companies: Company[], reviews: Review[]) {
    this.companies = companies
    this.reviews = reviews
    // 企業検索用のFuse.js設定
    this.companyFuse = new Fuse(companies, {
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description', weight: 0.4 },
        { name: 'category', weight: 0.6 },
        { name: 'location', weight: 0.5 },
        { name: 'tags', weight: 0.3 }
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true
    })

    // レビュー検索用のFuse.js設定
    this.reviewFuse = new Fuse(reviews, {
      keys: [
        { name: 'title', weight: 0.8 },
        { name: 'content', weight: 0.6 },
        { name: 'tags', weight: 0.4 }
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true
    })
  }

  /**
   * 企業を検索
   */
  async searchCompanies(options: SearchOptions): Promise<SearchResult<Company>[]> {
    let results: SearchResult<Company>[] = []

    // テキスト検索
    if (options.query) {
      const fuseResults = this.companyFuse.search(options.query)
      results = fuseResults.map(result => ({
        item: result.item,
        score: result.score || 0,
        matches: result.matches ? result.matches.map((match: any) => ({
          indices: match.indices,
          value: match.value || '',
          key: match.key || ''
        })) : []
      }))
    } else {
      // クエリがない場合は全件取得
      results = this.companies.map(company => ({
        item: company,
        score: 0,
        matches: []
      }))
    }

    // フィルタリング適用
    if (options.filters) {
      results = this.applyFilters(results, options.filters)
    }

    // 位置情報検索
    if (options.location) {
      results = this.applyLocationFiltering(results, options.location, options.filters?.distance)
    }

    // ソート
    results = this.sortResults(results, options.sortBy || 'relevance')

    // ページネーション
    const start = options.offset || 0
    const end = start + (options.limit || 20)
    
    return results.slice(start, end)
  }

  /**
   * レビューを検索
   */
  async searchReviews(query: string, companyId?: string): Promise<SearchResult<Review>[]> {
    let results = this.reviewFuse.search(query)
    
    if (companyId) {
      results = results.filter(result => result.item.companyId === companyId)
    }

    return results.map(result => ({
      item: result.item,
      score: result.score || 0,
      matches: result.matches ? result.matches.map((match: any) => ({
        indices: match.indices,
        value: match.value || '',
        key: match.key || ''
      })) : []
    }))
  }

  /**
   * フィルタリング適用
   */
  private applyFilters(results: SearchResult<Company>[], filters: SearchFilters): SearchResult<Company>[] {
    return results.filter(result => {
      const company = result.item

      // カテゴリフィルター
      if (filters.category && company.category !== filters.category) {
        return false
      }

      // 評価フィルター
      if (filters.rating && company.rating < filters.rating) {
        return false
      }

      // 場所フィルター
      if (filters.location && !company.location.includes(filters.location)) {
        return false
      }

      // タグフィルター
      if (filters.tags && filters.tags.length > 0) {
        const companyTags = typeof company.tags === 'string' 
          ? JSON.parse(company.tags) 
          : company.tags || []
        const hasMatchingTag = filters.tags.some(tag => 
          companyTags.some((companyTag: string) => 
            companyTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
        if (!hasMatchingTag) return false
      }

      // 認証済みフィルター
      if (filters.verified !== undefined && company.verified !== filters.verified) {
        return false
      }

      // レビューありフィルター
      if (filters.hasReviews && company.reviewCount === 0) {
        return false
      }

      // 営業時間フィルター
      if (filters.businessHours) {
        const businessHours = typeof company.businessHours === 'string'
          ? JSON.parse(company.businessHours)
          : company.businessHours

        if (businessHours && filters.businessHours.day) {
          const daySchedule = businessHours[filters.businessHours.day]
          if (filters.businessHours.isOpen && (!daySchedule || daySchedule.closed)) {
            return false
          }
        }
      }

      return true
    })
  }

  /**
   * 位置情報フィルタリング
   */
  private applyLocationFiltering(
    results: SearchResult<Company>[], 
    userLocation: LocationCoords, 
    maxDistance?: number
  ): SearchResult<Company>[] {
    return results.map(result => {
      const distance = this.calculateDistance(
        userLocation,
        this.parseLocationCoords(result.item.address || result.item.location)
      )
      
      return {
        ...result,
        distance
      }
    }).filter(result => {
      return !maxDistance || !result.distance || result.distance <= maxDistance
    })
  }

  /**
   * 住所から座標を推定（簡易版）
   */
  private parseLocationCoords(_locationString: string): LocationCoords {
    // 実際のアプリケーションではGoogle Maps APIなどを使用
    // ここでは東京周辺のランダムな座標を返す
    const tokyoBase = { latitude: 35.6762, longitude: 139.6503 }
    return {
      latitude: tokyoBase.latitude + (Math.random() - 0.5) * 0.1,
      longitude: tokyoBase.longitude + (Math.random() - 0.5) * 0.1
    }
  }

  /**
   * 2点間の距離を計算（km）
   */
  private calculateDistance(coord1: LocationCoords, coord2: LocationCoords): number {
    const R = 6371 // 地球の半径（km）
    const dLat = this.deg2rad(coord2.latitude - coord1.latitude)
    const dLon = this.deg2rad(coord2.longitude - coord1.longitude)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(coord1.latitude)) * Math.cos(this.deg2rad(coord2.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180)
  }

  /**
   * 結果をソート
   */
  private sortResults(results: SearchResult<Company>[], sortBy: string): SearchResult<Company>[] {
    switch (sortBy) {
      case 'rating':
        return results.sort((a, b) => (b.item.rating || 0) - (a.item.rating || 0))
      case 'distance':
        return results.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      case 'newest':
        return results.sort((a, b) => 
          new Date(b.item.createdAt || 0).getTime() - new Date(a.item.createdAt || 0).getTime()
        )
      case 'reviews':
        return results.sort((a, b) => (b.item.reviewCount || 0) - (a.item.reviewCount || 0))
      case 'relevance':
      default:
        return results.sort((a, b) => a.score - b.score)
    }
  }

  /**
   * サジェスト機能
   */
  async getSuggestions(query: string, limit: number = 5): Promise<string[]> {
    if (!query || query.length < 2) return []

    const results = this.companyFuse.search(query, { limit })
    const suggestions = new Set<string>()

    results.forEach(result => {
      suggestions.add(result.item.name)
      if (result.item.category) suggestions.add(result.item.category)
      
      // タグからも候補を抽出
      const tags = typeof result.item.tags === 'string' 
        ? JSON.parse(result.item.tags) 
        : result.item.tags || []
      tags.forEach((tag: string) => suggestions.add(tag))
    })

    return Array.from(suggestions).slice(0, limit)
  }

  /**
   * 人気の検索キーワード
   */
  getPopularKeywords(): string[] {
    return [
      'レストラン', 'カフェ', '美容院', '病院', 'ジム',
      '学習塾', 'ホテル', 'コンビニ', '銀行', '薬局'
    ]
  }
}