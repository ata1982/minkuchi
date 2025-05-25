export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Minkuchi</h3>
            <p className="text-gray-300 text-sm">
              地域のサービスに関する口コミ・レビューを共有できるプラットフォーム
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">サービス</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/services" className="hover:text-white">サービス一覧</a></li>
              <li><a href="/categories" className="hover:text-white">カテゴリ</a></li>
              <li><a href="/reviews" className="hover:text-white">レビュー</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">サポート</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/help" className="hover:text-white">ヘルプ</a></li>
              <li><a href="/contact" className="hover:text-white">お問い合わせ</a></li>
              <li><a href="/terms" className="hover:text-white">利用規約</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">フォローする</h4>
            <div className="flex space-x-4">
              {/* SNSアイコンなど */}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Minkuchi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}