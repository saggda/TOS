'use client'

import { useContext } from 'react'
import { ToastContext } from '@/components/ui/ToastProvider'
import type { ToastType } from '@/components/ui/Toast'

export interface ToastOptions {
  message: string
  type?: ToastType
  duration?: number
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  const toast = (options: ToastOptions) => {
    context.addToast({
      message: options.message,
      type: options.type || 'info',
      duration: options.duration,
    })
  }

  return {
    toast,
    success: (message: string, duration?: number) =>
      toast({ message, type: 'success', duration }),
    error: (message: string, duration?: number) =>
      toast({ message, type: 'error', duration }),
    warning: (message: string, duration?: number) =>
      toast({ message, type: 'warning', duration }),
    info: (message: string, duration?: number) =>
      toast({ message, type: 'info', duration }),
    remove: context.removeToast,
    clearAll: context.clearAll,
  }
}
