// Web Vitals とパフォーマンス監視
import { Metric } from 'web-vitals'

interface AnalyticsEvent {
  name: string
  value: number
  id: string
  label?: string
  attribution?: Record<string, unknown>
}

class Analytics {
  private static instance: Analytics
  private isInitialized = false

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  init() {
    if (this.isInitialized || typeof window === 'undefined') return

    // Web Vitals の監視開始
    this.initWebVitals()
    this.isInitialized = true
  }

  private async initWebVitals() {
    try {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals')
      
      onCLS(this.reportWebVital)
      onINP(this.reportWebVital)
      onFCP(this.reportWebVital)
      onLCP(this.reportWebVital)
      onTTFB(this.reportWebVital)
    } catch (error) {
      console.warn('Web Vitals monitoring failed to initialize:', error)
    }
  }

  private reportWebVital = (metric: Metric) => {
    const event: AnalyticsEvent = {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      label: 'web_vital'
    }

    // Web Vitals を外部サービスに送信
    this.sendToAnalytics(event)

    // 開発環境では console に出力
    if (process.env.NODE_ENV === 'development') {
      console.group(`📊 Web Vital: ${metric.name}`)
      console.log(`Value: ${metric.value}`)
      console.log(`ID: ${metric.id}`)
      console.log(`Rating: ${this.getPerformanceRating(metric.name, metric.value)}`)
      console.groupEnd()
    }
  }

  private getPerformanceRating(name: string, value: number): string {
    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      CLS: { good: 0.1, needsImprovement: 0.25 },
      INP: { good: 200, needsImprovement: 500 },
      FCP: { good: 1800, needsImprovement: 3000 },
      LCP: { good: 2500, needsImprovement: 4000 },
      TTFB: { good: 800, needsImprovement: 1800 }
    }

    const threshold = thresholds[name]
    if (!threshold) return 'unknown'

    if (value <= threshold.good) return '🟢 Good'
    if (value <= threshold.needsImprovement) return '🟡 Needs Improvement'
    return '🔴 Poor'
  }

  // カスタムイベントトラッキング
  track(eventName: string, properties?: Record<string, unknown>) {
    const event = {
      name: eventName,
      value: 1,
      id: this.generateId(),
      ...properties
    }

    this.sendToAnalytics(event)
  }

  // エラートラッキング
  trackError(error: Error, context?: Record<string, unknown>) {
    const event: AnalyticsEvent = {
      name: 'error',
      value: 1,
      id: this.generateId(),
      attribution: {
        message: error.message,
        stack: error.stack,
        context
      }
    }

    this.sendToAnalytics(event)
  }

  // パフォーマンスマーク
  markStart(name: string) {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`)
    }
  }

  markEnd(name: string) {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = performance.getEntriesByName(name, 'measure')[0]
      if (measure) {
        this.track('performance_measure', {
          name,
          duration: measure.duration
        })
      }
    }
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    // Google Analytics 4 への送信
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag
      gtag('event', event.name, {
        custom_parameter: event.value,
        event_id: event.id
      })
    }

    // その他の分析ツールへの送信
    // Mixpanel, Amplitude, etc.
    
    // カスタムエンドポイントへの送信
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(console.error)
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

export const analytics = Analytics.getInstance()

// React Hook for analytics
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    markStart: analytics.markStart.bind(analytics),
    markEnd: analytics.markEnd.bind(analytics)
  }
}


export default analytics