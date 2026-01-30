'use client'

import { useEffect, useState } from 'react'
import { getProducts } from '@/lib/content'
import { ProductCard } from '@/components/cards/ProductCard'
import { Container } from '@/components/ui/Container'
import { Product } from '@/lib/types'

const categories = [
  { value: 'all', label: 'Все' },
  { value: 'tshirts', label: 'Футболки' },
  { value: 'hoodies', label: 'Худи' },
  { value: 'caps', label: 'Кепки' },
  { value: 'accessories', label: 'Аксессуары' },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Магазин</h1>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm touch-manipulation ${
              selectedCategory === category.value
                ? 'bg-brand-red text-white'
                : 'bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Загрузка...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-base sm:text-lg">Товаров в этой категории пока нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  )
}
