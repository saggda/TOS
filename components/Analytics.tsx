'use client'

import { useEffect } from 'react'
import { useAnalyticsConsent, loadGoogleAnalytics, loadYandexMetrica } from '@/lib/useAnalytics'

/**
 * Analytics Component
 *
 * This component loads analytics scripts only after user consent is given.
 * Add this to your layout.tsx to enable analytics.
 *
 * @example
 * ```tsx
 * import { Analytics } from '@/components/Analytics'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Analytics />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function Analytics() {
  const hasConsent = useAnalyticsConsent()

  useEffect(() => {
    // Only load analytics when user has given consent
    if (hasConsent) {
      // Load Google Analytics
      // Replace 'G-XXXXXXXXXX' with your actual Google Analytics measurement ID
      // loadGoogleAnalytics('G-XXXXXXXXXX')

      // Load Yandex Metrica
      // Replace 12345678 with your actual Yandex Metrica counter ID
      // loadYandexMetrica(12345678)

      console.log('Analytics loaded with user consent')
    }
  }, [hasConsent])

  // This component doesn't render anything
  return null
}
