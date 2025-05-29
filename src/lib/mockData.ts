// モックデータとユーティリティ関数
import { Company, Review, Event, User, Category } from '@/types/index'

// モック企業データ
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'カフェ・ド・パリ',
    category: 'restaurant',
    rating: 4.5,
    reviewCount: 127,
    description: '本格的なフレンチカフェ。落ち着いた雰囲気でゆっくりとお食事をお楽しみいただけます。',
    location: '渋谷区',
    address: '東京都渋谷区神南1-2-3',
    phone: '03-1234-5678',
    website: 'https://cafe-de-paris.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    hours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '08:00', close: '23:00', closed: false },
      sunday: { open: '08:00', close: '22:00', closed: false }
    },
    tags: ['フレンチ', 'カフェ', 'おしゃれ'],
    verified: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15'),
    owner: {
      id: 'owner1',
      name: '田中オーナー',
      email: 'owner@cafe-de-paris.jp',
      verified: true
    }
  },
  {
    id: '2',
    name: 'ビューティーサロン LUXE',
    category: 'beauty',
    rating: 4.8,
    reviewCount: 89,
    description: '最新の美容技術と丁寧なカウンセリングで、お客様の美をサポートします。',
    location: '新宿区',
    address: '東京都新宿区西新宿1-5-7',
    phone: '03-2345-6789',
    website: 'https://luxe-salon.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '10:00', close: '20:00', closed: false },
      tuesday: { open: '10:00', close: '20:00', closed: false },
      wednesday: { open: '10:00', close: '20:00', closed: false },
      thursday: { open: '10:00', close: '20:00', closed: false },
      friday: { open: '10:00', close: '21:00', closed: false },
      saturday: { open: '09:00', close: '21:00', closed: false },
      sunday: { open: '09:00', close: '19:00', closed: false }
    },
    tags: ['美容院', 'ヘアサロン', '高級'],
    verified: true,
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Tech Repair Plus',
    category: 'repair',
    rating: 4.2,
    reviewCount: 156,
    description: 'スマートフォン・パソコンの修理専門店。迅速で丁寧な対応を心がけています。',
    location: '秋葉原',
    address: '東京都千代田区外神田1-8-9',
    phone: '03-3456-7890',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '10:00', close: '19:00', closed: false },
      tuesday: { open: '10:00', close: '19:00', closed: false },
      wednesday: { open: '10:00', close: '19:00', closed: false },
      thursday: { open: '10:00', close: '19:00', closed: false },
      friday: { open: '10:00', close: '19:00', closed: false },
      saturday: { open: '10:00', close: '18:00', closed: false },
      sunday: { open: '11:00', close: '17:00', closed: false }
    },
    tags: ['修理', 'スマホ', 'パソコン'],
    verified: false,
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2024-01-10')
  }
]

// モックユーザーデータ
export const mockUsers: User[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    avatar: '/api/placeholder/40/40',
    role: 'user',
    createdAt: new Date('2023-01-01'),
    preferences: {
      location: '東京都渋谷区',
      categories: ['restaurant', 'beauty'],
      notifications: true,
      theme: 'light',
      language: 'ja'
    },
    points: 1250,
    badges: [
      {
        id: '1',
        name: 'レビューマスター',
        description: '10件以上のレビューを投稿',
        icon: '🏆',
        unlockedAt: new Date('2023-06-15')
      }
    ]
  }
]

// モックレビューデータ
export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    companyId: '1',
    rating: 5,
    title: '素晴らしいサービスでした',
    content: 'スタッフの対応がとても丁寧で、料理も美味しかったです。また利用したいと思います。',
    images: ['/api/placeholder/300/200'],
    tags: ['接客', '味', '雰囲気'],
    helpfulCount: 12,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    user: mockUsers[0],
    verified: true,
    response: {
      id: 'response1',
      content: 'ご利用いただきありがとうございました。またのお越しをお待ちしております。',
      createdAt: new Date('2024-01-16'),
      companyOwnerId: 'owner1'
    }
  },
  {
    id: '2',
    userId: '1',
    companyId: '2',
    rating: 4,
    title: '技術力が高いサロンです',
    content: 'カットとカラーをお願いしました。仕上がりがとても綺麗で満足しています。',
    images: [],
    tags: ['技術', 'カラー', 'カット'],
    helpfulCount: 8,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    user: mockUsers[0],
    verified: true
  }
]

