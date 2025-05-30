'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

export default function RetailCategoryPage() {
  const [retailers, setRetailers] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

  const subCategories = [
    { id: 'all', name: 'すべて', emoji: '🛍️' },
    { id: 'fashion', name: 'ファッション', emoji: '👕' },
    { id: 'electronics', name: '家電・デジタル', emoji: '📱' },
    { id: 'books', name: '書籍・文具', emoji: '📚' },
    { id: 'home', name: 'インテリア・雑貨', emoji: '🏠' },
    { id: 'sports', name: 'スポーツ・アウトドア', emoji: '⚽' },
    { id: 'grocery', name: '食品・日用品', emoji: '🛒' },
    { id: 'jewelry', name: 'アクセサリー', emoji: '💍' },
    { id: 'toys', name: 'おもちゃ・ゲーム', emoji: '🎮' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'budget', name: '〜5,000円' },
    { id: 'mid', name: '5,000円〜20,000円' },
    { id: 'high', name: '20,000円〜50,000円' },
    { id: 'luxury', name: '50,000円〜' }
  ]

  const locations = [
    { id: 'all', name: 'すべての地域' },
    { id: 'shibuya', name: '渋谷' },
    { id: 'shinjuku', name: '新宿' },
    { id: 'ginza', name: '銀座' },
    { id: 'harajuku', name: '原宿' },
    { id: 'omotesando', name: '表参道' }
  ]

  useEffect(() => {
    const fetchRetailers = async () => {
      const retailData = [
        {
          id: 'retail-1',
          name: 'セレクトショップ STYLE',
          category: 'retail' as const,
          description: '厳選されたブランドアイテムを取り揃えるセレクトショップ。トレンドを押さえたファッションアイテムから定番まで幅広く展開。',
          location: '東京都渋谷区',
          address: '東京都渋谷区神南1-21-3',
          rating: 4.3,
          reviewCount: 127,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['ファッション', 'セレクトショップ', 'トレンド'],
          hours: {
            monday: { open: '11:00', close: '20:00', closed: false },
            tuesday: { open: '11:00', close: '20:00', closed: false },
            wednesday: { open: '11:00', close: '20:00', closed: false },
            thursday: { open: '11:00', close: '20:00', closed: false },
            friday: { open: '11:00', close: '21:00', closed: false },
            saturday: { open: '10:00', close: '21:00', closed: false },
            sunday: { open: '10:00', close: '20:00', closed: false }
          },
          phone: '03-1234-5678',
          website: 'https://selectshop-style.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'retail-2',
          name: 'ガジェット・ワールド',
          category: 'retail' as const,
          description: '最新のスマートフォンから話題のガジェットまで、テクノロジーの最先端を体験できる専門店。知識豊富なスタッフがサポート。',
          location: '東京都新宿区',
          address: '東京都新宿区西新宿1-6-1',
          rating: 4.5,
          reviewCount: 203,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['家電', 'ガジェット', 'スマートフォン'],
          hours: {
            monday: { open: '10:00', close: '21:00', closed: false },
            tuesday: { open: '10:00', close: '21:00', closed: false },
            wednesday: { open: '10:00', close: '21:00', closed: false },
            thursday: { open: '10:00', close: '21:00', closed: false },
            friday: { open: '10:00', close: '21:00', closed: false },
            saturday: { open: '10:00', close: '21:00', closed: false },
            sunday: { open: '10:00', close: '20:00', closed: false }
          },
          phone: '03-5555-6666',
          website: 'https://gadget-world.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'retail-3',
          name: 'ブックカフェ・リーディング',
          category: 'retail' as const,
          description: '本とコーヒーが楽しめる複合型書店。厳選された書籍とおいしいコーヒーで、読書の時間をより豊かに。',
          location: '東京都港区',
          address: '東京都港区表参道4-12-10',
          rating: 4.4,
          reviewCount: 156,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['書籍', 'カフェ', '文房具'],
          hours: {
            monday: { open: '09:00', close: '22:00', closed: false },
            tuesday: { open: '09:00', close: '22:00', closed: false },
            wednesday: { open: '09:00', close: '22:00', closed: false },
            thursday: { open: '09:00', close: '22:00', closed: false },
            friday: { open: '09:00', close: '22:00', closed: false },
            saturday: { open: '09:00', close: '22:00', closed: false },
            sunday: { open: '09:00', close: '21:00', closed: false }
          },
          phone: '03-7777-8888',
          website: 'https://bookcafe-reading.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'retail-4',
          name: 'インテリア・ライフ',
          category: 'retail' as const,
          description: 'モダンでスタイリッシュな家具と雑貨を取り揃えるインテリアショップ。お部屋のコーディネート相談も承ります。',
          location: '東京都渋谷区',
          address: '東京都渋谷区神宮前6-12-20',
          rating: 4.2,
          reviewCount: 89,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['インテリア', '家具', '雑貨'],
          hours: {
            monday: { open: '11:00', close: '19:00', closed: false },
            tuesday: { open: '11:00', close: '19:00', closed: false },
            wednesday: { open: '11:00', close: '19:00', closed: false },
            thursday: { open: '11:00', close: '19:00', closed: false },
            friday: { open: '11:00', close: '20:00', closed: false },
            saturday: { open: '10:00', close: '20:00', closed: false },
            sunday: { open: '10:00', close: '19:00', closed: false }
          },
          phone: '03-9999-0000',
          website: 'https://interior-life.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'retail-5',
          name: 'スポーツプラザ・アクティブ',
          category: 'retail' as const,
          description: 'あらゆるスポーツに対応した専門用品を取り揃え。経験豊富なスタッフがあなたに最適な商品選びをサポートします。',
          location: '東京都新宿区',
          address: '東京都新宿区歌舞伎町1-2-3',
          rating: 4.1,
          reviewCount: 167,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['スポーツ', 'アウトドア', '運動'],
          hours: {
            monday: { open: '10:30', close: '20:30', closed: false },
            tuesday: { open: '10:30', close: '20:30', closed: false },
            wednesday: { open: '10:30', close: '20:30', closed: false },
            thursday: { open: '10:30', close: '20:30', closed: false },
            friday: { open: '10:30', close: '21:00', closed: false },
            saturday: { open: '10:00', close: '21:00', closed: false },
            sunday: { open: '10:00', close: '20:00', closed: false }
          },
          phone: '03-1111-2222',
          website: 'https://sports-active.com',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        }
      ]
      
      setRetailers(retailData)
      setLoading(false)
    }

    fetchRetailers()
  }, [])

  const filteredRetailers = retailers.filter(retailer => {
    if (selectedSubCategory !== 'all') {
      const hasSubCategory = retailer.tags.some(tag => 
        tag.toLowerCase().includes(selectedSubCategory) || 
        retailer.description.toLowerCase().includes(selectedSubCategory)
      )
      if (!hasSubCategory) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🛍️ 小売店・ショッピング
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              お気に入りのお店を見つけて、ショッピング体験を共有しよう
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-purple-600">{retailers.length}</span>
                <span className="text-gray-600 ml-2">店舗</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-blue-600">4.3</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-3">商品カテゴリ</label>
            <div className="flex flex-wrap gap-2">
              {subCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSubCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSubCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
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
            検索結果 ({filteredRetailers.length}件)
          </h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>おすすめ順</option>
            <option>評価の高い順</option>
            <option>レビューの多い順</option>
            <option>価格の安い順</option>
            <option>近い順</option>
          </select>
        </div>

        {/* Retailers Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">店舗情報を読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRetailers.map(retailer => (
              <Link 
                key={retailer.id} 
                href={`/companies/${retailer.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={retailer.imageUrl}
                    alt={retailer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {retailer.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium">{retailer.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({retailer.reviewCount}件)
                      </span>
                    </div>
                    {retailer.verified && (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        認証済み
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {retailer.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{retailer.location}</span>
                    <div className="flex gap-1">
                      {retailer.tags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded"
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">ショッピング体験を共有しよう</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">豊富な品揃え</h3>
              <p className="text-gray-600">ファッションから家電まで多彩なジャンル</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">専門知識</h3>
              <p className="text-gray-600">知識豊富なスタッフによるサポート</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">リアルレビュー</h3>
              <p className="text-gray-600">実際の購入体験に基づく評価</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Tips */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">ショッピングのコツ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl mb-3">📝</div>
              <h3 className="font-semibold mb-2">事前リサーチ</h3>
              <p className="text-sm text-gray-600">レビューで商品の評価をチェック</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="font-semibold mb-2">価格比較</h3>
              <p className="text-sm text-gray-600">複数店舗で価格を比較検討</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl mb-3">🛡️</div>
              <h3 className="font-semibold mb-2">保証・サービス</h3>
              <p className="text-sm text-gray-600">アフターサービスも重要なポイント</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl mb-3">📱</div>
              <h3 className="font-semibold mb-2">レビュー投稿</h3>
              <p className="text-sm text-gray-600">購入後は体験をシェア</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたのお買い物体験をシェアしませんか？
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              実際に利用した店舗のレビューを投稿して、他の人のお買い物をサポートしましょう
            </p>
            <Link 
              href="/companies"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center"
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