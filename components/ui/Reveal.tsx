'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'

type RevealVariant = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-in'

interface RevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  triggerOnce?: boolean
}

const variantStyles: Record<RevealVariant, string> = {
  'fade-in': 'opacity-0',
  'slide-up': 'opacity-0 translate-y-12',
  'slide-down': 'opacity-0 -translate-y-12',
  'slide-left': 'opacity-0 translate-x-12',
  'slide-right': 'opacity-0 -translate-x-12',
  'scale-in': 'opacity-0 scale-95',
}

const visibleStyles = 'opacity-100 translate-x-0 translate-y-0 scale-100'

export function Reveal({
  children,
  variant = 'fade-in',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className,
  triggerOnce = true,
}: RevealProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    triggerOnce,
  })

  const transitionStyle = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        variantStyles[variant],
        isVisible && visibleStyles,
        className
      )}
      style={transitionStyle}
    >
      {children}
    </div>
  )
}
