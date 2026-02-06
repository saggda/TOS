'use client'

import React from 'react'
import { useCart } from '@/contexts/CartContext'
import { cn } from '@/lib/utils'

interface CartIconProps {
  className?: string
  showBadge?: boolean
  onClick?: () => void
}

export function CartIcon({ className, showBadge = true, onClick }: CartIconProps) {
  const { cart, openCart } = useCart()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      openCart()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative w-10 h-10 flex items-center justify-center bg-black border border-white/20 hover:border-brand-crimson transition-all duration-300 group overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]',
        className
      )}
      aria-label="Корзина"
      title="Корзина"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-brand-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30" />

      {/* Icon */}
      <svg
        className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      {/* Badge */}
      {showBadge && cart.totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1 flex items-center justify-center bg-brand-crimson text-white text-[10px] font-bold border border-white/20 shadow-[0_0_10px_rgba(220,20,60,0.6)] z-20">
          {cart.totalQuantity > 99 ? '99+' : cart.totalQuantity}
        </span>
      )}

      {/* Hover Line Effect */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson group-hover:w-full transition-all duration-500" />
    </button>
  )
}