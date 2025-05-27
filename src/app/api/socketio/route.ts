import { NextResponse } from 'next/server'

export async function GET() {
  // App Routerでは直接的なSocket.IO初期化が難しいため、
  // 代替実装またはmiddleware.tsでの処理を推奨
  return new NextResponse('Socket.IO endpoint - consider using middleware.ts for WebSocket handling', { 
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

export async function POST() {
  return GET()
}