# Micro-interactions Usage Guide

## Quick Start

All effects are **enabled by default** on the Button component:

```tsx
import { Button } from '@/components/ui/Button'

// Magnetic + Ripple effects (default)
<Button>Click me</Button>

// Disable effects if needed
<Button magnetic={false} ripple={false}>Plain Button</Button>
```

## Individual Components

### CustomCursor
Automatically active on all pages. Shows custom cursor with glow effect.

### MagneticButton
```tsx
import { MagneticButton } from '@/components/ui/MagneticButton'

<MagneticButton strength={0.5}>
  <div>Content follows cursor</div>
</MagneticButton>
```

### RippleButton
```tsx
import { RippleButton } from '@/components/ui/RippleButton'

<RippleButton rippleColor="rgba(239, 68, 68, 0.5)">
  Click for ripple
</RippleButton>
```

## Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| magnetic | boolean | true | Enable magnetic effect |
| ripple | boolean | true | Enable ripple effect |
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'link' | 'primary' | Button style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |

## Customization

### Cursor Colors
Edit `/components/ui/CustomCursor.tsx`:
```tsx
// Line 51: Change gradient colors
bg-gradient-to-r from-brand-red to-pink-500

// Line 62: Change border color
borderColor: isHovering ? 'rgba(239, 68, 68, 1)' : 'rgba(239, 68, 68, 0.5)'
```

### Magnetic Strength
Edit `/components/ui/MagneticButton.tsx`:
```tsx
// Default: 0.3, range: 0.1-1.0
strength={0.3}
```

### Ripple Color
```tsx
<RippleButton rippleColor="rgba(255, 255, 255, 0.5)">
```

## Performance Notes

- Cursor is hidden on mobile (`hidden lg:block`)
- Ripples auto-cleanup after 600ms
- Spring physics are optimized for smooth 60fps
- All effects use requestAnimationFrame via framer-motion

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Cursor hidden, touch-optimized
