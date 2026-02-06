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
    container: 'border-brand-crimson/50 bg-[#0a0a0a] text-white shadow-[0_10px_40px_rgba(220,20,60,0.2)]',
    icon: 'text-brand-crimson',
    iconBg: 'bg-brand-crimson/10',
    progress: 'bg-brand-crimson',
  },
  error: {
    container: 'border-red-600 bg-[#0a0a0a] text-white shadow-[0_10px_40px_rgba(255,0,0,0.2)]',
    icon: 'text-red-500',
    iconBg: 'bg-red-500/10',
    progress: 'bg-red-600',
  },
  warning: {
    container: 'border-orange-500/50 bg-[#0a0a0a] text-white shadow-[0_10px_40px_rgba(255,165,0,0.1)]',
    icon: 'text-orange-500',
    iconBg: 'bg-orange-500/10',
    progress: 'bg-orange-500',
  },
  info: {
    container: 'border-white/20 bg-[#0a0a0a] text-white shadow-[0_10px_40px_rgba(255,255,255,0.05)]',
    icon: 'text-white',
    iconBg: 'bg-white/10',
    progress: 'bg-white',
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
        'relative flex items-start gap-4 p-5 border overflow-hidden',
        'min-w-[320px] max-w-md',
        'backdrop-blur-2xl transition-all duration-300',
        styles.container
      )}
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none" />

      {/* Animated Glow Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-crimson to-transparent opacity-50" />

      {/* Icon */}
      <div className={cn('flex-shrink-0 p-2.5 border border-white/10', styles.iconBg)}>
        <Icon className={cn('h-5 w-5', styles.icon)} />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 relative z-10 py-1">
        <p className="text-sm font-bold uppercase tracking-widest text-white drop-shadow-sm font-mono leading-tight">
          {toast.message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => onRemove(toast.id)}
        className={cn(
          'flex-shrink-0 p-1.5 transition-all duration-200 border border-transparent hover:border-white/10',
          'text-white/30 hover:text-white',
          'relative z-10'
        )}
      >
        <X className="h-4 w-4" />
      </button>

      {/* Progress Bar */}
      <motion.div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-1',
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
