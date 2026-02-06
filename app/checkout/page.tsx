'use client'

import React, { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    deliveryMethod: 'courier' as 'courier' | 'pickup',
    paymentMethod: 'cash' as 'cash' | 'card'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cart.items.length === 0) {
      alert('Корзина пуста!')
      return
    }

    // Формируем сообщение для Telegram
    const itemsSummary = cart.items
      .map(item => `${item.name} (${item.size}, ${item.color}) × ${item.quantity} = ${formatPrice(item.total)}`)
      .join('\n')

    const deliveryText = formData.deliveryMethod === 'courier' 
      ? `Доставка: курьером по адресу: ${formData.address}`
      : 'Самовывоз'

    const paymentText = formData.paymentMethod === 'cash' 
      ? 'Наличными при получении'
      : 'Картой при получении'

    const message = `НОВЫЙ ЗАКАЗ МЕРЧА!\n\nКонтактные данные:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\n\nЗаказ:\n${itemsSummary}\n\n${deliveryText}\nОплата: ${paymentText}\n\nОбщая сумма: ${formatPrice(cart.totalPrice)}\n\nКомментарий: ${formData.comment || 'Нет комментария'}`

    const telegramUrl = `https://t.me/?text=${encodeURIComponent(message)}`

    console.log('checkout_submit', {
      totalItems: cart.totalQuantity,
      totalPrice: cart.totalPrice,
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod
    })

    // Очищаем корзину после оформления
    clearCart()

    // Редирект в Telegram
    window.open(telegramUrl, '_blank')
  }

  if (cart.items.length === 0) {
    return (
      <Container className="py-12 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <Button variant="primary" size="lg" href="/shop">
            Перейти в магазин
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Хлебные крошки */}
        <div className="mb-6 sm:mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-red transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-red transition-colors">
              Магазин
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Оформление заказа</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Левая колонка - Форма */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">Оформление заказа</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Личные данные */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Контактные данные</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Имя и фамилия *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-colors"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-colors"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Способ доставки */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Способ доставки</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="courier"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === 'courier'}
                      onChange={handleChange}
                      className="h-4 w-4 text-brand-red border-gray-300 focus:ring-brand-red"
                    />
                    <label htmlFor="courier" className="ml-3 block text-sm font-medium text-gray-700">
                      Курьером (Москва и МО)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pickup"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                      className="h-4 w-4 text-brand-red border-gray-300 focus:ring-brand-red"
                    />
                    <label htmlFor="pickup" className="ml-3 block text-sm font-medium text-gray-700">
                      Самовывоз (Москва, уточняйте адрес)
                    </label>
                  </div>

                  {formData.deliveryMethod === 'courier' && (
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Адрес доставки *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required={formData.deliveryMethod === 'courier'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-colors"
                        placeholder="Улица, дом, квартира"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Способ оплаты */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Способ оплаты</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="h-4 w-4 text-brand-red border-gray-300 focus:ring-brand-red"
                    />
                    <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                      Наличными при получении
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="h-4 w-4 text-brand-red border-gray-300 focus:ring-brand-red"
                    />
                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                      Картой при получении
                    </label>
                  </div>
                </div>
              </div>

              {/* Комментарий */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Комментарий к заказу</h2>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Дополнительная информация
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-colors"
                    placeholder="Например, удобное время для звонка или особые пожелания..."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  Оформить заказ
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  href="/shop"
                >
                  Вернуться в магазин
                </Button>
              </div>
            </form>
          </div>

          {/* Правая колонка - Итоги */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Ваш заказ</h2>
              
              {/* Список товаров */}
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 bg-gray-200" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.size}, {item.color}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">
                          {item.quantity} × {formatPrice(item.price)}
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatPrice(item.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Итоги */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({cart.totalQuantity})</span>
                  <span>{formatPrice(cart.totalPrice)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Доставка</span>
                  <span>
                    {formData.deliveryMethod === 'courier' ? '300 ₽' : 'Бесплатно'}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого</span>
                    <span>
                      {formatPrice(
                        cart.totalPrice + (formData.deliveryMethod === 'courier' ? 300 : 0)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Информация */}
              <div className="text-sm text-gray-600 space-y-3">
                <p>
                  После оформления заказа мы свяжемся с вами в течение 24 часов для подтверждения.
                </p>
                <p>
                  Заказ будет передан в Telegram для дальнейшей обработки.
                </p>
                <p className="text-xs text-gray-500">
                  Нажимая "Оформить заказ", вы соглашаетесь с условиями обработки персональных данных.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}