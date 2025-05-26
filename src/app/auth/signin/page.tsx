'use client'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 既にログイン済みの場合はリダイレクト
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard')
      }
    })
  }, [router])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCredentialsLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard',
        redirect: false,
      })

      if (result?.error) {
        console.error('Login failed:', result.error)
        // ここでエラーメッセージを表示
      } else if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-apple-gray-50 via-white to-apple-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-apple-blue-500 to-apple-purple-500 bg-clip-text text-transparent mb-2">
            Minkuchi
          </h2>
          <h3 className="text-2xl font-semibold text-apple-gray-800 mb-2">
            ログイン
          </h3>
          <p className="text-apple-gray-600">
            地域サービスの口コミ・レビューサイト
          </p>
        </div>

        <div className="card">
          {/* Google OAuth ログイン */}
          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center py-4 px-6 bg-white border-2 border-apple-gray-300 text-apple-gray-700 font-medium rounded-2xl hover:bg-apple-gray-50 hover:border-apple-gray-400 focus:outline-none focus:ring-2 focus:ring-apple-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'ログイン中...' : 'Googleでログイン'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-apple-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-apple-gray-500 font-medium">または</span>
              </div>
            </div>
          </div>

          {/* メール・パスワードログイン */}
          <form className="space-y-6" onSubmit={handleCredentialsLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-apple-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="メールアドレスを入力"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-apple-gray-700 mb-2">
                  パスワード
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-input"
                  placeholder="パスワードを入力"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-lg py-4"
            >
              {isLoading ? 'ログイン中...' : 'メールでログイン'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-apple-gray-600">
              アカウントをお持ちでない方は{' '}
              <a href="/auth/signup" className="text-apple-blue-500 hover:text-apple-blue-600 font-medium transition-colors duration-200">
                こちらから登録
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}