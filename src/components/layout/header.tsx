'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HeaderProps } from '@/types/index'

export function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-glow">
                <span className="text-white font-black text-lg">M</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gradient font-['Space_Grotesk']">Minkuchi</span>
              <span className="text-xs text-gray-500 font-medium -mt-1">AI Review Platform</span>
            </div>
          </Link>

          {/* Enhanced Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { href: "/companies", label: "企業を探す", icon: "🏢" },
              { href: "/restaurants/search", label: "レストラン", icon: "🍽️" },
              { href: "/companies/register", label: "AI登録", icon: "🤖" },
              { href: "/category/restaurant", label: "カテゴリ", icon: "📂" }
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className="group relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-white/10"
              >
                <span className="flex items-center space-x-2 font-medium">
                  <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={user.image || '/api/placeholder/32/32'}
                    alt={user.name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-slate-700 text-sm font-medium hidden sm:block">
                    {user.name}
                  </span>
                  <svg 
                    className="w-4 h-4 text-slate-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2">👤</span>
                      プロフィール
                    </Link>
                    
                    <Link
                      href="/restaurants/search"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2">🍽️</span>
                      レストラン検索
                    </Link>
                    
                    <Link
                      href="/companies/register"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2">🤖</span>
                      AI企業登録
                    </Link>
                    
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-2">⚙️</span>
                        管理者ダッシュボード
                      </Link>
                    )}
                    
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2">📝</span>
                      レビュー管理
                    </Link>
                    
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2">❤️</span>
                      お気に入り
                    </Link>
                    
                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-2">⚙️</span>
                        設定
                      </Link>
                      
                      <button
                        onClick={() => {
                          setIsMenuOpen(false)
                          // ログアウト処理はAuthContextから呼び出す
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <span className="mr-2">🚪</span>
                        ログアウト
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-white/10"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signup"
                  className="button-modern px-6 py-3 text-sm font-semibold rounded-full hover-lift"
                >
                  無料で始める
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <svg 
                className="w-6 h-6 text-slate-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="space-y-2">
              <Link 
                href="/companies" 
                className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                企業を探す
              </Link>
              <Link 
                href="/restaurants/search" 
                className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                🍽️ レストラン検索
              </Link>
              <Link 
                href="/companies/register" 
                className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                🤖 AI企業登録
              </Link>
              <Link 
                href="/category/restaurant" 
                className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                レストラン
              </Link>
              <Link 
                href="/category/retail" 
                className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                ショッピング
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}