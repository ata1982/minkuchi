'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface RestaurantInfo {
  name: string
  category: string
  description: string
  address: string
  phone?: string
  website?: string
  rating?: number
  reviewCount?: number
  cuisine?: string
  priceRange?: string
  tags?: string[]
}

export default function RestaurantSearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('東京')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<RestaurantInfo[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('検索キーワードを入力してください')
      return
    }

    setIsSearching(true)
    setHasSearched(true)
    
    try {
      const response = await fetch(`/api/restaurants/search?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`)
      
      if (!response.ok) {
        throw new Error('検索に失敗しました')
      }

      const data = await response.json()
      setSearchResults(data.restaurants || [])

    } catch (error) {
      console.error('検索エラー:', error)
      alert('検索中にエラーが発生しました')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">🍽️ レストラン検索</h1>
            <p className="mt-2 text-gray-600">世の中に公開されているレストラン情報を検索できます</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 検索フォーム */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  検索キーワード
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="例: ラーメン、イタリアン、寿司、カフェ..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  地域
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="東京">東京</option>
                  <option value="大阪">大阪</option>
                  <option value="名古屋">名古屋</option>
                  <option value="福岡">福岡</option>
                  <option value="札幌">札幌</option>
                  <option value="横浜">横浜</option>
                  <option value="京都">京都</option>
                  <option value="神戸">神戸</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="px-8 py-3 text-lg"
              >
                {isSearching ? (
                  <>
                    <LoadingSpinner className="w-5 h-5 mr-2" />
                    検索中...
                  </>
                ) : (
                  <>
                    🔍 レストランを検索
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 検索のヒント */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">💡 検索のコツ</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 料理のジャンル（例：ラーメン、イタリアン、寿司）</li>
              <li>• 店舗タイプ（例：カフェ、レストラン、居酒屋）</li>
              <li>• 特徴（例：個室、テラス席、深夜営業）</li>
            </ul>
          </div>
        </div>

        {/* 検索結果 */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow p-6">
            {isSearching ? (
              <div className="text-center py-12">
                <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
                <p className="text-gray-600">レストランを検索しています...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    検索結果 ({searchResults.length}件)
                  </h2>
                  <div className="text-sm text-gray-500">
                    「{searchQuery}」 in {location}
                  </div>
                </div>

                <div className="space-y-6">
                  {searchResults.map((restaurant, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {restaurant.name}
                            </h3>
                            {restaurant.rating && (
                              <div className="flex items-center space-x-1">
                                <span className="text-yellow-400">⭐</span>
                                <span className="text-sm font-medium">{restaurant.rating}</span>
                                {restaurant.reviewCount && (
                                  <span className="text-xs text-gray-500">
                                    ({restaurant.reviewCount}件)
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {restaurant.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400">📍</span>
                              <span className="text-gray-700">{restaurant.address}</span>
                            </div>
                            {restaurant.phone && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400">📞</span>
                                <span className="text-gray-700">{restaurant.phone}</span>
                              </div>
                            )}
                            {restaurant.cuisine && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400">🍽️</span>
                                <span className="text-gray-700">ジャンル: {restaurant.cuisine}</span>
                              </div>
                            )}
                            {restaurant.priceRange && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400">💰</span>
                                <span className="text-gray-700">価格帯: {restaurant.priceRange}</span>
                              </div>
                            )}
                          </div>

                          {restaurant.tags && restaurant.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {restaurant.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="ml-6 flex flex-col space-y-2">
                          {restaurant.website && (
                            <a
                              href={restaurant.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors text-center"
                            >
                              🔗 公式サイト
                            </a>
                          )}
                          <button
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                            onClick={() => {
                              // 将来的にはレストランの詳細ページに遷移
                              alert('詳細情報機能は実装予定です')
                            }}
                          >
                            📋 詳細を見る
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  レストランが見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-4">
                  「{searchQuery}」に該当するレストランがありませんでした
                </p>
                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-600 mb-2">別のキーワードで試してみてください：</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['ラーメン', 'イタリアン', '寿司', 'カフェ', '焼肉'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setSearchQuery(suggestion)
                          handleSearch()
                        }}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 機能説明 */}
        {!hasSearched && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🌟 この機能について</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔍 幅広い検索</h3>
                <p className="text-gray-600 text-sm">
                  複数の外部データソースから最新のレストラン情報を検索します。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📍 地域対応</h3>
                <p className="text-gray-600 text-sm">
                  全国主要都市のレストラン情報を地域別に検索できます。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">⭐ 詳細情報</h3>
                <p className="text-gray-600 text-sm">
                  評価、レビュー数、営業時間などの詳細情報も確認できます。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔗 公式情報</h3>
                <p className="text-gray-600 text-sm">
                  公式サイトへのリンクで最新の情報を確認できます。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}