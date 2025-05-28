'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Company {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  location: string;
  website?: string;
  imageUrl?: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // 企業データの取得（後で実装）
    const fetchCompanies = async () => {
      try {
        // TODO: APIから企業データを取得
        const mockData: Company[] = [
          {
            id: '1',
            name: 'カフェ・ブルーマウンテン',
            category: 'restaurant',
            rating: 4.5,
            reviewCount: 128,
            description: '地元で愛される老舗カフェ。自家焙煎のコーヒーが自慢です。',
            location: '東京都渋谷区',
            website: 'https://example.com',
            imageUrl: '/api/placeholder/300/200'
          },
          {
            id: '2',
            name: 'ビューティーサロン花音',
            category: 'beauty',
            rating: 4.8,
            reviewCount: 95,
            description: '女性専用の完全個室サロン。リラックスできる空間で美を追求。',
            location: '東京都新宿区',
            imageUrl: '/api/placeholder/300/200'
          }
        ]
        setCompanies(mockData)
      } catch (error) {
        console.error('企業データの取得に失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'restaurant', name: 'レストラン・カフェ' },
    { id: 'beauty', name: 'ビューティー・サロン' },
    { id: 'healthcare', name: 'ヘルスケア' },
    { id: 'education', name: '教育・学習' },
    { id: 'retail', name: '小売・ショッピング' },
    { id: 'service', name: 'サービス業' }
  ]

  const filteredCompanies = companies.filter(company => {
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900">Minkuchi</h1>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">ホーム</Link>
                <Link href="/companies" className="text-blue-600 font-medium">企業一覧</Link>
                <Link href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">商品一覧</Link>
                <Link href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">カテゴリ</Link>
                <Link href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">検索</Link>
              </nav>
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
              <Link href="#" className="btn-ghost">ログイン</Link>
              <Link href="#" className="btn-primary">新規登録</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">企業一覧</h1>
          <p className="text-slate-600">地域のサービス提供企業を探しましょう</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="企業名やサービス内容で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            {loading ? '読み込み中...' : `${filteredCompanies.length}件の企業が見つかりました`}
          </p>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <div key={company.id} className="card hover:shadow-xl transition-shadow">
                {/* Company Image */}
                <div className="w-full h-48 bg-slate-200 rounded-lg mb-4 overflow-hidden">
                  {company.imageUrl ? (
                    <img
                      src={company.imageUrl}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Company Info */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{company.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(company.rating) ? 'text-yellow-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-slate-600">
                      {company.rating} ({company.reviewCount}件のレビュー)
                    </span>
                  </div>

                  <p className="text-slate-600 mb-3 line-clamp-2">{company.description}</p>
                  
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {company.location}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/companies/${company.id}` as any}
                      className="btn-primary flex-1 text-center"
                    >
                      詳細を見る
                    </Link>
                    <Link
                      href={`/review?company=${company.id}` as any}
                      className="btn-secondary"
                    >
                      レビューする
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-2">企業が見つかりませんでした</h3>
            <p className="text-slate-600 mb-4">検索条件を変更してもう一度お試しください</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              検索条件をリセット
            </button>
          </div>
        )}
      </main>
    </div>
  )
}