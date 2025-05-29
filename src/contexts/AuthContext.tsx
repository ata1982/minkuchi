// 認証コンテキスト
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/types/index'
import { mockUsers } from '@/lib/mockData'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // ローカルストレージから認証情報を確認
        const savedUser = localStorage.getItem('auth_user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('認証初期化エラー:', error)
        setError('認証情報の読み込みに失敗しました')
        localStorage.removeItem('auth_user')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)
    setError(null)

    try {
      // モックユーザーでのログイン処理
      await new Promise(resolve => setTimeout(resolve, 500)) // 短縮化
      
      if (email === 'user@example.com' && password === 'password123') {
        const userData = mockUsers[0]
        setUser(userData)
        localStorage.setItem('auth_user', JSON.stringify(userData))
        return { success: true }
      } else {
        return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' }
      }
    } catch (error) {
      console.error('ログインエラー:', error)
      return { success: false, error: 'ログインに失敗しました。しばらく時間をおいて再度お試しください。' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem('auth_user')
      setError(null)
    } catch (error) {
      console.error('ログアウトエラー:', error)
      setError('ログアウトに失敗しました')
    }
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    error
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}