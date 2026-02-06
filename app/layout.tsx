import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Space_Grotesk, Russo_One, Manrope, Syne } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LoadingScreen } from '@/components/LoadingScreen'
import { ProgressBar } from '@/components/ProgressBar'
import { PageTransition } from '@/components/PageTransition'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { CursorEffects } from '@/components/ui/CursorEffects'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { InteractiveEffects } from '@/components/ui/InteractiveEffects'
import { CartProvider } from '@/contexts/CartContext'
import { CartModal } from '@/components/ui/CartModal'
import { siteConfig } from '@/lib/config'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-russo',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: '%s | TOS',
  },
  description: siteConfig.description,
  keywords: [
    'event promo team',
    'electronic music',
    'events',
    'afisha',
    'мероприятия',
    'электронная музыка',
    'афиша',
    'мерч',
    'PROMO Team',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B0000" />
      </head>
      <body className={`${spaceGrotesk.variable} ${russoOne.variable} ${manrope.variable} ${syne.variable}`}>
        <ToastProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            <LoadingScreen />
            <Header />
            <main className="min-h-screen">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <CookieConsent />
            <CartModal />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
