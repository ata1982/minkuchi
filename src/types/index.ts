// NextAuth.js型拡張
import { UserRole } from "@prisma/client"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
  }
}

// アプリケーション共通型定義

// コンポーネント関連の型
export interface HeaderProps {
  user?: User | null
  showSearch?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin' | 'company_owner'
  createdAt: Date
  preferences: UserPreferences
  points: number
  badges: Badge[]
}

export interface UserPreferences {
  location?: string
  categories?: string[]
  notifications: boolean
  theme: 'light' | 'dark'
  language?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: Date
}

export interface Company {
  id: string
  name: string
  category: string
  rating: number
  reviewCount: number
  description: string
  location: string
  address: string
  phone?: string
  website?: string
  imageUrl?: string
  images: string[]
  hours: BusinessHours
  tags: string[]
  verified: boolean
  createdAt: Date
  updatedAt: Date
  owner?: CompanyOwner
}

export interface BusinessHours {
  monday: TimeSlot
  tuesday: TimeSlot
  wednesday: TimeSlot
  thursday: TimeSlot
  friday: TimeSlot
  saturday: TimeSlot
  sunday: TimeSlot
}

export interface TimeSlot {
  open: string
  close: string
  closed: boolean
}

export interface CompanyOwner {
  id: string
  name: string
  email: string
  verified: boolean
}

export interface Review {
  id: string
  userId: string
  companyId: string
  rating: number
  title: string
  content: string
  images: string[]
  tags: string[]
  helpfulCount: number
  createdAt: Date
  updatedAt: Date
  user: User
  verified: boolean
  response?: CompanyResponse
}

export interface CompanyResponse {
  id: string
  content: string
  createdAt: Date
  companyOwnerId: string
}

export interface Category {
  id: string
  name: string
  emoji: string
  description: string
  isActive: boolean
  subcategories: SubCategory[]
}

export interface SubCategory {
  id: string
  name: string
  description: string
}

export interface SearchFilters {
  query: string
  category: string
  location: string
  rating: number
  priceRange: [number, number]
  openNow: boolean
  verified: boolean
  sortBy: 'rating' | 'reviewCount' | 'distance' | 'newest'
}

export interface Event {
  id: string
  title: string
  description: string
  companyId?: string
  location: string
  startDate: Date
  endDate: Date
  category: string
  imageUrl?: string
  tags: string[]
  attendeeCount: number
}

export interface Notification {
  id: string
  userId: string
  type: 'review_response' | 'new_review' | 'event' | 'promotion'
  title: string
  content: string
  read: boolean
  createdAt: Date
  actionUrl?: string
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