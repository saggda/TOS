'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const rafIdRef = useRef<number>(0)

  // Проверка prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (prefersReducedMotion || isTouchDevice) {
      return // Не рендерим курсор
    }

    setIsVisible(true)

    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let followerX = 0
    let followerY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Throttled animation loop (30 FPS вместо 60+)
    const animate = () => {
      // Smooth cursor (быстрее)
      const cursorSpeed = 0.9
      cursorX += (mouseX - cursorX) * cursorSpeed
      cursorY += (mouseY - cursorY) * cursorSpeed

      // Smooth follower (медленнее)
      const followerSpeed = 0.15
      followerX += (mouseX - followerX) * followerSpeed
      followerY += (mouseY - followerY) * followerSpeed

      // Применяем трансформацию напрямую (без React state!)
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`

      rafIdRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden lg:block">
      {/* Основной курсор */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-brand-red rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Эффект следования */}
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-brand-red rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}