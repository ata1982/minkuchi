// 認証コンテキスト
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

interface AuthContextType {
  user: Session['user'] | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({ success: false, error: 'Not implemented' }),
  logout: async () => {},
  loading: false,
  error: null,
})

interface AuthProviderProps {
  children: ReactNode
}

function AuthProviderContent({ children }: AuthProviderProps) {
  const { data: session, status } = useSession()
  
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      
      if (result?.error) {
        return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' }
      }
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'ログインに失敗しました' }
    }
  }

  const logout = async (): Promise<void> => {
    await signOut({ redirect: false })
  }

  const contextValue: AuthContextType = {
    user: session?.user || null,
    login,
    logout,
    loading: status === 'loading',
    error: null,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthProviderContent>
        {children}
      </AuthProviderContent>
    </SessionProvider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}