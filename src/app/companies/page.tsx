'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { Company } from '@/types/index'
import { mockCompanies } from '@/lib/mockData'

function CompaniesContent() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true)
        setError(null)
        // TODO: APIから企業データを取得
        setCompanies(mockCompanies)
      } catch (error) {
        console.error('企業データの取得に失敗しました:', error)
        setError('企業データの取得に失敗しました。しばらくしてから再度お試しください。')
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'restaurant', name: 'レストラン' },
    { id: 'retail', name: '小売店' },
    { id: 'beauty', name: '美容' },
    { id: 'healthcare', name: '医療・ヘルスケア' },
    { id: 'education', name: '教育' },
    { id: 'service', name: 'サービス' }
  ]

  const filteredCompanies = companies.filter(company => {
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            再読み込み
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">登録企業一覧</h1>
      
      {/* 検索・フィルター */}
      <div className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            placeholder="企業名や説明で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* ローディング */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">企業データを読み込み中...</p>
        </div>
      ) : (
        <>
          {/* 結果件数 */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredCompanies.length}件の企業が見つかりました
            </p>
          </div>

          {/* 企業一覧 */}
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">条件に一致する企業が見つかりませんでした。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map(company => (
                <Link key={company.id} href={`/companies/${company.id}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
                    {company.imageUrl && (
                      <img
                        src={company.imageUrl}
                        alt={company.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm font-medium">{company.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">
                          ({company.reviewCount}件のレビュー)
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {company.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{company.location}</span>
                      {company.website && (
                        <span className="text-sm text-blue-600">ウェブサイト</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function CompaniesPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">ページを読み込み中...</p>
        </div>
      </div>
    }>
      <CompaniesContent />
    </Suspense>
  )
}