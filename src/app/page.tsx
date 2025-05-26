import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={session?.user || undefined} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container-apple">
            <div className="hero-content">
              <h1 className="hero-title">
                最高のサービスを<br />見つけよう
              </h1>
              <p className="hero-subtitle">
                ユーザーの生の声で選ぶ、信頼できるサービスガイド。<br />
                あなたにぴったりのサービスを、今すぐ発見しましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <button className="btn-primary text-lg px-8 py-4">
                  今すぐ始める
                </button>
                <button className="btn-ghost text-lg px-8 py-4">
                  詳しく見る
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating Search Card */}
          <div className="container-apple mt-16">
            <div className="card-hero max-w-4xl mx-auto">
              <form className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="サービス名やキーワードを入力"
                    className="form-input text-lg"
                  />
                </div>
                <div className="flex-1">
                  <select className="form-select text-lg">
                    <option value="">カテゴリを選択</option>
                    <option value="restaurant">🍽️ レストラン</option>
                    <option value="hotel">🏨 ホテル</option>
                    <option value="entertainment">🎬 エンターテイメント</option>
                    <option value="shopping">🛍️ ショッピング</option>
                    <option value="service">⚙️ サービス</option>
                    <option value="other">📱 その他</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn-primary text-lg px-12 py-4 whitespace-nowrap"
                >
                  検索する
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="section-padding bg-apple-gray-50">
          <div className="container-apple">
            <div className="text-center mb-20">
              <h2 className="section-title">カテゴリから探す</h2>
              <p className="section-subtitle">
                豊富なカテゴリから、あなたが探しているサービスを見つけましょう
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { emoji: '🍽️', name: 'レストラン', count: 150, color: 'apple-red' },
                { emoji: '🏨', name: 'ホテル', count: 85, color: 'apple-blue' },
                { emoji: '🎬', name: 'エンタメ', count: 120, color: 'apple-purple' },
                { emoji: '🛍️', name: 'ショッピング', count: 200, color: 'apple-green' },
                { emoji: '⚙️', name: 'サービス', count: 95, color: 'apple-orange' },
                { emoji: '📱', name: 'その他', count: 75, color: 'apple-gray' }
              ].map((category, index) => (
                <div 
                  key={category.name}
                  className="card-minimal text-center cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {category.emoji}
                  </div>
                  <h3 className="font-semibold mb-2 text-apple-gray-800">{category.name}</h3>
                  <p className="text-sm text-apple-gray-500">{category.count}件</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-apple">
            <div className="text-center mb-20">
              <h2 className="section-title">なぜMinkuchiなのか</h2>
              <p className="section-subtitle">
                信頼性と使いやすさを追求した、次世代のレビュープラットフォーム
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: '信頼できるレビュー',
                  description: '実際に利用したユーザーの生の声だけを掲載。偽のレビューは徹底的に排除します。',
                  icon: '🛡️'
                },
                {
                  title: 'AI搭載検索',
                  description: 'あなたの好みを学習し、最適なサービスを自動でおすすめします。',
                  icon: '🤖'
                },
                {
                  title: 'リアルタイム更新',
                  description: '最新の情報が常に反映され、いつでも正確な情報を確認できます。',
                  icon: '⚡'
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-apple-gray-800">{feature.title}</h3>
                  <p className="text-apple-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-apple-blue-500 to-apple-purple-600 text-white">
          <div className="container-narrow text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              今すぐ始めましょう
            </h2>
            <p className="text-xl mb-12 opacity-90">
              無料でアカウントを作成して、最高のサービス体験を始めませんか？
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-apple-blue-600 hover:bg-apple-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 hover:scale-105">
                無料で始める
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-apple-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200">
                デモを見る
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}