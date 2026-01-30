/**
 * Generate PNG icons from SVG templates
 * This creates actual PNG files for all favicon sizes
 */

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const BRAND_COLORS = {
  red: '#7A0F1C',
  purple: '#9333EA',
}

/**
 * Generate HTML/SVG string for icon
 */
function generateIconHTML(size: number, text: string, fullText = false): string {
  const fontSize = fullText ? Math.floor(size * 0.4) : Math.floor(size * 0.5)
  const padding = Math.floor(size * 0.1)
  const borderRadius = Math.floor(size * 0.2)

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: ${size}px;
      height: ${size}px;
    }
    .icon {
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(135deg, ${BRAND_COLORS.red} 0%, ${BRAND_COLORS.purple} 100%);
      border-radius: ${borderRadius}px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .glass {
      position: absolute;
      top: ${padding}px;
      left: ${padding}px;
      right: ${padding}px;
      bottom: ${padding}px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: ${borderRadius * 0.8}px;
      backdrop-filter: blur(10px);
    }
    .text {
      font-family: Arial, sans-serif;
      font-size: ${fontSize}px;
      font-weight: bold;
      color: white;
      text-align: center;
      z-index: 1;
      text-shadow: 0 0 ${Math.max(2, size / 50)}px rgba(255, 255, 255, 0.5);
    }
  </style>
</head>
<body>
  <div class="icon">
    <div class="glass"></div>
    <div class="text">${fullText ? 'PROMO' : text}</div>
  </div>
</body>
</html>
  `
}

/**
 * Generate all SVG icons as PNG-compatible files
 */
export async function generateStaticIcons() {
  const publicDir = join(process.cwd(), 'public')

  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 72, name: 'favicon-72x72.png' },
    { size: 96, name: 'favicon-96x96.png' },
    { size: 128, name: 'favicon-128x128.png' },
    { size: 144, name: 'favicon-144x144.png' },
    { size: 152, name: 'favicon-152x152.png' },
    { size: 192, name: 'favicon-192x192.png' },
    { size: 384, name: 'favicon-384x384.png' },
    { size: 512, name: 'favicon-512x512.png' },
  ]

  console.log('🎨 Generating PROMO Team icons as SVG...\n')

  for (const { size, name } of sizes) {
    const svg = generateSVG(size, 'P', false)
    const svgPath = join(publicDir, name.replace('.png', '.svg'))
    await writeFile(svgPath, svg)
    console.log(`✅ Generated ${name.replace('.png', '.svg')}`)
  }

  // Generate Apple Touch Icon
  const appleSVG = generateSVG(180, 'PROMO', true)
  const applePath = join(publicDir, 'apple-touch-icon.svg')
  await writeFile(applePath, appleSVG)
  console.log(`✅ Generated apple-touch-icon.svg`)

  console.log('\n✨ All SVG icons generated!')
  console.log('\nNote: For production deployment, convert these SVG files to PNG format.')
  console.log('You can use online converters or install sharp for automation.')
}

/**
 * Generate SVG string
 */
function generateSVG(size: number, text: string, fullText: boolean): string {
  const fontSize = fullText ? Math.floor(size * 0.4) : Math.floor(size * 0.5)
  const padding = Math.floor(size * 0.1)
  const borderRadius = Math.floor(size * 0.2)
  const blurAmount = Math.max(1, size / 100)

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_COLORS.purple};stop-opacity:1" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${blurAmount}" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="${size}" height="${size}" fill="url(#gradient)" rx="${borderRadius}"/>

  <rect
    x="${padding}"
    y="${padding}"
    width="${size - padding * 2}"
    height="${size - padding * 2}"
    fill="rgba(255, 255, 255, 0.1)"
    rx="${borderRadius * 0.8}"
  />

  <text
    x="50%"
    y="${size * 0.6}"
    font-family="Arial, sans-serif"
    font-size="${fontSize}"
    font-weight="bold"
    text-anchor="middle"
    fill="white"
    filter="url(#glow)"
  >${fullText ? 'PROMO' : text}</text>
</svg>`
}
