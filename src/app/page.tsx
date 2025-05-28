'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // 認証状態の確認（後で実装）
    // setIsAuthenticated(checkAuthStatus())
  }, [])

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900">Minkuchi</h1>
              </div>
              
              {/* Navigation */}
              <nav className="flex items-center space-x-8">
                <Link href="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">ホーム</Link>
                <Link href="/companies" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">企業一覧</Link>
                <Link href="/companies" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">商品一覧</Link>
                <Link href="/companies" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">カテゴリ</Link>
                <Link href="/companies" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">検索</Link>
              </nav>
            </div>
            
            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="サービス名やキーワードで検索" 
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
                <button className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3" id="headerAuth">
              <Link href="/companies" className="btn-ghost">ログイン</Link>
              <Link href="/companies" className="btn-primary">新規登録</Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
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

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">Minkuchiの特徴</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">地域密着</h3>
                <p className="text-slate-600">地域の人々による、地域のための口コミプラットフォーム</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">信頼性</h3>
                <p className="text-slate-600">実際に利用した人の正直なレビューで安心して選べる</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">簡単操作</h3>
                <p className="text-slate-600">直感的なインターフェースで誰でも簡単に利用可能</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">人気カテゴリから探す</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">地域で人気のサービスカテゴリをチェックして、あなたにぴったりのサービスを見つけましょう</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {/* 住宅・不動産 */}
              <Link href="/category/housing" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">住宅・不動産</h3>
              </Link>

              {/* レストラン・飲食 */}
              <Link href="/category/restaurant" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="text-4xl mb-3">🍽️</div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">レストラン・飲食</h3>
              </Link>

              {/* 小売・ショッピング */}
              <Link href="/category/retail" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="text-4xl mb-3">🛍️</div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">小売・ショッピング</h3>
              </Link>

              {/* 美容・健康 */}
              <div className="bg-white rounded-xl p-6 text-center opacity-50 cursor-not-allowed">
                <div className="text-4xl mb-3">💄</div>
                <h3 className="font-semibold text-slate-800">美容・健康</h3>
                <p className="text-xs text-slate-500 mt-2">準備中</p>
              </div>

              {/* 教育・学習 */}
              <div className="bg-white rounded-xl p-6 text-center opacity-50 cursor-not-allowed">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-semibold text-slate-800">教育・学習</h3>
                <p className="text-xs text-slate-500 mt-2">準備中</p>
              </div>

              {/* 医療・ヘルスケア */}
              <div className="bg-white rounded-xl p-6 text-center opacity-50 cursor-not-allowed">
                <div className="text-4xl mb-3">🏥</div>
                <h3 className="font-semibold text-slate-800">医療・ヘルスケア</h3>
                <p className="text-xs text-slate-500 mt-2">準備中</p>
              </div>

              {/* エンターテインメント */}
              <div className="bg-white rounded-xl p-6 text-center opacity-50 cursor-not-allowed">
                <div className="text-4xl mb-3">🎬</div>
                <h3 className="font-semibold text-slate-800">エンターテインメント</h3>
                <p className="text-xs text-slate-500 mt-2">準備中</p>
              </div>

              {/* スポーツ・フィットネス */}
              <div className="bg-white rounded-xl p-6 text-center opacity-50 cursor-not-allowed">
                <div className="text-4xl mb-3">⚽</div>
                <h3 className="font-semibold text-slate-800">スポーツ・フィットネス</h3>
                <p className="text-xs text-slate-500 mt-2">準備中</p>
              </div>

              {/* ペット */}
              <div className="bg-white rounded-xl p-6 text-center opacity-50 cursor-not-allowed">
                <div className="text-4xl mb-3">🐕</div>
                <h3 className="font-semibold text-slate-800">ペット</h3>
                <p className="text-xs text-slate-500 mt-2">準備中</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta py-20 bg-blue-600 text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">あなたの体験をシェアしませんか？</h2>
            <p className="text-lg mb-8">利用したサービスの口コミを投稿して、地域コミュニティに貢献しましょう</p>
            <Link href="/companies" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-xl hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
              レビューを見る
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">会社情報</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-slate-700 hover:text-blue-600 transition-colors">Minkuchiについて</Link></li>
                  <li><Link href="/terms" className="text-slate-700 hover:text-blue-600 transition-colors">利用規約</Link></li>
                  <li><Link href="/privacy" className="text-slate-700 hover:text-blue-600 transition-colors">プライバシーポリシー</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">サービス</h4>
                <ul className="space-y-2">
                  <li><Link href="/companies" className="text-slate-700 hover:text-blue-600 transition-colors">企業検索</Link></li>
                  <li><Link href="/products" className="text-slate-700 hover:text-blue-600 transition-colors">商品検索</Link></li>
                  <li><Link href="/categories" className="text-slate-700 hover:text-blue-600 transition-colors">カテゴリ一覧</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">サポート</h4>
                <ul className="space-y-2">
                  <li><Link href="/help" className="text-slate-700 hover:text-blue-600 transition-colors">ヘルプ</Link></li>
                  <li><Link href="/contact" className="text-slate-700 hover:text-blue-600 transition-colors">お問い合わせ</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-4 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">© 2025 Minkuchi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}