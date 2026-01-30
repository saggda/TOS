'use client'

import { useRef, useState, useEffect } from 'react'

interface UseTiltOptions {
  max?: number
  perspective?: number
  scale?: number
  speed?: number
  easing?: string
}

interface UseTiltReturn {
  ref: React.RefObject<HTMLDivElement | null>
  style: React.CSSProperties
  isHovered: boolean
}

export function useTilt(options: UseTiltOptions = {}): UseTiltReturn {
  const {
    max = 15, // Maximum rotation angle in degrees
    perspective = 1000, // Perspective depth in pixels
    scale = 1.02, // Scale on hover
    speed = 300, // Transition speed in ms
    easing = 'cubic-bezier(0.03, 0.98, 0.52, 0.99)' // Premium easing
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let requestFrameId: number
    let isMouseOver = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate rotation based on mouse position
      const rotateX = ((y - centerY) / centerY) * -max // Inverted for natural feel
      const rotateY = ((x - centerX) / centerX) * max

      // Calculate glare effect
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100

      requestFrameId = requestAnimationFrame(() => {
        setTransform(
          `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
        )

        // Add dynamic glare effect
        element.style.setProperty('--glare-x', `${glareX}%`)
        element.style.setProperty('--glare-y', `${glareY}%`)
      })
    }

    const handleMouseEnter = () => {
      isMouseOver = true
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      isMouseOver = false
      setIsHovered(false)
      requestFrameId = requestAnimationFrame(() => {
        setTransform(
          `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
        )
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (requestFrameId) {
        cancelAnimationFrame(requestFrameId)
      }
    }
  }, [max, perspective, scale])

  const style: React.CSSProperties = {
    transform,
    transition: isHovered ? 'none' : `transform ${speed}ms ${easing}`,
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  }

  return { ref, style, isHovered }
}
