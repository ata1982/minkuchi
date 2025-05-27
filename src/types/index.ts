// 型定義統合ファイル
export * from './next-auth'

// Socket.IO関連型定義
import { NextApiResponse } from 'next'
import { Server as NetServer } from 'net'
import { Socket } from 'net'
import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & HTTPServer & {
      io: SocketIOServer
    }
  }
}

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