'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

export default function EntertainmentCategoryPage() {
  const [venues, setVenues] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

  const subCategories = [
    { id: 'all', name: 'すべて', emoji: '🎬' },
    { id: 'cinema', name: '映画館', emoji: '🎭' },
    { id: 'theater', name: '劇場・ホール', emoji: '🎪' },
    { id: 'karaoke', name: 'カラオケ', emoji: '🎤' },
    { id: 'game', name: 'ゲームセンター', emoji: '🎮' },
    { id: 'bowling', name: 'ボウリング', emoji: '🎳' },
    { id: 'museum', name: '美術館・博物館', emoji: '🏛️' },
    { id: 'amusement', name: 'テーマパーク', emoji: '🎢' },
    { id: 'live', name: 'ライブハウス', emoji: '🎵' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'budget', name: '〜1,000円' },
    { id: 'mid', name: '1,000円〜3,000円' },
    { id: 'high', name: '3,000円〜5,000円' },
    { id: 'premium', name: '5,000円〜' }
  ]

  const locations = [
    { id: 'all', name: 'すべての地域' },
    { id: 'shibuya', name: '渋谷' },
    { id: 'shinjuku', name: '新宿' },
    { id: 'harajuku', name: '原宿' },
    { id: 'roppongi', name: '六本木' },
    { id: 'akihabara', name: '秋葉原' }
  ]

  useEffect(() => {
    const fetchVenues = async () => {
      const entertainmentData = [
        {
          id: 'entertainment-1',
          name: 'TOHOシネマズ渋谷',
          category: 'entertainment' as const,
          description: '最新の映画を最高の音響と映像で楽しめるシネマコンプレックス。IMAX、4DX、ドルビーアトモス対応で臨場感あふれる映画体験を提供。',
          location: '東京都渋谷区',
          address: '東京都渋谷区道玄坂2-6-17',
          rating: 4.3,
          reviewCount: 456,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['映画', 'IMAX', '4DX'],
          hours: {
            monday: { open: '09:00', close: '24:00', closed: false },
            tuesday: { open: '09:00', close: '24:00', closed: false },
            wednesday: { open: '09:00', close: '24:00', closed: false },
            thursday: { open: '09:00', close: '24:00', closed: false },
            friday: { open: '09:00', close: '25:00', closed: false },
            saturday: { open: '09:00', close: '25:00', closed: false },
            sunday: { open: '09:00', close: '24:00', closed: false }
          },
          phone: '03-1234-5678',
          website: 'https://toho-cinemas.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'entertainment-2',
          name: 'カラオケの鉄人 新宿東口店',
          category: 'entertainment' as const,
          description: '24時間営業のカラオケボックス。最新の楽曲から懐かしのヒット曲まで豊富な選曲。フリータイム、パーティープランなど多彩なコースをご用意。',
          location: '東京都新宿区',
          address: '東京都新宿区新宿3-22-12',
          rating: 4.1,
          reviewCount: 298,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['カラオケ', '24時間', 'パーティー'],
          hours: {
            monday: { open: '00:00', close: '24:00', closed: false },
            tuesday: { open: '00:00', close: '24:00', closed: false },
            wednesday: { open: '00:00', close: '24:00', closed: false },
            thursday: { open: '00:00', close: '24:00', closed: false },
            friday: { open: '00:00', close: '24:00', closed: false },
            saturday: { open: '00:00', close: '24:00', closed: false },
            sunday: { open: '00:00', close: '24:00', closed: false }
          },
          phone: '03-5555-6666',
          website: 'https://karaoke-tetsujin.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'entertainment-3',
          name: '東京国立博物館',
          category: 'entertainment' as const,
          description: '日本最古の博物館として、貴重な文化財を数多く収蔵・展示。日本の歴史と文化を深く学べる特別展も定期的に開催されています。',
          location: '東京都台東区',
          address: '東京都台東区上野公園13-9',
          rating: 4.6,
          reviewCount: 1087,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['博物館', '文化財', '歴史'],
          hours: {
            monday: { open: '', close: '', closed: true },
            tuesday: { open: '09:30', close: '17:00', closed: false },
            wednesday: { open: '09:30', close: '17:00', closed: false },
            thursday: { open: '09:30', close: '17:00', closed: false },
            friday: { open: '09:30', close: '21:00', closed: false },
            saturday: { open: '09:30', close: '21:00', closed: false },
            sunday: { open: '09:30', close: '17:00', closed: false }
          },
          phone: '03-7777-8888',
          website: 'https://tnm.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'entertainment-4',
          name: 'ラウンドワン 池袋店',
          category: 'entertainment' as const,
          description: 'ボウリング、アミューズメント、カラオケ、ダーツ、ビリヤードが楽しめる総合エンターテインメント施設。家族連れからカップルまで幅広く対応。',
          location: '東京都豊島区',
          address: '東京都豊島区東池袋1-21-1',
          rating: 4.2,
          reviewCount: 567,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['ボウリング', 'ゲーム', 'カラオケ'],
          hours: {
            monday: { open: '10:00', close: '24:00', closed: false },
            tuesday: { open: '10:00', close: '24:00', closed: false },
            wednesday: { open: '10:00', close: '24:00', closed: false },
            thursday: { open: '10:00', close: '24:00', closed: false },
            friday: { open: '10:00', close: '02:00', closed: false },
            saturday: { open: '09:00', close: '02:00', closed: false },
            sunday: { open: '09:00', close: '24:00', closed: false }
          },
          phone: '03-9999-0000',
          website: 'https://round1.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'entertainment-5',
          name: 'Zepp Tokyo',
          category: 'entertainment' as const,
          description: '国内外のアーティストによるライブコンサートを開催する音楽ホール。最高レベルの音響設備で、生演奏の迫力と感動を間近で体験できます。',
          location: '東京都江東区',
          address: '東京都江東区青海1-3-11',
          rating: 4.8,
          reviewCount: 892,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['ライブ', 'コンサート', '音楽'],
          hours: {
            monday: { open: '18:00', close: '23:00', closed: false },
            tuesday: { open: '18:00', close: '23:00', closed: false },
            wednesday: { open: '18:00', close: '23:00', closed: false },
            thursday: { open: '18:00', close: '23:00', closed: false },
            friday: { open: '18:00', close: '23:00', closed: false },
            saturday: { open: '14:00', close: '23:00', closed: false },
            sunday: { open: '14:00', close: '23:00', closed: false }
          },
          phone: '03-1111-2222',
          website: 'https://zepp.co.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        }
      ]
      
      setVenues(entertainmentData)
      setLoading(false)
    }

    fetchVenues()
  }, [])

  const filteredVenues = venues.filter(venue => {
    if (selectedSubCategory !== 'all') {
      const hasSubCategory = venue.tags.some(tag => 
        tag.toLowerCase().includes(selectedSubCategory) || 
        venue.description.toLowerCase().includes(selectedSubCategory)
      )
      if (!hasSubCategory) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎬 エンターテインメント
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              映画、音楽、アート、ゲームなど、楽しい時間を過ごせる場所を発見しよう
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-red-600">{venues.length}</span>
                <span className="text-gray-600 ml-2">エンタメ施設</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-pink-600">4.4</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-3">エンターテインメント種別</label>
            <div className="flex flex-wrap gap-2">
              {subCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSubCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSubCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-50'
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
            検索結果 ({filteredVenues.length}件)
          </h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>おすすめ順</option>
            <option>評価の高い順</option>
            <option>レビューの多い順</option>
            <option>料金の安い順</option>
            <option>近い順</option>
          </select>
        </div>

        {/* Venues Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">エンターテインメント施設情報を読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map(venue => (
              <Link 
                key={venue.id} 
                href={`/companies/${venue.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition-colors">
                    {venue.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium">{venue.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({venue.reviewCount}件)
                      </span>
                    </div>
                    {venue.verified && (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        認証済み
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {venue.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{venue.location}</span>
                    <div className="flex gap-1">
                      {venue.tags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded"
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">エンターテインメントを満喫しよう</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">多彩なジャンル</h3>
              <p className="text-gray-600">映画、音楽、アートなど様々な娯楽</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">最新設備</h3>
              <p className="text-gray-600">最新技術で極上の体験を提供</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">みんなで楽しめる</h3>
              <p className="text-gray-600">友達や家族と一緒に楽しい時間を</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたのエンタメ体験をシェアしませんか？
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              実際に体験したエンターテインメント施設のレビューを投稿して、エンタメコミュニティに貢献しましょう
            </p>
            <Link 
              href="/companies"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center"
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