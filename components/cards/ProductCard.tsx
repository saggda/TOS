'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useTilt } from '@/hooks/useTilt'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { ref, style, isHovered } = useTilt({
    max: 10,
    scale: 1.04,
    speed: 350
  })

  const trackClick = () => {
    console.log('product_click', { slug: product.slug })
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      onClick={trackClick}
      className="block group touch-manipulation"
    >
      <div
        ref={ref}
        style={style}
        className="glass-card h-full overflow-hidden relative"
      >
        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-accent-purple text-white text-xs font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full backdrop-blur-sm z-10">
              New
            </div>
          )}

          {/* Quick View */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300">
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-center py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              Быстрый просмотр
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-5">
          <p className="text-gray-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1.5 sm:mb-2">
            {product.category}
          </p>

          <h3 className="font-display font-semibold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-brand-red group-active:text-brand-red transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <span className="font-display text-base sm:text-xl font-bold text-gradient">
              {formatPrice(product.price)}
            </span>

            {/* Colors indicator */}
            {product.colors.length > 0 && (
              <div className="flex gap-1 sm:gap-1.5">
                {product.colors.slice(0, 3).map((color) => (
                  <div
                    key={color}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color === 'black' ? '#000' : color === 'white' ? '#fff' : color === 'red' ? '#7A0F1C' : '#ccc' }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-600 font-medium">
                    +{product.colors.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
