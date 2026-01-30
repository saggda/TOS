'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastProps {
  toast: Toast
  onRemove: (id: string) => void
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const toastStyles = {
  success: {
    container: 'border-green-500/30 bg-white/70',
    icon: 'text-green-600',
    iconBg: 'bg-green-100',
    progress: 'bg-green-500',
  },
  error: {
    container: 'border-red-500/30 bg-white/70',
    icon: 'text-red-600',
    iconBg: 'bg-red-100',
    progress: 'bg-red-500',
  },
  warning: {
    container: 'border-orange-500/30 bg-white/70',
    icon: 'text-orange-600',
    iconBg: 'bg-orange-100',
    progress: 'bg-orange-500',
  },
  info: {
    container: 'border-brand-red/30 bg-white/70',
    icon: 'text-brand-red',
    iconBg: 'bg-brand-red/10',
    progress: 'bg-brand-red',
  },
}

const toastVariants = {
  initial: {
    opacity: 0,
    x: 400,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    x: 400,
    scale: 0.9,
  },
}

export function ToastComponent({ toast, onRemove }: ToastProps) {
  const [progress, setProgress] = useState(100)
  const [isPaused, setIsPaused] = useState(false)
  const Icon = toastIcons[toast.type]
  const styles = toastStyles[toast.type]
  const duration = toast.duration || 5000

  useEffect(() => {
    if (isPaused) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const timer = setInterval(() => {
      const remaining = endTime - Date.now()
      const newProgress = (remaining / duration) * 100

      if (remaining <= 0) {
        clearInterval(timer)
        onRemove(toast.id)
      } else {
        setProgress(newProgress)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [toast.id, toast.duration, onRemove, isPaused, duration])

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      layout
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        'relative flex items-start gap-3 rounded-2xl border p-4',
        'min-w-[320px] max-w-md',
        'backdrop-blur-xl',
        'shadow-xl',
        styles.container
      )}
      style={{
        boxShadow: '0 8px 32px rgba(122, 15, 28, 0.12), 0 2px 8px rgba(255, 255, 255, 0.6) inset',
      }}
    >
      {/* Gradient overlay for glassmorphism */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%)',
        }}
      />

      {/* Icon */}
      <div className={cn('flex-shrink-0 rounded-xl p-2', styles.iconBg)}>
        <Icon className={cn('h-5 w-5', styles.icon)} />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 relative z-10">
        <p className="text-sm font-medium text-gray-900 leading-relaxed">
          {toast.message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => onRemove(toast.id)}
        className={cn(
          'flex-shrink-0 rounded-lg p-1.5 transition-all duration-200',
          'hover:bg-gray-100/80',
          'text-gray-500 hover:text-gray-700',
          'relative z-10'
        )}
      >
        <X className="h-4 w-4" />
      </button>

      {/* Progress Bar */}
      <motion.div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl',
          styles.progress
        )}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: isPaused ? progress / 100 : 0 }}
        transition={{ duration: isPaused ? 0 : duration / 1000, ease: 'linear' }}
        style={{ originX: 0 }}
      />
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

const stackVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-3 pointer-events-none max-h-[calc(100vh-2rem)] overflow-y-auto">
      <AnimatePresence mode="popLayout">
        <motion.div
          variants={stackVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-3"
        >
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastComponent toast={toast} onRemove={onRemove} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
