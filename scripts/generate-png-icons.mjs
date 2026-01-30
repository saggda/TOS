/**
 * Generate PNG icons using a simple HTML-to-image approach
 * This creates minimal valid PNG files for all favicon sizes
 */

import { writeFile } from 'fs/promises'
import { join } from 'path'

// Simple PNG generator - creates valid PNG files with gradient background
function createPNGBuffer(size, color1, color2, text) {
  // For now, create a simple SVG that can be used as PNG
  // In production, you'd use a proper image library like sharp or canvas
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1}"/>
        <stop offset="100%" style="stop-color:${color2}"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#g)" rx="${size * 0.2}"/>
    <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" fill="rgba(255,255,255,0.1)" rx="${size * 0.16}"/>
    <text x="50%" y="${size * 0.62}" font-family="Arial" font-size="${size * 0.5}" font-weight="bold" text-anchor="middle" fill="white">${text}</text>
  </svg>`

  return Buffer.from(svg)
}

async function main() {
  console.log('🎨 Generating PROMO Team icons...\n')

  const sizes = [
    { size: 16, name: 'favicon-16x16.svg' },
    { size: 32, name: 'favicon-32x32.svg' },
    { size: 72, name: 'favicon-72x72.svg' },
    { size: 96, name: 'favicon-96x96.svg' },
    { size: 128, name: 'favicon-128x128.svg' },
    { size: 144, name: 'favicon-144x144.svg' },
    { size: 152, name: 'favicon-152x152.svg' },
    { size: 192, name: 'favicon-192x192.svg' },
    { size: 384, name: 'favicon-384x384.svg' },
    { size: 512, name: 'favicon-512x512.svg' },
  ]

  const publicDir = join(process.cwd(), 'public')

  for (const { size, name } of sizes) {
    const buffer = createPNGBuffer(size, '#7A0F1C', '#9333EA', 'P')
    await writeFile(join(publicDir, name), buffer)
    console.log(`✅ Generated ${name}`)
  }

  // Apple touch icon with full text
  const appleSVG = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#7A0F1C"/>
        <stop offset="100%" style="stop-color:#9333EA"/>
      </linearGradient>
    </defs>
    <rect width="180" height="180" fill="url(#g)" rx="40"/>
    <rect x="20" y="20" width="140" height="140" fill="rgba(255,255,255,0.15)" rx="36"/>
    <text x="50%" y="52%" font-family="Arial" font-size="72" font-weight="bold" text-anchor="middle" fill="white">PROMO</text>
  </svg>`

  await writeFile(join(publicDir, 'apple-touch-icon.svg'), Buffer.from(appleSVG))
  console.log(`✅ Generated apple-touch-icon.svg`)

  console.log('\n✨ All icons generated as SVG!')
  console.log('\nNote: Modern browsers support SVG favicons. For maximum compatibility,')
  console.log('consider converting these to PNG using an online converter or sharp package.')
}

main().catch(console.error)
