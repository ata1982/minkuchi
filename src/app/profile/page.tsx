'use client'

import { Suspense } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { User } from '@/types'

function ProfileContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">プロフィールを読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">ログインが必要です</h1>
          <p className="text-slate-600 mb-6">プロフィールページにアクセスするには、ログインしてください。</p>
          <a
            href="/auth/signin"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ログイン
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={user.avatar || '/api/placeholder/120/120'}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.name}</h1>
              <p className="text-slate-600 mb-4">{user.email}</p>
              
              <div className="flex items-center space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{user.points || 0}</div>
                  <div className="text-sm text-slate-500">ポイント</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{user.badges?.length || 0}</div>
                  <div className="text-sm text-slate-500">バッジ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {user.role === 'admin' ? '管理者' : user.role === 'owner' ? '店舗オーナー' : 'ユーザー'}
                  </div>
                  <div className="text-sm text-slate-500">役割</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  プロフィール編集
                </button>
                <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                  設定
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 border-b-2 border-blue-600 text-blue-600 font-medium">
                レビュー
              </button>
              <button className="py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700">
                お気に入り
              </button>
              <button className="py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700">
                バッジ
              </button>
              <button className="py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700">
                活動履歴
              </button>
            </nav>
          </div>

          {/* Reviews Section */}
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">まだレビューがありません</h3>
              <p className="text-slate-600 mb-6">最初のレビューを投稿して、コミュニティに貢献しましょう！</p>
              <a
                href="/companies"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                企業を探す
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">最近のアクティビティ</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-slate-600">最近のアクティビティはありません</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">プロフィールを読み込み中...</p>
        </div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  )
}