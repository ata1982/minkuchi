'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

export default function HousingCategoryPage() {
  const [housingCompanies, setHousingCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

  const subCategories = [
    { id: 'all', name: 'すべて', emoji: '🏠' },
    { id: 'rental', name: '賃貸', emoji: '🏢' },
    { id: 'sale', name: '売買', emoji: '🏡' },
    { id: 'construction', name: '新築・リフォーム', emoji: '🔨' },
    { id: 'management', name: '管理・メンテナンス', emoji: '🔧' },
    { id: 'investment', name: '投資物件', emoji: '💰' },
    { id: 'land', name: '土地', emoji: '🌳' },
    { id: 'commercial', name: '商業物件', emoji: '🏪' },
    { id: 'consultation', name: '相談・査定', emoji: '📋' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'budget', name: '〜10万円/月' },
    { id: 'mid', name: '10万円〜20万円/月' },
    { id: 'high', name: '20万円〜30万円/月' },
    { id: 'luxury', name: '30万円〜/月' }
  ]

  const locations = [
    { id: 'all', name: 'すべての地域' },
    { id: 'shibuya', name: '渋谷区' },
    { id: 'shinjuku', name: '新宿区' },
    { id: 'minato', name: '港区' },
    { id: 'chiyoda', name: '千代田区' },
    { id: 'chuo', name: '中央区' }
  ]

  useEffect(() => {
    const fetchHousingCompanies = async () => {
      const housingData = [
        {
          id: 'housing-1',
          name: 'プレミアム不動産',
          category: 'housing' as const,
          description: '都心の高級物件を専門に扱う不動産会社。お客様一人ひとりのライフスタイルに合わせた物件をご提案いたします。',
          location: '東京都港区',
          address: '東京都港区六本木1-4-5',
          rating: 4.6,
          reviewCount: 89,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['高級物件', '賃貸', '売買'],
          hours: {
            monday: { open: '09:00', close: '19:00', closed: false },
            tuesday: { open: '09:00', close: '19:00', closed: false },
            wednesday: { open: '09:00', close: '19:00', closed: false },
            thursday: { open: '09:00', close: '19:00', closed: false },
            friday: { open: '09:00', close: '19:00', closed: false },
            saturday: { open: '10:00', close: '18:00', closed: false },
            sunday: { open: '10:00', close: '17:00', closed: false }
          },
          phone: '03-1234-5678',
          website: 'https://premium-estate.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'housing-2',
          name: 'ホームデザイン工房',
          category: 'housing' as const,
          description: '注文住宅からリフォームまで、住まいづくりのトータルサポート。お客様の理想を形にする設計力と施工技術が自慢です。',
          location: '東京都世田谷区',
          address: '東京都世田谷区成城2-15-8',
          rating: 4.8,
          reviewCount: 156,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['注文住宅', 'リフォーム', '設計'],
          hours: {
            monday: { open: '09:00', close: '18:00', closed: false },
            tuesday: { open: '09:00', close: '18:00', closed: false },
            wednesday: { open: '09:00', close: '18:00', closed: false },
            thursday: { open: '09:00', close: '18:00', closed: false },
            friday: { open: '09:00', close: '18:00', closed: false },
            saturday: { open: '09:00', close: '17:00', closed: false },
            sunday: { open: '', close: '', closed: true }
          },
          phone: '03-5555-6666',
          website: 'https://homedesign-kobo.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'housing-3',
          name: 'シティライフ不動産',
          category: 'housing' as const,
          description: '単身者向けから家族向けまで、幅広い賃貸物件を取り扱い。駅近物件や新築物件を中心に、住みやすさを重視した物件をご紹介。',
          location: '東京都渋谷区',
          address: '東京都渋谷区道玄坂1-12-1',
          rating: 4.2,
          reviewCount: 234,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['賃貸', '駅近', '新築'],
          hours: {
            monday: { open: '10:00', close: '19:00', closed: false },
            tuesday: { open: '10:00', close: '19:00', closed: false },
            wednesday: { open: '10:00', close: '19:00', closed: false },
            thursday: { open: '10:00', close: '19:00', closed: false },
            friday: { open: '10:00', close: '19:00', closed: false },
            saturday: { open: '10:00', close: '18:00', closed: false },
            sunday: { open: '10:00', close: '18:00', closed: false }
          },
          phone: '03-7777-8888',
          website: 'https://citylife-estate.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'housing-4',
          name: '投資物件プロ',
          category: 'housing' as const,
          description: '不動産投資に特化したコンサルティング会社。収益性の高い物件紹介から運用サポートまで、投資家の皆様をトータルサポート。',
          location: '東京都新宿区',
          address: '東京都新宿区西新宿2-8-1',
          rating: 4.4,
          reviewCount: 67,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['投資物件', 'コンサルティング', '収益物件'],
          hours: {
            monday: { open: '09:30', close: '18:30', closed: false },
            tuesday: { open: '09:30', close: '18:30', closed: false },
            wednesday: { open: '09:30', close: '18:30', closed: false },
            thursday: { open: '09:30', close: '18:30', closed: false },
            friday: { open: '09:30', close: '18:30', closed: false },
            saturday: { open: '10:00', close: '17:00', closed: false },
            sunday: { open: '', close: '', closed: true }
          },
          phone: '03-9999-0000',
          website: 'https://investment-pro.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'housing-5',
          name: '住まいメンテナンス24',
          category: 'housing' as const,
          description: '住宅の修理・メンテナンスを24時間対応で承ります。水回りトラブルから電気工事まで、住まいの困りごとはお任せください。',
          location: '東京都品川区',
          address: '東京都品川区大崎1-11-2',
          rating: 4.3,
          reviewCount: 298,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['メンテナンス', '24時間対応', '修理'],
          hours: {
            monday: { open: '24時間', close: '24時間', closed: false },
            tuesday: { open: '24時間', close: '24時間', closed: false },
            wednesday: { open: '24時間', close: '24時間', closed: false },
            thursday: { open: '24時間', close: '24時間', closed: false },
            friday: { open: '24時間', close: '24時間', closed: false },
            saturday: { open: '24時間', close: '24時間', closed: false },
            sunday: { open: '24時間', close: '24時間', closed: false }
          },
          phone: '03-1111-2222',
          website: 'https://maintenance24.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        }
      ]
      
      setHousingCompanies(housingData)
      setLoading(false)
    }

    fetchHousingCompanies()
  }, [])

  const filteredCompanies = housingCompanies.filter(company => {
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
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🏠 住宅・不動産
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              理想の住まいを見つけて、住宅体験を共有しよう
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-green-600">{housingCompanies.length}</span>
                <span className="text-gray-600 ml-2">企業</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-blue-600">4.5</span>
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
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
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
            検索結果 ({filteredCompanies.length}件)
          </h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>おすすめ順</option>
            <option>評価の高い順</option>
            <option>レビューの多い順</option>
            <option>近い順</option>
            <option>新着順</option>
          </select>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">企業情報を読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
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
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">
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
                          className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded"
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">住まい探しをサポート</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">豊富な物件情報</h3>
              <p className="text-gray-600">賃貸から売買まで幅広い物件を網羅</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">専門家サポート</h3>
              <p className="text-gray-600">経験豊富な不動産のプロがサポート</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">実体験レビュー</h3>
              <p className="text-gray-600">実際の利用者による信頼できる評価</p>
            </div>
          </div>
        </div>
      </div>

      {/* Housing Tips */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">住まい選びのポイント</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="font-semibold mb-2">立地・アクセス</h3>
              <p className="text-sm text-gray-600">通勤・通学の利便性を重視</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="font-semibold mb-2">予算設定</h3>
              <p className="text-sm text-gray-600">総合的な費用を事前に計算</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-semibold mb-2">設備・間取り</h3>
              <p className="text-sm text-gray-600">ライフスタイルに合った設計</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="font-semibold mb-2">現地確認</h3>
              <p className="text-sm text-gray-600">必ず実際に見学・確認</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたの住まい体験をシェアしませんか？
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              実際に利用した不動産会社や住んだ物件のレビューを投稿して、住まい探しをサポートしましょう
            </p>
            <Link 
              href="/companies"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
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