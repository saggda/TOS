# 🛡️ ОБРАБОТКА ОШИБОК И ВАЛИДАЦИЯ

**Время:** 4 часа
**Сложность:** Средне
**Приоритет:** 🔴 КРИТИЧЕСКИЙ

Без обработки ошибок любая проблема в JSON или сети сломает весь сайт.

---

## 1️⃣ ВАЛИДАЦИЯ КОНТЕНТА JSON (2 часа)

### Проблема:
Нет валидации данных из JSON - ошибка в файле ломает сайт

### Файл: Создай `lib/content-validation.ts`

```typescript
import { z } from 'zod'
import type { Event, Product, Post } from './types'

// ===== EVENT SCHEMA =====
export const eventSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date: z.string().datetime(),
  city: z.string().min(1),
  venue: z.string().min(1),
  poster: z.string().url(),
  description: z.string().min(1),
  ticketUrl: z.string().url(),
  featured: z.boolean().optional().default(false),
})

export type EventInput = z.infer<typeof eventSchema>

// ===== PRODUCT SCHEMA =====
export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  sizes: z.array(z.string()).optional().default([]),
  colors: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
})

export type ProductInput = z.infer<typeof productSchema>

// ===== POST SCHEMA =====
export const postSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date: z.string().datetime(),
  category: z.string().min(1),
  image: z.string().url(),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featured: z.boolean().optional().default(false),
})

export type PostInput = z.infer<typeof postSchema>

// ===== VALIDATION FUNCTIONS =====

/**
 * Валидация массива событий
 */
export function validateEvents(data: unknown[]): {
  valid: Event[]
  errors: string[]
  duplicates: string[]
} {
  const errors: string[] = []
  const duplicates: string[] = []
  const valid: Event[] = []
  const slugs = new Set<string>()

  data.forEach((item, index) => {
    try {
      const event = eventSchema.parse(item)

      // Проверка дубликатов
      if (slugs.has(event.slug)) {
        duplicates.push(event.slug)
        errors.push(`Duplicate slug at index ${index}: ${event.slug}`)
        return
      }

      slugs.add(event.slug)
      valid.push(event as Event)
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(`Event at index ${index}: ${error.errors.map(e => e.message).join(', ')}`)
      }
    }
  })

  return { valid, errors, duplicates }
}

/**
 * Валидация массива продуктов
 */
export function validateProducts(data: unknown[]): {
  valid: Product[]
  errors: string[]
  duplicates: string[]
} {
  const errors: string[] = []
  const duplicates: string[] = []
  const valid: Product[] = []
  const slugs = new Set<string>()

  data.forEach((item, index) => {
    try {
      const product = productSchema.parse(item)

      if (slugs.has(product.slug)) {
        duplicates.push(product.slug)
        errors.push(`Duplicate slug at index ${index}: ${product.slug}`)
        return
      }

      slugs.add(product.slug)
      valid.push(product as Product)
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(`Product at index ${index}: ${error.errors.map(e => e.message).join(', ')}`)
      }
    }
  })

  return { valid, errors, duplicates }
}

/**
 * Валидация массива постов
 */
export function validatePosts(data: unknown[]): {
  valid: Post[]
  errors: string[]
  duplicates: string[]
} {
  const errors: string[] = []
  const duplicates: string[] = []
  const valid: Post[] = []
  const slugs = new Set<string>()

  data.forEach((item, index) => {
    try {
      const post = postSchema.parse(item)

      if (slugs.has(post.slug)) {
        duplicates.push(post.slug)
        errors.push(`Duplicate slug at index ${index}: ${post.slug}`)
        return
      }

      slugs.add(post.slug)
      valid.push(post as Post)
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(`Post at index ${index}: ${error.errors.map(e => e.message).join(', ')}`)
      }
    }
  })

  return { valid, errors, duplicates }
}
```

---

## 2️⃣ ОБНОВИ CONTENT С ВАЛИДАЦИЕЙ (1 час)

### Файл: `lib/content.ts`

