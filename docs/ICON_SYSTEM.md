# PROMO Team Icon System

This document describes the comprehensive favicon and icon system for the PROMO Team website.

## Overview

The icon system uses Next.js 14's `ImageResponse` API to dynamically generate icons with:
- Glassmorphism effect
- Gradient background (brand-red to purple)
- Scalable vector graphics (SVG) fallbacks
- Progressive Web App (PWA) support

## Brand Colors

- **Primary Red**: `#7A0F1C`
- **Secondary Purple**: `#9333EA`
- **Background**: `#FAF7F4`

## Icon Files

### Static SVG Files (in `/public`)

1. **favicon.ico** - Main favicon (32x32)
2. **favicon.svg** - Scalable vector icon
3. **icon.svg** - High-resolution SVG icon (512x512)
4. **favicon-16x16.svg** - Small icon (16x16)
5. **favicon-32x32.svg** - Standard icon (32x32)
6. **favicon-72x72.svg** - PWA icon (72x72)
7. **favicon-96x96.svg** - PWA icon (96x96)
8. **favicon-128x128.svg** - PWA icon (128x128)
9. **favicon-144x144.svg** - PWA icon (144x144)
10. **favicon-152x152.svg** - PWA icon (152x152)
11. **favicon-192x192.svg** - PWA icon (192x192)
12. **favicon-384x384.svg** - PWA icon (384x384)
13. **favicon-512x512.svg** - PWA icon (512x512)
14. **apple-touch-icon.svg** - Apple device icon (180x180)

### Dynamic PNG Routes (in `/app`)

Next.js route handlers generate PNG icons on-the-fly:

- `/app/icon.tsx` - Default Next.js icon (32x32)
- `/app/favicon.ico/route.ts` - Dynamic favicon
- `/app/favicon-16x16.png/route.ts` - Small PNG icon
- `/app/favicon-32x32.png/route.ts` - Standard PNG icon
- `/app/apple-touch-icon.png/route.ts` - Apple touch icon
- `/app/favicon-192x192.png/route.ts` - PWA icon
- `/app/favicon-512x512.png/route.ts` - Splash screen icon

## Icon Design

### Visual Elements

1. **Gradient Background**: Linear gradient from `#7A0F1C` to `#9333EA`
2. **Glassmorphism**: Semi-transparent overlay with blur effect
3. **Typography**: "P" for small sizes, "PROMO" for Apple touch icon
4. **Rounded Corners`: Various border-radius based on size
5. **Glow Effect**: Subtle text shadow for depth

### Design Features

- **Responsive**: Scales from 16px to 512px
- **Accessibility**: High contrast (white text on dark gradient)
- **Modern**: Glassmorphism trend with backdrop blur
- **Recognizable**: Simple "P" lettermark for brand identity

## PWA Manifest

The `manifest.json` file includes:
- App name: "PROMO Team"
- Short name: "PROMO"
- Theme color: `#7A0F1C`
- Background color: `#FAF7F4`
- Display mode: standalone
- All icon sizes for PWA installation

## Browser Compatibility

### Modern Browsers
- Chrome, Edge, Firefox: Full SVG and PNG support
- Safari: Uses apple-touch-icon.png
- Opera: Full support

### Fallback Chain

1. SVG icons (preferred - crisp at any size)
2. PNG icons (generated dynamically)
3. ICO format (legacy support)

## Usage in Layout

The `app/layout.tsx` includes:

```typescript
icons: {
  icon: [
    { url: '/favicon.ico' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: '/apple-touch-icon.png',
},
manifest: '/manifest.json',
```

## Generation Scripts

### Create Static Icons
```bash
npm run generate-icons
```

This script creates all SVG icon files in the public directory.

### Manual Generation

For custom icon generation, use the `lib/icon-generator.ts` module:

```typescript
import { generateAllIcons } from '@/lib/icon-generator'

const icons = await generateAllIcons()
```

## Performance

- **SVG Files**: ~1-2KB each (highly compressed)
- **PNG Generation**: On-demand caching via Next.js
- **Edge Runtime**: Fast icon generation at the edge

## Testing

Test icons across different devices:
1. Desktop browsers (Chrome, Firefox, Safari, Edge)
2. Mobile browsers (iOS Safari, Chrome Mobile)
3. PWA installation (Add to Home Screen)
4. Browser tabs and bookmarks

## Maintenance

To update the icon design:
1. Modify the gradient colors in BRAND_COLORS
2. Update the glassmorphism effect parameters
3. Run `npm run generate-icons` to regenerate
4. Test across all devices and browsers

## References

- [Next.js Image Response](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [Favicon Best Practices](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
- [PWA Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
