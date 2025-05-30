'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface ReviewData {
  id: string
  source: 'google' | 'twitter' | 'tabelog' | 'gurunavi' | 'yelp' | 'other'
  companyName: string
  rating: number
  title: string
  content: string
  author: string
  date: string
  verified: boolean
  sentiment: 'positive' | 'negative' | 'neutral'
  tags: string[]
  helpfulCount?: number
  platform?: string
}

interface ReviewAnalysis {
  totalReviews: number
  averageRating: number
  sentimentBreakdown: {
    positive: number
    negative: number
    neutral: number
  }
  commonTopics: string[]
  recommendations: string[]
  summary: string
}

export function ReviewCollectionComponent() {
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [selectedSources, setSelectedSources] = useState<string[]>(['all'])
  const [keywords, setKeywords] = useState('')
  const [isCollecting, setIsCollecting] = useState(false)
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [analysis, setAnalysis] = useState<ReviewAnalysis | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all')

  const sources = [
    { id: 'all', name: '全ソース', icon: '🌐', description: 'Google、Twitter、食べログなど' },
    { id: 'google', name: 'Google Reviews', icon: '🔍', description: 'Googleマップのレビュー' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', description: 'Twitter上の口コミ' },
    { id: 'tabelog', name: '食べログ', icon: '🍽️', description: '食べログのレビュー' }
  ]

  const handleSourceChange = (sourceId: string) => {
    if (sourceId === 'all') {
      setSelectedSources(['all'])
    } else {
      const newSources = selectedSources.includes('all') 
        ? [sourceId]
        : selectedSources.includes(sourceId)
        ? selectedSources.filter(s => s !== sourceId)
        : [...selectedSources.filter(s => s !== 'all'), sourceId]
      
      setSelectedSources(newSources.length === 0 ? ['all'] : newSources)
    }
  }

  const handleCollectReviews = async () => {
    if (!companyName.trim()) {
      alert('企業名を入力してください')
      return
    }

    setIsCollecting(true)
    setHasSearched(true)
    
    try {
      const response = await fetch('/api/reviews/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: companyName.trim(),
          location: location.trim() || undefined,
          sources: selectedSources,
          keywords: keywords.trim().split(',').map(k => k.trim()).filter(k => k),
          analyzeAll: true
        })
      })

      if (!response.ok) {
        throw new Error('レビュー取得に失敗しました')
      }

      const data = await response.json()
      setReviews(data.results?.flatMap((r: any) => r.reviews) || [])
      setAnalysis(data.overallAnalysis)

    } catch (error) {
      console.error('Review collection error:', error)
      alert('レビュー取得中にエラーが発生しました')
      setReviews([])
      setAnalysis(null)
    } finally {
      setIsCollecting(false)
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google': return '🔍'
      case 'twitter': return '🐦'
      case 'tabelog': return '🍽️'
      case 'gurunavi': return '🏮'
      default: return '📝'
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50'
      case 'negative': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'ポジティブ'
      case 'negative': return 'ネガティブ'
      default: return '中立'
    }
  }

  const filteredReviews = reviews.filter(review => {
    if (currentFilter === 'all') return true
    return review.sentiment === currentFilter
  })

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">🤖 AIレビュー・口コミ収集</h3>
            <p className="text-sm text-gray-500 mt-1">
              GeminiとGrok3を活用して世の中のレビューや口コミを取得・分析します
            </p>
          </div>
        </div>

        {/* 検索フォーム */}
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                企業・店舗名 *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="例: スターバックス、マクドナルド"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                地域（オプション）
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="例: 東京、渋谷、新宿"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              検索対象ソース
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sources.map((source) => (
                <label
                  key={source.id}
                  className={`relative flex flex-col p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedSources.includes(source.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedSources.includes(source.id)}
                    onChange={() => handleSourceChange(source.id)}
                  />
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{source.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{source.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{source.description}</span>
                  {selectedSources.includes(source.id) && (
                    <div className="absolute top-2 right-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              追加キーワード（Twitter検索用、カンマ区切り）
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="例: 美味しい, サービス, 雰囲気"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleCollectReviews}
              disabled={isCollecting || !companyName.trim()}
              className="px-8 py-3 text-lg"
            >
              {isCollecting ? (
                <>
                  <LoadingSpinner className="w-5 h-5 mr-2" />
                  レビューを取得中...
                </>
              ) : (
                <>
                  🤖 AIでレビュー・口コミを取得
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 分析結果 */}
        {hasSearched && analysis && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 AI分析結果</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analysis.totalReviews}</div>
                <div className="text-sm text-gray-600">総レビュー数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  ⭐ {analysis.averageRating}
                </div>
                <div className="text-sm text-gray-600">平均評価</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {analysis.sentimentBreakdown.positive}%
                </div>
                <div className="text-sm text-gray-600">ポジティブ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {analysis.sentimentBreakdown.negative}%
                </div>
                <div className="text-sm text-gray-600">ネガティブ</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">🏷️ よく言及される話題</h5>
                <div className="flex flex-wrap gap-2">
                  {analysis.commonTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">💡 改善提案</h5>
                <div className="space-y-1">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-medium text-gray-900 mb-2">📝 総合評価</h5>
              <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
            </div>
          </div>
        )}

        {/* レビュー一覧 */}
        {hasSearched && (
          <div>
            {isCollecting ? (
              <div className="text-center py-12">
                <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
                <p className="text-gray-600">AIがレビュー・口コミを収集しています...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Google Reviews、Twitter、食べログなどから情報を取得中
                </p>
              </div>
            ) : reviews.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    取得されたレビュー・口コミ ({filteredReviews.length}件)
                  </h4>
                  
                  {/* フィルター */}
                  <div className="flex space-x-2">
                    {[
                      { id: 'all', label: '全て', count: reviews.length },
                      { id: 'positive', label: 'ポジティブ', count: reviews.filter(r => r.sentiment === 'positive').length },
                      { id: 'negative', label: 'ネガティブ', count: reviews.filter(r => r.sentiment === 'negative').length },
                      { id: 'neutral', label: '中立', count: reviews.filter(r => r.sentiment === 'neutral').length }
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setCurrentFilter(filter.id as any)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          currentFilter === filter.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {filter.label} ({filter.count})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getSourceIcon(review.source)}</span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{review.author}</span>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  ✓ 認証済
                                </span>
                              )}
                              <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(review.sentiment)}`}>
                                {getSentimentLabel(review.sentiment)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-sm ${
                                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  >
                                    ⭐
                                  </span>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.platform} • {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {review.helpfulCount !== undefined && (
                          <div className="text-sm text-gray-500">
                            👍 {review.helpfulCount}
                          </div>
                        )}
                      </div>

                      {review.title && (
                        <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                      )}
                      
                      <p className="text-gray-700 leading-relaxed mb-3">{review.content}</p>

                      {review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {review.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  レビュー・口コミが見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-4">
                  「{companyName}」に関するレビューが見つかりませんでした
                </p>
                <p className="text-sm text-gray-500">
                  企業名を変更するか、地域やキーワードを追加してみてください
                </p>
              </div>
            )}
          </div>
        )}

        {/* 使用方法の説明 */}
        {!hasSearched && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🚀 この機能について</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h5 className="font-medium text-gray-800 mb-1">🔍 Gemini活用</h5>
                <p>Google Reviews、食べログなどのレビューサイトの情報をAIで分析・生成</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-1">🐦 Grok3活用</h5>
                <p>Twitter上の口コミや評判をリアルタイムで分析・収集</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-1">📊 AI分析</h5>
                <p>センチメント分析、話題抽出、改善提案を自動生成</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-1">🌐 統合検索</h5>
                <p>複数ソースからの情報を統合して包括的な評価を提供</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}