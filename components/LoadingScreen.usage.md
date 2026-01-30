# LoadingScreen Component

## Overview

Premium loading screen component with animated logo, spinner, progress bar, and particle effects.

## Features

- **Animated Logo**: "PROMO" text with gradient animation and scale-in effect
- **Custom Spinner**: SVG-based rotating ring with gradient stroke
- **Progress Bar**: Smooth animated progress (0-100%) with percentage
- **Particle Effects**: 6 floating dots with fade and rise animations
- **Brand Colors**: Uses brand-red, brand-dark, brand-darker gradients
- **Smooth Transitions**: Fade-out effect using Framer Motion
- **Auto-dismiss**: Hides after 2.5 seconds
- **Responsive**: Works on mobile and desktop

## Installation

The component is already integrated into the root layout. No additional setup needed.

## Usage

### Automatic Integration (Already Done)

The LoadingScreen is automatically shown on every page load through the root layout:

```tsx
// app/layout.tsx
import { LoadingScreen } from '@/components/LoadingScreen'

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <LoadingScreen />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Manual Usage (Optional)

If you need to use it in specific pages:

```tsx
'use client'

import { LoadingScreen } from '@/components/LoadingScreen'

export default function CustomPage() {
  return (
    <div>
      <LoadingScreen />
      {/* Your content */}
    </div>
  )
}
```

## Customization

You can customize the loading duration by modifying the timer in `components/LoadingScreen.tsx`:

```tsx
// Line 23: Change 2500 to desired duration in milliseconds
const timer = setTimeout(() => {
  setIsLoading(false)
}, 2500) // Change this value
```

## Animation Details

### Logo Animation
- **Scale-in**: Elastic easing (0.8s duration)
- **Gradient**: Continuously animating background position
- **Glow**: Pulsing blur effect (2s infinite)

### Spinner Animation
- **Rotation**: Continuous 360° rotation (2s per cycle)
- **Pulse**: Inner circle scales 0.8→1.2→0.8 (2s infinite)

### Progress Bar
- **Duration**: ~2.5 seconds total
- **Update Interval**: 200ms
- **Increment**: Random 0-15% per update

### Fade-out
- **Duration**: 0.8s
- **Easing**: easeInOut
- **Triggered**: After 2.5s or when progress reaches 100%

## Styling

### Colors Used
- Background: `bg-gradient-to-br from-brand-red via-brand-dark to-brand-darker`
- Text: `bg-gradient-to-r from-white via-white/80 to-white/60`
- Spinner: `stroke="url(#gradient)"` with white gradient
- Progress Bar: `bg-white/20` background, `bg-gradient-to-r from-white/80 to-white` fill

### Responsive Breakpoints
- Logo Size: `text-7xl md:text-9xl` (mobile → desktop)
- Container: Fullscreen with `fixed inset-0`

## Performance

- **GPU Acceleration**: Hardware-accelerated transforms
- **Cleanup**: Proper interval and timeout cleanup
- **Z-index**: 9999 to ensure top layer
- **File Size**: 6726 bytes (unminified)

## Dependencies

- React 18
- Framer Motion 12.29.2
- Tailwind CSS 3.4.17
- Next.js 14.2.35

## Browser Support

Works on all modern browsers that support:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6+ JavaScript
- SVG animations
