# Placeholder Images

This directory contains auto-generated SVG placeholder images with brand gradients.

## Generated Images

### Events (3:4 vertical, 600×800px)
- `event-1.svg` - SUMMIT 2025
- `event-2.svg` - WORKSHOP
- `event-3.svg` - MEETUP
- `event-4.svg` - CONFERENCE
- `event-5.svg` - HACKATHON

### Products (1:1 square, 800×800px)
- `product-1.svg` - COURSE #1
- `product-2.svg` - COURSE #2
- `product-3.svg` - MENTORING
- `product-4.svg` - COMMUNITY
- `product-5.svg` - BOOTCAMP
- `product-6.svg` - TOOLKIT

### Posts (16:10 horizontal, 1600×1000px)
- `post-1.svg` - INSIGHT #1
- `post-2.svg` - INSIGHT #2
- `post-3.svg` - INSIGHT #3
- `post-4.svg` - INSIGHT #4
- `post-5.svg` - INSIGHT #5

## Generate Images

To regenerate all placeholder images:

```bash
npm run generate-images
```

Or using tsx directly:

```bash
npx tsx lib/image-generator.ts
```

## Custom Generation

You can also generate custom images in your code:

```typescript
import { generateEventPlaceholder, generateProductPlaceholder, generatePostPlaceholder, saveSVG } from '@/lib/image-generator';

// Generate a custom event image
const svg = generateEventPlaceholder(0, 'MY CUSTOM EVENT', 600, 800);
await saveSVG(svg, 'public/images/events/my-event.svg');
```

## Image Features

All generated images include:
- **Brand gradients**: Using brand-red (#7A0F1C), purple (#9333EA), and pink (#EC4899)
- **Dot pattern overlay**: Subtle texture with 0.1 opacity
- **Decorative circles**: White circles with low opacity in corners
- **Centered text**: Bold typography with letter spacing
- **Multiple gradient types**: Diagonal, vertical, horizontal, and radial options

## Replace With Real Images

To replace these placeholders with real images:

1. Keep the same filenames (event-1.svg → event-1.jpg/png) OR update the JSON data files
2. Use the recommended aspect ratios:
   - Events: 3:4 (600×800px or similar)
   - Products: 1:1 (800×800px or similar)
   - Posts: 16:10 (1600×1000px or similar)
3. Place images in the respective directories

## Placeholder Services (Alternative)

For testing with external placeholder services:

- https://placehold.co/
- https://placeholder.com/
- https://via.placeholder.com/

Example usage in JSON:
```json
"poster": "https://placehold.co/600x800/7A0F1C/white?text=Event+Poster"
```
