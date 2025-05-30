'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { mockCompanies, mockReviews } from '@/lib/mockData'
import { RestaurantSearchRegistration } from '@/components/admin/RestaurantSearchRegistration'
import { ReviewCollectionComponent } from '@/components/admin/ReviewCollectionComponent'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">アクセス権限がありません</h2>
          <p className="text-gray-600">管理者のみアクセス可能です。</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: '概要', icon: '📊' },
    { id: 'companies', name: '企業管理', icon: '🏢' },
    { id: 'restaurant-search', name: 'レストラン検索・登録', icon: '🍽️' },
    { id: 'ai-review-collection', name: 'AIレビュー収集', icon: '🤖' },
    { id: 'reviews', name: 'レビュー監視', icon: '⭐' },
    { id: 'users', name: 'ユーザー管理', icon: '👥' },
    { id: 'reports', name: '報告管理', icon: '🚨' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">管理者ダッシュボード</h1>
            <p className="mt-2 text-gray-600">サイト全体の管理と監視</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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

        {/* 概要タブ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">🏢</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">総企業数</dt>
                      <dd className="text-lg font-medium text-gray-900">{mockCompanies.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">⭐</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">総レビュー数</dt>
                      <dd className="text-lg font-medium text-gray-900">{mockReviews.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">👥</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">アクティブユーザー</dt>
                      <dd className="text-lg font-medium text-gray-900">2,847</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">🚨</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">未処理報告</dt>
                      <dd className="text-lg font-medium text-gray-900">3</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* AI機能のハイライト */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI機能</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">🔍</span>
                    <h4 className="font-medium text-gray-900">Gemini活用レビュー分析</h4>
                  </div>
                  <p className="text-sm text-gray-600">Google Reviews、食べログなどの情報をAIで分析</p>
                  <button 
                    onClick={() => setActiveTab('ai-review-collection')}
                    className="mt-2 text-blue-600 text-sm hover:text-blue-800"
                  >
                    → 試してみる
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">🐦</span>
                    <h4 className="font-medium text-gray-900">Grok3 Twitter分析</h4>
                  </div>
                  <p className="text-sm text-gray-600">Twitter上の口コミや評判をリアルタイム分析</p>
                  <button 
                    onClick={() => setActiveTab('ai-review-collection')}
                    className="mt-2 text-blue-600 text-sm hover:text-blue-800"
                  >
                    → 試してみる
                  </button>
                </div>
              </div>
            </div>

            {/* 最近のアクティビティ */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">最近のアクティビティ</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">🤖 AIレビュー収集機能が有効化されました</span>
                    <span className="text-xs text-gray-400">30分前</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">新しい企業「テクノ商事」が登録されました</span>
                    <span className="text-xs text-gray-400">2時間前</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">レビューに対する報告が提出されました</span>
                    <span className="text-xs text-gray-400">4時間前</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">企業情報の更新申請がありました</span>
                    <span className="text-xs text-gray-400">6時間前</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">レストラン自動検索で15件のレストランが登録されました</span>
                    <span className="text-xs text-gray-400">1日前</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 企業管理タブ */}
        {activeTab === 'companies' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">企業管理</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveTab('restaurant-search')}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
                  >
                    🍽️ レストラン自動登録
                  </button>
                  <button 
                    onClick={() => setActiveTab('ai-review-collection')}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600"
                  >
                    🤖 AIレビュー収集
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                    新規企業追加
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {mockCompanies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {company.imageUrl ? (
                        <img
                          src={company.imageUrl}
                          alt={company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">🏢</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{company.name}</h4>
                        <p className="text-sm text-gray-500">{company.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs ${
                            company.category === 'restaurant' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {company.category === 'restaurant' ? '🍽️ レストラン' : company.category}
                          </span>
                          {company.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              ✅ 認証済
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">⭐ {company.rating}</div>
                        <div className="text-sm text-gray-500">{company.reviewCount} レビュー</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600">
                          🤖 AI分析
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                          編集
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* レストラン検索・登録タブ */}
        {activeTab === 'restaurant-search' && (
          <RestaurantSearchRegistration />
        )}

        {/* AIレビュー・口コミ収集タブ */}
        {activeTab === 'ai-review-collection' && (
          <ReviewCollectionComponent />
        )}

        {/* レビュー監視タブ */}
        {activeTab === 'reviews' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">レビュー監視</h3>
              <p className="text-gray-600 mb-4">レビューの監視・管理機能</p>
              
              <div className="space-y-4">
                {mockReviews.slice(0, 10).map((review) => (
                  <div key={review.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{review.user.name}</span>
                        <span className="text-sm text-gray-500">→</span>
                        <span className="text-sm text-gray-600">{mockCompanies.find(c => c.id === review.companyId)?.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
                      <p className="text-gray-600 text-sm">{review.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>📅 {new Date(review.createdAt).toLocaleDateString()}</span>
                        <span>👍 {review.helpfulCount}</span>
                        {review.verified && <span className="text-green-600">✅ 認証済</span>}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
                        警告
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                        削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ユーザー管理タブ */}
        {activeTab === 'users' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">ユーザー管理</h3>
              <p className="text-gray-600">ユーザーアカウントの管理機能を実装中...</p>
            </div>
          </div>
        )}

        {/* 報告管理タブ */}
        {activeTab === 'reports' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">報告管理</h3>
              <p className="text-gray-600">不適切なコンテンツの報告管理機能を実装中...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}