'use client'

import { useState, useEffect } from 'react'
import { Company, Review } from '@/types/index'
import { useAuth } from '@/contexts/AuthContext'
import { mockCompanies, mockReviews } from '@/lib/mockData'

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [ownedCompanies, setOwnedCompanies] = useState<Company[]>([])
  const [companyReviews, setCompanyReviews] = useState<Review[]>([])
  const [replyingToReview, setReplyingToReview] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [formData, setFormData] = useState<Partial<Company>>({})

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

  const handleReplySubmit = (reviewId: string) => {
    // 実際にはAPIにレビュー返信を送信
    console.log('Replying to review:', reviewId, 'Content:', replyContent)
    
    // レビューに返信を追加（モック）
    setCompanyReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? {
            ...review,
            response: {
              id: `resp-${Date.now()}`,
              content: replyContent,
              createdAt: new Date(),
              companyOwnerId: user?.id || ''
            }
          }
        : review
    ))
    
    setReplyingToReview(null)
    setReplyContent('')
  }

  const handleCompanyEdit = (company: Company) => {
    setEditingCompany(company)
    setFormData(company)
  }

  const handleCompanySave = () => {
    if (!editingCompany || !formData) return
    
    // 実際にはAPIに企業情報を更新
    console.log('Updating company:', editingCompany.id, formData)
    
    setOwnedCompanies(prev => prev.map(company =>
      company.id === editingCompany.id ? { ...company, ...formData } : company
    ))
    
    setEditingCompany(null)
    setFormData({})
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

  const getAnalyticsData = () => {
    const totalViews = ownedCompanies.reduce((acc, company) => acc + (company.reviewCount * 10), 0)
    const avgRating = ownedCompanies.length > 0 
      ? ownedCompanies.reduce((acc, company) => acc + company.rating, 0) / ownedCompanies.length 
      : 0
    
    return {
      totalViews,
      avgRating,
      monthlyViews: [120, 180, 250, 320, 280, 400, 380],
      ratingTrend: [4.2, 4.3, 4.4, 4.5, 4.4, 4.6, 4.5],
      reviewsByMonth: [5, 8, 12, 15, 18, 22, 25]
    }
  }

  const analytics = getAnalyticsData()

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

        {/* 概要タブ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 統計カード */}
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
                      <dt className="text-sm font-medium text-gray-500 truncate">登録企業数</dt>
                      <dd className="text-lg font-medium text-gray-900">{ownedCompanies.length}</dd>
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
                      <dd className="text-lg font-medium text-gray-900">{companyReviews.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">平均評価</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {analytics.avgRating.toFixed(1)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">👥</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">今月の閲覧数</dt>
                      <dd className="text-lg font-medium text-gray-900">{analytics.totalViews.toLocaleString()}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* 最近のアクティビティ */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">最近のアクティビティ</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">新しいレビューが投稿されました - カフェ・ブルーマウンテン</span>
                    <span className="text-xs text-gray-400">2時間前</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">企業情報が更新されました - カフェ・ブルーマウンテン</span>
                    <span className="text-xs text-gray-400">1日前</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">レビューに返信しました</span>
                    <span className="text-xs text-gray-400">2日前</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 企業一覧 */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">登録企業</h3>
                <div className="space-y-4">
                  {ownedCompanies.map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={company.imageUrl}
                          alt={company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{company.name}</h4>
                          <p className="text-sm text-gray-500">{company.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {company.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">認証済み</span>
                            )}
                            <span className="text-xs text-gray-500">{company.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">⭐ {company.rating}</div>
                          <div className="text-sm text-gray-500">{company.reviewCount} レビュー</div>
                        </div>
                        <button 
                          onClick={() => handleCompanyEdit(company)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                        >
                          編集
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* レビュー管理タブ */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* フィルター */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <select className="border rounded-lg px-3 py-2">
                  <option>すべての企業</option>
                  {ownedCompanies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
                <select className="border rounded-lg px-3 py-2">
                  <option>すべての評価</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
                <select className="border rounded-lg px-3 py-2">
                  <option>返信状況</option>
                  <option value="replied">返信済み</option>
                  <option value="pending">未返信</option>
                </select>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">レビュー管理</h3>
                <div className="space-y-4">
                  {companyReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                  ⭐
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              by {review.user.name}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {ownedCompanies.find(c => c.id === review.companyId)?.name}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                          <p className="text-gray-600 mb-3">{review.content}</p>
                          {review.images && review.images.length > 0 && (
                            <div className="flex space-x-2 mb-3">
                              {review.images.map((image, index) => (
                                <img key={index} src={image} alt="" className="w-16 h-16 object-cover rounded" />
                              ))}
                            </div>
                          )}
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{review.createdAt.toLocaleDateString('ja-JP')}</span>
                            <span>👍 {review.helpfulCount}</span>
                            {review.tags && review.tags.length > 0 && (
                              <div className="flex space-x-1">
                                {review.tags.map((tag, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex space-x-2">
                          {!review.response && (
                            <button 
                              onClick={() => setReplyingToReview(review.id)}
                              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                            >
                              返信
                            </button>
                          )}
                          <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                            詳細
                          </button>
                        </div>
                      </div>
                      
                      {/* 返信フォーム */}
                      {replyingToReview === review.id && (
                        <div className="mt-4 border-t pt-4">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="レビューへの返信を入力してください..."
                            className="w-full border rounded-lg p-3 mb-3"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleReplySubmit(review.id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                            >
                              返信を投稿
                            </button>
                            <button
                              onClick={() => {
                                setReplyingToReview(null)
                                setReplyContent('')
                              }}
                              className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
                            >
                              キャンセル
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {review.response && (
                        <div className="mt-3 bg-blue-50 p-3 rounded">
                          <div className="text-sm text-blue-800">
                            <strong>オーナーからの返信:</strong>
                          </div>
                          <p className="text-sm text-blue-700 mt-1">{review.response.content}</p>
                          <div className="text-xs text-blue-600 mt-2">
                            {review.response.createdAt.toLocaleDateString('ja-JP')}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 企業情報タブ */}
        {activeTab === 'company' && (
          <div className="space-y-6">
            {editingCompany ? (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">企業情報編集 - {editingCompany.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">企業名</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
                      <select
                        value={formData.category || ''}
                        onChange={(e) => setFormData({...formData, category: e.target.value as Company['category']})}
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="restaurant">レストラン</option>
                        <option value="retail">小売店</option>
                        <option value="beauty">美容</option>
                        <option value="service">サービス</option>
                        <option value="healthcare">医療</option>
                        <option value="education">教育</option>
                        <option value="other">その他</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">住所</label>
                      <input
                        type="text"
                        value={formData.address || ''}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                      <input
                        type="text"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ウェブサイト</label>
                      <input
                        type="url"
                        value={formData.website || ''}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">タグ（カンマ区切り）</label>
                      <input
                        type="text"
                        value={formData.tags?.join(', ') || ''}
                        onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={handleCompanySave}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setEditingCompany(null)
                        setFormData({})
                      }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">企業情報管理</h3>
                  <div className="space-y-4">
                    {ownedCompanies.map((company) => (
                      <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={company.imageUrl}
                            alt={company.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{company.name}</h4>
                            <p className="text-sm text-gray-500">{company.category} • {company.location}</p>
                            <p className="text-sm text-gray-600 mt-1">{company.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              {company.verified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">認証済み</span>
                              )}
                              <span className="text-sm text-gray-500">⭐ {company.rating} • {company.reviewCount} レビュー</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleCompanyEdit(company)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                          >
                            編集
                          </button>
                          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600">
                            詳細
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 分析タブ */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* 概要統計 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500 mb-2">今月の閲覧数</h4>
                <div className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</div>
                <div className="text-sm text-green-600">+12.5% 先月比</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500 mb-2">平均評価</h4>
                <div className="text-2xl font-bold text-gray-900">{analytics.avgRating.toFixed(1)}</div>
                <div className="text-sm text-green-600">+0.2 先月比</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500 mb-2">新規レビュー数</h4>
                <div className="text-2xl font-bold text-gray-900">{analytics.reviewsByMonth[6]}</div>
                <div className="text-sm text-green-600">+3 先月比</div>
              </div>
            </div>

            {/* グラフ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">月別閲覧数</h3>
                <div className="h-64 flex items-end space-x-2">
                  {analytics.monthlyViews.map((views, index) => (
                    <div key={index} className="flex-1 bg-blue-500 rounded-t" style={{height: `${(views/400)*100}%`}}>
                      <div className="text-xs text-white text-center pt-2">{views}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  {['1月', '2月', '3月', '4月', '5月', '6月', '7月'].map((month, index) => (
                    <span key={index}>{month}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">評価の推移</h3>
                <div className="h-64 flex items-end space-x-2">
                  {analytics.ratingTrend.map((rating, index) => (
                    <div key={index} className="flex-1 bg-yellow-500 rounded-t" style={{height: `${(rating/5)*100}%`}}>
                      <div className="text-xs text-white text-center pt-2">{rating}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  {['1月', '2月', '3月', '4月', '5月', '6月', '7月'].map((month, index) => (
                    <span key={index}>{month}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 詳細データ */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">詳細分析</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">人気の時間帯</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">10:00-12:00</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">14:00-16:00</span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">18:00-20:00</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">人気のタグ</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">コーヒー (15)</span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">サービス (12)</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">雰囲気 (8)</span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">WiFi (6)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 通知タブ */}
        {activeTab === 'notifications' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">通知設定</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">新しいレビュー</h4>
                    <p className="text-sm text-gray-500">企業に新しいレビューが投稿された時</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">評価の変化</h4>
                    <p className="text-sm text-gray-500">企業の平均評価が大きく変化した時</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">週次レポート</h4>
                    <p className="text-sm text-gray-500">毎週の統計サマリー</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}