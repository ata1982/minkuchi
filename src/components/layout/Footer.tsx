import Link from 'next/link'

export function Footer() {
  return (
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
  )
}