import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'

export interface ServerToClientEvents {
  newReview: (data: { companyId: string; review: any }) => void
  reviewResponse: (data: { reviewId: string; response: any }) => void
  notification: (data: { userId: string; notification: any }) => void
  userOnline: (data: { userId: string }) => void
  userOffline: (data: { userId: string }) => void
}

export interface ClientToServerEvents {
  joinCompany: (companyId: string) => void
  leaveCompany: (companyId: string) => void
  joinUser: (userId: string) => void
  leaveUser: (userId: string) => void
}

let io: SocketIOServer<ClientToServerEvents, ServerToClientEvents>

export function initializeSocket(server: HTTPServer) {
  if (!io) {
    io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
      cors: {
        origin: process.env.NODE_ENV === 'production' ? 'https://minkuchi.jp' : 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    })

    io.on('connection', (socket) => {
      console.log('ユーザーが接続しました:', socket.id)

      socket.on('joinCompany', (companyId) => {
        socket.join(`company:${companyId}`)
        console.log(`ユーザー ${socket.id} が企業 ${companyId} の部屋に参加しました`)
      })

      socket.on('leaveCompany', (companyId) => {
        socket.leave(`company:${companyId}`)
        console.log(`ユーザー ${socket.id} が企業 ${companyId} の部屋から退出しました`)
      })

      socket.on('joinUser', (userId) => {
        socket.join(`user:${userId}`)
        io.emit('userOnline', { userId })
        console.log(`ユーザー ${userId} がオンラインになりました`)
      })

      socket.on('leaveUser', (userId) => {
        socket.leave(`user:${userId}`)
        io.emit('userOffline', { userId })
        console.log(`ユーザー ${userId} がオフラインになりました`)
      })

      socket.on('disconnect', () => {
        console.log('ユーザーが切断しました:', socket.id)
      })
    })
  }

  return io
}

export function getSocketIO() {
  if (!io) {
    throw new Error('Socket.io has not been initialized')
  }
  return io
}

// 新しいレビューの通知
export function notifyNewReview(companyId: string, review: any) {
  if (io) {
    io.to(`company:${companyId}`).emit('newReview', { companyId, review })
  }
}

// レビューへの返信通知
export function notifyReviewResponse(reviewId: string, response: any) {
  if (io) {
    io.to(`user:${response.userId}`).emit('reviewResponse', { reviewId, response })
  }
}

// 一般的な通知
export function notifyUser(userId: string, notification: any) {
  if (io) {
    io.to(`user:${userId}`).emit('notification', { userId, notification })
  }
}