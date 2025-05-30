import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative hero-gradient min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
          🎯 地域密着型口コミプラットフォーム
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          あなたの街の
          <span className="text-gradient">隠れた名店</span>
          を発見しよう
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          地域の人々による本物の口コミで、信頼できるサービスを見つけましょう。<br />
          あなたの体験もシェアして、コミュニティを豊かにしませんか？
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input 
              type="text" 
              placeholder="サービス名・店名・地域で検索..." 
              className="w-full pl-6 pr-16 py-4 text-lg border-2 border-white rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/90 backdrop-blur-sm" 
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/companies" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            サービスを探す
          </Link>
          <Link href="/companies" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold text-lg border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
            口コミを投稿する
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-slate-600 font-medium">登録サービス</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-slate-600 font-medium">口コミ投稿</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-slate-600 font-medium">アクティブユーザー</div>
          </div>
        </div>
      </div>
    </section>
  )
}