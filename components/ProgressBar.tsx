'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
      setProgress(0)
    }

    const handleProgress = () => {
      setProgress((prev) => {
        if (prev > 0.9) return prev
        return prev + Math.random() * 0.2
      })
    }

    const handleComplete = () => {
      setProgress(1)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 300)
    }

    // Start loading on route change
    handleStart()

    // Simulate progress
    const progressInterval = setInterval(() => {
      if (isLoading && progress < 0.9) {
        handleProgress()
      }
    }, 100)

    // Complete loading after a short delay
    const completeTimeout = setTimeout(() => {
      handleComplete()
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(completeTimeout)
    }
  }, [pathname, searchParams])

  if (!isLoading && progress === 0) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gray-900/5 dark:bg-gray-100/5">
      <div
        className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 transition-all duration-300 ease-out"
        style={{
          width: `${progress * 100}%`,
          opacity: isLoading ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
    </div>
  )
}
