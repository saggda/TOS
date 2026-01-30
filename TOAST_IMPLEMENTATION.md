# Toast Notification System Implementation

## Overview
A premium toast notification system with glassmorphism design has been successfully implemented for the PROMO Team website. The system includes smooth animations, auto-dismiss functionality, progress bars, and a beautiful glass-card styling that matches the site's design language.

## Features Implemented

### 1. Toast Component (`components/ui/Toast.tsx`)
- **Four toast variants**: success, error, warning, info
- **Premium glassmorphism design** with:
  - Semi-transparent white background (`bg-white/70`)
  - Backdrop blur effect (`backdrop-blur-xl`)
  - Gradient overlay for depth
  - Custom shadow matching site style
- **Icons** for each variant using lucide-react:
  - Success: CheckCircle (green)
  - Error: AlertCircle (red)
  - Warning: AlertTriangle (orange)
  - Info: Info (brand red)
- **Auto-dismiss** after configurable duration (default 5000ms)
- **Manual dismiss button** with hover effect
- **Progress bar** showing time remaining
- **Pause on hover** to allow users to read longer messages
- **Slide animations**:
  - Enter: slide-in from right (x: 400 → 0)
  - Exit: slide-out to right (x: 0 → 400)
  - Scale effect for smooth appearance

### 2. Toast Container (`components/ui/Toast.tsx`)
- **Fixed positioning**: top-right corner
- **z-index: 9999** to appear above all content
- **Max height** with scroll if too many toasts
- **Stack animation** with stagger effect for multiple toasts
- **Pointer events** properly configured (container: none, toasts: auto)

### 3. Toast Provider (`components/ui/ToastProvider.tsx`)
- React Context API for global state management
- Methods:
  - `addToast()` - Add new toast notification
  - `removeToast()` - Remove specific toast by ID
  - `clearAll()` - Clear all active toasts
- Automatic unique ID generation for each toast

### 4. useToast Hook (`hooks/useToast.ts`)
Convenient hook with four helper methods:
```typescript
const toast = useToast()

// Show success toast
toast.success('Сообщение отправлено!', 4000)

// Show error toast
toast.error('Ошибка при загрузке')

// Show warning toast
toast.warning('Предупреждение')

// Show info toast
toast.info('Информация')
```

## Integration Points

### 1. App Layout (`app/layout.tsx`)
Wrapped the entire application with `ToastProvider` to enable toast functionality throughout the site:
```typescript
<ToastProvider>
  <CustomCursor />
  <ProgressBar />
  <LoadingScreen />
  <Header />
  <main>
    <PageTransition>{children}</PageTransition>
  </main>
  <Footer />
  <CookieConsent />
</ToastProvider>
```

### 2. Afisha Event Page (`app/afisha/[slug]/page.tsx`)
- Created `TicketButton.tsx` component
- Shows success toast when user clicks "Купить билет" button
- Message: "Переход к покупке билета..."
- Duration: 3 seconds

### 3. Shop Product Page (`app/shop/[slug]/page.tsx`)
- Integrated `useToast` hook
- Shows success toast when user clicks "Заказать через Telegram" button
- Message: "Переход к оформлению заказа в Telegram..."
- Duration: 3 seconds
- Slight delay (500ms) before opening Telegram for smooth UX

### 4. Footer Newsletter (`components/layout/Footer.tsx`)
- Shows success toast on newsletter subscription
- Message: "Спасибо за подписку на рассылку!"
- Duration: 4 seconds
- Clears email input after successful subscription

## Design Specifications

### Color Scheme
- **Success**: Green-500 (progress), Green-600 (icon), Green-100 (icon background)
- **Error**: Red-500 (progress), Red-600 (icon), Red-100 (icon background)
- **Warning**: Orange-500 (progress), Orange-600 (icon), Orange-100 (icon background)
- **Info**: Brand red (progress), Brand red (icon), Brand red/10 (icon background)

### Glassmorphism Styling
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(24px);
border: 1px solid rgba(color, 0.3);
box-shadow:
  0 8px 32px rgba(122, 15, 28, 0.12),
  0 2px 8px rgba(255, 255, 255, 0.6) inset;
```

### Animations
- **Entry**: 0.4s duration with custom easing
- **Exit**: 0.3s duration with ease-in
- **Progress bar**: Linear animation over duration
- **Stagger**: 0.08s delay between multiple toasts

## Usage Examples

### Basic Usage
```typescript
'use client'
import { useToast } from '@/hooks/useToast'

export function MyComponent() {
  const toast = useToast()

  const handleClick = () => {
    toast.success('Operation completed successfully!')
  }

  return <button onClick={handleClick}>Click me</button>
}
```

### With Custom Duration
```typescript
toast.error('Something went wrong!', 8000) // 8 seconds
```

### All Variants
```typescript
toast.info('Information message')
toast.success('Success message')
toast.warning('Warning message')
toast.error('Error message')
```

## File Structure
```
promo-team-site/
├── components/
│   └── ui/
│       ├── Toast.tsx              # Toast component & container
│       └── ToastProvider.tsx      # Context provider
├── hooks/
│   └── useToast.ts               # Custom hook
├── app/
│   ├── layout.tsx                # Root layout with provider
│   ├── afisha/
│   │   └── [slug]/
│   │       ├── page.tsx          # Event page with toast
│   │       └── TicketButton.tsx  # Client component for button
│   └── shop/
│       └── [slug]/
│           └── page.tsx          # Product page with toast
└── components/layout/
    └── Footer.tsx                # Newsletter with toast
```

## Technical Details

### Dependencies
- React (Context API)
- Framer Motion (animations)
- Lucide React (icons)

### Browser Support
Works in all modern browsers that support:
- CSS backdrop-filter
- CSS custom properties
- ES6+ JavaScript

### Performance
- Optimized with 60fps progress bar updates
- Efficient state management with React Context
- Hardware-accelerated animations via Framer Motion
- Minimal re-renders with proper memoization

## Future Enhancements
Possible improvements for consideration:
- Add sound effects for toasts
- Add option to position toasts (bottom-right, top-left, etc.)
- Add rich content support (images, links in toasts)
- Add toast queue management
- Add persistent toasts that don't auto-dismiss
- Add action buttons in toasts (undo, retry, etc.)

## Testing
To test the toast system:
1. Navigate to any event page and click "Купить билет"
2. Navigate to any product page and click "Заказать через Telegram"
3. Scroll to footer and subscribe to newsletter with any email
4. All three should show beautiful glassmorphism toast notifications

## Notes
- All toasts are responsive and work on mobile devices
- Toasts pause on hover to give users time to read
- Multiple toasts stack with smooth stagger animations
- Close button is always visible for manual dismissal
- Progress bar provides visual feedback for time remaining