```typescript
import {
  validateEvents,
  validateProducts,
  validatePosts,
  type EventInput,
  type ProductInput,
  type PostInput,
} from './content-validation'
import type { Event, Product, Post } from './types'

/**
 * Загрузка событий с валидацией
 */
export async function getEvents(): Promise<Event[]> {
  try {
    const eventsModule = await import('@/content/events.json')
    const eventsData = eventsModule.default as unknown[]

    const { valid, errors, duplicates } = validateEvents(eventsData)

    if (errors.length > 0) {
      console.error('⚠️ Content validation errors in events.json:')
      errors.forEach(err => console.error(`  - ${err}`))
    }

    if (duplicates.length > 0) {
      console.warn('⚠️ Duplicate slugs found:', duplicates.join(', '))
    }

    if (process.env.NODE_ENV === 'development' && errors.length > 0) {
      throw new Error(`Invalid events data:\n${errors.join('\n')}`)
    }

    return valid.sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  } catch (error) {
    console.error('❌ Failed to load events:', error)
    return []
  }
}

/**
 * Загрузка события по slug с валидацией
 */
export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  try {
    const events = await getEvents()
    return events.find(e => e.slug === slug)
  } catch (error) {
    console.error(`❌ Failed to load event "${slug}":`, error)
    return undefined
  }
}

/**
 * Загрузка продуктов с валидацией
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const productsModule = await import('@/content/products.json')
    const productsData = productsModule.default as unknown[]

    const { valid, errors, duplicates } = validateProducts(productsData)

    if (errors.length > 0) {
      console.error('⚠️ Content validation errors in products.json:')
      errors.forEach(err => console.error(`  - ${err}`))
    }

    if (duplicates.length > 0) {
      console.warn('⚠️ Duplicate slugs found:', duplicates.join(', '))
    }

    if (process.env.NODE_ENV === 'development' && errors.length > 0) {
      throw new Error(`Invalid products data:\n${errors.join('\n')}`)
    }

    return valid
  } catch (error) {
    console.error('❌ Failed to load products:', error)
    return []
  }
}

/**
 * Загрузка продукта по slug с валидацией
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const products = await getProducts()
    return products.find(p => p.slug === slug)
  } catch (error) {
    console.error(`❌ Failed to load product "${slug}":`, error)
    return undefined
  }
}

/**
 * Загрузка постов с валидацией
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const postsModule = await import('@/content/posts.json')
    const postsData = postsModule.default as unknown[]

    const { valid, errors, duplicates } = validatePosts(postsData)

    if (errors.length > 0) {
      console.error('⚠️ Content validation errors in posts.json:')
      errors.forEach(err => console.error(`  - ${err}`))
    }

    if (duplicates.length > 0) {
      console.warn('⚠️ Duplicate slugs found:', duplicates.join(', '))
    }

    if (process.env.NODE_ENV === 'development' && errors.length > 0) {
      throw new Error(`Invalid posts data:\n${errors.join('\n')}`)
    }

    return valid.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('❌ Failed to load posts:', error)
    return []
  }
}

/**
 * Загрузка поста по slug с валидацией
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const posts = await getPosts()
    return posts.find(p => p.slug === slug)
  } catch (error) {
    console.error(`❌ Failed to load post "${slug}":`, error)
    return undefined
  }
}

// Featured функции
export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents()
  return events.filter(e => e.featured)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(p => p.featured)
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(p => p.featured)
}
```

---

## 3️⃣ УЛУЧШЕННЫЕ ERROR BOUNDARIES (30 минут)

### Файл: Создай `app/global-error.tsx`

```typescript
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Критическая ошибка - логируем
    console.error('🚨 Global Error:', error)

    // TODO: Отправить в Sentry
    // Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-black">
          <div className="text-center max-w-lg">
            <div className="text-8xl mb-6">💥</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Критическая ошибка
            </h1>
            <p className="text-gray-400 mb-8">
              Произошла серьёзная ошибка. Мы уже работаем над её исправлением.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={reset}
                className="w-full px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-dark transition-colors"
              >
                Попробовать снова
              </button>
              <Link
                href="/"
                className="w-full px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                На главную страницу
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left bg-white/5 p-4 rounded">
                <summary className="text-sm text-gray-400 cursor-pointer mb-4">
                  Детали ошибки (разработка)
                </summary>
                <pre className="text-xs text-red-400 overflow-auto whitespace-pre-wrap">
                  {error.message}
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
```

