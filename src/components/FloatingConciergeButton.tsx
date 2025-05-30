'use client'

import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import AIConciergeChat from './AIConciergeChat'

export default function FloatingConciergeButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      {/* フローティングボタン */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isChatOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
        } text-white flex items-center justify-center group`}
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {/* パルスアニメーション */}
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
          </>
        )}
      </button>

      {/* チャットコンポーネント */}
      <AIConciergeChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      {/* モバイル用の追加スタイル */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.bottom-6.right-6 {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  )
}