'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductBySlug } from '@/lib/content'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Product } from '@/lib/types'
import { useToast } from '@/hooks/useToast'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const toast = useToast()

  useEffect(() => {
    if (params.slug) {
      getProductBySlug(params.slug as string).then((data) => {
        if (data) {
          setProduct(data)
          setSelectedColor(data.colors[0])
          setSelectedSize(data.sizes[0])
        }
      })
    }
  }, [params.slug])

  if (!product) {
    return (
      <Container className="py-12">
        <p className="text-center text-gray-500">Загрузка...</p>
      </Container>
    )
  }

  const handleOrderClick = () => {
    const message = `Хочу заказать: ${product.name}, размер ${selectedSize}, цвет ${selectedColor}`
    const telegramUrl = `https://t.me/?text=${encodeURIComponent(message)}`

    console.log('merch_order_click', {
      slug: product.slug,
      size: selectedSize,
      color: selectedColor,
    })

    toast.success('Переход к оформлению заказа в Telegram...', 3000)

    setTimeout(() => {
      window.open(telegramUrl, '_blank')
    }, 500)
  }

  return (
    <Container className="py-12">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <a
          href="/shop"
          className="inline-block mb-6 text-gray-600 hover:text-brand-red transition-colors"
        >
          ← Назад в магазин
        </a>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-brand-red font-medium mb-2 capitalize">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
            </div>

            {/* Description */}
            <p className="text-gray-600">{product.description}</p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <p className="font-medium mb-3">Цвет: {selectedColor}</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border transition-all ${
                        selectedColor === color
                          ? 'border-brand-red bg-brand-red/10'
                          : 'border-gray-300 hover:border-brand-red'
                      }`}
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
                <p className="font-medium mb-3">Размер: {selectedSize}</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full border transition-all flex items-center justify-center ${
                        selectedSize === size
                          ? 'border-brand-red bg-brand-red/10 text-brand-red'
                          : 'border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Order Button */}
            <Button size="lg" className="w-full" onClick={handleOrderClick}>
              Заказать через Telegram
            </Button>

            <p className="text-sm text-gray-500">
              Нажмите кнопку, чтобы оформить заказ в Telegram
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
