'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Загружаем когда контент готов
    const checkReady = () => {
      if (document.readyState === 'complete') {
        setIsLoading(false)
      }
    }

    window.addEventListener('load', checkReady)

    // Fallback: максимум 1 секунда
    const fallback = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Симулируем прогресс для UX
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 20 // Быстрее
      })
    }, 100)

    return () => {
      window.removeEventListener('load', checkReady)
      clearTimeout(fallback)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-brand-red via-brand-dark to-brand-darker"
        >
          <div className="relative flex flex-col items-center justify-center space-y-8">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative"
            >
              {/* Background glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 blur-3xl bg-white/20 rounded-full"
              />

              {/* Main logo text */}
              <div className="relative">
                <motion.h1
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="font-display text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/60 bg-[length:200%_100%]"
                  style={{
                    textShadow: '0 0 80px rgba(255,255,255,0.3)',
                  }}
                >
                  twooneseven
                </motion.h1>

                {/* Decorative underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                  className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-2"
                />
              </div>
            </motion.div>

            {/* Animated Spinner */}
            <div className="relative w-24 h-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0"
              >
                {/* Outer ring */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="70 200"
                  />
                </svg>
              </motion.div>

              {/* Inner pulsing circle */}
              <motion.div
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-white rounded-full" />
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-xs text-white/70">
                <span>Загрузка...</span>
                <span>{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-white/80 to-white rounded-full"
                />
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-white/60 text-sm tracking-widest uppercase"
            >
              Event Promo Team
            </motion.p>
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [0, -100, -200],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeOut',
              }}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${60 + (i % 3) * 15}%`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
