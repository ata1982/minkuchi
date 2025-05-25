import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    error: 'Not Found',
    message: 'The requested resource was not found.',
    timestamp: new Date().toISOString()
  }, { status: 404 })
}

export async function POST() {
  return NextResponse.json({
    error: 'Method Not Allowed',
    message: 'This endpoint only supports GET requests.',
    timestamp: new Date().toISOString()
  }, { status: 405 })
}