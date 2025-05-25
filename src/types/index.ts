// 型定義統合ファイル
export * from './next-auth'
export * from './socket'

// アプリケーション共通型定義
export interface User {
  id: string
  name: string
  email: string
  image?: string
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  name: string
  description: string
  category: string
  images: string[]
  rating: number
  reviewCount: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  userId: string
  serviceId: string
  rating: number
  comment: string
  images?: string[]
  createdAt: Date
  updatedAt: Date
  user: User
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
}

// API Response型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ページネーション型
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}