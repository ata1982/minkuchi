'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Company } from '@/types/index'

// カテゴリ別の設定
const categoryConfigs = {
  beauty: {
    name: '美容・健康',
    emoji: '💄',
    gradient: 'from-pink-50 via-rose-50 to-purple-50',
    primaryColor: 'pink',
    subCategories: [
      { id: 'all', name: 'すべて', emoji: '💄' },
      { id: 'salon', name: 'ヘアサロン', emoji: '✂️' },
      { id: 'nail', name: 'ネイルサロン', emoji: '💅' },
      { id: 'esthetic', name: 'エステ', emoji: '✨' },
      { id: 'massage', name: 'マッサージ', emoji: '💆' },
      { id: 'gym', name: 'ジム・フィットネス', emoji: '💪' },
      { id: 'cosmetics', name: 'コスメ・化粧品', emoji: '🎨' },
      { id: 'clinic', name: '美容クリニック', emoji: '🏥' }
    ],
    features: [
      { emoji: '💫', title: 'パーソナライズ', description: 'あなたに最適な美容サービスをご提案' },
      { emoji: '🎯', title: '専門性', description: '経験豊富な専門スタッフによる施術' },
      { emoji: '⭐', title: '信頼性', description: '実際の利用者による正直なレビュー' }
    ],
    ctaText: 'あなたの美容体験をシェアしませんか？',
    ctaSubtext: '実際に利用したサロンや美容サービスのレビューを投稿して、美容コミュニティに貢献しましょう'
  },
  education: {
    name: '教育・学習',
    emoji: '🎓',
    gradient: 'from-blue-50 via-indigo-50 to-purple-50',
    primaryColor: 'blue',
    subCategories: [
      { id: 'all', name: 'すべて', emoji: '📚' },
      { id: 'school', name: '学習塾', emoji: '🏫' },
      { id: 'language', name: '語学教室', emoji: '🗣️' },
      { id: 'music', name: '音楽教室', emoji: '🎵' },
      { id: 'art', name: 'アート教室', emoji: '🎨' },
      { id: 'sports', name: 'スポーツ教室', emoji: '⚽' },
      { id: 'programming', name: 'プログラミング', emoji: '💻' },
      { id: 'certification', name: '資格取得', emoji: '🎖️' }
    ],
    features: [
      { emoji: '📈', title: '成長', description: '確実なスキルアップと成長をサポート' },
      { emoji: '👨‍🏫', title: '質の高い講師陣', description: '経験豊富な講師による丁寧な指導' },
      { emoji: '🏆', title: '実績', description: '多くの生徒が目標を達成' }
    ],
    ctaText: '学習体験を共有しよう',
    ctaSubtext: '教室選びに悩む人々のために、あなたの経験をシェアしてください'
  },
  entertainment: {
    name: 'エンターテインメント',
    emoji: '🎬',
    gradient: 'from-purple-50 via-pink-50 to-red-50',
    primaryColor: 'purple',
    subCategories: [
      { id: 'all', name: 'すべて', emoji: '🎭' },
      { id: 'movie', name: '映画館', emoji: '🎬' },
      { id: 'theater', name: '劇場', emoji: '🎭' },
      { id: 'concert', name: 'ライブハウス', emoji: '🎸' },
      { id: 'karaoke', name: 'カラオケ', emoji: '🎤' },
      { id: 'game', name: 'ゲームセンター', emoji: '🎮' },
      { id: 'amusement', name: 'アミューズメント', emoji: '🎡' },
      { id: 'bowling', name: 'ボウリング', emoji: '🎳' }
    ],
    features: [
      { emoji: '🎉', title: '楽しさ', description: '日常を忘れて楽しめる空間' },
      { emoji: '🎊', title: '多様性', description: '様々なエンターテインメント体験' },
      { emoji: '👥', title: 'つながり', description: '友人や家族との思い出づくり' }
    ],
    ctaText: '楽しい体験をシェアしよう',
    ctaSubtext: 'あなたの楽しかった体験を共有して、次の訪問者の参考に'
  },
  healthcare: {
    name: '医療・健康',
    emoji: '🏥',
    gradient: 'from-green-50 via-teal-50 to-blue-50',
    primaryColor: 'teal',
    subCategories: [
      { id: 'all', name: 'すべて', emoji: '🏥' },
      { id: 'hospital', name: '病院', emoji: '🏥' },
      { id: 'clinic', name: 'クリニック', emoji: '🩺' },
      { id: 'dental', name: '歯科', emoji: '🦷' },
      { id: 'pharmacy', name: '薬局', emoji: '💊' },
      { id: 'mental', name: 'メンタルヘルス', emoji: '🧠' },
      { id: 'rehabilitation', name: 'リハビリ', emoji: '🦽' },
      { id: 'checkup', name: '健康診断', emoji: '📋' }
    ],
    features: [
      { emoji: '👨‍⚕️', title: '専門性', description: '高度な医療技術と専門知識' },
      { emoji: '❤️', title: '思いやり', description: '患者に寄り添う医療サービス' },
      { emoji: '🏥', title: '安心', description: '信頼できる医療機関情報' }
    ],
    ctaText: '医療体験を共有しよう',
    ctaSubtext: '良い医療機関の情報を共有して、地域の健康に貢献しましょう'
  },
  housing: {
    name: '住まい・不動産',
    emoji: '🏠',
    gradient: 'from-amber-50 via-orange-50 to-yellow-50',
    primaryColor: 'amber',
    subCategories: [
      { id: 'all', name: 'すべて', emoji: '🏠' },
      { id: 'rental', name: '賃貸', emoji: '🏢' },
      { id: 'sale', name: '売買', emoji: '🏡' },
      { id: 'management', name: '管理会社', emoji: '🔧' },
      { id: 'renovation', name: 'リフォーム', emoji: '🔨' },
      { id: 'interior', name: 'インテリア', emoji: '🛋️' },
      { id: 'moving', name: '引越し', emoji: '📦' },
      { id: 'storage', name: '収納サービス', emoji: '📦' }
    ],
    features: [
      { emoji: '🏠', title: '理想の住まい', description: 'あなたにぴったりの物件探し' },
      { emoji: '🤝', title: '信頼', description: '安心できる不動産取引' },
      { emoji: '📍', title: '地域密着', description: '地元の詳しい情報' }
    ],
    ctaText: '住まいの体験をシェア',
    ctaSubtext: '不動産選びに悩む人のために、あなたの経験を共有してください'
  },
  restaurant: {
    name: '飲食店',
    emoji: '🍽️',
    gradient: 'from-red-50 via-orange-50 to-yellow-50',
    primaryColor: 'red',
    subCategories: [
      { id: 'all', name: 'すべて', emoji: '🍽️' },
      { id: 'japanese', name: '和食', emoji: '🍱' },
      { id: 'western', name: '洋食', emoji: '🍝' },
      { id: 'chinese', name: '中華', emoji: '🥟' },
      { id: 'cafe', name: 'カフェ', emoji: '☕' },
      { id: 'bar', name: 'バー', emoji: '🍷' },
      { id: 'ramen', name: 'ラーメン', emoji: '🍜' },
      { id: 'sweets', name: 'スイーツ', emoji: '🍰' }
    ],
    features: [
      { emoji: '🍳', title: 'こだわり', description: '素材と調理法へのこだわり' },
      { emoji: '😋', title: '満足度', description: '味とサービスの高い満足度' },
      { emoji: '🌟', title: '発見', description: '新しい味との出会い' }
    ],
    ctaText: '美味しい体験をシェア',
    ctaSubtext: 'お気に入りのお店を紹介して、グルメコミュニティを盛り上げよう'
  },
  retail: {
    name: '小売・ショッピング',
    emoji: '🛍️',
    gradient: 'from-purple-50 via-pink-50 to-rose-50',
    primaryColor: 'purple',
    subCategories: [
      { id: 'all', name: 'すべて', emoji: '🛍️' },
      { id: 'fashion', name: 'ファッション', emoji: '👗' },
      { id: 'electronics', name: '家電', emoji: '📱' },
      { id: 'grocery', name: 'スーパー', emoji: '🛒' },
      { id: 'bookstore', name: '書店', emoji: '📚' },
      { id: 'drugstore', name: 'ドラッグストア', emoji: '💊' },
      { id: 'convenience', name: 'コンビニ', emoji: '🏪' },
      { id: 'homegoods', name: 'ホームセンター', emoji: '🔨' }
    ],
    features: [
      { emoji: '🎁', title: '品揃え', description: '豊富な商品ラインナップ' },
      { emoji: '💰', title: '価値', description: 'お得な価格と高品質' },
      { emoji: '😊', title: 'サービス', description: '心地よいショッピング体験' }
    ],
    ctaText: 'ショッピング体験をシェア',
    ctaSubtext: 'お気に入りのお店を紹介して、買い物上手になろう'
  },
  sports: {
    name: 'スポーツ・レジャー',
    emoji: '⚽',
    gradient: 'from-green-50 via-emerald-50 to-teal-50',
    primaryColor: 'green',
    subCategories: [
      { id: 'all', name: 'すべて', emoji: '🏃' },
      { id: 'gym', name: 'スポーツジム', emoji: '💪' },
      { id: 'yoga', name: 'ヨガ', emoji: '🧘' },
      { id: 'swimming', name: 'プール', emoji: '🏊' },
      { id: 'tennis', name: 'テニス', emoji: '🎾' },
      { id: 'golf', name: 'ゴルフ', emoji: '⛳' },
      { id: 'martial', name: '格闘技', emoji: '🥋' },
      { id: 'dance', name: 'ダンス', emoji: '💃' }
    ],
    features: [
      { emoji: '💪', title: '健康', description: '心身の健康づくりをサポート' },
      { emoji: '🎯', title: '目標達成', description: '個人の目標に合わせた指導' },
      { emoji: '🤝', title: 'コミュニティ', description: '仲間との絆づくり' }
    ],
    ctaText: 'スポーツ体験をシェア',
    ctaSubtext: '施設の雰囲気や指導の質など、リアルな情報を共有しよう'
  }
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const config = categoryConfigs[slug as keyof typeof categoryConfigs]
  
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [location, setLocation] = useState('all')

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
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`/api/companies?category=${slug}`)
        const data = await response.json()
        setCompanies(data)
      } catch (error) {
        console.error('Failed to fetch companies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [slug])

  const filteredCompanies = companies.filter(company => {
    if (selectedSubCategory !== 'all') {
      const parsedTags = company.tags ? (typeof company.tags === 'string' ? JSON.parse(company.tags) : company.tags) : []
      const hasSubCategory = parsedTags.some((tag: string) => 
        tag.toLowerCase().includes(selectedSubCategory) || 
        company.description.toLowerCase().includes(selectedSubCategory)
      )
      if (!hasSubCategory) return false
    }
    return true
  })

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">カテゴリが見つかりません</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${config.gradient}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {config.emoji} {config.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {config.name}の口コミを共有して、より良いサービスを見つけよう
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className={`text-2xl font-bold text-${config.primaryColor}-600`}>{companies.length}</span>
                <span className="text-gray-600 ml-2">件</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow">
                <span className={`text-2xl font-bold text-${config.primaryColor}-600`}>4.4</span>
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
              {config.subCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSubCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSubCategory === category.id
                      ? `bg-${config.primaryColor}-600 text-white`
                      : `bg-gray-100 text-gray-700 hover:bg-${config.primaryColor}-50`
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
            <option>料金の安い順</option>
            <option>近い順</option>
          </select>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-${config.primaryColor}-600 mx-auto`}></div>
            <p className="mt-4 text-gray-600">情報を読み込み中...</p>
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
                  {company.imageUrl ? (
                    <img
                      src={company.imageUrl}
                      alt={company.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl">🏢</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 group-hover:text-${config.primaryColor}-600 transition-colors`}>
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
                      {(company.tags ? (typeof company.tags === 'string' ? JSON.parse(company.tags) : company.tags) : []).slice(0, 2).map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className={`bg-${config.primaryColor}-50 text-${config.primaryColor}-700 text-xs px-2 py-1 rounded`}
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{config.name}を身近に</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-${config.primaryColor}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`bg-${config.primaryColor}-600`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {config.ctaText}
            </h2>
            <p className={`text-xl text-${config.primaryColor}-100 mb-8 max-w-2xl mx-auto`}>
              {config.ctaSubtext}
            </p>
            <Link 
              href="/companies"
              className={`bg-white text-${config.primaryColor}-600 px-8 py-3 rounded-lg font-semibold hover:bg-${config.primaryColor}-50 transition-colors inline-flex items-center`}
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