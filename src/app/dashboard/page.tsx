'use client'

import { useState, useEffect } from 'react'
import { Company, Review } from '@/types/index'
import { useAuth } from '@/contexts/AuthContext'
import { mockCompanies, mockReviews } from '@/lib/mockData'
import { OverviewTab } from '@/components/dashboard/OverviewTab'
import { ReviewsTab } from '@/components/dashboard/ReviewsTab'
import { CompanyTab } from '@/components/dashboard/CompanyTab'
import { AnalyticsTab } from '@/components/dashboard/AnalyticsTab'

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [ownedCompanies, setOwnedCompanies] = useState<Company[]>([])
  const [companyReviews, setCompanyReviews] = useState<Review[]>([])

  useEffect(() => {
    // ユーザーが所有する企業を取得（実際にはAPIから取得）
    const userCompanies = mockCompanies.filter(company => 
      company.owner?.id === user?.id || company.id === '1' // デモ用
    )
    setOwnedCompanies(userCompanies)

    // 企業のレビューを取得
    const reviews = mockReviews.filter(review => 
      userCompanies.some(company => company.id === review.companyId)
    )
    setCompanyReviews(reviews)
  }, [user])

  const handleReplySubmit = (reviewId: string, content: string) => {
    // 実際にはAPIにレビュー返信を送信
    console.log('Replying to review:', reviewId, 'Content:', content)
    
    // レビューに返信を追加（モック）
    setCompanyReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? {
            ...review,
            response: [{
              id: `resp-${Date.now()}`,
              content: content,
              createdAt: new Date(),
              companyOwnerId: user?.id || '',
              reviewId: review.id,
              companyId: review.companyId
            }]
          }
        : review
    ))
  }

  const handleCompanyUpdate = (company: Company, updates: Partial<Company>) => {
    // 実際にはAPIに企業情報を更新
    console.log('Updating company:', company.id, updates)
    
    setOwnedCompanies(prev => prev.map(c =>
      c.id === company.id ? { ...c, ...updates } : c
    ))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <p className="text-gray-600">企業オーナーダッシュボードにアクセスするにはログインしてください。</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: '概要', icon: '📊' },
    { id: 'reviews', name: 'レビュー管理', icon: '⭐' },
    { id: 'company', name: '企業情報', icon: '🏢' },
    { id: 'analytics', name: '分析', icon: '📈' },
    { id: 'notifications', name: '通知', icon: '🔔' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab ownedCompanies={ownedCompanies} companyReviews={companyReviews} />
      case 'reviews':
        return <ReviewsTab companyReviews={companyReviews} onReplySubmit={handleReplySubmit} />
      case 'company':
        return <CompanyTab ownedCompanies={ownedCompanies} onCompanyUpdate={handleCompanyUpdate} />
      case 'analytics':
        return <AnalyticsTab ownedCompanies={ownedCompanies} companyReviews={companyReviews} />
      case 'notifications':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">通知</h3>
            <p className="text-gray-600">新しい通知はありません。</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">企業オーナーダッシュボード</h1>
            <p className="mt-2 text-gray-600">あなたの企業の管理と分析</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* タブコンテンツ */}
        {renderTabContent()}
      </div>
    </div>
  )
}