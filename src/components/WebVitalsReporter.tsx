'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

export function WebVitalsReporter() {
  useEffect(() => {
    analytics.init()
  }, [])

  return null
}

export default WebVitalsReporter