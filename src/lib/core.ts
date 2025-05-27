import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import OpenAI from 'openai'

// Prisma Client Setup
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// NextAuth Configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // プロバイダーを追加
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

// AI Service Setup
// CI環境や環境変数がない場合でも正常にビルドできるよう条件付き初期化
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

// ElevenLabsクライアントの型定義
interface ElevenLabsClient {
  textToSpeech: (params: {
    voiceId: string
    textInput: string
    modelId: string
  }) => Promise<ArrayBuffer | Buffer | null>
}

// ElevenLabsクライアントを条件付きで初期化
let elevenlabs: ElevenLabsClient | null = null
if (typeof window === 'undefined' && process.env.ELEVENLABS_API_KEY) {
  // サーバーサイドでのみ動的インポート
  import('elevenlabs-node').then(({ ElevenLabs }) => {
    elevenlabs = new ElevenLabs({
      apiKey: process.env.ELEVENLABS_API_KEY,
    })
  }).catch(error => {
    console.warn('ElevenLabs initialization failed:', error)
  })
}

// AI Service Class
export class AIService {
  // レビュー感情分析とキーワード抽出
  static async analyzeReview(content: string) {
    if (!openai) {
      console.warn('OpenAI client not initialized')
      return null
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "あなたは口コミ・レビューの感情分析と要約を行うAIです。以下の形式でJSONを返してください: {\"sentiment\": \"positive/negative/neutral\", \"keywords\": [\"キーワード1\", \"キーワード2\"], \"summary\": \"要約文\"}"
          },
          {
            role: "user",
            content: content
          }
        ],
        max_tokens: 300,
        temperature: 0.3,
      })

      const result = JSON.parse(completion.choices[0].message.content || '{}')
      return result
    } catch (error) {
      console.error('OpenAI API error:', error)
      return null
    }
  }

  // サービス説明の自動生成
  static async generateServiceDescription(serviceName: string, category: string, address: string) {
    if (!openai) {
      console.warn('OpenAI client not initialized')
      return null
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "地域サービスの魅力的な説明文を150文字以内で生成してください。"
          },
          {
            role: "user",
            content: `サービス名: ${serviceName}\nカテゴリ: ${category}\n住所: ${address}`
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      })

      return completion.choices[0].message.content
    } catch (error) {
      console.error('OpenAI API error:', error)
      return null
    }
  }

  // 音声読み上げ機能（ElevenLabsが利用可能な場合のみ）
  static async generateSpeech(text: string, voiceId: string = 'pNInz6obpgDQGcFmaJgB') {
    if (!elevenlabs) {
      console.warn('ElevenLabs not initialized')
      return null
    }

    try {
      const audioStream = await elevenlabs.textToSpeech({
        voiceId: voiceId,
        textInput: text,
        modelId: "eleven_multilingual_v2"
      })

      return audioStream
    } catch (error) {
      console.error('ElevenLabs API error:', error)
      return null
    }
  }

  // チャットボット応答
  static async getChatbotResponse(message: string, context: string) {
    if (!openai) {
      console.warn('OpenAI client not initialized')
      return "申し訳ございません。現在、AI機能が利用できません。"
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `あなたは地域サービスの口コミサイトのアシスタントです。ユーザーの質問に親切に答えてください。\n\nコンテキスト: ${context}`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.8,
      })

      return completion.choices[0].message.content
    } catch (error) {
      console.error('OpenAI API error:', error)
      return "申し訳ございません。現在、回答を生成できません。"
    }
  }
}

// Database Utilities
export class DatabaseUtils {
  // ユーザー関連
  static async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id: Number(id) }
    })
  }

  // サービス関連
  static async getServiceById(id: number) {
    return await prisma.service.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          where: { isHidden: false },
          include: { user: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
  }

  // 検索機能
  static async searchServices(query: string, category?: string) {
    return await prisma.service.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { address: { contains: query, mode: 'insensitive' } }
            ]
          },
          category ? { category: { name: category } } : {}
        ]
      },
      include: {
        category: true,
        _count: { select: { reviews: true } }
      },
      orderBy: { averageRating: 'desc' }
    })
  }
}