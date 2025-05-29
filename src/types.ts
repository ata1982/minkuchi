// 型定義ファイル

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin' | 'owner'
  createdAt: Date
  preferences?: {
    location?: string
    categories?: string[]
    notifications?: boolean
    theme?: 'light' | 'dark'
    language?: string
  }
  points?: number
  badges?: Badge[]
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
  address?: string
  phone?: string
  website?: string
  imageUrl?: string
  images?: string[]
  hours?: BusinessHours
  tags?: string[]
  verified: boolean
  createdAt: Date
  updatedAt: Date
  owner?: CompanyOwner
}

export interface CompanyOwner {
  id: string
  name: string
  email: string
  verified: boolean
}

export interface BusinessHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  open: string
  close: string
  closed: boolean
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
  response?: ReviewResponse
}

export interface ReviewResponse {
  id: string
  content: string
  createdAt: Date
  companyOwnerId: string
}

export interface Event {
  id: string
  title: string
  description: string
  companyId: string
  location: string
  startDate: Date
  endDate: Date
  category: 'workshop' | 'seminar' | 'exhibition' | 'networking' | 'other'
  imageUrl?: string
  tags?: string[]
  attendeeCount?: number
}

export interface SearchFilters {
  category?: string
  location?: string
  rating?: number
  tags?: string[]
  verified?: boolean
  sortBy?: 'rating' | 'reviews' | 'newest' | 'distance'
}

export interface HeaderProps {
  user?: User | null
}