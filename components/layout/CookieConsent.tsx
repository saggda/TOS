'use client'

import React, { useState, useEffect } from 'react'
import { X, Settings, Check, Info } from 'lucide-react'
import { setCookieConsent, getCookieConsent, type CookiePreferences } from '@/lib/cookies'

interface CookieConsentProps {
  onConsentChange?: (preferences: CookiePreferences) => void
}

export function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  })
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = getCookieConsent()
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsAnimating(true)
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(newPreferences)
    setCookieConsent(newPreferences)
    onConsentChange?.(newPreferences)
    handleClose()
  }

  const handleRejectAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    }
    setPreferences(newPreferences)
    setCookieConsent(newPreferences)
    onConsentChange?.(newPreferences)
    handleClose()
  }

  const handleSavePreferences = () => {
    setCookieConsent(preferences)
    onConsentChange?.(preferences)
    handleClose()
  }

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Essential cookies can't be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="glass-card overflow-hidden">
          {/* Main Banner */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900 mb-2">
                      Мы используем файлы cookie
                    </h3>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Для улучшения работы сайта мы используем cookie. Вы можете выбрать,
                  какие cookie вы разрешаете. Необходимые cookie обеспечивают базовую
                  функциональность и не могут быть отключены.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-brand-red text-white rounded-xl px-6 py-3.5 font-medium hover:bg-brand-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-brand-red/20 hover:-translate-y-0.5 active:translate-y-0 touch-manipulation"
              >
                Принять все
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 bg-white/50 backdrop-blur-sm border border-white/60 text-gray-700 rounded-xl px-6 py-3.5 font-medium hover:bg-white/70 hover:border-white/80 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 touch-manipulation"
              >
                Только необходимые
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700 rounded-xl px-6 py-3.5 font-medium hover:bg-white/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 touch-manipulation"
              >
                <Settings className="w-4 h-4" />
                <span>Настройки</span>
              </button>
            </div>
          </div>

          {/* Expandable Settings Panel */}
          {showSettings && (
            <div className="border-t border-white/30 bg-white/20 backdrop-blur-sm animate-slide-up">
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-lg font-display font-bold text-gray-900 mb-4">
                    Настройки cookie
                  </h4>
                  <p className="text-sm text-gray-600 mb-6">
                    Выберите категории cookie, которые хотите разрешить.
                  </p>
                </div>

                {/* Cookie Options */}
                <div className="space-y-4">
                  {/* Essential Cookies */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/30 border border-white/40">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-900">Необходимые cookie</h5>
                        <span className="text-xs bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-full">
                          Обязательно
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Обеспечивают базовую функциональность сайта, включая навигацию
                        и доступ к защищенным разделам.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-6 bg-brand-red rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/30 border border-white/40 hover:bg-white/40 transition-colors">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">Аналитические cookie</h5>
                      <p className="text-sm text-gray-600">
                        Помогают нам понять, как visitors взаимодействуют с сайтом,
                        собирая анонимную статистику.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`flex-shrink-0 relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        preferences.analytics ? 'bg-brand-red' : 'bg-gray-300'
                      }`}
                      aria-label={preferences.analytics ? 'Отключить аналитику' : 'Включить аналитику'}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${
                          preferences.analytics ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/30 border border-white/40 hover:bg-white/40 transition-colors">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">Маркетинговые cookie</h5>
                      <p className="text-sm text-gray-600">
                        Используются для отслеживания посетителей на сайте.
                        Цель — отображать релевантную рекламу.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`flex-shrink-0 relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        preferences.marketing ? 'bg-brand-red' : 'bg-gray-300'
                      }`}
                      aria-label={preferences.marketing ? 'Отключить маркетинг' : 'Включить маркетинг'}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${
                          preferences.marketing ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSavePreferences}
                    className="w-full sm:w-auto bg-brand-red text-white rounded-xl px-8 py-3.5 font-medium hover:bg-brand-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-brand-red/20 hover:-translate-y-0.5 active:translate-y-0 touch-manipulation"
                  >
                    Сохранить настройки
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spacer for footer visibility */}
        <div className="h-4 sm:h-6" />
      </div>
    </div>
  )
}
