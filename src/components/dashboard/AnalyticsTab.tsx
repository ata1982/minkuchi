import { Company, Review } from '@/types/index'

interface AnalyticsTabProps {
  ownedCompanies: Company[]
  companyReviews: Review[]
}

export function AnalyticsTab({ ownedCompanies, companyReviews }: AnalyticsTabProps) {
  const monthlyData = [
    { month: '1月', views: 450, reviews: 12 },
    { month: '2月', views: 520, reviews: 15 },
    { month: '3月', views: 680, reviews: 18 },
    { month: '4月', views: 720, reviews: 22 },
    { month: '5月', views: 890, reviews: 25 },
    { month: '6月', views: 950, reviews: 28 }
  ]

  const ratingDistribution = {
    5: companyReviews.filter(r => r.rating === 5).length,
    4: companyReviews.filter(r => r.rating === 4).length,
    3: companyReviews.filter(r => r.rating === 3).length,
    2: companyReviews.filter(r => r.rating === 2).length,
    1: companyReviews.filter(r => r.rating === 1).length
  }

  const totalRatings = Object.values(ratingDistribution).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">月別パフォーマンス</h3>
        <div className="space-y-4">
          {monthlyData.map(data => (
            <div key={data.month} className="flex items-center gap-4">
              <div className="w-12">{data.month}</div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">ビュー数: {data.views}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(data.views / 1000) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">レビュー: {data.reviews}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">評価分布</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-20">
                <span>{rating}</span>
                <span className="text-yellow-500">★</span>
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-yellow-400 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ 
                      width: totalRatings > 0 
                        ? `${(ratingDistribution[rating as keyof typeof ratingDistribution] / totalRatings) * 100}%`
                        : '0%'
                    }}
                  >
                    <span className="text-xs text-gray-700">
                      {ratingDistribution[rating as keyof typeof ratingDistribution]}件
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">人気の企業</h3>
          <div className="space-y-3">
            {ownedCompanies.slice(0, 5).map(company => (
              <div key={company.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{company.name}</div>
                  <div className="text-sm text-gray-600">{company.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{company.reviewCount * 10} views</div>
                  <div className="text-sm text-gray-600">★ {company.rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">レビュー統計</h3>
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold">{companyReviews.length}</div>
              <div className="text-sm text-gray-600">総レビュー数</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {companyReviews.filter(r => r.response).length}
              </div>
              <div className="text-sm text-gray-600">返信済みレビュー</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {((companyReviews.filter(r => r.response).length / companyReviews.length) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">返信率</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}