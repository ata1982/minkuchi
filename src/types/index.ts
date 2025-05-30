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
  user?: { id: string; name?: string | null; email?: string | null; image?: string | null; role: UserRole } | null
  showSearch?: boolean
}

export interface User {
  id: string
  name: string | null
  email: string | null
  image?: string | null
  role: UserRole
  createdAt: Date
  preferences?: UserPreferences | null
  points: number
  badges?: Badge[]
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
  phone?: string | null
  website?: string | null
  imageUrl?: string | null
  images?: string | null
  businessHours?: string | null
  tags?: string | null
  verified: boolean
  createdAt: Date
  updatedAt: Date
  ownerId?: string | null
  owner?: CompanyOwner
  reviews?: Review[]
  events?: Event[]
  _count?: {
    reviews: number
    events: number
  }
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
  images?: string[]
  tags?: string[]
  helpfulCount: number
  createdAt: Date
  updatedAt: Date
  user: User
  verified: boolean
  response?: CompanyResponse[]
}

export interface CompanyResponse {
  id: string
  content: string
  createdAt: Date
  companyOwnerId: string
  reviewId: string
  companyId: string
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

// 業種別本質評価の定義
export interface CategoryEssenceConfig {
  id: string;
  name: string;
  emoji: string;
  essenceAspect: {
    name: string; // 例: "味", "コスパ", "思いやり"
    description: string;
    weight: number; // 重要度 (0-1)
  };
  otherAspects: {
    name: string;
    description: string;
    weight: number;
  }[];
  reviewQuestions: {
    essence: string[]; // 本質に関する質問
    other: string[]; // その他の質問
  };
}

// レビュー分類結果
export interface ReviewClassification {
  id: string;
  reviewId: string;
  isEssenceFocused: boolean; // 本質的評価かどうか
  essenceScore: number; // 本質評価スコア (1-5)
  otherAspectScores: Record<string, number>; // その他の側面のスコア
  confidence: number; // 分類の信頼度 (0-1)
  extractedKeywords: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  noiseLevel: number; // ノイズレベル (0-1, 高いほどノイズ)
}

// 分類されたレビュー表示用
export interface CategorizedReviews {
  essenceReviews: Review[]; // 本質評価レビュー
  otherReviews: Review[]; // その他のレビュー
  essenceStatistics: {
    averageRating: number;
    totalCount: number;
    sentimentDistribution: Record<string, number>;
  };
  otherStatistics: {
    averageRating: number;
    totalCount: number;
    aspectBreakdown: Record<string, {
      averageRating: number;
      count: number;
    }>;
  };
}