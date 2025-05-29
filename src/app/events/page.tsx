'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Event } from '@/types/index'
import { Header } from '@/components/layout/header'
import { mockEvents, mockCompanies, formatDate } from '@/lib/mockData'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 実際のAPIでは日付でソートされたイベントデータを取得
        const extendedEvents = [
          ...mockEvents,
          {
            id: '2',
            title: '新宿ビューティーフェア2025',
            description: '最新の美容技術とトレンドを体験できる美容業界最大のイベント',
            companyId: '2',
            location: '新宿パークハイアット東京',
            startDate: new Date('2025-07-20'),
            endDate: new Date('2025-07-22'),
            category: 'beauty',
            imageUrl: '/api/placeholder/400/200',
            tags: ['美容', 'コスメ', '体験'],
            attendeeCount: 800
          },
          {
            id: '3',
            title: '世田谷地域商店街祭り',
            description: '地域の商店街が一同に集まる年に一度のお祭りイベント',
            location: '世田谷区三軒茶屋商店街',
            startDate: new Date('2025-08-15'),
            endDate: new Date('2025-08-16'),
            category: 'retail',
            imageUrl: '/api/placeholder/400/200',
            tags: ['お祭り', '地域', 'ファミリー'],
            attendeeCount: 2000
          }
        ]
        setEvents(extendedEvents)
      } catch (error) {
        console.error('イベントデータの取得に失敗:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const categories = [
    { id: 'all', name: 'すべて', emoji: '🎪' },
    { id: 'restaurant', name: 'グルメ', emoji: '🍽️' },
    { id: 'beauty', name: 'ビューティー', emoji: '💄' },
    { id: 'retail', name: 'ショッピング', emoji: '🛍️' },
    { id: 'service', name: 'サービス', emoji: '🔧' }
  ]

  const filteredEvents = events.filter(event => 
    selectedCategory === 'all' || event.category === selectedCategory
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">地域イベント</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              地域で開催される様々なイベントやフェスティバルを見つけよう
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                  }`}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {selectedCategory === 'all' ? 'すべてのイベント' : `${categories.find(c => c.id === selectedCategory)?.name}イベント`}
            <span className="text-slate-500 ml-2">({filteredEvents.length}件)</span>
          </h2>
          
          <select className="input-field w-auto">
            <option>開催日順</option>
            <option>参加者数順</option>
            <option>新着順</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const isUpcoming = event.startDate > new Date()
            const isOngoing = event.startDate <= new Date() && event.endDate >= new Date()
            
            return (
              <div key={event.id} className="card hover:shadow-xl transition-shadow group">
                {/* Event Image */}
                <div className="relative aspect-video bg-slate-200 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={event.imageUrl || '/api/placeholder/400/200'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isOngoing 
                        ? 'bg-green-100 text-green-800'
                        : isUpcoming 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {isOngoing ? '開催中' : isUpcoming ? '開催予定' : '終了'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-70 text-white">
                      {formatDate(event.startDate)}
                    </span>
                  </div>
                </div>

                {/* Event Info */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-2">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      {formatDate(event.startDate)}
                      {event.endDate && event.endDate.getTime() !== event.startDate.getTime() && (
                        <span> 〜 {formatDate(event.endDate)}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {event.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                      </svg>
                      参加予定: {event.attendeeCount.toLocaleString()}人
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="btn-primary flex-1">
                      詳細を見る
                    </button>
                    {isUpcoming && (
                      <button className="btn-secondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Hosted by Company */}
                  {event.companyId && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">主催</p>
                      <Link 
                        href={`/companies/${event.companyId}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {mockCompanies.find(c => c.id === event.companyId)?.name || '主催者'}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* No Events */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-2">イベントが見つかりませんでした</h3>
            <p className="text-slate-600 mb-4">選択したカテゴリにはイベントがありません</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="btn-primary"
            >
              すべてのイベントを表示
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              イベントを開催しませんか？
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Minkuchiでイベントを告知して、より多くの人に参加してもらいましょう
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              イベントを投稿する
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}