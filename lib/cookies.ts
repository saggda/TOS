export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const CONSENT_STORAGE_KEY = 'cookie-consent'
const CONSENT_VERSION = '1.0'

export function setCookieConsent(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') return

  try {
    const data = {
      preferences,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving cookie consent:', error)
  }
}

export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null

    const data = JSON.parse(stored)

    // Check if version matches (allows for future updates)
    if (data.version !== CONSENT_VERSION) {
      // Version mismatch, clear old consent
      localStorage.removeItem(CONSENT_STORAGE_KEY)
      return null
    }

    return data.preferences as CookiePreferences
  } catch (error) {
    console.error('Error reading cookie consent:', error)
    return null
  }
}

export function hasCookieConsent(): boolean {
  return getCookieConsent() !== null
}

export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing cookie consent:', error)
  }
}

// Helper function to check if analytics is enabled
export function isAnalyticsEnabled(): boolean {
  const consent = getCookieConsent()
  return consent?.analytics ?? false
}

// Helper function to check if marketing is enabled
export function isMarketingEnabled(): boolean {
  const consent = getCookieConsent()
  return consent?.marketing ?? false
}
