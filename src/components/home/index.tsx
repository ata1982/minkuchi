// ホームページ用コンポーネント統合
'use client'
import Image from 'next/image'

// カテゴリグリッド
export function CategoryGrid() {
  const categories = [
    { id: 1, name: 'レストラン', icon: '🍽️', count: 150 },
    { id: 2, name: 'ホテル', icon: '🏨', count: 85 },
    { id: 3, name: 'エンターテイメント', icon: '🎬', count: 120 },
    { id: 4, name: 'ショッピング', icon: '🛍️', count: 200 },
    { id: 5, name: 'サービス', icon: '⚙️', count: 95 },
    { id: 6, name: 'その他', icon: '📱', count: 75 }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">カテゴリから探す</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count}件</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// おすすめサービス
export function FeaturedServices() {
  const services = [
    {
      id: 1,
      name: 'トリプル美容院',
      category: 'ビューティー',
      rating: 4.8,
      reviewCount: 127,
      image: '/api/placeholder/300/200',
      tags: ['カット', 'カラー', '駅近']
    }
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">おすすめサービス</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Image 
                src={service.image} 
                alt={service.name} 
                width={300}
                height={200}
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-3">{service.category}</p>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-2 text-sm text-gray-600">{service.rating} ({service.reviewCount})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 最新レビュー
export function RecentReviews() {
  const reviews = [
    {
      id: 1,
      user: { name: 'Y.T', avatar: '/api/placeholder/40/40' },
      service: 'トリプル美容院',
      rating: 5,
      comment: 'スタッフの対応がとても良く、仕上がりも満足です！',
      date: '2024-12-20'
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">最新のレビュー</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Image 
                  src={review.user.avatar} 
                  alt={review.user.name} 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3" 
                />
                <div>
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-sm text-gray-600">{review.date}</p>
                </div>
              </div>
              <h3 className="font-medium mb-2">{review.service}</h3>
              <div className="text-yellow-500 mb-2">{'★'.repeat(review.rating)}</div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 検索フォーム
export function SearchForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mx-4 -mt-16 relative z-10">
      <form className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="サービス名やキーワードを入力"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">カテゴリを選択</option>
            <option value="restaurant">レストラン</option>
            <option value="hotel">ホテル</option>
            <option value="entertainment">エンターテイメント</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          検索
        </button>
      </form>
    </div>
  )
}

// ヒーローセクション
export function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          最高のサービスを<br />見つけよう
        </h1>
        <p className="text-xl mb-8 opacity-90">
          ユーザーの生の声で選ぶ、信頼できるサービスガイド
        </p>
      </div>
    </section>
  )
}

export default function HomeComponent() {
  return (
    <div>
      <h1>Welcome to Minkuchi</h1>
    </div>
  )
}