// モックイベントデータ
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'フレンチ料理教室',
    description: 'プロのシェフが教える本格フレンチ料理教室。初心者歓迎です。',
    companyId: '1',
    location: '渋谷区神南1-2-3',
    startDate: new Date('2024-02-15T14:00:00'),
    endDate: new Date('2024-02-15T17:00:00'),
    category: 'workshop',
    imageUrl: '/api/placeholder/400/300',
    tags: ['料理', 'フレンチ', '体験'],
    attendeeCount: 12
  },
  {
    id: '2',
    title: 'ヘアケア講座',
    description: '美容のプロが教えるヘアケアの基本。正しいシャンプー方法から学べます。',
    companyId: '2',
    location: '新宿区西新宿1-5-7',
    startDate: new Date('2024-02-20T19:00:00'),
    endDate: new Date('2024-02-20T20:30:00'),
    category: 'seminar',
    imageUrl: '/api/placeholder/400/300',
    tags: ['美容', 'ヘアケア', '講座'],
    attendeeCount: 8
  }
]

// モックカテゴリデータ
export const mockCategories: Category[] = [
  {
    id: 'restaurant',
    name: 'レストラン・飲食',
    emoji: '🍽️',
    description: 'レストラン、カフェ、居酒屋など',
    isActive: true,
    subcategories: [
      { id: 'french', name: 'フレンチ', description: 'フランス料理' },
      { id: 'italian', name: 'イタリアン', description: 'イタリア料理' },
      { id: 'japanese', name: '和食', description: '日本料理' }
    ]
  },
  {
    id: 'beauty',
    name: '美容・ヘルスケア',
    emoji: '💄',
    description: '美容院、エステ、マッサージなど',
    isActive: true,
    subcategories: [
      { id: 'hair', name: 'ヘアサロン', description: '美容院・理容院' },
      { id: 'nail', name: 'ネイルサロン', description: 'ネイルケア' },
      { id: 'massage', name: 'マッサージ', description: 'リラクゼーション' }
    ]
  },
  {
    id: 'retail',
    name: '小売・ショッピング',
    emoji: '🛍️',
    description: '衣料品、雑貨、家電など',
    isActive: true,
    subcategories: [
      { id: 'clothing', name: 'ファッション', description: '衣料品・アクセサリー' },
      { id: 'electronics', name: '家電', description: '電化製品' },
      { id: 'books', name: '書籍', description: '本・雑誌' }
    ]
  },
  {
    id: 'service',
    name: 'サービス',
    emoji: '🔧',
    description: '修理、清掃、配送など',
    isActive: true,
    subcategories: [
      { id: 'repair', name: '修理サービス', description: 'スマホ・PC修理など' },
      { id: 'cleaning', name: 'クリーニング', description: '清掃・洗濯サービス' },
      { id: 'delivery', name: '配送', description: '宅配・配送サービス' }
    ]
  }
]

// ユーティリティ関数
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInDays > 0) {
    return `${diffInDays}日前`
  } else if (diffInHours > 0) {
    return `${diffInHours}時間前`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}分前`
  } else {
    return 'たった今'
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getBusinessStatus(hours: Company['hours']): { isOpen: boolean; nextChange: string } {
  const now = new Date()
  const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()] as keyof typeof hours
  const currentTime = now.getHours() * 100 + now.getMinutes()
  
  const todayHours = hours[currentDay]
  
  if (todayHours.closed) {
    return { isOpen: false, nextChange: '定休日' }
  }
  
  const openTime = parseInt(todayHours.open.replace(':', ''))
  const closeTime = parseInt(todayHours.close.replace(':', ''))
  
  const isOpen = currentTime >= openTime && currentTime < closeTime
  
  return {
    isOpen,
    nextChange: isOpen ? `${todayHours.close}に閉店` : `${todayHours.open}に開店`
  }
}