import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/components/providers/app-provider'
import { Toaster } from '@/components/ui'

export const metadata: Metadata = {
  title: 'ミンクチ - 最高のサービスを見つけよう',
  description: 'ユーザーの生の声で選ぶ、信頼できるサービスガイド',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="font-sans antialiased">
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  )
}