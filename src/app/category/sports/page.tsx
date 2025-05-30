'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

export default function SportsCategoryPage() {
  const [facilities, setFacilities] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

  const subCategories = [
    { id: 'all', name: 'すべて', emoji: '⚽' },
    { id: 'gym', name: 'フィットネスジム', emoji: '🏋️‍♀️' },
    { id: 'yoga', name: 'ヨガ・ピラティス', emoji: '🧘‍♀️' },
    { id: 'swimming', name: 'プール・スイミング', emoji: '🏊‍♀️' },
    { id: 'tennis', name: 'テニス', emoji: '🎾' },
    { id: 'golf', name: 'ゴルフ', emoji: '⛳' },
    { id: 'martial', name: '格闘技', emoji: '🥋' },
    { id: 'dance', name: 'ダンス', emoji: '💃' },
    { id: 'outdoor', name: 'アウトドア', emoji: '🏔️' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'budget', name: '〜5,000円/月' },
    { id: 'mid', name: '5,000円〜10,000円/月' },
    { id: 'high', name: '10,000円〜15,000円/月' },
    { id: 'premium', name: '15,000円〜/月' }
  ]

  const locations = [
    { id: 'all', name: 'すべての地域' },
    { id: 'shibuya', name: '渋谷' },
    { id: 'shinjuku', name: '新宿' },
    { id: 'ginza', name: '銀座' },
    { id: 'roppongi', name: '六本木' },
    { id: 'odaiba', name: 'お台場' }
  ]

  useEffect(() => {
    const fetchFacilities = async () => {
      const sportsData = [
        {
          id: 'sports-1',
          name: 'メガロス渋谷店',
          category: 'sports' as const,
          description: '最新マシンを完備した総合フィットネスクラブ。プール、スタジオ、サウナも併設。初心者から上級者まで幅広いプログラムをご用意しています。',
          location: '東京都渋谷区',
          address: '東京都渋谷区宇田川町12-9',
          rating: 4.4,
          reviewCount: 342,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['フィットネス', 'プール', 'サウナ'],
          hours: {
            monday: { open: '06:00', close: '23:00', closed: false },
            tuesday: { open: '06:00', close: '23:00', closed: false },
            wednesday: { open: '06:00', close: '23:00', closed: false },
            thursday: { open: '06:00', close: '23:00', closed: false },
            friday: { open: '06:00', close: '23:00', closed: false },
            saturday: { open: '09:00', close: '21:00', closed: false },
            sunday: { open: '09:00', close: '21:00', closed: false }
          },
          phone: '03-1234-5678',
          website: 'https://megalos.co.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'sports-2',
          name: 'LAVA新宿東口店',
          category: 'sports' as const,
          description: 'ホットヨガスタジオLAVA。温かい環境でのヨガで、心と体をリフレッシュ。初心者向けから上級者向けまで多彩なプログラムを展開。',
          location: '東京都新宿区',
          address: '東京都新宿区新宿3-36-10',
          rating: 4.6,
          reviewCount: 598,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['ホットヨガ', '初心者歓迎', '女性専用'],
          hours: {
            monday: { open: '07:00', close: '22:30', closed: false },
            tuesday: { open: '07:00', close: '22:30', closed: false },
            wednesday: { open: '07:00', close: '22:30', closed: false },
            thursday: { open: '07:00', close: '22:30', closed: false },
            friday: { open: '07:00', close: '22:30', closed: false },
            saturday: { open: '08:00', close: '19:30', closed: false },
            sunday: { open: '08:00', close: '19:30', closed: false }
          },
          phone: '03-5555-6666',
          website: 'https://yoga-lava.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'sports-3',
          name: '東京ゴルフクラブ',
          category: 'sports' as const,
          description: '都心からアクセス良好な本格ゴルフ場。美しい景観と充実した設備で、快適なゴルフライフをサポート。初心者レッスンも充実。',
          location: '東京都世田谷区',
          address: '東京都世田谷区砧8-10-1',
          rating: 4.5,
          reviewCount: 267,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['ゴルフ', 'レッスン', '景観'],
          hours: {
            monday: { open: '06:00', close: '18:00', closed: false },
            tuesday: { open: '06:00', close: '18:00', closed: false },
            wednesday: { open: '06:00', close: '18:00', closed: false },
            thursday: { open: '06:00', close: '18:00', closed: false },
            friday: { open: '06:00', close: '18:00', closed: false },
            saturday: { open: '05:30', close: '18:00', closed: false },
            sunday: { open: '05:30', close: '18:00', closed: false }
          },
          phone: '03-7777-8888',
          website: 'https://tokyo-golf.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'sports-4',
          name: 'アクアティック・パーク',
          category: 'sports' as const,
          description: '25mプールから子供用プールまで完備。水泳教室、アクアビクス、競泳練習まで対応。清潔で安全な施設でお楽しみいただけます。',
          location: '東京都江東区',
          address: '東京都江東区有明2-1-8',
          rating: 4.3,
          reviewCount: 189,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['プール', '水泳教室', 'アクアビクス'],
          hours: {
            monday: { open: '10:00', close: '22:00', closed: false },
            tuesday: { open: '10:00', close: '22:00', closed: false },
            wednesday: { open: '10:00', close: '22:00', closed: false },
            thursday: { open: '10:00', close: '22:00', closed: false },
            friday: { open: '10:00', close: '22:00', closed: false },
            saturday: { open: '09:00', close: '21:00', closed: false },
            sunday: { open: '09:00', close: '21:00', closed: false }
          },
          phone: '03-9999-0000',
          website: 'https://aquatic-park.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'sports-5',
          name: 'ダンススタジオ MOVE',
          category: 'sports' as const,
          description: 'ヒップホップ、ジャズ、バレエなど多彩なダンスレッスンを提供。初心者から上級者まで楽しく学べる環境です。発表会やイベントも開催。',
          location: '東京都原宿区',
          address: '東京都渋谷区神宮前6-35-3',
          rating: 4.7,
          reviewCount: 423,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['ダンス', 'ヒップホップ', 'バレエ'],
          hours: {
            monday: { open: '12:00', close: '22:00', closed: false },
            tuesday: { open: '12:00', close: '22:00', closed: false },
            wednesday: { open: '12:00', close: '22:00', closed: false },
            thursday: { open: '12:00', close: '22:00', closed: false },
            friday: { open: '12:00', close: '22:00', closed: false },
            saturday: { open: '10:00', close: '20:00', closed: false },
            sunday: { open: '10:00', close: '20:00', closed: false }
          },
          phone: '03-1111-2222',
          website: 'https://dance-move.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        }
      ]
      
      setFacilities(sportsData)
      setLoading(false)
    }

    fetchFacilities()
  }, [])

  const filteredFacilities = facilities.filter(facility => {
    if (selectedSubCategory !== 'all') {
      const hasSubCategory = facility.tags.some(tag => 
        tag.toLowerCase().includes(selectedSubCategory) || 
        facility.description.toLowerCase().includes(selectedSubCategory)
      )
      if (!hasSubCategory) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ⚽ スポーツ・フィットネス
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              健康的な体づくりとアクティブなライフスタイルをサポートする施設を見つけよう
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-orange-600">{facilities.length}</span>
                <span className="text-gray-600 ml-2">スポーツ施設</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-yellow-600">4.5</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-3">スポーツ・運動種目</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">料金帯</label>
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
            検索結果 ({filteredFacilities.length}件)
          </h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>おすすめ順</option>
            <option>評価の高い順</option>
            <option>レビューの多い順</option>
            <option>料金の安い順</option>
            <option>近い順</option>
          </select>
        </div>

        {/* Facilities Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">スポーツ施設情報を読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map(facility => (
              <Link 
                key={facility.id} 
                href={`/companies/${facility.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={facility.imageUrl}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors">
                    {facility.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium">{facility.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({facility.reviewCount}件)
                      </span>
                    </div>
                    {facility.verified && (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        認証済み
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {facility.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{facility.location}</span>
                    <div className="flex gap-1">
                      {facility.tags.slice(0, 2).map((tag, index) => (
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">健康的なライフスタイルを始めよう</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">最新設備</h3>
              <p className="text-gray-600">最新のトレーニング機器で効果的な運動</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">プロの指導</h3>
              <p className="text-gray-600">経験豊富なインストラクターによるサポート</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">目標達成</h3>
              <p className="text-gray-600">あなたの目標に合わせたプログラム</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたのスポーツ体験をシェアしませんか？
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              実際に利用したスポーツ施設のレビューを投稿して、フィットネスコミュニティに貢献しましょう
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