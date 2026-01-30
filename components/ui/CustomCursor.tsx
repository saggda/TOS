'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseover', handleElementHover)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleElementHover)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Outer glow ring */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-50 hidden lg:block"
            style={{
              mixBlendMode: 'screen',
            }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                left: mousePosition.x - 20,
                top: mousePosition.y - 20,
                width: 40,
                height: 40,
              }}
              animate={{
                scale: isHovering ? 1.5 : 1,
                opacity: isHovering ? 0.8 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 28,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-red to-pink-500 opacity-20 blur-xl" />
            </motion.div>

            {/* Inner cursor */}
            <motion.div
              className="absolute rounded-full border-2 border-brand-red/50"
              style={{
                left: mousePosition.x - 8,
                top: mousePosition.y - 8,
                width: 16,
                height: 16,
              }}
              animate={{
                scale: isHovering ? 0.5 : 1,
                borderColor: isHovering ? 'rgba(239, 68, 68, 1)' : 'rgba(239, 68, 68, 0.5)',
              }}
              transition={{
                type: 'spring',
                stiffness: 700,
                damping: 30,
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
