'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Star, MapPin, Sparkles } from 'lucide-react'
import { AIConciergeChatService, ConversationMessage, CompanyRecommendation } from '@/lib/services/ai-concierge-chat-service'

interface AIConciergeProps {
  isOpen: boolean
  onClose: () => void
  initialMessage?: string
}

export default function AIConciergeChat({ isOpen, onClose, initialMessage }: AIConciergeProps) {
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState<'ja' | 'en' | 'ko' | 'zh'>('ja')
  const [chatService] = useState(() => new AIConciergeChatService())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text || isLoading) return

    setInputMessage('')
    setIsLoading(true)

    try {
      let response: ConversationMessage

      if (language === 'ja') {
        response = await chatService.processMessage(text)
      } else {
        response = await chatService.generateMultilingualResponse(text, language)
      }

      setMessages(prev => {
        const newMessages = [...prev]
        // ユーザーメッセージが既に追加されていない場合は追加
        if (!messageText) {
          newMessages.push({
            id: `user_${Date.now()}`,
            role: 'user',
            content: text,
            timestamp: new Date()
          })
        }
        newMessages.push(response)
        return newMessages
      })
    } catch (error) {
      console.error('メッセージ送信エラー:', error)
      setMessages(prev => [...prev, {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'システムエラーが発生しました。もう一度お試しください。',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && initialMessage && messages.length === 0) {
      handleSendMessage(initialMessage)
    }
  }, [isOpen, initialMessage, messages.length])

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
    inputRef.current?.focus()
  }

  const handleActionClick = (action: { type: string; label: string; data: Record<string, unknown> }) => {
    switch (action.type) {
      case 'search':
        // 検索ページへリダイレクト
        window.location.href = `/search?q=${encodeURIComponent(JSON.stringify(action.data))}`
        break
      case 'directions':
        // Google Maps で道順を表示
        window.open(`https://maps.google.com/maps?q=${encodeURIComponent(String(action.data.location))}`, '_blank')
        break
      case 'reviews':
        // レビューページへリダイレクト
        break
    }
  }

  const RecommendationCard = ({ recommendation }: { recommendation: CompanyRecommendation }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        {recommendation.imageUrl && (
          <img 
            src={recommendation.imageUrl} 
            alt={recommendation.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">{recommendation.name}</h4>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{recommendation.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{recommendation.category}</p>
          <p className="text-sm text-gray-700 mb-2">{recommendation.description}</p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            {recommendation.distance && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{recommendation.distance}km</span>
              </div>
            )}
            {recommendation.priceRange && (
              <span>{recommendation.priceRange}</span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {recommendation.reasons.map((reason, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {reason}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      {/* オーバーレイ */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-25" 
        onClick={onClose}
      />
      
      {/* チャットウィンドウ */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md h-[600px] flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">AIコンシェルジュ</h3>
              <p className="text-xs opacity-90">お店探しをお手伝いします</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* 言語選択 */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'ja' | 'en' | 'ko' | 'zh')}
              className="text-xs bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded px-2 py-1"
            >
              <option value="ja" className="text-gray-900">🇯🇵 日本語</option>
              <option value="en" className="text-gray-900">🇺🇸 English</option>
              <option value="ko" className="text-gray-900">🇰🇷 한국어</option>
              <option value="zh" className="text-gray-900">🇨🇳 中文</option>
            </select>
            
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <span className="text-lg">×</span>
            </button>
          </div>
        </div>

        {/* メッセージエリア */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">AIコンシェルジュです！</h4>
              <p className="text-sm text-gray-600 mb-4">
                お店探しや企業情報について、何でもお気軽にお聞きください。
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => handleSendMessage('近くの美味しいレストランを教えて')}
                  className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded text-sm transition-colors"
                >
                  🍽️ 近くの美味しいレストランを教えて
                </button>
                <button
                  onClick={() => handleSendMessage('今日営業している美容院はある？')}
                  className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded text-sm transition-colors"
                >
                  💇 今日営業している美容院はある？
                </button>
                <button
                  onClick={() => handleSendMessage('予算3000円でランチできる場所は？')}
                  className="block w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded text-sm transition-colors"
                >
                  💰 予算3000円でランチできる場所は？
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white rounded-lg rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-lg rounded-bl-sm'
              } px-3 py-2`}>
                <div className="flex items-start space-x-2">
                  {message.role === 'assistant' && (
                    <Bot className="w-4 h-4 mt-1 text-blue-500" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {/* 推薦カード */}
                    {message.metadata?.recommendations && (
                      <div className="mt-3 space-y-2">
                        {message.metadata.recommendations.map((rec: CompanyRecommendation) => (
                          <RecommendationCard key={rec.id} recommendation={rec} />
                        ))}
                      </div>
                    )}
                    
                    {/* アクションボタン */}
                    {message.metadata?.actions && message.metadata.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.metadata.actions.map((action: { type: string; label: string; data: Record<string, unknown> }) => (
                          <button
                            key={action.type + action.label}
                            onClick={() => handleActionClick(action)}
                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* サジェスト */}
                    {message.metadata?.suggestions && message.metadata.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.metadata.suggestions.map((suggestion: string, suggestionIndex: number) => (
                          <button
                            key={suggestionIndex}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <User className="w-4 h-4 mt-1 text-white" />
                  )}
                </div>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg rounded-bl-sm px-3 py-2">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-blue-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 入力エリア */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={language === 'ja' ? "メッセージを入力..." : 
                          language === 'en' ? "Type a message..." :
                          language === 'ko' ? "메시지를 입력하세요..." : "输入消息..."}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}