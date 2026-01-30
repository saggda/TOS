# 🏗️ АРХИТЕКТУРНЫЕ ПРОБЛЕМЫ

**Время:** 15 часов
**Сложность:** Выше среднего
**Приоритет:** 🟡 ВЫСОКИЙ (но не критично для запуска)

Это улучшения для масштабирования и поддержки кода.

---

## 1️⃣ МАРШРУТИЗАЦИЯ НА CMS (5 часов)

### Проблема:
JSON контент невозможно масштабировать, нет_draft режима

### Решение: Headless CMS

#### Вариант 1: Sanity.io (рекомендуется)

**Преимущества:**
- ✅ Бесплатный щедрый tier
- ✅ Отличный для events/products
- ✅ Real-time collaboration
- ✅ Встроенная image optimization
- ✅ Гибкая структура

**Установка:**

```bash
npm install @sanity/client next-sanity
```

**Конфигурация `lib/sanity.ts`:**

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getEvents() {
  return await client.fetch(`
    *[_type == "event" && date >= now()] | order(date asc) {
      _id,
      slug,
      title,
      date,
      city,
      venue,
      "poster": poster.asset->url,
      description,
      ticketUrl,
      featured
    }
  `)
}
```

**Схемы:**

```typescript
// sanity/schemas/event.ts
export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', validation: Rule => Rule.required() },
    { name: 'date', type: 'datetime', validation: Rule => Rule.required() },
    { name: 'city', type: 'string', validation: Rule => Rule.required() },
    { name: 'venue', type: 'string', validation: Rule => Rule.required() },
    {
      name: 'poster',
      type: 'image',
      validation: Rule => Rule.required(),
    },
    { name: 'description', type: 'text', validation: Rule => Rule.required() },
    { name: 'ticketUrl', type: 'url', validation: Rule => Rule.required() },
    { name: 'featured', type: 'boolean' },
  ],
}
```

#### Вариант 2: Directus (self-hosted)

**Преимущества:**
- ✅ Полный контроль (self-hosted)
- ✅ Открытый исходный код
- ✅ Встроенный Auth & Permissions
- ✅ Отличный UI

#### Вариант 3: Не менять JSON пока

Если CMS не подходит, добавь draft режим в JSON:

```json
{
  "id": "10",
  "slug": "upcoming-event",
  "draft": true,
  "title": "Секретное мероприятие",
  ...
}
```

Обнови `lib/content.ts`:

```typescript
export async function getEvents(includeDraft = false): Promise<Event[]> {
  const events = await import('@/content/events.json')
  return events.default
    .filter((event: any) => includeDraft || !event.draft)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
```

---

## 2️⃣ SERVER COMPONENTS ВМЕСТО CLIENT (3 часа)

### Проблема:
Смешанные patterns, некоторые listing pages используют useEffect

### Обнови `app/shop/page.tsx`:

**Было (Client Component):**
```typescript
'use client'

import { useState, useEffect } from 'react'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>
  return <ProductGrid products={products} />
}
```

**Стало (Server Component):**
```typescript
import { getProducts } from '@/lib/content'
import { ProductGrid } from '@/components/shop/ProductGrid'

export default async function ShopPage() {
  const products = await getProducts()

  return <ProductGrid products={products} />
}
```

### Создай отдельный Client компонент для интерактивности:

```typescript
// components/shop/ShopFilters.tsx
'use client'

import { useState } from 'react'

export function ShopFilters({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>('all')

  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category)

  return (
    <>
      <div className="flex gap-4 mb-8">
        <button onClick={() => setCategory('all')}>Все</button>
        <button onClick={() => setCategory('hoodies')}>Худи</button>
        <button onClick={() => setCategory('tshirts')}>Футболки</button>
      </div>
      <ProductGrid products={filtered} />
    </>
  )
}
```

---

## 3️⃣ МЕМОИЗАЦИЯ КОМПОНЕНТОВ (2 часа)

### Проблема:
Карточки ререндерятся при каждом изменении фильтров

### Обнови карточки:

```typescript
import { memo } from 'react'
import { useRouter } from 'next/navigation'

interface EventCardProps {
  event: Event
}

