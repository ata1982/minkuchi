'use client'

import { useState, useEffect } from 'react'
import { Review } from '@/types/index'
import { ClassifiedReview } from '@/lib/services/review-classification-service'
import { getBusinessEssenceConfig } from '@/lib/business-essence-config'
import { Card } from '@/components/ui/Card'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface EssenceFilteredReviewsProps {
  reviews: Review[]
  categoryId: string
  companyName: string
}

export function EssenceFilteredReviews({
  reviews,
  categoryId,
  companyName
}: EssenceFilteredReviewsProps) {
  const [classifiedReviews, setClassifiedReviews] = useState<ClassifiedReview[]>([])
  const [activeTab, setActiveTab] = useState<'essence' | 'other'>('essence')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const config = getBusinessEssenceConfig(categoryId)

  useEffect(() => {
    classifyReviews()
  }, [reviews, categoryId])

  const classifyReviews = async () => {
    if (!reviews.length) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/reviews/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews,
          categoryId
        }),
      })

      if (!response.ok) {
        throw new Error('レビューの分類に失敗しました')
      }

      const data = await response.json()
      setClassifiedReviews(data.classifiedReviews)
    } catch (err) {
      console.error('分類エラー:', err)
      setError('レビューの分析中にエラーが発生しました')
      // エラー時は全てを「その他」として表示
      const fallbackReviews = reviews.map(review => ({
        ...review,
        isEssence: false,
        essenceScore: 0,
        classification: 'other' as const
      }))
      setClassifiedReviews(fallbackReviews)
    } finally {
      setLoading(false)
    }
  }

  const essenceReviews = classifiedReviews.filter(r => r.isEssence)
  const otherReviews = classifiedReviews.filter(r => !r.isEssence)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ))
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ja-JP');
  }

  const getTabTitle = (tab: 'essence' | 'other') => {
    if (!config) return tab === 'essence' ? '全てのレビュー' : 'その他'
    
    if (tab === 'essence') {
      return `${config.essenceAspects[0]}の評価 (${essenceReviews.length})`
    } else {
      return `その他の評価 (${otherReviews.length})`
    }
  }

  const getActiveReviews = () => {
    return activeTab === 'essence' ? essenceReviews : otherReviews
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
        <span className="ml-2">レビューを分析中...</span>
      </div>
    )
  }

  if (!reviews.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">まだレビューがありません。</p>
        <p className="text-sm text-gray-500 mt-2">
          最初のレビューを投稿してみませんか？
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー情報 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {companyName}のレビュー
        </h2>
        {config && (
          <p className="text-sm text-gray-600">
            {config.description}
          </p>
        )}
        {error && (
          <div className="mt-2 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
            <p className="text-sm text-yellow-800">{error}</p>
          </div>
        )}
      </div>

      {/* 統計情報 */}
      {config && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {essenceReviews.length}
            </div>
            <div className="text-sm text-gray-600">
              {config.essenceAspects[0]}の評価
            </div>
            {essenceReviews.length > 0 && (
              <div className="flex justify-center mt-1">
                {renderStars(Math.round(
                  essenceReviews.reduce((sum, r) => sum + r.rating, 0) / essenceReviews.length
                ))}
              </div>
            )}
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {otherReviews.length}
            </div>
            <div className="text-sm text-gray-600">その他の評価</div>
            {otherReviews.length > 0 && (
              <div className="flex justify-center mt-1">
                {renderStars(Math.round(
                  otherReviews.reduce((sum, r) => sum + r.rating, 0) / otherReviews.length
                ))}
              </div>
            )}
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {reviews.length}
            </div>
            <div className="text-sm text-gray-600">総レビュー数</div>
            <div className="flex justify-center mt-1">
              {renderStars(Math.round(
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('essence')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'essence'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {getTabTitle('essence')}
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'other'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {getTabTitle('other')}
          </button>
        </nav>
      </div>

      {/* レビュー表示 */}
      <div className="space-y-4">
        {getActiveReviews().length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">
              {activeTab === 'essence' 
                ? config ? `${config.essenceAspects[0]}に関するレビューがありません` : 'レビューがありません'
                : 'その他のレビューがありません'
              }
            </p>
          </Card>
        ) : (
          getActiveReviews().map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {review.user?.name || '匿名ユーザー'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  {review.title && (
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {review.title}
                    </h3>
                  )}
                  <p className="text-gray-700 leading-relaxed">
                    {review.content}
                  </p>
                  
                  {/* 分類情報（デバッグ用、本番では非表示にできます） */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                      <div>
                        本質スコア: {(review.essenceScore * 100).toFixed(1)}%
                      </div>
                      {review.classificationReason && (
                        <div className="text-gray-600">
                          理由: {review.classificationReason}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}