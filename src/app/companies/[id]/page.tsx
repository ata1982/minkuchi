'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Company, Review } from '@/types/index'
import { Header } from '@/components/layout/header'
import ReviewForm from '@/components/ReviewForm'
import { mockCompanies, mockReviews, formatRelativeTime, getBusinessStatus } from '@/lib/mockData'
import { useAuth } from '@/contexts/AuthContext'

interface ReviewFormData {
  id: string
  userId: string
  companyId: string
  rating: number
  title: string
  content: string
  tags: string[]
  createdAt: Date
}

export default function CompanyDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const [company, setCompany] = useState<Company | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyId = params.id as string
        const foundCompany = mockCompanies.find(c => c.id === companyId)
        const companyReviews = mockReviews.filter(r => r.companyId === companyId)
        
        setCompany(foundCompany || null)
        setReviews(companyReviews)
      } catch (error) {
        console.error('企業データの取得に失敗:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [params.id])

  const handleReviewSubmit = async (reviewData: ReviewFormData) => {
    try {
      // 実際のAPIでレビューを投稿
      console.log('レビュー投稿:', reviewData)
      
      // 新しいレビューをローカル状態に追加
      const newReview: Review = {
        id: reviewData.id,
        userId: reviewData.userId,
        companyId: reviewData.companyId,
        user: {
          id: user!.id,
          name: user!.name,
          email: user!.email,
          avatar: user!.avatar,
          role: user!.role,
          createdAt: user!.createdAt,
          preferences: user!.preferences,
          points: user!.points,
          badges: user!.badges
        },
        rating: reviewData.rating,
        title: reviewData.title,
        content: reviewData.content,
        images: [], // 実際の実装では画像URLを設定
        tags: reviewData.tags,
        helpfulCount: 0,
        createdAt: reviewData.createdAt,
        updatedAt: reviewData.createdAt,
        verified: false
      }
      
      setReviews(prev => [newReview, ...prev])
      
      // 企業の評価とレビュー数を更新
      if (company) {
        const newRating = (company.rating * company.reviewCount + reviewData.rating) / (company.reviewCount + 1)
        setCompany(prev => prev ? {
          ...prev,
          rating: Math.round(newRating * 10) / 10,
          reviewCount: prev.reviewCount + 1
        } : null)
      }
      
      // 成功通知
      alert('レビューが投稿されました！')
    } catch (error) {
      console.error('レビュー投稿エラー:', error)
      alert('レビューの投稿に失敗しました')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">企業が見つかりません</h1>
          <Link href="/companies" className="btn-primary">
            企業一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  const businessStatus = getBusinessStatus(company.hours)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-slate-900">{company.name}</h1>
                    {company.verified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        認証済み
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(company.rating) ? 'text-yellow-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-2 text-lg font-semibold text-slate-900">{company.rating}</span>
                      <span className="text-slate-500">({company.reviewCount}件のレビュー)</span>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      businessStatus.isOpen 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {businessStatus.isOpen ? '営業中' : '営業時間外'}
                    </div>
                  </div>

                  <p className="text-slate-600 text-lg mb-4">{company.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {company.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {user && (
                      <button
                        onClick={() => setShowReviewForm(true)}
                        className="btn-primary"
                      >
                        レビューを書く
                      </button>
                    )}
                    
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`btn-secondary ${isFavorite ? 'bg-red-50 border-red-500 text-red-600' : ''}`}
                    >
                      {isFavorite ? (
                        <>
                          <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                          </svg>
                          お気に入り済み
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                          お気に入り
                        </>
                      )}
                    </button>

                    <button className="btn-ghost">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                      </svg>
                      シェア
                    </button>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {company.images.map((image, index) => (
                  <div key={index} className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${company.name} - 画像 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">基本情報</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-slate-900">住所</p>
                      <p className="text-sm text-slate-600">{company.address}</p>
                    </div>
                  </div>

                  {company.phone && (
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-slate-900">電話番号</p>
                        <a href={`tel:${company.phone}`} className="text-sm text-blue-600 hover:text-blue-700">
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.website && (
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-slate-900">ウェブサイト</p>
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          公式サイトを見る
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Business Hours */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">営業時間</h4>
                  <div className="space-y-2">
                    {Object.entries(company.hours).map(([day, hours]) => {
                      const dayNames: { [key: string]: string } = {
                        monday: '月',
                        tuesday: '火',
                        wednesday: '水',
                        thursday: '木',
                        friday: '金',
                        saturday: '土',
                        sunday: '日'
                      }
                      
                      return (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="text-slate-700">{dayNames[day]}</span>
                          <span className="text-slate-600">
                            {hours.closed ? '定休日' : `${hours.open} - ${hours.close}`}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">レビュー ({reviews.length}件)</h2>
            <div className="flex items-center space-x-4">
              {user && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="btn-primary"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  レビューを書く
                </button>
              )}
              <select className="input-field w-auto">
                <option>新しい順</option>
                <option>古い順</option>
                <option>評価の高い順</option>
                <option>評価の低い順</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.user.avatar || '/api/placeholder/40/40'}
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-slate-900">{review.user.name}</p>
                      <p className="text-sm text-slate-500">{formatRelativeTime(review.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-slate-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>

                <h3 className="font-semibold text-slate-900 mb-2">{review.title}</h3>
                <p className="text-slate-700 mb-4">{review.content}</p>

                {review.images.length > 0 && (
                  <div className="flex space-x-2 mb-4">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`レビュー画像 ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {review.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-1 text-sm text-slate-500 hover:text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 01-2-2V5a2 2 0 012-2h2.343M11 7L9 5l2-2m0 2l2 2-2 2m2 8h.01"/>
                    </svg>
                    <span>参考になった ({review.helpfulCount})</span>
                  </button>
                </div>

                {/* Company Response */}
                {review.response && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm font-medium text-blue-900">{company.name}からの返信</span>
                      <span className="text-xs text-blue-600">{formatRelativeTime(review.response.createdAt)}</span>
                    </div>
                    <p className="text-sm text-blue-800">{review.response.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <h3 className="text-lg font-medium text-slate-900 mb-2">まだレビューがありません</h3>
              <p className="text-slate-600 mb-4">最初のレビューを投稿してみませんか？</p>
              {user && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="btn-primary"
                >
                  レビューを書く
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      {company && (
        <ReviewForm
          companyId={company.id}
          companyName={company.name}
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  )
}