# 🔒 КРИТИЧЕСКИЕ ПРОБЛЕМЫ БЕЗОПАСНОСТИ

**Время:** 2 часа
**Сложность:** Средне
**Приоритет:** 🔴 КРИТИЧЕСКИЙ

---

## 1️⃣ ДОБАВИТЬ SECURITY HEADERS (30 минут)

### Проблема:
Нет security headers - сайт уязвим к атакам

### Файл: Создай `middleware.ts` в корне проекта

### Решение:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "img-src 'self' data: https: blob:",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "connect-src 'self' https://t.me https://instagram.com https://www.google-analytics.com",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
    ].join('; ')
  )

  return response
}

export const config = {
  matcher: '/:path*',
}
```

### Проверка:
```bash
npm run build
npm run dev

# В DevTools браузера → Network → Headers → Проверь наличие headers
```

---

## 2️⃣ ВАЛИДАЦИЯ SLUG ПАРАМЕТРОВ (45 минут)

### Проблема:
Slug параметры не валидируются, возможны инъекции

### Файлы:
- `app/afisha/[slug]/page.tsx`
- `app/shop/[slug]/page.tsx`
- `app/media/[slug]/page.tsx`

### Шаг 1: Создай `lib/validation.ts`

```typescript
import { z } from 'zod'

// Slug валидация
export const slugSchema = z.string()
  .min(1, 'Slug не может быть пустым')
  .max(100, 'Slug слишком длинный')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Неверный формат slug')
  .transform(val => val.toLowerCase())

export function validateSlug(slug: string): string {
  try {
    return slugSchema.parse(slug)
  } catch (error) {
    console.error('Invalid slug:', slug)
    throw new Error('Неверный формат идентификатора')
  }
}

// Валидация URL
export const urlSchema = z.string().url('Неверный формат URL')

export function validateUrl(url: string): string {
  try {
    return urlSchema.parse(url)
  } catch (error) {
    console.error('Invalid URL:', url)
    throw new Error('Неверный формат ссылки')
  }
}
```

### Шаг 2: Обнови `package.json`

```bash
npm install zod
```

### Шаг 3: Примени в `app/afisha/[slug]/page.tsx`

**Было:**
```typescript
export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug)
  // ...
}
```

**Стало:**
```typescript
import { validateSlug } from '@/lib/validation'

export default async function EventPage({ params }: { params: { slug: string } }) {
  // Валидируем slug
  const validatedSlug = validateSlug(params.slug)
  const event = await getEventBySlug(validatedSlug)

  if (!event) {
    notFound()
  }

  // ... остальной код
}
```

### Шаг 4: То же самое для `shop/[slug]/page.tsx` и `media/[slug]/page.tsx`

---

## 3️⃣ SANITIZATION КОНТЕНТА (30 минут)

### Проблема:
Контент из JSON не санитизируется

### Файл: Создай `lib/content-sanitizer.ts`

```typescript
import DOMPurify from 'isomorphic-dompurify'

/**
 * Санитизация текстового контента
 */
export function sanitizeText(text: string): string {
  if (typeof text !== 'string') return ''
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] })
}

/**
 * Санитизация HTML (если понадобится)
 */
export function sanitizeHTML(html: string): string {
  if (typeof html !== 'string') return ''
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  })
}

/**
 * Санитизация объекта продукта/события
 */
export function sanitizeContent<T extends Record<string, any>>(content: T): T {
  const sanitized = { ...content }

  // Санитизируем все строковые поля
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      // Если это URL - не санитизируем, иначе валидируем
      if (key.includes('url') || key.includes('href') || key.includes('link')) {
        continue
      }
      sanitized[key] = sanitizeText(sanitized[key])
    }
  }

  return sanitized
}
```

### Установи зависимость:

```bash
npm install isomorphic-dompurify
```

### Обнови `lib/content.ts`:

```typescript
import { sanitizeContent } from './content-sanitizer'

