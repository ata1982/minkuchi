import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { SocketProvider } from '@/contexts/SocketContext'
import FloatingConciergeButton from '@/components/FloatingConciergeButton'
import NotificationCenter from '@/components/NotificationCenter'
import ErrorBoundary from '@/components/ErrorBoundary'
import WebVitalsReporter from '@/components/WebVitalsReporter'

export const metadata: Metadata = {
  title: {
    default: 'Minkuchi - AI支援レビュープラットフォーム',
    template: '%s | Minkuchi'
  },
  description: 'AI駆動型の地域サービス・企業・商品包括レビュープラットフォーム。リアルタイム通知、多言語対応、高度な検索機能を備えた次世代のレビューシステム。',
  keywords: [
    'レビュー', '口コミ', '企業評価', '商品レビュー', 'AI', '地域サービス',
    'ビジネス', '評価', 'フィードバック', '地域密着', '企業情報', 'PWA',
    'リアルタイム', '多言語', '感情分析', 'コンシェルジュ'
  ],
  authors: [{ name: 'Minkuchi Team' }],
  creator: 'Minkuchi Team',
  publisher: 'Minkuchi',
  applicationName: 'Minkuchi',
  metadataBase: new URL('https://minkuchi.jp'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://minkuchi.jp',
    siteName: 'Minkuchi',
    title: 'Minkuchi - AI支援レビュープラットフォーム',
    description: 'AI駆動型の地域サービス・企業・商品包括レビュープラットフォーム',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Minkuchi - AI支援レビュープラットフォーム'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minkuchi - AI支援レビュープラットフォーム',
    description: 'AI駆動型の地域サービス・企業・商品包括レビュープラットフォーム',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Minkuchi',
    startupImage: [
      {
        url: '/icons/icon-512x512.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
      }
    ]
  },
  category: 'business',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#0ea5e9'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
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
        
        {/* PWA Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167x167.png" />
        
        {/* PWA Splash Screens */}
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
        
        {/* PWA Configuration */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Minkuchi" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//api.minkuchi.jp" />
        <link rel="dns-prefetch" href="//cdn.minkuchi.jp" />
        
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Minkuchi",
              "url": "https://minkuchi.jp",
              "description": "AI駆動型の地域サービス・企業・商品包括レビュープラットフォーム",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "softwareVersion": "2.0.0",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "JPY"
              },
              "featureList": [
                "AI感情分析",
                "リアルタイム通知",
                "多言語対応",
                "企業分析ダッシュボード",
                "AIコンシェルジュ"
              ],
              "screenshot": "/og-image.jpg"
            })
          }}
        />
        
        {/* PWA Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        <ErrorBoundary>
          <AuthProvider>
            <SocketProvider>
              <div className="flex flex-col min-h-screen">
                {/* メインコンテンツ */}
                <main className="flex-1">
                  {children}
                </main>
                
                {/* グローバルコンポーネント */}
                <NotificationCenter />
                <FloatingConciergeButton />
                <WebVitalsReporter />
              </div>
            </SocketProvider>
          </AuthProvider>
        </ErrorBoundary>
        
        {/* 緊急時のフォールバック */}
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontSize: '18px',
            textAlign: 'center',
            padding: '20px'
          }}>
            <div>
              <h1>JavaScript が無効になっています</h1>
              <p>Minkuchi を使用するには JavaScript を有効にしてください。</p>
            </div>
          </div>
        </noscript>
      </body>
    </html>
  )
}