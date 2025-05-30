import { useState } from 'react'
import { Review } from '@/types/index'

interface ReviewsTabProps {
  companyReviews: Review[]
  onReplySubmit: (reviewId: string, content: string) => void
}

export function ReviewsTab({ companyReviews, onReplySubmit }: ReviewsTabProps) {
  const [replyingToReview, setReplyingToReview] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const handleReplySubmit = (reviewId: string) => {
    onReplySubmit(reviewId, replyContent)
    setReplyingToReview(null)
    setReplyContent('')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">レビュー一覧</h3>
        <div className="space-y-4">
          {companyReviews.map(review => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <img 
                      src={review.user.image || '/api/placeholder/40/40'} 
                      alt={review.user.name || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{review.user.name}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{review.content}</p>
              
              {review.response && review.response.length > 0 && review.response[0] && (
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">オーナーからの返信</div>
                  <p className="text-sm text-gray-600">{review.response[0].content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(review.response[0].createdAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              )}
              
              {!review.response && (
                <div>
                  {replyingToReview === review.id ? (
                    <div className="mt-3">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        rows={3}
                        placeholder="返信を入力..."
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleReplySubmit(review.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          返信を送信
                        </button>
                        <button
                          onClick={() => {
                            setReplyingToReview(null)
                            setReplyContent('')
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          キャンセル
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingToReview(review.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      返信する
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}