// В каждой функции загрузки данных
export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await getEvents()
  const event = events.find(e => e.slug === slug)

  if (event) {
    // Санитизируем перед возвратом
    return sanitizeContent(event)
  }

  return undefined
}

// То же самое для getProductBySlug и getPostBySlug
```

---

## 4️⃣ ЗАЩИТА ОТ XSS В TELEGRAM ССЫЛКАХ (15 минут)

### Проблема:
Данные из JSON напрямую попадают в URL

### Файл: `app/shop/[slug]/page.tsx:38-40`

### Решение:

**Было:**
```typescript
const handleOrderClick = () => {
  const message = `Хочу заказать: ${product.name}, размер ${selectedSize}, цвет ${selectedColor}`
  const telegramUrl = `https://t.me/?text=${encodeURIComponent(message)}`
  window.open(telegramUrl, '_blank')
}
```

**Стало:**
```typescript
import { sanitizeText } from '@/lib/content-sanitizer'

const handleOrderClick = () => {
  // Санитизируем данные
  const safeName = sanitizeText(product.name)
  const safeSize = sanitizeText(selectedSize)
  const safeColor = sanitizeText(selectedColor)

  const message = `Хочу заказать: ${safeName}, размер ${safeSize}, цвет ${safeColor}`
  const telegramUrl = `https://t.me/?text=${encodeURIComponent(message)}`

  // Открываем с защитой
  window.open(telegramUrl, '_blank', 'noopener,noreferrer')
}
```

---

## 5️⃣ ENVIRONMENT VARIABLES (15 минут)

### Проблема:
URL'ы и конфигурация захардкожены

### Файл: Создай `.env.local` (не коммитить в git!)

```bash
# Сайт
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Социальные сети
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/YOUR_USERNAME
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/YOUR_USERNAME

# Аналитика (пока не установлена)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SENTRY_DSN=

# Продакшен overrides в .env.production
```

### Файл: Создай `.env.production`

```bash
# Сайт
NEXT_PUBLIC_SITE_URL=https://promoteam.ru

# Социальные сети (реальные URL'ы)
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/promoteam
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/promoteam

# Аналитика
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Обнови `.gitignore` (добавь если нет):

```gitignore
# Environment variables
.env*.local
.env.production
```

### Создай `lib/config.ts`:

```typescript
export const siteConfig = {
  name: 'PROMO Team',
  title: 'PROMO Team - Event Promo Team',
  description: 'Организируем незабываемые мероприятия и продаём мерч',

  // URLs из env
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Социальные сети
  social: {
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/',
  },

  // Metadata
  ogImage: '/og-image.jpg',
  author: 'PROMO Team',
}
```

### Обнови `lib/metadata.ts`:

```typescript
import { siteConfig } from './config'

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
  ogImage: siteConfig.ogImage,
  social: siteConfig.social,
  // ... остальное
}
```

---

## ✅ ПРОВЕРКА

```bash
# 1. Проверь что .env в .gitignore
cat .gitignore | grep env

# 2. Создай .env.local
cp .env.example .env.local  # Если создашь example

# 3. Собери проект
npm run build

# 4. Проверь в DevTools:
# - Network → Headers → должны быть security headers
# - Попробуй ввести невалидный slug - должна быть ошибка
```

---

## 📋 ЧЕК-ЛИСТ ДЛЯ ЭТОГО ЭТАПА:

- [ ] Создан `middleware.ts` с security headers
- [ ] Установлен `zod`
- [ ] Создан `lib/validation.ts`
- [ ] Добавлена валидация slug во все [slug] страницы
- [ ] Установлен `isomorphic-dompurify`
- [ ] Создан `lib/content-sanitizer.ts`
- [] Добавлена санитизация в `lib/content.ts`
- [ ] Созданы `.env.local` и `.env.production`
- [ ] Создан `lib/config.ts`
- [ ] Обновлён `lib/metadata.ts`
- [ ] Проверены security headers в браузере

---

**Следующий шаг:** `docs/02-ERROR-HANDLING.md`
