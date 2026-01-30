# Image Generator

Utility for creating SVG placeholder images with brand gradients.

## Overview

This library generates SVG placeholder images with custom gradients, patterns, and text. It's designed to create consistent, branded placeholder images for the promo team site.

## Colors

All generated images use brand colors:
- **Brand Red**: `#7A0F1C`
- **Accent Purple**: `#9333EA`
- **Accent Pink**: `#EC4899`
- **Dark**: `#0A0A0A`
- **Light**: `#FAFAFA`

## Gradient Types

- `diagonal` - Diagonal gradient (red → purple → pink)
- `red-purple` - Vertical gradient (red → purple)
- `purple-pink` - Horizontal gradient (purple → pink)
- `red-pink` - Diagonal gradient (red → pink)
- `radial` - Radial gradient (pink → red)

## Features

Each generated SVG includes:
1. **Background gradient** - Custom color gradients
2. **Dot pattern overlay** - Subtle texture (opacity 0.1)
3. **Decorative circles** - White circles in corners for depth
4. **Centered text** - Bold typography with letter spacing

## API

### `generateSVG(width, height, title, gradientType, includePattern)`

Generates a generic SVG placeholder.

**Parameters:**
- `width: number` - Image width in pixels
- `height: number` - Image height in pixels
- `title: string` - Text to display on image
- `gradientType?: GradientType` - Type of gradient (default: 'diagonal')
- `includePattern?: boolean` - Include dot pattern overlay (default: true)

**Returns:** SVG string

### `generateEventPlaceholder(index, title, width, height)`

Generates an event placeholder (3:4 aspect ratio).

**Parameters:**
- `index: number` - Index for gradient selection (0-4)
- `title: string` - Event title
- `width?: number` - Width (default: 600)
- `height?: number` - Height (default: 800)

**Returns:** SVG string

### `generateProductPlaceholder(index, title, size)`

Generates a product placeholder (1:1 aspect ratio).

**Parameters:**
- `index: number` - Index for gradient selection (0-5)
- `title: string` - Product title
- `size?: number` - Size (default: 800)

**Returns:** SVG string

### `generatePostPlaceholder(index, title, width, height)`

Generates a post placeholder (16:10 aspect ratio).

**Parameters:**
- `index: number` - Index for gradient selection (0-4)
- `title: string` - Post title
- `width?: number` - Width (default: 1600)
- `height?: number` - Height (default: 1000)

**Returns:** SVG string

### `saveSVG(svg, filepath)`

Saves SVG string to file.

**Parameters:**
- `svg: string` - SVG content
- `filepath: string` - Destination file path

**Returns:** Promise<void>

### `generateAllPlaceholders(outputDir?)`

Generates all placeholder images at once.

**Parameters:**
- `outputDir?: string` - Output directory (default: '/Users/danielsagdeew/Desktop/workhub/TOS2/promo-team-site/public/images')

**Returns:** Promise<void>

## Usage Examples

### Generate all placeholders

```typescript
import { generateAllPlaceholders } from '@/lib/image-generator';

await generateAllPlaceholders();
```

### Generate a single custom image

```typescript
import { generateEventPlaceholder, saveSVG } from '@/lib/image-generator';

const svg = generateEventPlaceholder(0, 'MY CONFERENCE 2025', 600, 800);
await saveSVG(svg, 'public/images/events/custom-event.svg');
```

### Use in components

```typescript
import { generateProductPlaceholder } from '@/lib/image-generator';

// Generate SVG for use in components
const svgString = generateProductPlaceholder(0, 'PREMIUM COURSE');
// Use dangerouslySetInnerHTML or convert to data URI
```

## Running the Generator

### Via npm script

```bash
npm run generate-images
```

### Direct with tsx

```bash
npx tsx lib/image-generator.ts
```

## File Structure

Generated files are organized as:
```
public/images/
├── events/
│   ├── event-1.svg  (600×800, SUMMIT 2025)
│   ├── event-2.svg  (600×800, WORKSHOP)
│   ├── event-3.svg  (600×800, MEETUP)
│   ├── event-4.svg  (600×800, CONFERENCE)
│   └── event-5.svg  (600×800, HACKATHON)
├── products/
│   ├── product-1.svg (800×800, COURSE #1)
│   ├── product-2.svg (800×800, COURSE #2)
│   ├── product-3.svg (800×800, MENTORING)
│   ├── product-4.svg (800×800, COMMUNITY)
│   ├── product-5.svg (800×800, BOOTCAMP)
│   └── product-6.svg (800×800, TOOLKIT)
└── posts/
    ├── post-1.svg (1600×1000, INSIGHT #1)
    ├── post-2.svg (1600×1000, INSIGHT #2)
    ├── post-3.svg (1600×1000, INSIGHT #3)
    ├── post-4.svg (1600×1000, INSIGHT #4)
    └── post-5.svg (1600×1000, INSIGHT #5)
```

## Customization

You can customize the generator by:

1. **Adding new gradient types** - Add to `GradientType` type and `generateGradient()` function
2. **Changing patterns** - Modify `generatePattern()` function
3. **Adjusting text** - Change fontSize calculation in `generateSVG()`
4. **Adding decorations** - Add new SVG elements in `generateSVG()`
5. **Changing colors** - Update `BRAND_COLORS` constant

## Performance

- SVG files are lightweight (~1KB each)
- No external dependencies
- Vector format scales perfectly
- Can be easily converted to PNG/JPG if needed
