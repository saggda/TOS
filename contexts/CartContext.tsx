'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Cart, CartItem, CartContextType, calculateCartTotals, createCartItem } from '@/lib/cart'
import { useToast } from '@/hooks/useToast'

const CART_STORAGE_KEY = 'promo-team-cart'

const initialCart: Cart = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  updatedAt: new Date()
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart)
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()

  // Загрузка корзины из localStorage при монтировании
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        // Восстанавливаем Date объект
        parsed.updatedAt = new Date(parsed.updatedAt)
        setCart(parsed)
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины из localStorage:', error)
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [])

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error('Ошибка сохранения корзины в localStorage:', error)
    }
  }, [cart])

  const updateCart = useCallback((items: CartItem[]) => {
    const { totalQuantity, totalPrice } = calculateCartTotals(items)
    setCart({
      items,
      totalQuantity,
      totalPrice,
      updatedAt: new Date()
    })
  }, [])

  const addItem = useCallback((itemData: Omit<CartItem, 'id' | 'total' | 'quantity'>) => {
    console.log('[Cart] Adding item:', itemData)
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === itemData.productId &&
          item.color === itemData.color &&
          item.size === itemData.size
      )

      let newItems: CartItem[]

      if (existingItemIndex !== -1) {
        // Увеличиваем количество существующего товара
        console.log('[Cart] Item exists, incrementing quantity')
        newItems = [...prevCart.items]
        const existingItem = newItems[existingItemIndex]
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          total: existingItem.price * (existingItem.quantity + 1)
        }
        newItems[existingItemIndex] = updatedItem
      } else {
        // Добавляем новый товар
        console.log('[Cart] Creating new item')
        const newItem = createCartItem(
          itemData.productId,
          itemData.slug,
          itemData.name,
          itemData.price,
          itemData.image,
          itemData.color,
          itemData.size,
          1
        )
        newItems = [...prevCart.items, newItem]
      }

      const { totalQuantity, totalPrice } = calculateCartTotals(newItems)

      toast.success(`${itemData.name} добавлен в корзину`, 3000)

      return {
        items: newItems,
        totalQuantity,
        totalPrice,
        updatedAt: new Date()
      }
    })
  }, [toast])

  const updateItem = useCallback((itemId: string, updates: Partial<CartItem>) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.items.findIndex(item => item.id === itemId)

      if (itemIndex === -1) return prevCart

      const newItems = [...prevCart.items]
      const item = newItems[itemIndex]

      const updatedItem = {
        ...item,
        ...updates,
        // Пересчитываем total если изменили price или quantity
        total: (updates.price ?? item.price) * (updates.quantity ?? item.quantity)
      }

      newItems[itemIndex] = updatedItem
      const { totalQuantity, totalPrice } = calculateCartTotals(newItems)

      return {
        items: newItems,
        totalQuantity,
        totalPrice,
        updatedAt: new Date()
      }
    })
  }, [])

  const removeItem = useCallback((itemId: string) => {
    console.log('[CartContext] removeItem called for:', itemId)
    setCart((prevCart) => {
      const itemIndex = prevCart.items.findIndex(item => item.id === itemId)

      if (itemIndex === -1) {
        console.log('[CartContext] Item not found:', itemId)
        return prevCart
      }

      const item = prevCart.items[itemIndex]
      console.log('[CartContext] Removing item:', item.name)
      const newItems = prevCart.items.filter(item => item.id !== itemId)
      const { totalQuantity, totalPrice } = calculateCartTotals(newItems)

      toast.info(`${item.name} удален из корзины`, 3000)

      return {
        items: newItems,
        totalQuantity,
        totalPrice,
        updatedAt: new Date()
      }
    })
  }, [toast])

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      updatedAt: new Date()
    })
    toast.info('Корзина очищена', 3000)
  }, [toast])

  const incrementQuantity = useCallback((itemId: string) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.items.findIndex(item => item.id === itemId)

      if (itemIndex === -1) return prevCart

      const newItems = [...prevCart.items]
      const item = newItems[itemIndex]

      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
        total: item.price * (item.quantity + 1)
      }

      newItems[itemIndex] = updatedItem
      const { totalQuantity, totalPrice } = calculateCartTotals(newItems)

      return {
        items: newItems,
        totalQuantity,
        totalPrice,
        updatedAt: new Date()
      }
    })
  }, [])

  const decrementQuantity = useCallback((itemId: string) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.items.findIndex(item => item.id === itemId)

      if (itemIndex === -1) return prevCart

      const item = prevCart.items[itemIndex]

      if (item.quantity <= 1) {
        // Если количество станет 0, удаляем товар
        const newItems = prevCart.items.filter(item => item.id !== itemId)
        const { totalQuantity, totalPrice } = calculateCartTotals(newItems)

        toast.info(`${item.name} удален из корзины`, 3000)

        return {
          items: newItems,
          totalQuantity,
          totalPrice,
          updatedAt: new Date()
        }
      }

      const newItems = [...prevCart.items]
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
        total: item.price * (item.quantity - 1)
      }

      newItems[itemIndex] = updatedItem
      const { totalQuantity, totalPrice } = calculateCartTotals(newItems)

      return {
        items: newItems,
        totalQuantity,
        totalPrice,
        updatedAt: new Date()
      }
    })
  }, [toast])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value: CartContextType = {
    cart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    isOpen,
    openCart,
    closeCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart должен использоваться внутри CartProvider')
  }
  return context
}