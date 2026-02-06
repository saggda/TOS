export interface CartItem {
  id: string
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
  image: string
  color: string
  size: string
  total: number
}

export interface Cart {
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
  updatedAt: Date
}

export interface CartContextType {
  cart: Cart
  addItem: (item: Omit<CartItem, 'id' | 'total' | 'quantity'>) => void
  updateItem: (itemId: string, updates: Partial<CartItem>) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  incrementQuantity: (itemId: string) => void
  decrementQuantity: (itemId: string) => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

// Функции-помощники
export function calculateCartTotals(items: CartItem[]): Pick<Cart, 'totalQuantity' | 'totalPrice'> {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.total, 0)
  return { totalQuantity, totalPrice }
}

export function createCartItem(
  productId: string,
  slug: string,
  name: string,
  price: number,
  image: string,
  color: string,
  size: string,
  quantity: number = 1
): CartItem {
  return {
    id: `${productId}-${color}-${size}`, // Уникальный ID комбинации товар+цвет+размер
    productId,
    slug,
    name,
    price,
    quantity,
    image,
    color,
    size,
    total: price * quantity
  }
}