'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RippleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  rippleColor?: string
}

export function RippleButton({
  children,
  className = '',
  onClick,
  rippleColor = 'rgba(255, 255, 255, 0.5)',
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples([...ripples, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{
              width: 0,
              height: 0,
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              width: 300,
              height: 300,
              x: -150,
              y: -150,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}