export const EventCard = memo(({ event }: EventCardProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/afisha/${event.slug}`)
  }

  return (
    // ... компонент
  )
}, (prevProps, nextProps) => {
  // Re-render только если ID изменился
  return prevProps.event.id === nextProps.event.id
})

EventCard.displayName = 'EventCard'
```

---

## 4️⃣ ЦЕНТРАЛИЗОВАННАЯ КОНФИГУРАЦИЯ (1 час)

### Проблема:
Навигация и ссылки захардкожены в компонентах

### Создай `lib/config.ts`:

```typescript
export const siteConfig = {
  name: 'PROMO Team',
  description: 'Организуем незабываемые мероприятия',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Навигация
  navigation: {
    main: [
      { href: '/afisha', label: 'Афиша', order: 1 },
      { href: '/shop', label: 'Магазин', order: 2 },
      { href: '/media', label: 'Медиа', order: 3 },
      { href: '/about', label: 'О нас', order: 4 },
    ],
  },

  // Социальные сети
  social: {
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/',
  },

  // Категории товаров
  productCategories: [
    { value: 'hoodies', label: 'Худи' },
    { value: 'tshirts', label: 'Футболки' },
    { value: 'caps', label: 'Кепки' },
    { value: 'accessories', label: 'Аксессуары' },
  ],

  // Города для мероприятий
  cities: [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'warsaw', label: 'Варшава' },
    { value: 'kazan', label: 'Казань' },
    { value: 'sochi', label: 'Сочи' },
  ],
}
```

### Используй в компонентах:

```typescript
import { siteConfig } from '@/lib/config'

export function Header() {
  return (
    <nav>
      {siteConfig.navigation.main.map(link => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
```

---

## 5️⃣ УБРАТЬ ДУБЛИРОВАНИЕ КОДА (2 часа)

### Проблема:
Одинаковый код трекинга во всех карточках

### Создай хук `useCardTracking.ts`:

```typescript
import { useCallback } from 'react'
import { trackEventClick, trackProductClick, trackPostClick } from '@/lib/analytics'

export function useCardTracking(type: 'event' | 'product' | 'post') {
  const handleClick = useCallback((slug: string, title: string) => {
    switch (type) {
      case 'event':
        trackEventClick(slug, title)
        break
      case 'product':
        trackProductClick(slug, title)
        break
      case 'post':
        trackPostClick(slug, title)
        break
    }
  }, [type])

  return handleClick
}
```

### Используй в карточках:

```typescript
import { useCardTracking } from '@/hooks/useCardTracking'

export function EventCard({ event }: EventCardProps) {
  const trackClick = useCardTracking('event')

  return (
    <Link
      href={`/afisha/${event.slug}`}
      onClick={() => trackClick(event.slug, event.title)}
    >
      {/* ... */}
    </Link>
  )
}
```

---

## 6️⃣ ДОБАВИТЬ ПАГИНАЦИЮ (2 часа)

### Создай `lib/pagination.ts`:

```typescript
export interface PaginationParams {
  page: number
  limit: number
  total: number
}

export interface PaginatedResult<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function paginate<T>(
  items: T[],
  params: PaginationParams
): PaginatedResult<T> {
  const { page, limit, total } = params
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const end = start + limit

  return {
    items: items.slice(start, end),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}
```

### Используй в `app/afisha/page.tsx`:

```typescript
export default async function AfishaPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const allEvents = await getEvents()

  const { items: events, pagination } = paginate(allEvents, {
    page,
    limit,
    total: allEvents.length,
  })

  return (
    <>
      <EventGrid events={events} />
      <Pagination pagination={pagination} basePath="/afisha" />
    </>
  )
}
```

---

## ✅ ПЛАН МИГРАЦИИ НА CMS

### Фаза 1: Подготовка (1 час)
- [ ] Выбрать CMS (Sanity/Directus)
- [ ] Создать аккаунт/проект
- [ ] Установить зависимости

### Фаза 2: Схемы данных (2 часа)
- [ ] Создать схемы для Events
- [ ] Создать схемы для Products
- [ ] Создать схемы для Posts
- [ ] Настроить relationships

### Фаза 3: Миграция данных (2 часа)
- [ ] Экспортировать из JSON
- [ ] Импортировать в CMS
- [ ] Проверить данные

### Фаза 4: Обновление кода (3 часа)
- [ ] Обновить content.ts
- [ ] Обновить типы
- [ ] Тестирование

### Фаза 5: Деплой (1 час)
- [ ] Настроить environment variables
- [ ] Деплой в production
- [ ] Финальное тестирование

---

## 📋 ЧЕК-ЛИСТ

- [ ] Выбрана и настроена CMS (или добавлен draft режим)
- [ ] Обновлены на Server Components
- [ ] Добавлена мемоизация компонентов
- [ ] Создана централизованная конфигурация
- [ ] Убрано дублирование кода
- [ ] Добавлена пагинация
- [ ] Созданы reusable hooks
- [ ] Протестирована производительность

---

## 🎯 ЧТО ДАДИТ ЭТИ УЛУЧШЕНИЯ

**До:** После:

- **Время добавления контента:** 30 мин (редактировать JSON) → 5 мин (CMS UI)
- **Риск ошибок контента:** Высокий → Минимальный
- **Поддержка кода:** Сложно → Легко
- **Масштабируемость:** До ~50 items → Неограниченно
- **Collaboration:** Только разработчики → Контент-менеджеры

---

**Финальная проверка:** `docs/07-CHECKLIST.md`
