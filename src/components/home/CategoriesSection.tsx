import Link from 'next/link'

export function CategoriesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">人気カテゴリから探す</h2>
          <p className="text-lg text-slate-600">あなたが探しているサービスのカテゴリを選択してください</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* レストラン・飲食店 */}
          <Link href="/category/restaurant" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-3">🍽️</div>
            <h3 className="font-semibold text-slate-800">レストラン・飲食店</h3>
            <p className="text-xs text-slate-500 mt-2 group-hover:text-orange-600">グルメ・カフェ</p>
          </Link>

          {/* 小売・ショッピング */}
          <Link href="/category/retail" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-3">🛍️</div>
            <h3 className="font-semibold text-slate-800">小売・ショッピング</h3>
            <p className="text-xs text-slate-500 mt-2 group-hover:text-purple-600">ファッション・雑貨</p>
          </Link>

          {/* 住宅・不動産 */}
          <Link href="/category/housing" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-3">🏠</div>
            <h3 className="font-semibold text-slate-800">住宅・不動産</h3>
            <p className="text-xs text-slate-500 mt-2 group-hover:text-green-600">賃貸・売買・リフォーム</p>
          </Link>

          {/* 美容・健康 */}
          <Link href="/category/beauty" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-3">💄</div>
            <h3 className="font-semibold text-slate-800">美容・健康</h3>
            <p className="text-xs text-slate-500 mt-2 group-hover:text-pink-600">サロン・フィットネス</p>
          </Link>

          {/* 教育・学習 */}
          <Link href="/category/education" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold text-slate-800">教育・学習</h3>
            <p className="text-xs text-slate-500 mt-2 group-hover:text-purple-600">学校・塾・スクール</p>
          </Link>

          {/* 医療・ヘルスケア */}
          <Link href="/category/healthcare" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-3">🏥</div>
            <h3 className="font-semibold text-slate-800">医療・ヘルスケア</h3>
            <p className="text-xs text-slate-500 mt-2 group-hover:text-green-600">病院・クリニック・薬局</p>
          </Link>

          {/* エンターテインメント */}
          <Link href="/category/entertainment" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-3">🎬</div>
            <h3 className="font-semibold text-slate-800">エンターテインメント</h3>
            <p className="text-xs text-slate-500 mt-2 group-hover:text-red-600">映画・音楽・レジャー</p>
          </Link>

          {/* スポーツ・フィットネス */}
          <Link href="/category/sports" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
            <div className="text-4xl mb-3">⚽</div>
            <h3 className="font-semibold text-slate-800">スポーツ・フィットネス</h3>
            <p className="text-xs text-slate-500 mt-2 group-hover:text-orange-600">ジム・ヨガ・スポーツ施設</p>
          </Link>
        </div>
      </div>
    </section>
  )
}