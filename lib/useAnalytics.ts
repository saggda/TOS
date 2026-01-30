'use client'

import { useEffect, useState } from 'react'
import { getCookieConsent, type CookiePreferences } from './cookies'

/**
 * Hook to check if analytics should be loaded based on user consent
 * Returns true only if user has given consent for analytics
 */
export function useAnalyticsConsent(): boolean {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check consent on mount
    const consent = getCookieConsent()
    setHasConsent(consent?.analytics ?? false)

    // Listen for storage changes (in case user changes preferences in another tab)
    const handleStorageChange = () => {
      const updatedConsent = getCookieConsent()
      setHasConsent(updatedConsent?.analytics ?? false)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return hasConsent
}

/**
 * Hook to check all cookie consents
 */
export function useCookieConsent(): CookiePreferences | null {
  const [consent, setConsent] = useState<CookiePreferences | null>(null)

  useEffect(() => {
    // Check consent on mount
    const currentConsent = getCookieConsent()
    setConsent(currentConsent)

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedConsent = getCookieConsent()
      setConsent(updatedConsent)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return consent
}

/**
 * Example function to load Google Analytics
 * Call this when analytics consent is granted
 */
export function loadGoogleAnalytics(measurementId: string): void {
  if (typeof window === 'undefined') return

  // Check if already loaded
  if (window.gtag) return

  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  script.onload = () => {
    const dataLayer = window.dataLayer || (window.dataLayer = [])
    window.gtag = function gtag() {
      dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      anonymize_ip: true,
    })
  }
}

/**
 * Example function to load Yandex Metrica
 * Call this when analytics consent is granted
 */
export function loadYandexMetrica(counterId: number): void {
  if (typeof window === 'undefined') return

  // Check if already loaded
  if (window.ym) return

  // Load Yandex Metrica script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://mc.yandex.ru/metrika/tag.js`
  document.head.appendChild(script)

  script.onload = () => {
    // Initialize ym
    window.ym = window.ym || functionYM
    window.ym(counterId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
  }
}

// Helper function for Yandex Metrica
function functionYM(this: any, ...args: any[]) {
  const ym = window.ym as any
  ;(ym.a = ym.a || []).push(args)
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    ym?: (...args: any[]) => void
    dataLayer?: any[]
  }
}
