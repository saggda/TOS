# 📊 АНАЛИТИКА И МОНИТОРИНГ

**Время:** 3 часа
**Сложность:** Средне
**Приоритет:** 🔴 КРИТИЧЕСКИЙ - летишь вслепую без аналитики!

---

## 1️⃣ GOOGLE ANALYTICS 4 (1.5 часа)

### Шаг 1: Получи GA4 ID

1. Перейди на https://analytics.google.com
2. Создай аккаунт (если нет)
3. Создай свойство GA4
4. Скопируй Measurement ID (формат: `G-XXXXXXXXXX`)

### Шаг 2: Создай `.env.local` (добавь)

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Шаг 3: Обнови `app/layout.tsx`

```typescript
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="ru">
      <head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied'
                });
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

---

## 2️⃣ СОЗДАТЬ СИСТЕМУ АНАЛИТИКИ (1 час)

### Файл: Создай `lib/analytics.ts`

```typescript
/**
 * Система аналитики для PROMO Team
 *
 * Отслеживает:
 * - Page views (автоматически через GA4)
 * - События на сайте
 * - Электронная торговля
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Проверка доступности GA
 */
export const isAnalyticsEnabled = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    GA_ID !== undefined &&
    GA_ID !== '' &&
    (window as any).gtag !== undefined
  )
}

/**
 * Page view (автоматически через GA4, но можно использовать вручную)
 */
export function pageView(url: string) {
  if (!isAnalyticsEnabled()) return

  ;(window as any).gtag('config', GA_ID, {
    page_path: url,
  })
}

/**
 * Отслеживание события
 */
export function trackEvent(
  action: string,
  parameters?: Record<string, any>
) {
  if (!isAnalyticsEnabled()) return

  ;(window as any).gtag('event', action, {
    ...parameters,
    custom_map: { custom_parameter_1: 'parameter_1' },
  })

  // Также логируем в development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${action}:`, parameters)
  }
}

// ===== SPECIFIC EVENTS =====

/**
 * Клик по мероприятию
 */
export function trackEventClick(eventSlug: string, eventTitle: string) {
  trackEvent('event_click', {
    event_slug: eventSlug,
    event_title: eventTitle,
    category: 'events',
  })
}

/**
 * Клик по билету
 */
export function trackTicketClick(
  eventSlug: string,
  eventTitle: string,
  ticketUrl: string
) {
  trackEvent('ticket_click', {
    event_slug: eventSlug,
    event_title: eventTitle,
    ticket_url: ticketUrl,
    category: 'events',
    link_url: ticketUrl,
  })
}

/**
 * Просмотр мероприятия
 */
export function trackEventView(eventSlug: string, eventTitle: string) {
  trackEvent('event_view', {
    event_slug: eventSlug,
    event_title: eventTitle,
    category: 'events',
  })
}

/**
 * Клик по товару
 */
export function trackProductClick(productSlug: string, productName: string) {
  trackEvent('product_click', {
    product_slug: productSlug,
    product_name: productName,
    category: 'shop',
  })
}

/**
 * Просмотр товара
 */
export function trackProductView(
  productSlug: string,
  productName: string,
  price: number
) {
  trackEvent('product_view', {
    product_slug: productSlug,
    product_name: productName,
    price: price,
    category: 'shop',
  })
}

/**
 * Начало оформления заказа
 */
export function trackOrderStart(
  productSlug: string,
  productName: string,
  size?: string,
  color?: string
) {
  trackEvent('order_start', {
    product_slug: productSlug,
    product_name: productName,
    size: size || 'N/A',
    color: color || 'N/A',
    category: 'shop',
  })
}

/**
 * Завершение заказа (клик на Telegram)
 */
export function trackOrderComplete(
  productSlug: string,
  productName: string,
  size: string,
  color: string,
  price: number
) {
  trackEvent('order_complete', {
    product_slug: productSlug,
    product_name: productName,
    size: size,
    color: color,
    price: price,
    category: 'shop',
    currency: 'RUB',
    value: price,
  })
}

/**
 * Клик по посту
 */
export function trackPostClick(postSlug: string, postTitle: string) {
  trackEvent('post_click', {
    post_slug: postSlug,
    post_title: postTitle,
    category: 'media',
  })
}

/**
 * Просмотр поста
 */
export function trackPostView(postSlug: string, postTitle: string) {
  trackEvent('post_view', {
    post_slug: postSlug,
    post_title: postTitle,
    category: 'media',
  })
}

/**
 * Переход в соцсети
 */
export function trackSocialClick(platform: 'telegram' | 'instagram', url: string) {
  trackEvent('social_click', {
    platform: platform,
    url: url,
    category: 'social',
  })
}

/**
 * Поиск (если добавишь поиск)
 */
export function trackSearch(query: string, resultsCount: number) {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    category: 'engagement',
  })
}

/**
 * Подписка на рассылку
 */
export function trackNewsletterSubscribe(method: 'form' | 'telegram') {
  trackEvent('newsletter_subscribe', {
    method: method,
    category: 'engagement',
  })
}

/**
 * Скачать файл
 */
export function trackFileDownload(fileName: string, fileType: string) {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    category: 'engagement',
  })
}

/**
 * Ошибка (для отслеживания проблем)
 */
export function trackError(
  errorType: string,
  errorMessage: string,
  errorContext?: Record<string, any>
) {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    ...errorContext,
    category: 'errors',
  })
}

