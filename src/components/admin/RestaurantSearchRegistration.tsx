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

interface RegistrationResult {
  restaurant: string
  status: 'registered' | 'skipped' | 'error'
  companyId?: string
  reason?: string
}

interface SearchResponse {
  message: string
  restaurants: RestaurantInfo[]
  registered: number
  registrationResults?: RegistrationResult[]
  searchQuery: string
  searchLocation: string
}

export function RestaurantSearchRegistration() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('東京')
  const [maxResults, setMaxResults] = useState(20)
  const [autoRegister, setAutoRegister] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<RestaurantInfo[]>([])
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [selectedRestaurants, setSelectedRestaurants] = useState<Set<number>>(new Set())

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('検索キーワードを入力してください')
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch('/api/restaurants/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          location,
          maxResults,
          autoRegister
        }),
      })

      if (!response.ok) {
        throw new Error('検索に失敗しました')
      }

      const data: SearchResponse = await response.json()
      setSearchResponse(data)
      setSearchResults(data.restaurants)
      setSelectedRestaurants(new Set())

    } catch (error) {
      console.error('検索エラー:', error)
      alert('検索中にエラーが発生しました')
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectRestaurant = (index: number) => {
    const newSelected = new Set(selectedRestaurants)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedRestaurants(newSelected)
  }

  const handleBulkRegister = async () => {
    if (selectedRestaurants.size === 0) {
      alert('登録するレストランを選択してください')
      return
    }

    const selectedData = Array.from(selectedRestaurants).map(index => searchResults[index])
    
    setIsSearching(true)
    try {
      const response = await fetch('/api/restaurants/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'selected_restaurants',
          restaurants: selectedData,
          autoRegister: true
        }),
      })

      if (!response.ok) {
        throw new Error('一括登録に失敗しました')
      }

      const data = await response.json()
      alert(`${data.registered}件のレストランを登録しました`)
      setSelectedRestaurants(new Set())

    } catch (error) {
      console.error('一括登録エラー:', error)
      alert('一括登録中にエラーが発生しました')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🍽️ レストラン検索・登録</h2>
        <p className="text-gray-600">
          外部の公開情報からレストランを検索し、自動でデータベースに登録できます。
        </p>
      </div>

      {/* 検索フォーム */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              検索キーワード
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="例: ラーメン、イタリアン、寿司..."
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
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              最大取得件数
            </label>
            <select
              value={maxResults}
              onChange={(e) => setMaxResults(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={10}>10件</option>
              <option value={20}>20件</option>
              <option value={50}>50件</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoRegister}
                onChange={(e) => setAutoRegister(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                検索と同時に自動登録
              </span>
            </label>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="flex-1"
          >
            {isSearching ? (
              <>
                <LoadingSpinner className="w-4 h-4 mr-2" />
                検索中...
              </>
            ) : (
              '🔍 検索開始'
            )}
          </Button>
          
          {searchResults.length > 0 && !autoRegister && (
            <Button
              onClick={handleBulkRegister}
              disabled={isSearching || selectedRestaurants.size === 0}
              variant="outline"
            >
              選択した{selectedRestaurants.size}件を登録
            </Button>
          )}
        </div>
      </div>

      {/* 検索結果 */}
      {searchResponse && (
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800 font-medium">{searchResponse.message}</p>
            {searchResponse.registered > 0 && (
              <p className="text-green-600 mt-1">
                ✅ {searchResponse.registered}件を自動登録しました
              </p>
            )}
          </div>

          {/* 登録結果詳細 */}
          {searchResponse.registrationResults && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">登録結果</h3>
              <div className="space-y-2">
                {searchResponse.registrationResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      result.status === 'registered'
                        ? 'bg-green-50 border-green-200'
                        : result.status === 'skipped'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <span className="font-medium">{result.restaurant}</span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          result.status === 'registered'
                            ? 'bg-green-100 text-green-800'
                            : result.status === 'skipped'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {result.status === 'registered' ? '登録完了' : 
                         result.status === 'skipped' ? 'スキップ' : 'エラー'}
                      </span>
                      {result.reason && (
                        <span className="text-xs text-gray-500">{result.reason}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* レストラン一覧 */}
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            検索結果 ({searchResults.length}件)
          </h3>
          <div className="space-y-4">
            {searchResults.map((restaurant, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 transition-colors ${
                  selectedRestaurants.has(index)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {!autoRegister && (
                        <input
                          type="checkbox"
                          checked={selectedRestaurants.has(index)}
                          onChange={() => handleSelectRestaurant(index)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      )}
                      <h4 className="text-lg font-semibold text-gray-900">
                        {restaurant.name}
                      </h4>
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

                    <p className="text-gray-600 mb-2">{restaurant.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                      <div>📍 {restaurant.address}</div>
                      {restaurant.phone && <div>📞 {restaurant.phone}</div>}
                      {restaurant.cuisine && (
                        <div>🍽️ ジャンル: {restaurant.cuisine}</div>
                      )}
                      {restaurant.priceRange && (
                        <div>💰 価格帯: {restaurant.priceRange}</div>
                      )}
                    </div>

                    {restaurant.tags && restaurant.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {restaurant.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {restaurant.website && (
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      🔗 サイト
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && searchResponse && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <p>該当するレストランが見つかりませんでした。</p>
          <p className="text-sm">別のキーワードで検索してみてください。</p>
        </div>
      )}
    </div>
  )
}