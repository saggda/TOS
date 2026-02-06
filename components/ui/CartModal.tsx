'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function CartModal() {
  const { cart, isOpen, closeCart, removeItem, incrementQuantity, decrementQuantity, clearCart } = useCart()

  // Закрытие по ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeCart])

  // Клик по оверлею
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in flex justify-end">
      {/* Оверлей */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleOverlayClick}
      />

      {/* Модальное окно */}
      <div className="relative h-full w-full max-w-md animate-slide-left shadow-[0_0_50px_rgba(0,0,0,0.8)] border-l border-white/5">
        <div className="h-full bg-brand-dark metal-texture overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-crimson/5" />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h2 className="text-2xl font-hype text-white tracking-widest">CART</h2>
                <div className="h-1 w-12 bg-brand-crimson mt-1 shadow-[0_0_10px_rgba(220,20,60,0.5)]" />
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-brand-crimson transition-all group"
                aria-label="Закрыть"
              >
                <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 grayscale opacity-50">
                <div className="w-20 h-20 mb-6 flex items-center justify-center border border-white/10 rotate-45 transform">
                  <svg className="w-10 h-10 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">CART EMPTY</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest">Await the next drop</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="group relative p-4 bg-black/40 border border-white/5 hover:border-brand-crimson/30 transition-all overflow-hidden flex gap-4">
                    {/* Background Overlay */}
                    <div className="absolute inset-0 bg-brand-crimson/0 group-hover:bg-brand-crimson/[0.02] transition-colors pointer-events-none" />

                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 border border-white/10 p-1 bg-black">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-display font-bold text-sm text-white truncate group-hover:text-brand-crimson transition-colors uppercase tracking-wider">{item.name}</h4>
                        <button
                           onClick={(e) => {
                             e.stopPropagation()
                             console.log('[CartModal] Remove item clicked:', item.id)
                             removeItem(item.id)
                           }}
                           className="text-white/20 hover:text-brand-crimson transition-colors z-10 relative"
                         >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3">
                        {item.size} / {item.color}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-white/10 bg-black">
                          <button
                             onClick={(e) => {
                               e.stopPropagation()
                               console.log('[CartModal] Decrement clicked:', item.id)
                               decrementQuantity(item.id)
                             }}
                             className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-20 z-10 relative"
                             disabled={item.quantity <= 1}
                           >
                             <span>−</span>
                           </button>
                          <span className="w-7 text-center text-xs font-mono text-white/80">{item.quantity}</span>
                          <button
                             onClick={(e) => {
                               e.stopPropagation()
                               console.log('[CartModal] Increment clicked:', item.id)
                               incrementQuantity(item.id)
                             }}
                             className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors z-10 relative"
                           >
                             <span>+</span>
                           </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-display font-bold text-white tracking-widest leading-none">
                            {formatPrice(item.total)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full py-3 text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 hover:text-brand-crimson border border-white/5 transition-all mt-4"
                >
                  PURGE CART
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="p-6 bg-black border-t border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-crimson to-transparent opacity-50" />

              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-sm text-white/60">{cart.totalQuantity} ITEMS</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-hype text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    {formatPrice(cart.totalPrice)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-brand-crimson hover:bg-brand-red text-white py-4 font-hype tracking-[0.2em] flex items-center justify-center transition-all shadow-[0_0_20px_rgba(220,20,60,0.3)] hover:shadow-[0_0_40px_rgba(220,20,60,0.5)] border border-white/20"
                >
                  COMMAND: CHECKOUT
                </a>
                <button
                  onClick={closeCart}
                  className="w-full py-4 text-[10px] uppercase font-bold tracking-[0.3em] text-white/50 hover:text-white transition-all border border-white/10"
                >
                  RETURN TO SECTOR
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}