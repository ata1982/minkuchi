'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HeaderProps } from '@/types/index'

export function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-slate-900">みんくち</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/companies" 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              企業を探す
            </Link>
            <Link 
              href="/category/restaurant" 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              レストラン
            </Link>
            <Link 
              href="/category/retail" 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              ショッピング
            </Link>
            <Link 
              href="/category/housing" 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              住まい
            </Link>
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
                    src={user.avatar || '/api/placeholder/32/32'}
                    alt={user.name}
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
                      {user.points && (
                        <p className="text-xs text-blue-600 mt-1">
                          ポイント: {user.points}pt
                        </p>
                      )}
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
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/signin"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  新規登録
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
              <Link 
                href="/category/housing" 
                className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                住まい
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}