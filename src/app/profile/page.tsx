'use client'

import { useState, useEffect, Suspense } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button, Card, LoadingSpinner } from '@/components/ui'
import { Header } from '@/components/layout/header'
import Link from 'next/link'

// ビルド時の静的生成を無効化
export const dynamic = 'force-dynamic'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  points: number
  role: string
  createdAt: string
  preferences: {
    location?: string
    categories?: string[]
    notifications: boolean
    theme: string
    language: string
  }
  badges: Array<{
    id: string
    name: string
    description: string
    icon: string
    unlockedAt: string
  }>
}

function ProfileContent() {
  const { user, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    location: '',
    categories: [] as string[],
    notifications: true
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      // Mock profile data
      const mockData = {
        id: user?.id || 'mock-user-id',
        name: user?.name || 'ユーザー',
        email: user?.email || 'user@example.com',
        role: user?.role || 'USER' as const,
        points: 150,
        createdAt: new Date().toISOString(),
        badges: [
          { id: '1', name: 'レビュアー', description: '最初のレビューを投稿', icon: '⭐', unlockedAt: new Date().toISOString() },
          { id: '2', name: 'アクティブ', description: '5件以上のレビューを投稿', icon: '🔥', unlockedAt: new Date().toISOString() }
        ],
        preferences: {
          location: '東京都',
          categories: ['restaurant'],
          notifications: true,
          theme: 'light',
          language: 'ja'
        }
      }
      setProfile(mockData)
      setEditData({
        name: mockData.name || '',
        location: mockData.preferences?.location || '',
        categories: mockData.preferences?.categories || [],
        notifications: mockData.preferences?.notifications || true
      })
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      // Mock save operation - just update local state
      const updatedProfile = {
        ...profile,
        id: profile?.id || 'mock-user-id',
        name: editData.name,
        email: profile?.email || 'user@example.com',
        role: profile?.role || 'USER' as const,
        points: profile?.points || 150,
        createdAt: profile?.createdAt || new Date().toISOString(),
        badges: profile?.badges || [],
        preferences: {
          ...profile?.preferences,
          location: editData.location,
          categories: editData.categories,
          notifications: editData.notifications,
          theme: profile?.preferences?.theme || 'light',
          language: profile?.preferences?.language || 'ja'
        }
      }
      setProfile(updatedProfile)
      setEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <Link href="/auth/signin">
            <Button>ログイン</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header user={user} />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">プロフィール</h1>
            <p className="text-gray-600 mt-2">アカウント情報と設定を管理</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* プロフィール情報 */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">基本情報</h2>
                  <Button
                    variant="outline"
                    onClick={() => setEditing(!editing)}
                  >
                    {editing ? 'キャンセル' : '編集'}
                  </Button>
                </div>

                {editing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        お名前
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        お住まいの地域
                      </label>
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="例: 東京都渋谷区"
                      />
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editData.notifications}
                          onChange={(e) => setEditData({ ...editData, notifications: e.target.checked })}
                          className="mr-2"
                        />
                        通知を受け取る
                      </label>
                    </div>

                    <div className="flex space-x-3">
                      <Button onClick={handleSave}>保存</Button>
                      <Button variant="outline" onClick={() => setEditing(false)}>
                        キャンセル
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={profile?.avatar || user.image || '/api/placeholder/80/80'}
                        alt={profile?.name || user.name || ''}
                        className="w-20 h-20 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {profile?.name || user.name}
                        </h3>
                        <p className="text-gray-600">{profile?.email || user.email}</p>
                        <p className="text-sm text-gray-500">
                          {profile?.preferences?.location || '地域未設定'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">ポイント</p>
                        <p className="text-2xl font-semibold text-blue-600">
                          {profile?.points || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">会員ランク</p>
                        <p className="text-lg font-medium text-gray-900">
                          {profile?.role === 'ADMIN' ? '管理者' : 
                           profile?.role === 'COMPANY_OWNER' ? '企業オーナー' : '一般会員'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* レビュー履歴 */}
              <Card className="p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">レビュー履歴</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>レビュー履歴の実装は後で追加されます</p>
                  <Link href="/companies" className="text-blue-600 hover:text-blue-500">
                    企業を探してレビューを投稿
                  </Link>
                </div>
              </Card>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              {/* バッジ */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">獲得バッジ</h3>
                {profile?.badges && profile.badges.length > 0 ? (
                  <div className="space-y-3">
                    {profile.badges.map((badge) => (
                      <div key={badge.id} className="flex items-center space-x-3">
                        <span className="text-2xl">{badge.icon}</span>
                        <div>
                          <p className="font-medium text-gray-900">{badge.name}</p>
                          <p className="text-sm text-gray-500">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">まだバッジを獲得していません</p>
                )}
              </Card>

              {/* クイックアクション */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h3>
                <div className="space-y-3">
                  <Link href="/companies" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      🔍 企業を探す
                    </Button>
                  </Link>
                  <Link href="/events" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      🎉 イベントを見る
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      📊 ダッシュボード
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ProfilePageWrapper() {
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