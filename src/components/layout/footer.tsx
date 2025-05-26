export function Footer() {
  return (
    <footer className="bg-apple-gray-900 text-apple-gray-100">
      <div className="container-apple section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-apple-blue-500 to-apple-purple-500 bg-clip-text text-transparent mb-6">
              Minkuchi
            </h3>
            <p className="text-apple-gray-400 text-lg leading-relaxed max-w-md">
              地域のサービスに関する口コミ・レビューを共有できるプラットフォーム。
              信頼できる情報で、最高のサービスを見つけましょう。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">サービス</h4>
            <ul className="space-y-3 text-apple-gray-400">
              <li><a href="/services" className="hover:text-apple-blue-400 transition-colors duration-200">サービス一覧</a></li>
              <li><a href="/categories" className="hover:text-apple-blue-400 transition-colors duration-200">カテゴリ</a></li>
              <li><a href="/reviews" className="hover:text-apple-blue-400 transition-colors duration-200">レビュー</a></li>
              <li><a href="/ranking" className="hover:text-apple-blue-400 transition-colors duration-200">ランキング</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">サポート</h4>
            <ul className="space-y-3 text-apple-gray-400">
              <li><a href="/help" className="hover:text-apple-blue-400 transition-colors duration-200">ヘルプ</a></li>
              <li><a href="/contact" className="hover:text-apple-blue-400 transition-colors duration-200">お問い合わせ</a></li>
              <li><a href="/terms" className="hover:text-apple-blue-400 transition-colors duration-200">利用規約</a></li>
              <li><a href="/privacy" className="hover:text-apple-blue-400 transition-colors duration-200">プライバシー</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-apple-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-apple-gray-400 text-sm">
            &copy; 2025 Minkuchi. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-apple-gray-400">
            <span>Made with ❤️ in Japan</span>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-apple-blue-400 transition-colors duration-200">Twitter</a>
              <a href="#" className="hover:text-apple-blue-400 transition-colors duration-200">Instagram</a>
              <a href="#" className="hover:text-apple-blue-400 transition-colors duration-200">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}