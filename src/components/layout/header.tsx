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
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary-600">Minkuchi</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-primary-600">ホーム</a>
              <a href="/services" className="text-gray-600 hover:text-primary-600">サービス</a>
              <a href="/categories" className="text-gray-600 hover:text-primary-600">カテゴリ</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">こんにちは、{user.name || 'ユーザー'}さん</span>
                <button className="btn-secondary">ログアウト</button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <a href="/auth/signin" className="btn-secondary">ログイン</a>
                <a href="/auth/signup" className="btn-primary">新規登録</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}