/**
 * Scroll depth (как глубоко прокрутили)
 */
export function trackScrollDepth(depth: 25 | 50 | 75 | 90 | 100) {
  trackEvent('scroll_depth', {
    depth: depth,
    category: 'engagement',
  })
}

/**
 * Time on page (время на странице)
 */
export function trackTimeOnPage(seconds: number, page: string) {
  trackEvent('time_on_page', {
    seconds: seconds,
    page: page,
    category: 'engagement',
  })
}
```

---

## 3️⃣ ОБНОВИ КОМПОНЕНТЫ С АНАЛИТИКОЙ (30 минут)

### Обнови `components/cards/EventCard.tsx`:

```typescript
import { trackEventClick, trackTicketClick } from '@/lib/analytics'

export function EventCard({ event }: EventCardProps) {
  const handleClick = () => {
    // Замени console.log на analytics
    trackEventClick(event.slug, event.title)
  }

  return (
    <Link
      href={`/afisha/${event.slug}`}
      onClick={handleClick}
      // ... остальное
    >
      {/* ... */}
    </Link>
  )
}
```

### Обнови `app/afisha/[slug]/page.tsx`:

```typescript
import { trackEventView, trackTicketClick } from '@/lib/analytics'

// После загрузки события
useEffect(() => {
  trackEventView(event.slug, event.title)
}, [event.slug, event.title])

const handleTicketClick = () => {
  trackTicketClick(event.slug, event.title, event.ticketUrl)
  window.open(event.ticketUrl, '_blank', 'noopener,noreferrer')
}
```

### Обнови `app/shop/[slug]/page.tsx`:

```typescript
import { trackProductView, trackOrderComplete } from '@/lib/analytics'

useEffect(() => {
  trackProductView(product.slug, product.name, product.price)
}, [product.slug, product.name, product.price])

const handleOrderClick = () => {
  trackOrderComplete(
    product.slug,
    product.name,
    selectedSize,
    selectedColor,
    product.price
  )

  const message = `Хочу заказать: ${product.name}, размер ${selectedSize}, цвет ${selectedColor}`
  const telegramUrl = `https://t.me/?text=${encodeURIComponent(message)}`
  window.open(telegramUrl, '_blank', 'noopener,noreferrer')
}
```

---

## 4️⃣ УДАЛИ CONSOLE.LOG (5 минут)

### Файл: Создай `fixes/remove-console-logs.sh`

```bash
#!/bin/bash

# Удаляет console.log из production

# Находит все файлы с console.log
files=$(grep -r "console\.log" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" app/ components/ lib/ | cut -d: -f1 | sort -u)

echo "Найдены файлы с console.log:"
echo "$files"

# Предлагает удалить
echo ""
read -p "Удалить все console.log? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  # Удаляет console.log(, но оставляет console.error, console.warn
  find app/ components/ lib/ -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec sed -i '' '/console\.log(/d' {} \;

  echo "✅ console.log удалены"
  echo "⚠️ console.error и console.warn сохранены"
else
  echo "Пропущено"
fi
```

---

## 5️⃣ SENTRY ДЛЯ ОШИБОК (опционально, 30 минут)

### Установка:

```bash
npm install @sentry/nextjs
```

### Запуск Wizard:

```bash
npx @sentry/wizard@latest -i nextjs
```

### Или вручную:

#### `sentry.client.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Фильтруем ошибки в development
  beforeSend(event, hint) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry:', event, hint)
      return null // Не отправлять в development
    }
    return event
  },

  // Tracing
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Replays
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

#### Добавь в `.env`:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

---

## ✅ ПРОВЕРКА

```bash
# 1. Добавь GA_ID в .env.local
echo "NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX" >> .env.local

# 2. Собери проект
npm run build

# 3. Запусти
npm run dev

# 4. Открой в браузере с DevTools:
# - Network → должны быть запросы к google-analytics.com
# - Console → не должно быть console.log (в production)
# - Application → Local Storage → cookie-consent должно быть

# 5. Кликни по мероприятию → в Console должен появиться лог [Analytics]

# 6. Проверь GA4 Real-time отчете → должен быть активный пользователь
```

---

## 📋 ЧЕК-ЛИСТ

- [ ] Создан аккаунт GA4
- [ ] Добавлен NEXT_PUBLIC_GA_ID в .env
- [ ] Обновлён app/layout.tsx с GA скриптом
- [ ] Создан lib/analytics.ts
- [ ] Обновлены все карточки с трекингом
- [ ] Обновлены страницы деталей с трекингом
- [ ] Удалены console.log
- [ ] Настроен Sentry (опционально)
- [ ] Проверена работа в DevTools
- [ ] Проверен GA4 Real-time отчет

---

## 📈 ЧТО ОТПРАВЛЯЕТСЯ В АНАЛИТИКУ

### User Journey:
1. `event_view` - пользователь открыл мероприятие
2. `ticket_click` - пользователь кликнул "Купить билет"
3. Можно рассчитать конверсию: ticket_click / event_view

### Shop Journey:
1. `product_view` - просмотр товара
2. `order_start` - выбор размера/цвета
3. `order_complete` - клик на "Заказать в Telegram"
4. Конверсия: order_complete / product_view

### Engagement:
- `scroll_depth` - на сколько прокрутили страницу
- `time_on_page` - сколько времени провели
- `social_click` - переходы в соцсети

---

**Следующий шаг:** `docs/03-PERFORMANCE.md`
