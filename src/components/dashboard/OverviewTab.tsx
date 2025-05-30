import { Company, Review } from '@/types/index'

interface OverviewTabProps {
  ownedCompanies: Company[]
  companyReviews: Review[]
}

export function OverviewTab({ ownedCompanies, companyReviews }: OverviewTabProps) {
  const totalViews = ownedCompanies.reduce((acc, company) => acc + (company.reviewCount * 10), 0)
  const avgRating = ownedCompanies.length > 0 
    ? ownedCompanies.reduce((acc, company) => acc + company.rating, 0) / ownedCompanies.length 
    : 0
  const totalReviews = ownedCompanies.reduce((acc, company) => acc + company.reviewCount, 0)
  const recentReviews = companyReviews.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900">{ownedCompanies.length}</div>
          <div className="text-sm text-gray-600">登録企業数</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</div>
          <div className="text-sm text-gray-600">総ビュー数</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600">平均評価</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900">{totalReviews}</div>
          <div className="text-sm text-gray-600">総レビュー数</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">最近のレビュー</h3>
        <div className="space-y-4">
          {recentReviews.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{review.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(review.createdAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}