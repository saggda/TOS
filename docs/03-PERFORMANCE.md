# ⚡ ПРОИЗВОДИТЕЛЬНОСТЬ

**Время:** 3 часа
**Сложность:** Средне
**Приоритет:** 🟡 ВЫСОКИЙ

Производительность критична для мобильных пользователей и SEO.

---

## 1️⃣ ОПТИМИЗАЦИЯ CUSTOM CURSOR (45 минут)

### Проблема:
Обновляется на каждом движении мыши, вызывает 60-120 ререндеров/сек

### Файл: `components/ui/CustomCursor.tsx`

**Замени на оптимизированную версию:**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const rafIdRef = useRef<number>(0)

  // Проверка prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (prefersReducedMotion || isTouchDevice) {
      return // Не рендерим курсор
    }

    setIsVisible(true)

    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let followerX = 0
    let followerY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Throttled animation loop (30 FPS вместо 60+)
    const animate = () => {
      // Smooth cursor (быстрее)
      const cursorSpeed = 0.9
      cursorX += (mouseX - cursorX) * cursorSpeed
      cursorY += (mouseY - cursorY) * cursorSpeed

      // Smooth follower (медленнее)
      const followerSpeed = 0.15
      followerX += (mouseX - followerX) * followerSpeed
      followerY += (mouseY - followerY) * followerSpeed

      // Применяем трансформацию напрямую (без React state!)
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`

      rafIdRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden lg:block">
      {/* Основной курсор */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-brand-red rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Эффект следования */}
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-brand-red rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}
```

**Что изменилось:**
- ✅ Используется `requestAnimationFrame` с throttling
- ✅ Прямая манипуляция DOM вместо React state
- ✅ Проверка `prefers-reduced-motion`
- ✅ Проверка touch устройств
- ✅ Passive event listeners

---

## 2️⃣ ЗАМЕНИТЬ FRAMER MOTION НА CSS (1.5 часа)

### Проблема:
Framer Motion весит 5.3MB, используется для простых анимаций

### Шаг 1: Добавь CSS анимации в `app/globals.css`

```css
/* Fade in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide in from left */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Slide in from right */
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale in */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Staggered animation для списков */
@keyframes stagger-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Utility classes */
.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-slide-left {
  animation: slide-in-left 0.6s ease-out forwards;
}

.animate-slide-right {
  animation: slide-in-right 0.6s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.5s ease-out forwards;
}

/* Stagger delays */
.animate-delay-100 { animation-delay: 100ms; }
.animate-delay-200 { animation-delay: 200ms; }
.animate-delay-300 { animation-delay: 300ms; }
.animate-delay-400 { animation-delay: 400ms; }
.animate-delay-500 { animation-delay: 500ms; }

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Шаг 2: Обнови компоненты для использования CSS анимаций

**Пример для `app/page.tsx`:**

**Было (с Framer Motion):**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <h1>Привет</h1>
</motion.div>
```

**Стало (с CSS):**
```typescript
<div className="animate-fade-in">
  <h1>Привет</h1>
</div>
```

### Шаг 3: Удали Framer Motion (опционально, если нигде не используется)

```bash
npm uninstall framer-motion
```

**Важно:** Если используете сложные жесты (drag, pinch), оставь Framer Motion только для этих компонентов.

---

## 3️⃣ ИЗОБРАЖЕНИЯ - AVIF/WEBP (30 минут)

### Проблема:
SVG используются для фото, нет современных форматов

### Обнови `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'promoteam.ru',
    },
  ],
  formats: ['image/avif', 'image/webp'], // Современные форматы
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

### Обнови карточки для приоритетных изображений:

```typescript
<Image
  src={event.poster}
  alt={event.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={index < 3} // Первые 3 изображения приоритетные
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2EwZjFjIi8+PC9zdmc+"
/>
```

---

## 4️⃣ LOADING SKELETONS (30 минут)

### Файл: Создай `components/skeletons/EventCardSkeleton.tsx`

```typescript
export function EventCardSkeleton() {
  return (
    <div className="glass-card h-full overflow-hidden">
      {/* Image placeholder */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-800 rounded animate-pulse w-1/3" />
        <div className="h-6 bg-gray-800 rounded animate-pulse w-full" />
        <div className="h-6 bg-gray-800 rounded animate-pulse w-2/3" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-800 rounded animate-pulse w-1/4" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </div>
  )
}
```

### Используй в `app/afisha/page.tsx`:

```typescript
import { EventCardSkeleton } from '@/components/skeletons/EventCardSkeleton'

export default async function AfishaPage() {
  const events = await getEvents()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <div
          key={event.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <EventCard event={event} />
        </div>
      ))}
    </div>
  )
}
```

---

## 5️⃣ LAZY LOADING И CODE SPLITTING (автоматически в Next.js)

Next.js автоматически делает code splitting, но можно улучшить:

### Динамический импорт тяжёлых компонентов:

```typescript
// Вместо обычного импорта
import { HeavyComponent } from './HeavyComponent'

// Используй динамический
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Если не нужен SSR
})
```

---

## ✅ ИЗМЕРЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ

### Lighthouse в Chrome DevTools:

1. Открой Chrome DevTools
2. Перейди в Lighthouse tab
3. Выбери "Performance", "Accessibility", "Best Practices"
4. Нажми "Analyze page load"

**Целевые показатели:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

### Web Vitals:

```typescript
// _app.tsx или layout.tsx
export function reportWebVitals(metric: any) {
  console.log(metric)

  // Отправь в аналитику
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      event_label: metric.id,
      non_interaction: true,
    })
  }
}
```

---

## 📋 ЧЕК-ЛИСТ

- [ ] Optimized Custom Cursor
- [ ] Added CSS animations to globals.css
- [ ] Replaced Framer Motion with CSS (или уменьшил использование)
- [ ] Updated next.config.js with image formats
- [ ] Added priority to above-the-fold images
- [ ] Created loading skeletons
- [ ] Test with Lighthouse
- [ ] Performance score 90+
- [ ] Added reduced motion support

---

## 📊 ОЖИДАЕМЫЕ УЛУЧШЕНИЯ

До → После:

- **Lighthouse Performance:** 45 → 95
- **LCP (Largest Contentful Paint):** 3.5s → 1.2s
- **FCP (First Contentful Paint):** 1.8s → 0.8s
- **Bundle Size:** 850KB → 420KB
- **Mobile Performance:** 35 → 90

---

**Дополнительно:** `docs/06-ARCHITECTURE.md`
