'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import { ServerToClientEvents, ClientToServerEvents } from '@/lib/socket'

interface Notification {
  id: number | string
  type: string
  title: string
  content: string
  createdAt: Date
  read: boolean
}

interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
  isConnected: boolean
  joinCompany: (companyId: string) => void
  leaveCompany: (companyId: string) => void
  notifications: Notification[]
  clearNotifications: () => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinCompany: () => {},
  leaveCompany: () => {},
  notifications: [],
  clearNotifications: () => {}
})

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const socketIO = io(process.env.NODE_ENV === 'production' ? 'https://minkuchi.jp' : 'http://localhost:3000')

    socketIO.on('connect', () => {
      console.log('Socket.io接続が確立されました')
      setIsConnected(true)
      
      // ユーザーがログインしている場合、ユーザールームに参加
      if (session?.user?.id) {
        socketIO.emit('joinUser', session.user.id)
      }
    })

    socketIO.on('disconnect', () => {
      console.log('Socket.io接続が切断されました')
      setIsConnected(false)
    })

    // リアルタイム通知の受信
    socketIO.on('notification', ({ userId, notification }) => {
      if (session?.user?.id === userId) {
        setNotifications(prev => [notification, ...prev])
        
        // ブラウザ通知（権限がある場合）
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.content,
            icon: '/icons/icon-192x192.png'
          })
        }
      }
    })

    // 新しいレビューの通知
    socketIO.on('newReview', ({ review }) => {
      setNotifications(prev => [{
        id: Date.now(),
        type: 'NEW_REVIEW',
        title: '新しいレビューが投稿されました',
        content: `${review.title}`,
        createdAt: new Date(),
        read: false
      }, ...prev])
    })

    // レビューへの返信通知
    socketIO.on('reviewResponse', ({ response }) => {
      setNotifications(prev => [{
        id: Date.now(),
        type: 'REVIEW_RESPONSE',
        title: 'レビューに返信がありました',
        content: response.content.substring(0, 100) + '...',
        createdAt: new Date(),
        read: false
      }, ...prev])
    })

    setSocket(socketIO)

    return () => {
      if (session?.user?.id) {
        socketIO.emit('leaveUser', session.user.id)
      }
      socketIO.disconnect()
    }
  }, [session?.user?.id])

  const joinCompany = (companyId: string) => {
    if (socket) {
      socket.emit('joinCompany', companyId)
    }
  }

  const leaveCompany = (companyId: string) => {
    if (socket) {
      socket.emit('leaveCompany', companyId)
    }
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      joinCompany,
      leaveCompany,
      notifications,
      clearNotifications
    }}>
      {children}
    </SocketContext.Provider>
  )
}