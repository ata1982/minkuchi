'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

export default function BeautyCategoryPage() {
  const [beautyCompanies, setBeautyCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

  const subCategories = [
    { id: 'all', name: 'すべて', emoji: '💄' },
    { id: 'salon', name: 'ヘアサロン', emoji: '✂️' },
    { id: 'nail', name: 'ネイルサロン', emoji: '💅' },
    { id: 'esthetic', name: 'エステ', emoji: '✨' },
    { id: 'massage', name: 'マッサージ', emoji: '💆' },
    { id: 'gym', name: 'ジム・フィットネス', emoji: '💪' },
    { id: 'cosmetics', name: 'コスメ・化粧品', emoji: '🎨' },
    { id: 'clinic', name: '美容クリニック', emoji: '🏥' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'budget', name: '〜5,000円' },
    { id: 'mid', name: '5,000円〜15,000円' },
    { id: 'high', name: '15,000円〜' }
  ]

  const locations = [
    { id: 'all', name: 'すべての地域' },
    { id: 'shibuya', name: '渋谷区' },
    { id: 'shinjuku', name: '新宿区' },
    { id: 'harajuku', name: '原宿・表参道' },
    { id: 'ginza', name: '銀座' }
  ]

  useEffect(() => {
    const fetchBeautyCompanies = async () => {
      const beautyData = [
        {
          id: 'beauty-1',
          name: 'ビューティースタジオ HANA',
          category: 'beauty' as const,
          description: 'トレンドを取り入れたヘアスタイルとネイルアートで、あなたの魅力を最大限に引き出します。経験豊富なスタイリストが丁寧にカウンセリング。',
          location: '東京都渋谷区',
          address: '東京都渋谷区神南1-2-3',
          rating: 4.6,
          reviewCount: 142,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['ヘアカット', 'カラー', 'ネイル'],
          hours: {
            monday: { open: '10:00', close: '20:00', closed: false },
            tuesday: { open: '10:00', close: '20:00', closed: false },
            wednesday: { open: '10:00', close: '20:00', closed: false },
            thursday: { open: '10:00', close: '20:00', closed: false },
            friday: { open: '10:00', close: '20:00', closed: false },
            saturday: { open: '09:00', close: '19:00', closed: false },
            sunday: { open: '09:00', close: '19:00', closed: false }
          },
          phone: '03-1111-2222',
          website: 'https://beauty-hana.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'beauty-2',
          name: 'リラクゼーションサロン Aura',
          category: 'beauty' as const,
          description: '心と体のリフレッシュを提供するトータルビューティーサロン。アロマオイルマッサージとフェイシャルエステで究極の癒しを。',
          location: '東京都新宿区',
          address: '東京都新宿区歌舞伎町2-1-1',
          rating: 4.4,
          reviewCount: 98,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['エステ', 'マッサージ', 'アロマ'],
          hours: {
            monday: { open: '11:00', close: '21:00', closed: false },
            tuesday: { open: '11:00', close: '21:00', closed: false },
            wednesday: { open: '11:00', close: '21:00', closed: false },
            thursday: { open: '11:00', close: '21:00', closed: false },
            friday: { open: '11:00', close: '21:00', closed: false },
            saturday: { open: '10:00', close: '20:00', closed: false },
            sunday: { open: '10:00', close: '20:00', closed: false }
          },
          phone: '03-2222-3333',
          website: 'https://aura-salon.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'beauty-3',
          name: 'フィットネスクラブ ENERGY',
          category: 'beauty' as const,
          description: '最新マシンと充実したプログラムで理想のボディメイクをサポート。パーソナルトレーニングも充実。',
          location: '東京都港区',
          address: '東京都港区赤坂3-2-1',
          rating: 4.2,
          reviewCount: 205,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['フィットネス', 'パーソナル', 'ヨガ'],
          hours: {
            monday: { open: '07:00', close: '23:00', closed: false },
            tuesday: { open: '07:00', close: '23:00', closed: false },
            wednesday: { open: '07:00', close: '23:00', closed: false },
            thursday: { open: '07:00', close: '23:00', closed: false },
            friday: { open: '07:00', close: '23:00', closed: false },
            saturday: { open: '09:00', close: '21:00', closed: false },
            sunday: { open: '09:00', close: '21:00', closed: false }
          },
          phone: '03-3333-4444',
          website: 'https://energy-fitness.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'beauty-4',
          name: 'コスメティック ラボ GLOW',
          category: 'beauty' as const,
          description: '厳選されたオーガニック化粧品と肌診断サービス。あなたの肌質に合った最適なスキンケアをご提案します。',
          location: '東京都中央区',
          address: '東京都中央区銀座4-5-6',
          rating: 4.5,
          reviewCount: 76,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['コスメ', 'スキンケア', 'オーガニック'],
          hours: {
            monday: { open: '10:00', close: '19:00', closed: false },
            tuesday: { open: '10:00', close: '19:00', closed: false },
            wednesday: { open: '10:00', close: '19:00', closed: false },
            thursday: { open: '10:00', close: '19:00', closed: false },
            friday: { open: '10:00', close: '19:00', closed: false },
            saturday: { open: '10:00', close: '18:00', closed: false },
            sunday: { open: '11:00', close: '18:00', closed: false }
          },
          phone: '03-4444-5555',
          website: 'https://glow-cosmetics.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        }
      ]
      
      setBeautyCompanies(beautyData)
      setLoading(false)
    }

    fetchBeautyCompanies()
  }, [])

  const filteredBeautyCompanies = beautyCompanies.filter(company => {
    if (selectedSubCategory !== 'all') {
      const hasSubCategory = company.tags.some(tag => 
        tag.toLowerCase().includes(selectedSubCategory) || 
        company.description.toLowerCase().includes(selectedSubCategory)
      )
      if (!hasSubCategory) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              💄 美容・健康
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              美容とウェルネスの口コミを共有して、あなたらしい美しさを見つけよう
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-pink-600">{beautyCompanies.length}</span>
                <span className="text-gray-600 ml-2">サロン</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-rose-600">4.4</span>
                <span className="text-gray-600 ml-2">平均評価</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">フィルター</h3>
          
          {/* Sub Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">サービス種別</label>
            <div className="flex flex-wrap gap-2">
              {subCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSubCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSubCategory === category.id
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">価格帯</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">エリア</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            検索結果 ({filteredBeautyCompanies.length}件)
          </h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>おすすめ順</option>
            <option>評価の高い順</option>
            <option>レビューの多い順</option>
            <option>料金の安い順</option>
            <option>近い順</option>
          </select>
        </div>

        {/* Beauty Companies Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">サロン情報を読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeautyCompanies.map(company => (
              <Link 
                key={company.id} 
                href={`/companies/${company.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={company.imageUrl}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">
                    {company.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium">{company.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({company.reviewCount}件)
                      </span>
                    </div>
                    {company.verified && (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        認証済み
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {company.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{company.location}</span>
                    <div className="flex gap-1">
                      {company.tags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-pink-50 text-pink-700 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">美容とウェルネスを身近に</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💫</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">パーソナライズ</h3>
              <p className="text-gray-600">あなたに最適な美容サービスをご提案</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">専門性</h3>
              <p className="text-gray-600">経験豊富な専門スタッフによる施術</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">信頼性</h3>
              <p className="text-gray-600">実際の利用者による正直なレビュー</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたの美容体験をシェアしませんか？
            </h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              実際に利用したサロンや美容サービスのレビューを投稿して、美容コミュニティに貢献しましょう
            </p>
            <Link 
              href="/companies"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors inline-flex items-center"
            >
              レビューを投稿する
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}