'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Company } from '@/types/index'
import { Header } from '@/components/layout/header'
import { mockCompanies, mockCategories } from '@/lib/mockData'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('relevance')
  const [loading, setLoading] = useState(false)

  // 検索とフィルタリングロジック
  const filteredCompanies = useMemo(() => {
    let results = [...mockCompanies]

    // テキスト検索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(company =>
        company.name.toLowerCase().includes(query) ||
        company.description.toLowerCase().includes(query) ||
        company.tags.some(tag => tag.toLowerCase().includes(query)) ||
        company.address.toLowerCase().includes(query)
      )
    }

    // カテゴリフィルター
    if (selectedCategory) {
      results = results.filter(company => company.category === selectedCategory)
    }

    // 場所フィルター
    if (selectedLocation) {
      results = results.filter(company => 
        company.address.includes(selectedLocation)
      )
    }

    // 評価フィルター
    if (minRating > 0) {
      results = results.filter(company => company.rating >= minRating)
    }

    // ソート
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        results.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name, 'ja'))
        break
      default: // relevance
        // 検索クエリがある場合は関連度順、ない場合は評価順
        if (searchQuery.trim()) {
          results.sort((a, b) => {
            const aScore = getRelevanceScore(a, searchQuery)
            const bScore = getRelevanceScore(b, searchQuery)
            return bScore - aScore
          })
        } else {
          results.sort((a, b) => b.rating - a.rating)
        }
        break
    }

    return results
  }, [searchQuery, selectedCategory, selectedLocation, minRating, sortBy])

  // 関連度スコア計算
  const getRelevanceScore = (company: Company, query: string): number => {
    let score = 0
    const queryLower = query.toLowerCase()

    // 名前での一致（最高スコア）
    if (company.name.toLowerCase().includes(queryLower)) score += 100

    // 説明での一致
    if (company.description.toLowerCase().includes(queryLower)) score += 50

    // タグでの一致
    company.tags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) score += 30
    })

    // 住所での一致
    if (company.address.toLowerCase().includes(queryLower)) score += 20

    return score
  }

  // URLパラメータの更新
  const updateSearchParams = () => {
    const params = new URLSearchParams()
    
    if (searchQuery.trim()) params.set('q', searchQuery.trim())
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedLocation) params.set('location', selectedLocation)
    if (minRating > 0) params.set('rating', minRating.toString())
    if (sortBy !== 'relevance') params.set('sort', sortBy)

    const newUrl = params.toString() ? `/search?${params.toString()}` : '/search'
    router.replace(newUrl)
  }

  // 検索実行
  const handleSearch = () => {
    setLoading(true)
    updateSearchParams()
    setTimeout(() => setLoading(false), 500) // 実際のAPIコールをシミュレート
  }

  // フィルターリセット
  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedLocation('')
    setMinRating(0)
    setSortBy('relevance')
    router.replace('/search')
  }

  // 初期化時にURLパラメータを読み込み
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '')
    setSelectedLocation(searchParams.get('location') || '')
    setMinRating(Number(searchParams.get('rating')) || 0)
    setSortBy(searchParams.get('sort') || 'relevance')
  }, [searchParams])

  // 都道府県リスト
  const prefectures = [
    '東京都', '神奈川県', '千葉県', '埼玉県', '大阪府', '京都府', '兵庫県', '愛知県', '福岡県', '北海道'
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">企業検索</h1>
        
        {/* Main Search Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="企業名、キーワードで検索..."
                className="input-field w-full pl-10"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="btn-primary px-8"
          >
            {loading ? '検索中...' : '検索'}
          </button>
        </div>

        {/* Search Stats */}
        {(searchQuery || selectedCategory || selectedLocation || minRating > 0) && (
          <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
            <span>
              {filteredCompanies.length}件の企業が見つかりました
              {searchQuery && ` 「${searchQuery}」の検索結果`}
            </span>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-700"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">フィルター</h3>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                カテゴリ
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field w-full"
              >
                <option value="">すべてのカテゴリ</option>
                {mockCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                都道府県
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-field w-full"
              >
                <option value="">すべての地域</option>
                {prefectures.map((prefecture) => (
                  <option key={prefecture} value={prefecture}>
                    {prefecture}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                最低評価
              </label>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="minRating"
                      value={rating}
                      checked={minRating === rating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-slate-600">以上</span>
                    </div>
                  </label>
                ))}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="minRating"
                    value={0}
                    checked={minRating === 0}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="mr-2"
                  />
                  <span className="text-sm text-slate-600">すべて</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="btn-primary w-full"
            >
              フィルターを適用
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Sort Controls */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              検索結果 ({filteredCompanies.length}件)
            </h2>
            <div className="flex items-center space-x-4">
              <label className="text-sm text-slate-600">並び替え:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto"
              >
                <option value="relevance">関連度順</option>
                <option value="rating">評価の高い順</option>
                <option value="reviews">レビュー数順</option>
                <option value="name">名前順</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.id}`}
                  className="card hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="aspect-video bg-slate-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={company.images[0] || '/api/placeholder/400/200'}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
                      {company.name}
                    </h3>
                    {company.verified && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                        認証済み
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(company.rating) ? 'text-yellow-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-1 text-sm font-medium text-slate-900">{company.rating}</span>
                      <span className="text-sm text-slate-500">({company.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                    {company.description}
                  </p>

                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span className="line-clamp-1">{company.address}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {company.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {company.tags.length > 3 && (
                      <span className="text-xs text-slate-500">
                        +{company.tags.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <h3 className="text-lg font-medium text-slate-900 mb-2">検索結果が見つかりません</h3>
              <p className="text-slate-600 mb-4">
                検索条件を変更してもう一度お試しください。
              </p>
              <button
                onClick={resetFilters}
                className="btn-secondary"
              >
                フィルターをリセット
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </div>
  )
}