import { ReactNode } from 'react'

// Header Props
interface HeaderProps {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}

// Header Component
export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm h-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <svg className="icon-sm text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-secondary-900 tracking-tight">
                Minkuchi
              </h1>
            </div>
            
            {/* Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <a href="/" className="nav-link text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-150 py-2">
                ホーム
              </a>
              <a href="/services" className="nav-link text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-150 py-2">
                サービス検索
              </a>
              <a href="/categories" className="nav-link text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-150 py-2">
                カテゴリ一覧
              </a>
              <a href="/ranking" className="nav-link text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-150 py-2">
                人気ランキング
              </a>
              <a href="/reviews" className="nav-link text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-150 py-2">
                最新レビュー
              </a>
            </nav>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-72 mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="サービス名やキーワードで検索"
                className="form-input text-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors duration-150">
                <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <button className="btn-ghost text-sm">
                  口コミを書く
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name || 'ユーザー'} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-secondary-600">
                        {user.name?.[0] || 'U'}
                      </span>
                    )}
                  </div>
                  <div className="relative group">
                    <button className="text-sm font-medium text-secondary-700 hover:text-secondary-900 flex items-center">
                      {user.name || 'ユーザー'}
                      <svg className="icon-xs ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-medium border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                      <div className="py-1">
                        <a href="/profile" className="block px-3 py-2 text-sm text-secondary-700 hover:bg-gray-50 transition-colors duration-150">
                          プロフィール
                        </a>
                        <a href="/my-reviews" className="block px-3 py-2 text-sm text-secondary-700 hover:bg-gray-50 transition-colors duration-150">
                          マイレビュー
                        </a>
                        <a href="/settings" className="block px-3 py-2 text-sm text-secondary-700 hover:bg-gray-50 transition-colors duration-150">
                          設定
                        </a>
                        <hr className="my-1 border-gray-200" />
                        <button className="block w-full text-left px-3 py-2 text-sm text-secondary-700 hover:bg-gray-50 transition-colors duration-150">
                          ログアウト
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a 
                  href="/auth/signin" 
                  className="btn-ghost text-sm"
                >
                  ログイン
                </a>
                <a 
                  href="/auth/signup" 
                  className="btn-primary"
                >
                  新規登録
                </a>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button className="lg:hidden p-1.5 text-secondary-600 hover:text-secondary-900 hover:bg-gray-50 rounded-md transition-all duration-150">
              <svg className="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

// Footer Component
export function Footer() {
  return (
    <footer className="bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-secondary-200 pb-8">
          {/* 会社情報 */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary-900">会社情報</h4>
            <ul className="space-y-3 text-secondary-600">
              <li><a href="/about" className="hover:text-primary-600 transition-colors duration-200">Minkuchiについて</a></li>
              <li><a href="/terms" className="hover:text-primary-600 transition-colors duration-200">利用規約</a></li>
              <li><a href="/privacy" className="hover:text-primary-600 transition-colors duration-200">プライバシーポリシー</a></li>
            </ul>
          </div>
          
          {/* サービス */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary-900">サービス</h4>
            <ul className="space-y-3 text-secondary-600">
              <li><a href="/services" className="hover:text-primary-600 transition-colors duration-200">サービス検索</a></li>
              <li><a href="/categories" className="hover:text-primary-600 transition-colors duration-200">カテゴリ一覧</a></li>
              <li><a href="/ranking" className="hover:text-primary-600 transition-colors duration-200">人気ランキング</a></li>
            </ul>
          </div>
          
          {/* サポート */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary-900">サポート</h4>
            <ul className="space-y-3 text-secondary-600">
              <li><a href="/help" className="hover:text-primary-600 transition-colors duration-200">ヘルプ</a></li>
              <li><a href="/contact" className="hover:text-primary-600 transition-colors duration-200">お問い合わせ</a></li>
            </ul>
          </div>
        </div>
        
        {/* コピーライト */}
        <div className="pt-8 text-center">
          <p className="text-secondary-600 text-sm">
            © 2025 Minkuchi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Layout Component
export function Layout({ 
  children, 
  user,
  className = '' 
}: {
  children: ReactNode
  user?: HeaderProps['user']
  className?: string
}) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header user={user} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}