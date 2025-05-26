interface HeaderProps {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-apple-gray-200 shadow-apple">
      <div className="container-apple">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-apple-blue-500 to-apple-purple-500 bg-clip-text text-transparent">
              Minkuchi
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="nav-link">ホーム</a>
              <a href="/services" className="nav-link">サービス</a>
              <a href="/categories" className="nav-link">カテゴリ</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {user.image && (
                    <img 
                      src={user.image} 
                      alt={user.name || 'ユーザー'} 
                      className="w-8 h-8 rounded-full shadow-apple"
                    />
                  )}
                  <span className="text-sm text-apple-gray-600 font-medium">
                    こんにちは、{user.name || 'ユーザー'}さん
                  </span>
                </div>
                <button className="btn-ghost text-sm">ログアウト</button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <a href="/auth/signin" className="btn-ghost">ログイン</a>
                <a href="/auth/signup" className="btn-primary">新規登録</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}