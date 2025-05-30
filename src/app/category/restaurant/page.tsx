'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

export default function RestaurantCategoryPage() {
  const [restaurants, setRestaurants] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

  const subCategories = [
    { id: 'all', name: 'すべて', emoji: '🍽️' },
    { id: 'japanese', name: '和食', emoji: '🍣' },
    { id: 'italian', name: 'イタリアン', emoji: '🍝' },
    { id: 'french', name: 'フレンチ', emoji: '🥖' },
    { id: 'chinese', name: '中華', emoji: '🥢' },
    { id: 'cafe', name: 'カフェ', emoji: '☕' },
    { id: 'bar', name: 'バー・居酒屋', emoji: '🍻' },
    { id: 'fastfood', name: 'ファストフード', emoji: '🍔' },
    { id: 'sweets', name: 'スイーツ', emoji: '🍰' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'budget', name: '〜1,000円' },
    { id: 'mid', name: '1,000円〜3,000円' },
    { id: 'high', name: '3,000円〜5,000円' },
    { id: 'luxury', name: '5,000円〜' }
  ]

  const locations = [
    { id: 'all', name: 'すべての地域' },
    { id: 'shibuya', name: '渋谷' },
    { id: 'shinjuku', name: '新宿' },
    { id: 'ginza', name: '銀座' },
    { id: 'harajuku', name: '原宿' },
    { id: 'roppongi', name: '六本木' }
  ]

  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantData = [
        {
          id: 'restaurant-1',
          name: 'カフェ・ブルーマウンテン',
          category: 'restaurant' as const,
          description: '厳選された豆を使用した本格コーヒーと手作りスイーツが自慢のカフェ。落ち着いた雰囲気でゆっくりとお過ごしいただけます。',
          location: '東京都渋谷区',
          address: '東京都渋谷区神南1-15-3',
          rating: 4.5,
          reviewCount: 158,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['コーヒー', 'スイーツ', 'WiFi'],
          hours: {
            monday: { open: '08:00', close: '20:00', closed: false },
            tuesday: { open: '08:00', close: '20:00', closed: false },
            wednesday: { open: '08:00', close: '20:00', closed: false },
            thursday: { open: '08:00', close: '20:00', closed: false },
            friday: { open: '08:00', close: '21:00', closed: false },
            saturday: { open: '09:00', close: '21:00', closed: false },
            sunday: { open: '09:00', close: '20:00', closed: false }
          },
          phone: '03-1234-5678',
          website: 'https://cafe-bluemountain.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'restaurant-2',
          name: 'トラットリア・ベッラヴィスタ',
          category: 'restaurant' as const,
          description: '本場イタリアの味を再現したパスタとピザが人気のイタリアンレストラン。新鮮な食材と伝統的な調理法にこだわっています。',
          location: '東京都港区',
          address: '東京都港区六本木6-10-1',
          rating: 4.3,
          reviewCount: 89,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['イタリアン', 'パスタ', 'ピザ'],
          hours: {
            monday: { open: '11:30', close: '22:00', closed: false },
            tuesday: { open: '11:30', close: '22:00', closed: false },
            wednesday: { open: '11:30', close: '22:00', closed: false },
            thursday: { open: '11:30', close: '22:00', closed: false },
            friday: { open: '11:30', close: '23:00', closed: false },
            saturday: { open: '11:30', close: '23:00', closed: false },
            sunday: { open: '11:30', close: '21:00', closed: false }
          },
          phone: '03-5555-6666',
          website: 'https://bellavista-tokyo.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'restaurant-3',
          name: '鮨処 江戸前',
          category: 'restaurant' as const,
          description: '築地直送の新鮮な魚介を使用した江戸前鮨の名店。職人の技と厳選された食材で最高の一貫をお届けします。',
          location: '東京都中央区',
          address: '東京都中央区銀座8-5-6',
          rating: 4.8,
          reviewCount: 234,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['寿司', '和食', '高級'],
          hours: {
            monday: { open: '17:00', close: '23:00', closed: false },
            tuesday: { open: '17:00', close: '23:00', closed: false },
            wednesday: { open: '17:00', close: '23:00', closed: false },
            thursday: { open: '17:00', close: '23:00', closed: false },
            friday: { open: '17:00', close: '23:00', closed: false },
            saturday: { open: '17:00', close: '23:00', closed: false },
            sunday: { open: '', close: '', closed: true }
          },
          phone: '03-7777-8888',
          website: 'https://sushi-edomae.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'restaurant-4',
          name: 'ビストロ・ラ・フランス',
          category: 'restaurant' as const,
          description: 'フランス各地の郷土料理を現代風にアレンジしたビストロ。ワインとのペアリングも楽しめるカジュアルフレンチ。',
          location: '東京都新宿区',
          address: '東京都新宿区西新宿1-3-14',
          rating: 4.4,
          reviewCount: 112,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['フレンチ', 'ワイン', 'ビストロ'],
          hours: {
            monday: { open: '12:00', close: '22:00', closed: false },
            tuesday: { open: '12:00', close: '22:00', closed: false },
            wednesday: { open: '12:00', close: '22:00', closed: false },
            thursday: { open: '12:00', close: '22:00', closed: false },
            friday: { open: '12:00', close: '23:00', closed: false },
            saturday: { open: '12:00', close: '23:00', closed: false },
            sunday: { open: '12:00', close: '21:00', closed: false }
          },
          phone: '03-9999-0000',
          website: 'https://bistro-lafrance.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'restaurant-5',
          name: '麺屋 龍虎',
          category: 'restaurant' as const,
          description: '濃厚な豚骨スープと自家製麺が自慢のラーメン店。深夜まで営業しており、〆の一杯としても人気です。',
          location: '東京都渋谷区',
          address: '東京都渋谷区道玄坂2-29-11',
          rating: 4.2,
          reviewCount: 298,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['ラーメン', '深夜営業', '豚骨'],
          hours: {
            monday: { open: '11:00', close: '02:00', closed: false },
            tuesday: { open: '11:00', close: '02:00', closed: false },
            wednesday: { open: '11:00', close: '02:00', closed: false },
            thursday: { open: '11:00', close: '02:00', closed: false },
            friday: { open: '11:00', close: '03:00', closed: false },
            saturday: { open: '11:00', close: '03:00', closed: false },
            sunday: { open: '11:00', close: '24:00', closed: false }
          },
          phone: '03-1111-2222',
          website: 'https://menya-ryuko.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        }
      ]
      
      setRestaurants(restaurantData)
      setLoading(false)
    }

    fetchRestaurants()
  }, [])

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedSubCategory !== 'all') {
      const hasSubCategory = restaurant.tags.some(tag => 
        tag.toLowerCase().includes(selectedSubCategory) || 
        restaurant.description.toLowerCase().includes(selectedSubCategory)
      )
      if (!hasSubCategory) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🍽️ レストラン・飲食店
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              美味しい料理と素敵な体験を共有して、グルメの輪を広げよう
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-orange-600">{restaurants.length}</span>
                <span className="text-gray-600 ml-2">店舗</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-red-600">4.4</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-3">料理ジャンル</label>
            <div className="flex flex-wrap gap-2">
              {subCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSubCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSubCategory === category.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-50'
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
            検索結果 ({filteredRestaurants.length}件)
          </h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>おすすめ順</option>
            <option>評価の高い順</option>
            <option>レビューの多い順</option>
            <option>価格の安い順</option>
            <option>近い順</option>
          </select>
        </div>

        {/* Restaurants Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">レストラン情報を読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <Link 
                key={restaurant.id} 
                href={`/companies/${restaurant.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors">
                    {restaurant.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({restaurant.reviewCount}件)
                      </span>
                    </div>
                    {restaurant.verified && (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        認証済み
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {restaurant.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{restaurant.location}</span>
                    <div className="flex gap-1">
                      {restaurant.tags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded"
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">美味しい発見を共有しよう</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍴</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">多彩なジャンル</h3>
              <p className="text-gray-600">和食からエスニックまで幅広いジャンル</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">地域密着</h3>
              <p className="text-gray-600">地元の隠れた名店を発見</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">リアルレビュー</h3>
              <p className="text-gray-600">実際に食事した人の正直な感想</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたのグルメ体験をシェアしませんか？
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              実際に訪れたレストランのレビューを投稿して、グルメコミュニティに貢献しましょう
            </p>
            <Link 
              href="/companies"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center"
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