'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error | undefined
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
    
    // ここで外部エラー監視サービス（Sentry等）に送信
    if (typeof window !== 'undefined') {
      // Sentry.captureException(error, { extra: errorInfo })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              申し訳ございません
            </h1>
            <p className="text-gray-600 mb-6">
              予期しないエラーが発生しました。<br />
              ページを再読み込みしてお試しください。
            </p>
            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="btn-primary w-full"
              >
                もう一度試す
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="btn-outline w-full"
              >
                ホームに戻る
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  エラー詳細（開発環境のみ）
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary