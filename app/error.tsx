'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-brand-red/20 rounded-full blur-3xl float" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent-purple/20 rounded-full blur-3xl float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-brand-red/10 to-accent-pink/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Glass Card */}
          <div className="glass-card p-8 md:p-12 text-center">
            {/* Icon */}
            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">⚙️</div>

            {/* Large 500 with Gradient */}
            <div className="mb-6 sm:mb-8 relative">
              <div className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-gradient leading-none">
                500
              </div>
            </div>

            {/* Heading */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-balance">
              Что-то пошло не так
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed">
              Мы работаем над устранением проблемы. Попробуйте позже.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-10 sm:mb-12">
              <Button
                size="lg"
                variant="primary"
                className="w-full sm:w-auto"
                onClick={reset}
              >
                Обновить страницу
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" href="/">
                На главную
              </Button>
            </div>

            {/* Support Contact Info */}
            <div className="border-t border-gray-200/50 pt-8 sm:pt-10">
              <p className="text-sm font-medium text-gray-700 mb-4 sm:mb-6">Нужна помощь?</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a
                  href="mailto:info@promo-team.ru"
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/60 hover:bg-brand-red hover:text-white backdrop-blur-sm border border-white/50 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  ✉️ info@promo-team.ru
                </a>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/60 hover:bg-brand-red hover:text-white backdrop-blur-sm border border-white/50 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  📱 Telegram
                </a>
              </div>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left overflow-auto max-h-40">
                <p className="text-sm font-mono text-red-600">{error.message}</p>
                {error.digest && (
                  <p className="text-xs font-mono text-red-400 mt-2">Error ID: {error.digest}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-brand-red/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
