import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Minkuchi - 地域サービス・企業・商品レビューサイト',
  description: '地域サービス・企業・商品の包括的レビュープラットフォーム',
  keywords: ['レビュー', '口コミ', '企業評価', '商品レビュー'],
  authors: [{ name: 'Minkuchi Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-signin-client_id" content="YOUR_GOOGLE_CLIENT_ID" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}