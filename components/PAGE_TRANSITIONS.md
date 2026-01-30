# Page Transitions Documentation

## Overview
Плавные переходы между страницами с индикатором прогресса и анимациями появления контента.

## Components

### 1. ProgressBar
**Location:** `/components/ProgressBar.tsx`

Премиум прогресс-бар, который появляется в верхней части страницы при навигации.

**Features:**
- Градиентный фон (purple -> pink)
- Shimmer анимация для премиум эффекта
- Z-index 9999 (всегда сверху)
- Автоматическое скрытие после загрузки
- Отслеживает изменения pathname и searchParams

**Usage:**
Автоматически добавлен в `app/layout.tsx`, работает без дополнительной настройки.

### 2. PageTransition
**Location:** `/components/PageTransition.tsx`

Основной компонент для анимации переходов между страницами.

**Features:**
- Fade + Slide эффекты
- Scale для динамики
- Duration: 400ms
- AnimatePresence mode="wait"

**Usage:**
```tsx
import { PageTransition } from '@/components/PageTransition'

export default function Layout({ children }) {
  return (
    <main>
      <PageTransition>{children}</PageTransition>
    </main>
  )
}
```

### 3. FadeIn
**Location:** `/components/PageTransition.tsx`

Вспомогательный компонент для плавного появления секций.

**Props:**
- `children`: React.ReactNode
- `delay?: number` - задержка перед анимацией (по умолчанию 0)
- `className?: string` - дополнительные CSS классы

**Usage:**
```tsx
import { FadeIn } from '@/components/PageTransition'

export function Hero() {
  return (
    <FadeIn delay={0.2}>
      <h1>Welcome</h1>
    </FadeIn>
  )
}
```

### 4. StaggerChildren
**Location:** `/components/PageTransition.tsx`

Компонент для последовательного появления дочерних элементов.

**Props:**
- `children`: React.ReactNode
- `className?: string` - дополнительные CSS классы

**Usage:**
```tsx
import { StaggerChildren } from '@/components/PageTransition'

export function FeaturesList() {
  return (
    <StaggerChildren>
      <FeatureCard />
      <FeatureCard />
      <FeatureCard />
    </StaggerChildren>
  )
}
```

## Styling

### Shimmer Animation
Добавлена в `app/globals.css`:

```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
```

## Integration

### Root Layout
**File:** `/app/layout.tsx`

```tsx
import { ProgressBar } from '@/components/ProgressBar'
import { PageTransition } from '@/components/PageTransition'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ProgressBar />
        <LoadingScreen />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

## Technical Details

### Dependencies
- `framer-motion` - анимации (уже установлен)
- Next.js App Router hooks:
  - `usePathname` - отслеживание текущего маршрута
  - `useSearchParams` - отслеживание параметров поиска

### Animation Timing
- PageTransition: 400ms
- FadeIn: 600ms + optional delay
- StaggerChildren: 100ms per child
- ProgressBar: 500ms total

### Performance
- Анимации используют GPU-accelerated свойства (opacity, transform, scale)
- AnimatePresence с mode="wait" предотвращает наложение страниц
- ProgressBar автоматически скрывается для экономии ресурсов

## Browser Support
Все современные браузеры, поддерживающие CSS animations и Framer Motion.

## Examples

### Анимация карточек
```tsx
import { FadeIn } from '@/components/PageTransition'

export function Card({ title, description }) {
  return (
    <FadeIn delay={0.1} className="glass-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </FadeIn>
  )
}
```

### Секция с последовательным появлением
```tsx
import { StaggerChildren } from '@/components/PageTransition'

export function TeamSection() {
  return (
    <section>
      <StaggerChildren className="grid grid-cols-3">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} {...member} />
        ))}
      </StaggerChildren>
    </section>
  )
}
```

## Future Enhancements
Можно добавить:
- Кастомные easing функции через const assertion
- Разные типы переходов (slide from left/right, zoom, flip)
- Анимации при скролле
- Page-specific transitions
