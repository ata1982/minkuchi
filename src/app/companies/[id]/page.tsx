'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Company, Review } from '@/types/index'
import { Header } from '@/components/layout/header'
import ReviewForm from '@/components/ReviewForm'
import { EssenceFilteredReviews } from '@/components/EssenceFilteredReviews'
import { mockCompanies, mockReviews, getBusinessStatus } from '@/lib/mockData'
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
          name: user!.name || null,
          email: user!.email || null,
          image: user!.image || null,
          role: user!.role,
          createdAt: new Date(),
          preferences: null,
          points: 0,
          badges: []
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

  const businessStatus = getBusinessStatus(company.businessHours || null)

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
                    {company.tags && (() => {
                      try {
                        const tags = typeof company.tags === 'string' ? JSON.parse(company.tags) : company.tags;
                        return Array.isArray(tags) ? tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700"
                          >
                            {tag}
                          </span>
                        )) : null;
                      } catch {
                        return null;
                      }
                    })()}
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
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
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
                {company.images && (() => {
                  try {
                    const images = typeof company.images === 'string' ? JSON.parse(company.images) : company.images;
                    return Array.isArray(images) ? images.map((image: string, index: number) => (
                      <div key={index} className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${company.name} - 画像 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )) : null;
                  } catch {
                    return (
                      <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
                        <span className="text-slate-500">画像を読み込めませんでした</span>
                      </div>
                    );
                  }
                })()}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9a9 9 0 01-9-9m9 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 18c1.657 0 3-4.03 3-9s-1.343-9-3-9"/>
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
                    {company.businessHours && (() => {
                      try {
                        const hours = typeof company.businessHours === 'string' ? JSON.parse(company.businessHours) : company.businessHours;
                        return Object.entries(hours).map(([day, dayHours]) => {
                          const hours = dayHours as { open?: string; close?: string; closed?: boolean };
                          const dayNames: Record<string, string> = {
                            monday: '月曜日',
                            tuesday: '火曜日', 
                            wednesday: '水曜日',
                            thursday: '木曜日',
                            friday: '金曜日',
                            saturday: '土曜日',
                            sunday: '日曜日'
                          };
                          return (
                            <div key={day} className="flex justify-between">
                              <span>{dayNames[day]}</span>
                              <span>
                                {hours.closed ? '定休日' : `${hours.open} - ${hours.close}`}
                              </span>
                            </div>
                          );
                        });
                      } catch {
                        return <div>営業時間情報がありません</div>;
                      }
                    })()}
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
          {/* 本質評価フィルタリングコンポーネントに置き換え */}
          <EssenceFilteredReviews
            reviews={reviews}
            categoryId={company.category}
            companyName={company.name}
          />
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