### Файл: Обнови `app/error.tsx` (если уже создали)

```typescript
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('⚠️ Page Error:', error)
    // TODO: Sentry.captureException(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-dark to-black">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Ошибка на странице
        </h2>
        <p className="text-gray-400 mb-8">
          Что-то пошло не так при загрузке этой страницы.
        </p>
        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            На главную
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer">
              Детали ошибки (разработка)
            </summary>
            <pre className="mt-4 text-xs text-red-400 overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
```

---

## 4️⃣ NOT-FOUND СТРАНИЦЫ ДЛЯ РАЗДЕЛОВ (30 минут)

### Файл: Создай `app/afisha/not-found.tsx`

```typescript
import Link from 'next/link'

export default function EventNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-dark to-black">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">📅</div>
        <h1 className="text-4xl font-bold text-white mb-4">Мероприятие не найдено</h1>
        <p className="text-gray-400 mb-8">
          Мероприятие, которое вы ищете, не существует или было удалено.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/afisha"
            className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            Все мероприятия
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}
```

### Файл: Создай `app/shop/not-found.tsx`

```typescript
import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-dark to-black">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">👕</div>
        <h1 className="text-4xl font-bold text-white mb-4">Товар не найден</h1>
        <p className="text-gray-400 mb-8">
          Товар, который вы ищете, не существует или недоступен.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/shop"
            className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            В магазин
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}
```

### Файл: Создай `app/media/not-found.tsx`

```typescript
import Link from 'next/link'

export default function PostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-dark to-black">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">📰</div>
        <h1 className="text-4xl font-bold text-white mb-4">Статья не найдена</h1>
        <p className="text-gray-400 mb-8">
          Статья, которую вы ищете, не существует или была удалена.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/media"
            className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            Все статьи
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}
```

---

## 5️⃣ ОБРАБОТКА ОШИБОК В КОМПОНЕНТАХ (30 минут)

### Обнови карточки с лучшей обработкой ошибок:

#### `components/cards/EventCard.tsx`

```typescript
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTilt } from '@/hooks/useTilt'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false)
  const { ref, style, isHovered } = useTilt({ max: 10, scale: 1.02 })

  const handleClick = () => {
    console.log('event_click', { slug: event.slug })
    // TODO: trackEvent('event_click', { slug: event.slug })
  }

  return (
    <Link
      href={`/afisha/${event.slug}`}
      ref={ref}
      style={style}
      className="block group touch-manipulation"
      onClick={handleClick}
    >
      <div className="glass-card h-full overflow-hidden transition-all duration-300">
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {!imageError ? (
            <Image
              src={event.poster}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-accent-purple/20 flex items-center justify-center">
              <span className="text-white/60 text-sm px-4 text-center">
                Изображение недоступно
              </span>
            </div>
          )}

          {/* Featured badge */}
          {event.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-full">
              Рекомендуем
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-sm text-brand-red mb-2">{event.city}</div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
            {event.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{new Date(event.date).toLocaleDateString('ru-RU')}</span>
            <span className="text-brand-red">{event.venue}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
```

---

## ✅ ТЕСТИРОВАНИЕ ОШИБОК

### Тест 1: Невалидный JSON

```bash
# Временно сломай events.json - убери запятую
npm run dev
# Должна показать ошибка валидации в консоли, но сайт не должен упасть
```

### Тест 2: Несуществующий slug

```bash
# Открой в браузере
http://localhost:3000/afisha/nonexistent-event
# Должна показаться custom 404 страница
```

### Тест 3: Битое изображение

```bash
# Временно измени путь к изображению в events.json
# Должен показаться placeholder
```

---

## 📋 ЧЕК-ЛИСТ

- [ ] Создан `lib/content-validation.ts`
- [ ] Обновлён `lib/content.ts` с валидацией
- [ ] Создан `app/global-error.tsx`
- [ ] Обновлён `app/error.tsx`
- [ ] Созданы not-found страницы для всех разделов
- [ ] Обновлены карточки с обработкой ошибок изображений
- [ ] Протестирована валидация JSON
- [ ] Протестированы 404 страницы
- [ ] Протестирована обработка ошибок изображений

---

**Следующий шаг:** `docs/04-LEGAL-COMPLIANCE.md` (критично!)
