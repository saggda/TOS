'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Критическая ошибка - логируем
    console.error('🚨 Global Error:', error)

    // TODO: Отправить в Sentry
    // Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-black">
          <div className="text-center max-w-lg">
            <div className="text-8xl mb-6">💥</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Критическая ошибка
            </h1>
            <p className="text-gray-400 mb-8">
              Произошла серьёзная ошибка. Мы уже работаем над её исправлением.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={reset}
                className="w-full px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-dark transition-colors"
              >
                Попробовать снова
              </button>
              <Link
                href="/"
                className="w-full px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                На главную страницу
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left bg-white/5 p-4 rounded">
                <summary className="text-sm text-gray-400 cursor-pointer mb-4">
                  Детали ошибки (разработка)
                </summary>
                <pre className="text-xs text-red-400 overflow-auto whitespace-pre-wrap">
                  {error.message}
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}