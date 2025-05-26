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
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              最高のサービスを<br />見つけよう
            </h1>
            <p className="text-xl mb-8 opacity-90">
              ユーザーの生の声で選ぶ、信頼できるサービスガイド
            </p>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mx-4 -mt-16 relative z-10">
            <form className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="サービス名やキーワードを入力"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">カテゴリを選択</option>
                  <option value="restaurant">レストラン</option>
                  <option value="hotel">ホテル</option>
                  <option value="entertainment">エンターテイメント</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                検索
              </button>
            </form>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">カテゴリから探す</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🍽️</div>
                <h3 className="font-semibold mb-2">レストラン</h3>
                <p className="text-sm text-gray-600">150件</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🏨</div>
                <h3 className="font-semibold mb-2">ホテル</h3>
                <p className="text-sm text-gray-600">85件</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🎬</div>
                <h3 className="font-semibold mb-2">エンターテイメント</h3>
                <p className="text-sm text-gray-600">120件</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🛍️</div>
                <h3 className="font-semibold mb-2">ショッピング</h3>
                <p className="text-sm text-gray-600">200件</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">⚙️</div>
                <h3 className="font-semibold mb-2">サービス</h3>
                <p className="text-sm text-gray-600">95件</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-semibold mb-2">その他</h3>
                <p className="text-sm text-gray-600">75件</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}