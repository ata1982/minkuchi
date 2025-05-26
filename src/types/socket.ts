import { NextApiResponse } from 'next'
import { Server as NetServer } from 'net'
import { Socket } from 'net'
import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & HTTPServer & {
      io: SocketIOServer
    }
  }
}