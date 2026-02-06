'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { ChromeFrame } from '../ui/ChromeFrame'
import { GlitchText } from '../ui/GlitchText'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const trackClick = () => {
    console.log('product_click', { slug: product.slug })
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      onClick={trackClick}
      className="block group touch-manipulation no-underline"
    >
      <ChromeFrame glowColor="blood" thickness={3}>
        <div className="bg-[#0a0a0a] metal-texture p-4 sm:p-5 h-full flex flex-col relative overflow-hidden min-h-[420px]">
          {/* Image Frame */}
          <div className="relative aspect-square mb-5 border border-white/10 bg-[#151515] shadow-inner p-1 group-hover:border-brand-blood/40 transition-colors duration-300">
            {/* Decorative Corner Accents */}
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-l-2 border-t-2 border-brand-chrome/60 z-20" />
            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-r-2 border-t-2 border-brand-chrome/60 z-20" />
            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-l-2 border-b-2 border-brand-chrome/60 z-20" />
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-r-2 border-b-2 border-brand-chrome/60 z-20" />

            <div className="relative w-full h-full overflow-hidden bg-black/50">
              {!imageError ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImageError(true)}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
                />
              ) : (
                <div className="absolute inset-0 bg-[#1a1a1a] border border-brand-blood/20 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blood/10 to-transparent" />
                  <span className="text-gray-500 text-[10px] uppercase tracking-[0.3em] relative z-10">No Image</span>
                  <div className="w-8 h-[1px] bg-brand-blood/50 mt-2 relative z-10" />
                </div>
              )}
            </div>

            {/* New Badge - Industrial Style */}
            {product.featured && (
              <div className="absolute top-2 right-2 z-30">
                <div className="bg-brand-blood text-white text-[10px] font-bold px-2 py-1 border border-white/20 shadow-[0_0_15px_rgba(220,20,60,0.6)] tracking-widest uppercase">
                  New
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 pl-1 border-l-2 border-brand-blood/50">
                {product.category}
              </p>

              <h3 className="font-display font-bold text-lg mb-3 text-white line-clamp-2 leading-tight group-hover:text-brand-chrome transition-colors">
                {product.name}
              </h3>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              {/* Price & Colors */}
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  {/* <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Price</span> */}
                  <GlitchText
                    trigger="hover"
                    className="text-2xl font-bold font-display text-brand-blood drop-shadow-[0_0_8px_rgba(220,20,60,0.5)]"
                  >
                    {formatPrice(product.price)}
                  </GlitchText>
                </div>

                {/* Colors */}
                {product.colors.length > 0 && (
                  <div className="flex gap-1.5 pb-1">
                    {product.colors.slice(0, 3).map((color) => (
                      <div
                        key={color}
                        className="w-3.5 h-3.5 rounded-none border border-white/20 rotate-45 transform origin-center shadow-sm"
                        style={{ backgroundColor: color === 'black' ? '#000' : color === 'white' ? '#fff' : color === 'red' ? '#7A0F1C' : '#555' }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <div className="w-3.5 h-3.5 border border-white/20 rotate-45 bg-[#222] flex items-center justify-center">
                        <span className="-rotate-45 text-[8px] text-gray-400 leading-none block ml-px mt-px">+</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Fake Neon Button "Order" */}
              <div className="w-full text-center py-2.5 bg-black border border-brand-red/50 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-brand-blood transition-all duration-300 shadow-[0_0_10px_rgba(220,20,60,0.2)] group-hover:shadow-[0_0_25px_rgba(220,20,60,0.6)] group-hover:border-brand-crimson relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Заказать</span>
              </div>
            </div>
          </div>
        </div>
      </ChromeFrame>
    </Link>
  )
}