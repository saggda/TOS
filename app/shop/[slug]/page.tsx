'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductBySlug } from '@/lib/content'
import { formatPrice } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Product } from '@/lib/types'
import { useCart } from '@/contexts/CartContext'
import { validateSlug } from '@/lib/validation'
import { sanitizeText } from '@/lib/content-sanitizer'
import { NeonButton } from '@/components/ui/NeonButton'
import { cn } from '@/lib/utils'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const { addItem, openCart } = useCart()

  useEffect(() => {
    if (params.slug) {
      try {
        const validatedSlug = validateSlug(params.slug as string)
        getProductBySlug(validatedSlug).then((data) => {
          if (data) {
            setProduct(data)
            setSelectedColor(data.colors[0])
            setSelectedSize(data.sizes[0])
          } else {
            notFound()
          }
        }).catch(() => {
          notFound()
        })
      } catch (error) {
        console.error('Invalid slug:', error)
        notFound()
      }
    }
  }, [params.slug])

  if (!product) {
    return (
      <Container className="py-12">
        <p className="text-center text-white/70">Загрузка...</p>
      </Container>
    )
  }

  const handleAddToCart = () => {
    if (!product) return

    console.log('[ProductPage] Adding to cart:', {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize
    })

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize
    })
  }

  const handleOrderClick = () => {
    const safeName = sanitizeText(product.name)
    const safeSize = sanitizeText(selectedSize)
    const safeColor = sanitizeText(selectedColor)

    const message = `Хочу заказать: ${safeName}, размер ${safeSize}, цвет ${safeColor}`
    const telegramUrl = `https://t.me/?text=${encodeURIComponent(message)}`

    console.log('merch_order_click', {
      slug: product.slug,
      size: selectedSize,
      color: selectedColor,
    })

    setTimeout(() => {
      window.open(telegramUrl, '_blank', 'noopener,noreferrer')
    }, 500)
  }

  const handleAddToCartAndOpen = () => {
    handleAddToCart()
    setTimeout(() => {
      openCart()
    }, 300)
  }

  return (
    <Container className="py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <a
          href="/shop"
          className="inline-block mb-8 text-white/70 hover:text-brand-red transition-colors text-sm font-medium tracking-wider"
        >
          ← ВЕРНУТЬСЯ В МАГАЗИН
        </a>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0a] border border-white/10">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-red/30 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-red/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-red/30 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-red/30 rounded-br-lg" />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div className="space-y-4">
              <div className="inline-block">
                <p className="text-brand-crimson font-bold text-xs tracking-widest uppercase drop-shadow-md mb-2">
                  {product.category}
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-hype font-bold text-white drop-shadow-lg leading-none">
                {product.name}
              </h1>
              <p className="text-5xl md:text-6xl font-hype text-brand-crimson drop-shadow-lg leading-none">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed drop-shadow-md text-base">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <p className="font-hype text-sm tracking-wider text-white mb-4 drop-shadow-sm uppercase">
                  Выберите цвет: <span className="text-brand-crimson ml-2">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-6 py-3 border-2 transition-all font-bold text-sm uppercase tracking-wider",
                        selectedColor === color
                          ? "border-brand-crimson bg-brand-crimson/20 text-white shadow-[0_0_20px_rgba(220,20,60,0.4)]"
                          : "border-white/20 hover:border-brand-crimson/60 bg-black/40 text-white/70 hover:text-white"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <p className="font-hype text-sm tracking-wider text-white mb-4 drop-shadow-sm uppercase">
                  Выберите размер: <span className="text-brand-crimson ml-2">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-16 h-16 border-2 transition-all font-bold text-sm uppercase tracking-wider flex items-center justify-center",
                        selectedSize === size
                          ? "border-brand-crimson bg-brand-crimson/20 text-brand-crimson shadow-[0_0_20px_rgba(220,20,60,0.4)]"
                          : "border-white/20 hover:border-brand-crimson/60 bg-black/40 text-white/70 hover:text-white"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <NeonButton
                variant="blood"
                className="w-full text-lg font-hype py-4"
                onClick={handleAddToCartAndOpen}
              >
                ДОБАВИТЬ В КОРЗИНУ
              </NeonButton>

              <NeonButton
                variant="chrome"
                className="w-full text-lg font-hype py-4"
                onClick={handleOrderClick}
              >
                ЗАКАЗАТЬ В TELEGRAM
              </NeonButton>
            </div>

            {/* Additional Info */}
            <p className="text-xs text-white/40 text-center tracking-widest uppercase">
              Быстрая доставка по России • Оплата при получении • Гарантия качества
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
