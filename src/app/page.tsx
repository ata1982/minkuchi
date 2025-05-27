import { Layout } from '@/components/layout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/core'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <Layout user={session?.user}>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
              あなたの街の
              <span className="text-primary-600 block">隠れた名店</span>
              を発見しよう
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              地域の人々による本物の口コミで、信頼できるサービスを見つけましょう。
              あなたの体験もシェアして、コミュニティを豊かにしませんか？
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/services" 
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-lg"
              >
                サービスを探す
              </a>
              <a 
                href="/auth/signin" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                口コミを投稿する
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">
              Minkuchiの特徴
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">地域密着</h3>
                <p className="text-secondary-600">
                  地域の人々による、地域のための口コミプラットフォーム
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">信頼性</h3>
                <p className="text-secondary-600">
                  実際に利用した人の正直なレビューで安心して選べる
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">簡単操作</h3>
                <p className="text-secondary-600">
                  直感的なインターフェースで誰でも簡単に利用可能
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              あなたの体験をシェアしませんか？
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              利用したサービスの口コミを投稿して、地域コミュニティに貢献しましょう
            </p>
            <a 
              href="/auth/signin" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 inline-block"
            >
              今すぐ始める
            </a>
          </div>
        </section>
      </div>
    </Layout>
  )
}