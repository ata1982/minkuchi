'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const errorMessages = {
  Configuration: 'OAuth設定に問題があります。管理者にお問い合わせください。',
  AccessDenied: 'アクセスが拒否されました。',
  Verification: 'メール認証に失敗しました。',
  Default: 'ログイン中にエラーが発生しました。',
  OAuthAccountNotLinked: 'このアカウントは既に別の方法でログインされています。',
  OAuthCreateAccount: 'アカウントの作成に失敗しました。',
  EmailCreateAccount: 'メールアカウントの作成に失敗しました。',
  Callback: 'OAuth認証中にエラーが発生しました。',
  OAuthCallback: 'OAuth認証のコールバック処理でエラーが発生しました。',
  CredentialsSignin: 'メールアドレスまたはパスワードが正しくありません。',
}

export default function AuthErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError(errorParam)
    }
  }, [searchParams])

  const getErrorMessage = (errorCode: string) => {
    return errorMessages[errorCode as keyof typeof errorMessages] || errorMessages.Default
  }

  const handleRetry = () => {
    router.push('/auth/signin')
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-red-600">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            認証エラー
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ログイン処理中にエラーが発生しました
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                エラーコード: {error || 'Unknown'}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{getErrorMessage(error)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            再度ログインを試す
          </button>
          
          <button
            onClick={handleGoHome}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ホームに戻る
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">開発者情報:</h4>
            <p className="text-xs text-gray-600">
              Error: {error}<br/>
              URL: {window.location.href}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}