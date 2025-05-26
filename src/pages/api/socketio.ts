import { Server } from 'socket.io'
import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from '@/types/socket'

export default function handler(_req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? ['https://*.onrender.com'] 
          : ['http://localhost:3000'],
        methods: ['GET', 'POST']
      }
    })

    // チャット機能
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      // サービス詳細ページのチャットルームに参加
      socket.on('join-service-chat', (serviceId: string) => {
        socket.join(`service-${serviceId}`)
        console.log(`User ${socket.id} joined service-${serviceId}`)
      })

      // チャットメッセージ送信
      socket.on('send-message', (data) => {
        const { serviceId, message, user } = data
        io.to(`service-${serviceId}`).emit('new-message', {
          id: Date.now(),
          message,
          user: {
            name: user.name,
            image: user.image
          },
          timestamp: new Date().toISOString()
        })
      })

      // リアルタイム通知
      socket.on('join-notifications', (userId: string) => {
        socket.join(`notifications-${userId}`)
      })

      // 新しいレビュー投稿の通知
      socket.on('review-posted', (data) => {
        const { serviceId, review } = data
        io.to(`service-${serviceId}`).emit('new-review', review)
      })

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
      })
    })

    res.socket.server.io = io
  } else {
    console.log('Socket is already running')
  }
  
  res.end()
}