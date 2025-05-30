'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

export default function HealthcareCategoryPage() {
  const [clinics, setClinics] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

  const subCategories = [
    { id: 'all', name: 'すべて', emoji: '🏥' },
    { id: 'clinic', name: '一般診療', emoji: '🩺' },
    { id: 'dental', name: '歯科', emoji: '🦷' },
    { id: 'dermatology', name: '皮膚科', emoji: '💊' },
    { id: 'mental', name: 'メンタルヘルス', emoji: '🧠' },
    { id: 'pharmacy', name: '薬局', emoji: '💉' },
    { id: 'spa', name: 'スパ・温浴', emoji: '♨️' },
    { id: 'therapy', name: '整体・マッサージ', emoji: '💆‍♀️' },
    { id: 'alternative', name: '代替医療', emoji: '🌿' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'insurance', name: '保険診療' },
    { id: 'budget', name: '〜3,000円' },
    { id: 'mid', name: '3,000円〜10,000円' },
    { id: 'premium', name: '10,000円〜' }
  ]

  const locations = [
    { id: 'all', name: 'すべての地域' },
    { id: 'shibuya', name: '渋谷' },
    { id: 'shinjuku', name: '新宿' },
    { id: 'ginza', name: '銀座' },
    { id: 'roppongi', name: '六本木' },
    { id: 'setagaya', name: '世田谷' }
  ]

  useEffect(() => {
    const fetchClinics = async () => {
      const healthcareData = [
        {
          id: 'healthcare-1',
          name: 'さくら総合クリニック',
          category: 'healthcare' as const,
          description: '内科・外科・小児科を診療する地域密着型クリニック。最新の医療機器を導入し、丁寧な診察を心がけています。予約制で待ち時間も短縮。',
          location: '東京都渋谷区',
          address: '東京都渋谷区恵比寿1-10-6',
          rating: 4.5,
          reviewCount: 234,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['内科', '外科', '小児科'],
          hours: {
            monday: { open: '09:00', close: '18:00', closed: false },
            tuesday: { open: '09:00', close: '18:00', closed: false },
            wednesday: { open: '09:00', close: '18:00', closed: false },
            thursday: { open: '09:00', close: '18:00', closed: false },
            friday: { open: '09:00', close: '18:00', closed: false },
            saturday: { open: '09:00', close: '12:00', closed: false },
            sunday: { open: '', close: '', closed: true }
          },
          phone: '03-1234-5678',
          website: 'https://sakura-clinic.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'healthcare-2',
          name: 'スマイル歯科クリニック',
          category: 'healthcare' as const,
          description: '一般歯科から審美歯科、インプラントまで幅広く対応。最新のデジタル技術を活用した痛みの少ない治療を提供しています。',
          location: '東京都新宿区',
          address: '東京都新宿区西新宿3-7-1',
          rating: 4.6,
          reviewCount: 187,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['歯科', 'インプラント', '審美歯科'],
          hours: {
            monday: { open: '10:00', close: '19:00', closed: false },
            tuesday: { open: '10:00', close: '19:00', closed: false },
            wednesday: { open: '10:00', close: '19:00', closed: false },
            thursday: { open: '10:00', close: '19:00', closed: false },
            friday: { open: '10:00', close: '19:00', closed: false },
            saturday: { open: '10:00', close: '17:00', closed: false },
            sunday: { open: '10:00', close: '17:00', closed: false }
          },
          phone: '03-5555-6666',
          website: 'https://smile-dental.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'healthcare-3',
          name: 'ヒーリング・スパ 癒',
          category: 'healthcare' as const,
          description: '天然温泉とアロマトリートメントでリラクゼーション。日々の疲れを癒す至福のひとときをお過ごしいただけます。',
          location: '東京都港区',
          address: '東京都港区赤坂5-3-1',
          rating: 4.4,
          reviewCount: 156,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['スパ', '温泉', 'アロマ'],
          hours: {
            monday: { open: '10:00', close: '22:00', closed: false },
            tuesday: { open: '10:00', close: '22:00', closed: false },
            wednesday: { open: '10:00', close: '22:00', closed: false },
            thursday: { open: '10:00', close: '22:00', closed: false },
            friday: { open: '10:00', close: '23:00', closed: false },
            saturday: { open: '09:00', close: '23:00', closed: false },
            sunday: { open: '09:00', close: '22:00', closed: false }
          },
          phone: '03-7777-8888',
          website: 'https://healing-spa-yu.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'healthcare-4',
          name: 'みどり薬局',
          category: 'healthcare' as const,
          description: '地域に根ざした調剤薬局。薬剤師による丁寧な服薬指導と健康相談を実施。在宅医療にも対応しています。',
          location: '東京都世田谷区',
          address: '東京都世田谷区下馬3-20-5',
          rating: 4.3,
          reviewCount: 89,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['薬局', '調剤', '健康相談'],
          hours: {
            monday: { open: '09:00', close: '19:00', closed: false },
            tuesday: { open: '09:00', close: '19:00', closed: false },
            wednesday: { open: '09:00', close: '19:00', closed: false },
            thursday: { open: '09:00', close: '19:00', closed: false },
            friday: { open: '09:00', close: '19:00', closed: false },
            saturday: { open: '09:00', close: '17:00', closed: false },
            sunday: { open: '', close: '', closed: true }
          },
          phone: '03-9999-0000',
          website: 'https://midori-pharmacy.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'healthcare-5',
          name: 'リラックス整体院',
          category: 'healthcare' as const,
          description: '肩こり・腰痛専門の整体院。国家資格を持つ施術者による的確な治療で根本改善を目指します。完全予約制でプライベートな空間を提供。',
          location: '東京都品川区',
          address: '東京都品川区大崎1-6-4',
          rating: 4.7,
          reviewCount: 267,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['整体', 'マッサージ', '肩こり'],
          hours: {
            monday: { open: '10:00', close: '20:00', closed: false },
            tuesday: { open: '10:00', close: '20:00', closed: false },
            wednesday: { open: '10:00', close: '20:00', closed: false },
            thursday: { open: '10:00', close: '20:00', closed: false },
            friday: { open: '10:00', close: '20:00', closed: false },
            saturday: { open: '10:00', close: '18:00', closed: false },
            sunday: { open: '10:00', close: '18:00', closed: false }
          },
          phone: '03-1111-2222',
          website: 'https://relax-seitai.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        }
      ]
      
      setClinics(healthcareData)
      setLoading(false)
    }

    fetchClinics()
  }, [])

  const filteredClinics = clinics.filter(clinic => {
    if (selectedSubCategory !== 'all') {
      const hasSubCategory = clinic.tags.some(tag => 
        tag.toLowerCase().includes(selectedSubCategory) || 
        clinic.description.toLowerCase().includes(selectedSubCategory)
      )
      if (!hasSubCategory) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🏥 医療・ヘルスケア
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              信頼できる医療機関と健康サービスで、あなたの健康をサポート
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-green-600">{clinics.length}</span>
                <span className="text-gray-600 ml-2">医療機関</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-emerald-600">4.5</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-3">診療科目・サービス</label>
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
            検索結果 ({filteredClinics.length}件)
          </h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>おすすめ順</option>
            <option>評価の高い順</option>
            <option>レビューの多い順</option>
            <option>近い順</option>
            <option>料金の安い順</option>
          </select>
        </div>

        {/* Clinics Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">医療機関情報を読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClinics.map(clinic => (
              <Link 
                key={clinic.id} 
                href={`/companies/${clinic.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={clinic.imageUrl}
                    alt={clinic.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">
                    {clinic.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium">{clinic.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({clinic.reviewCount}件)
                      </span>
                    </div>
                    {clinic.verified && (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        認証済み
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {clinic.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{clinic.location}</span>
                    <div className="flex gap-1">
                      {clinic.tags.slice(0, 2).map((tag, index) => (
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">安心の医療サービス</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍⚕️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">専門医療</h3>
              <p className="text-gray-600">各分野の専門医による高品質な医療</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">地域密着</h3>
              <p className="text-gray-600">地域に根ざした親身な医療サービス</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">総合ケア</h3>
              <p className="text-gray-600">予防から治療まで包括的なサポート</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたの医療体験をシェアしませんか？
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              実際に利用した医療機関のレビューを投稿して、医療コミュニティに貢献しましょう
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