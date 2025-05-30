'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

export default function EducationCategoryPage() {
  const [schools, setSchools] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

  const subCategories = [
    { id: 'all', name: 'すべて', emoji: '📚' },
    { id: 'juku', name: '学習塾', emoji: '✏️' },
    { id: 'language', name: '語学学校', emoji: '🗣️' },
    { id: 'programming', name: 'プログラミング', emoji: '💻' },
    { id: 'music', name: '音楽教室', emoji: '🎵' },
    { id: 'art', name: 'アート・デザイン', emoji: '🎨' },
    { id: 'certification', name: '資格・検定', emoji: '📝' },
    { id: 'skill', name: 'スキルアップ', emoji: '🚀' },
    { id: 'kindergarten', name: '幼児教育', emoji: '👶' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'budget', name: '〜5,000円/月' },
    { id: 'mid', name: '5,000円〜15,000円/月' },
    { id: 'high', name: '15,000円〜30,000円/月' },
    { id: 'premium', name: '30,000円〜/月' }
  ]

  const locations = [
    { id: 'all', name: 'すべての地域' },
    { id: 'shibuya', name: '渋谷' },
    { id: 'shinjuku', name: '新宿' },
    { id: 'ikebukuro', name: '池袋' },
    { id: 'akihabara', name: '秋葉原' },
    { id: 'ginza', name: '銀座' }
  ]

  useEffect(() => {
    const fetchSchools = async () => {
      const educationData = [
        {
          id: 'education-1',
          name: 'プログラミングスクール コードアカデミー',
          category: 'education' as const,
          description: '初心者から上級者まで対応したプログラミング教育。現役エンジニアが直接指導し、実践的なスキルを身につけられます。転職サポートも充実。',
          location: '東京都渋谷区',
          address: '東京都渋谷区道玄坂1-12-1',
          rating: 4.6,
          reviewCount: 142,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['プログラミング', 'IT', '転職サポート'],
          hours: {
            monday: { open: '10:00', close: '22:00', closed: false },
            tuesday: { open: '10:00', close: '22:00', closed: false },
            wednesday: { open: '10:00', close: '22:00', closed: false },
            thursday: { open: '10:00', close: '22:00', closed: false },
            friday: { open: '10:00', close: '22:00', closed: false },
            saturday: { open: '09:00', close: '20:00', closed: false },
            sunday: { open: '09:00', close: '20:00', closed: false }
          },
          phone: '03-1234-5678',
          website: 'https://code-academy.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'education-2',
          name: 'イングリッシュ・コネクション',
          category: 'education' as const,
          description: 'ネイティブ講師による少人数制英会話スクール。ビジネス英語からTOEIC対策まで幅広いコースをご用意。個別指導にも対応。',
          location: '東京都新宿区',
          address: '東京都新宿区西新宿2-8-1',
          rating: 4.4,
          reviewCount: 98,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['英会話', 'TOEIC', 'ビジネス英語'],
          hours: {
            monday: { open: '09:00', close: '21:00', closed: false },
            tuesday: { open: '09:00', close: '21:00', closed: false },
            wednesday: { open: '09:00', close: '21:00', closed: false },
            thursday: { open: '09:00', close: '21:00', closed: false },
            friday: { open: '09:00', close: '21:00', closed: false },
            saturday: { open: '10:00', close: '18:00', closed: false },
            sunday: { open: '10:00', close: '18:00', closed: false }
          },
          phone: '03-5555-6666',
          website: 'https://english-connection.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'education-3',
          name: 'ミュージック・ハーモニー',
          category: 'education' as const,
          description: 'ピアノ、ギター、ボーカルレッスンを提供する音楽教室。子どもから大人まで、初心者から上級者まで丁寧に指導いたします。',
          location: '東京都世田谷区',
          address: '東京都世田谷区三軒茶屋2-14-7',
          rating: 4.7,
          reviewCount: 156,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['音楽', 'ピアノ', 'ギター'],
          hours: {
            monday: { open: '14:00', close: '21:00', closed: false },
            tuesday: { open: '14:00', close: '21:00', closed: false },
            wednesday: { open: '14:00', close: '21:00', closed: false },
            thursday: { open: '14:00', close: '21:00', closed: false },
            friday: { open: '14:00', close: '21:00', closed: false },
            saturday: { open: '10:00', close: '18:00', closed: false },
            sunday: { open: '10:00', close: '18:00', closed: false }
          },
          phone: '03-7777-8888',
          website: 'https://music-harmony.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'education-4',
          name: 'アカデミア進学塾',
          category: 'education' as const,
          description: '中学・高校受験に特化した進学塾。経験豊富な講師陣による個別指導で、一人ひとりの志望校合格をサポートします。',
          location: '東京都杉並区',
          address: '東京都杉並区荻窪5-20-1',
          rating: 4.5,
          reviewCount: 203,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['受験', '個別指導', '進学'],
          hours: {
            monday: { open: '16:00', close: '22:00', closed: false },
            tuesday: { open: '16:00', close: '22:00', closed: false },
            wednesday: { open: '16:00', close: '22:00', closed: false },
            thursday: { open: '16:00', close: '22:00', closed: false },
            friday: { open: '16:00', close: '22:00', closed: false },
            saturday: { open: '13:00', close: '21:00', closed: false },
            sunday: { open: '13:00', close: '18:00', closed: false }
          },
          phone: '03-9999-0000',
          website: 'https://academia-juku.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        },
        {
          id: 'education-5',
          name: 'デザインスタジオ クリエイト',
          category: 'education' as const,
          description: 'グラフィックデザイン、Webデザインを学べるクリエイティブスクール。業界経験者による実践的なカリキュラムで即戦力を育成。',
          location: '東京都渋谷区',
          address: '東京都渋谷区表参道3-5-10',
          rating: 4.3,
          reviewCount: 87,
          imageUrl: '/api/placeholder/400/200',
          verified: true,
          tags: ['デザイン', 'Webデザイン', 'クリエイティブ'],
          hours: {
            monday: { open: '10:00', close: '20:00', closed: false },
            tuesday: { open: '10:00', close: '20:00', closed: false },
            wednesday: { open: '10:00', close: '20:00', closed: false },
            thursday: { open: '10:00', close: '20:00', closed: false },
            friday: { open: '10:00', close: '20:00', closed: false },
            saturday: { open: '10:00', close: '18:00', closed: false },
            sunday: { open: '', close: '', closed: true }
          },
          phone: '03-1111-2222',
          website: 'https://design-create.jp',
          images: ['/api/placeholder/400/200', '/api/placeholder/400/200']
        }
      ]
      
      setSchools(educationData)
      setLoading(false)
    }

    fetchSchools()
  }, [])

  const filteredSchools = schools.filter(school => {
    if (selectedSubCategory !== 'all') {
      const hasSubCategory = school.tags.some(tag => 
        tag.toLowerCase().includes(selectedSubCategory) || 
        school.description.toLowerCase().includes(selectedSubCategory)
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
              📚 教育・学習
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              学びの場を見つけて、新しいスキルと知識を身につけよう
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className="text-2xl font-bold text-purple-600">{schools.length}</span>
                <span className="text-gray-600 ml-2">教育機関</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-3">学習分野</label>
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
            検索結果 ({filteredSchools.length}件)
          </h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>おすすめ順</option>
            <option>評価の高い順</option>
            <option>レビューの多い順</option>
            <option>料金の安い順</option>
            <option>近い順</option>
          </select>
        </div>

        {/* Schools Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">教育機関情報を読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map(school => (
              <Link 
                key={school.id} 
                href={`/companies/${school.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={school.imageUrl}
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {school.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm font-medium">{school.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({school.reviewCount}件)
                      </span>
                    </div>
                    {school.verified && (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        認証済み
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {school.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{school.location}</span>
                    <div className="flex gap-1">
                      {school.tags.slice(0, 2).map((tag, index) => (
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">学びの機会を見つけよう</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">多彩なコース</h3>
              <p className="text-gray-600">あらゆる分野の学習機会を提供</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">経験豊富な講師</h3>
              <p className="text-gray-600">プロの講師による質の高い指導</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">スキルアップ</h3>
              <p className="text-gray-600">実践的なスキルを身につけられる</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたの学習体験をシェアしませんか？
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              実際に受講した教育機関のレビューを投稿して、学習コミュニティに貢献しましょう
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