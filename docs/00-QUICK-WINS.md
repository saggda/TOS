# ⚡ БЫСТРЫЕ ПОБЕДЫ (1 ЧАС)

**Время:** 1 час
**Сложность:** Легко
**Влияние:** Высокое

Эти исправления можно сделать за 1 час, и они значительно улучшат проект.

---

## 1️⃣ ОБНОВИТЬ NEXT.JUS (5 минут)

### Проблема:
Next.js v14.2.35 имеет 2 уязвимости безопасности (DoS атаки)

### Файл: `package.json:17`

### Решение:

```bash
# В терминале
npm install next@15.5.10

# Или последнюю версию
npm install next@latest
```

### Проверка:
```bash
npm run build
npm run dev
# Проверь что сайт работает
```

---

## 2️⃣ ЗАФИКСИРОВАТЬ NEXT.CONFIG.JS (10 минут)

### Проблема:
`hostname: '**'` позволяет загружать изображения с ЛЮБОГО домена

### Файл: `next.config.js:3-10`

### Решение:

**Было:**
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**', // ОПАСНО!
    },
  ],
}
```

**Стало:**
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'promoteam.ru', // Твой домен
    },
    {
      protocol: 'https',
      hostname: '**.kassir.ru', // Если используешь Kassir
    },
    {
      protocol: 'https',
      hostname: '**.cdninstagram.com', // Если нужны Instagram фото
    },
  ],
  // Добавь лимиты
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60,
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### Проверка:
```bash
npm run build
# Должно собраться без ошибок
```

---

## 3️⃣ УБРАТЬ ФЕЙКОВУЮ ЗАДЕРЖКУ ЗАГРУЗКИ (5 минут)

### Проблема:
Искусственная задержка 2.5 секунды в loading screen

### Файл: `components/LoadingScreen.tsx:22-25`

### Решение:

**Было:**
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false)
  }, 2500) // Фейковая задержка!
}, [])
```

**Стало:**
```typescript
useEffect(() => {
  // Загружаем когда контент готов
  const checkReady = () => {
    if (document.readyState === 'complete') {
      setIsLoading(false)
    }
  }

  window.addEventListener('load', checkReady)

  // Fallback: максимум 1 секунда
  const fallback = setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  return () => {
    window.removeEventListener('load', checkReady)
    clearTimeout(fallback)
  }
}, [])
```

---

## 4️⃣ ДОБАВИТЬ REL="NOOPENER" НА ВНЕШНИЕ ССЫЛКИ (15 минут)

### Проблема:
Внешние ссылки без защиты от tabnabbing

### Файл: `app/page.tsx:196,199`

### Решение:

**Было:**
```typescript
<Button
  size="lg"
  className="bg-white text-brand-red hover:bg-white/90"
  href="https://t.me/"
  target="_blank"
>
  Telegram канал
</Button>
```

**Стало:**
```typescript
<Button
  size="lg"
  className="bg-white text-brand-red hover:bg-white/90"
  href="https://t.me/"
  target="_blank"
  rel="noopener noreferrer" // ← Добавь это
>
  Telegram канал
</Button>

<Button
  size="lg"
  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
  href="https://instagram.com/"
  target="_blank"
  rel="noopener noreferrer" // ← И это
>
  Instagram
</Button>
```

### Файл: `components/ui/Button.tsx:51-78`

**Добавь автоматическую защиту:**

```typescript
if (href) {
  // Авто-добавляем security для внешних ссылок
  const isExternal = href.startsWith('http')
  const secureTarget = target || (isExternal ? '_blank' : undefined)
  const secureRel = rel || (isExternal && secureTarget === '_blank' ? 'noopener noreferrer' : undefined)

  return (
    <a
      href={href}
      target={secureTarget}
      rel={secureRel}
      ref={ref as any}
      className="inline-flex"
    >
      {buttonContent}
    </a>
  )
}
```

---

## 5️⃣ СОЗДАТЬ БАЗОВЫЙ ERROR.TSX (10 минут)

### Проблема:
Нет обработки ошибок - белый экран при любой проблеме

### Файл: Создай `app/error.tsx`

### Решение:

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
    // Логируем ошибку
    console.error('Error:', error)
    // TODO: Отправлять в Sentry/сервис ошибок
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-dark to-black">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Что-то пошло не так!
        </h2>
        <p className="text-gray-400 mb-8">
          Приносим извинения за неудобства. Попробуйте снова.
        </p>
        <div className="flex gap-4 justify-center">
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
              Детали ошибки (только для разработки)
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

## 6️⃣ СОЗДАТЬ БАЗОВЫЙ NOT-FOUND.TSX (10 минут)

### Проблема:
Стандартная страница 404, теряем пользователей

### Файл: Создай `app/not-found.tsx`

### Решение:

```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-dark to-black">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-brand-red mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">
          Страница не найдена
        </h2>
        <p className="text-gray-400 mb-8">
          Событие или товар, который вы ищете, не существует или был удалён.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-dark transition-colors text-center"
          >
            На главную
          </Link>
          <Link
            href="/afisha"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-center"
          >
            Афиша мероприятий
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-center"
          >
            Магазин
          </Link>
        </div>
      </div>
    </div>
  )
}
```

---

## 7️⃣ ДОБАВИТЬ IMAGE ERROR HANDLING (5 минут)

### Проблема:
Нет обработки ошибок загрузки изображений

### Файлы:
- `components/cards/EventCard.tsx`
- `components/cards/ProductCard.tsx`
- `components/cards/PostCard.tsx`

### Решение (для EventCard, аналогично для других):

**Добавь в компонент:**
```typescript
import { useState } from 'react'

// Внутри компонента
const [imageError, setImageError] = useState(false)

// В Image компоненте
<Image
  src={event.poster}
  alt={event.title}
  fill
  className="object-cover"
  onError={() => setImageError(true)}
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2EwZjFjIi8+PC9zdmc+"
/>

{imageError && (
  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-accent-purple/20 flex items-center justify-center">
    <span className="text-white/60 text-sm">Изображение недоступно</span>
  </div>
)}
```

---

## ✅ ПРОВЕРКА ПОСЛЕ ВСЕХ ИЗМЕНЕНИЙ

```bash
# 1. Собрать проект
npm run build

# 2. Если нет ошибок, запустить
npm run dev

# 3. Проверить:
# - Главная страница открывается
# - Переходы по разделам работают
# - Изображения загружаются
# - Нет ошибок в консоли браузера
```

---

## 🎉 ЧТО МЫ ПОЛУЧИЛИ ЗА 1 ЧАС:

✅ Обновили Next.js (безопасность)
✅ Зафиксировали image config (безопасность)
✅ Убрали фейковую задержку (производительность +50%)
✅ Добавили защиту на внешние ссылки (безопасность)
✅ Создали error page (UX)
✅ Создали 404 page (UX)
✅ Добавили обработку ошибок изображений (UX)

**Следующий шаг:** `docs/01-CRITICAL-SECURITY.md`
