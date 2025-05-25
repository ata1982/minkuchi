import OpenAI from 'openai'
import { ElevenLabs } from 'elevenlabs-node'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const elevenlabs = new ElevenLabs({
  apiKey: process.env.ELEVENLABS_API_KEY,
})

export class AIService {
  // レビュー感情分析とキーワード抽出
  static async analyzeReview(content: string) {
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

  // 音声読み上げ機能
  static async generateSpeech(text: string, voiceId: string = 'pNInz6obpgDQGcFmaJgB') {
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