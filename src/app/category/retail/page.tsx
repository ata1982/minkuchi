import Link from 'next/link';

export default function RetailCategoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🛍️ 小売・ショッピング</h1>
            <p className="text-lg text-gray-600">お買い物体験やサービスの口コミを共有しよう</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">小売・ショッピングを探す</h2>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">このカテゴリの企業情報は準備中です</p>
              <Link href="/companies" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                企業一覧を見る
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
              ← ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}