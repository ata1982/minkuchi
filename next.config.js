/** @type {import('next').NextConfig} */
const nextConfig = {
  // プロダクション用最適化
  compress: true, // gzip圧縮を有効化
  poweredByHeader: false, // X-Powered-By ヘッダーを無効化（セキュリティ向上）
  
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.onrender.com']
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google OAuth用画像
      },
      {
        protocol: 'https',
        hostname: 'your-image-provider.com',
      },
      {
        protocol: 'https',
        hostname: 'another-image-provider.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.onrender.com',
      }
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    // ビルド時のエラー回避用デフォルト値
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
  },
  // WebSocket support for chat
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

// Bundle Analyzerは開発環境でのみ使用
let finalConfig = nextConfig;

// 開発環境かつANALYZE=trueの場合のみBundle Analyzerを適用
if (process.env.NODE_ENV !== 'production' && process.env.ANALYZE === 'true') {
  try {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    });
    finalConfig = withBundleAnalyzer(nextConfig);
  } catch (error) {
    console.warn('Bundle analyzer not available, using default config');
  }
}

module.exports = finalConfig