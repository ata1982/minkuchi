declare module 'elevenlabs-node' {
  export class ElevenLabs {
    constructor(options?: { apiKey?: string })
    textToSpeech(options: {
      textInput: string
      voiceId: string
      stability?: number
      similarityBoost?: number
      modelId?: string
      speakerBoost?: boolean
    }): Promise<Buffer>
  }
}