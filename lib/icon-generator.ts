import sharp from 'sharp'

/**
 * Icon Generator for PROMO Team
 * Generates all required favicon sizes with SVG-based branding
 */

const BRAND_COLORS = {
  red: '#7A0F1C',
  purple: '#9333EA',
  background: '#FAF7F4',
}

/**
 * Generate SVG for icon with glassmorphism effect
 */
function generateIconSVG(size: number, text?: string): string {
  const fontSize = Math.floor(size * 0.5)
  const padding = Math.floor(size * 0.1)

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Gradient Background -->
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${BRAND_COLORS.purple};stop-opacity:1" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${size}" height="${size}" fill="url(#gradient)" rx="${size * 0.2}"/>

      <!-- Glassmorphism Effect -->
      <rect
        x="${padding}"
        y="${padding}"
        width="${size - padding * 2}"
        height="${size - padding * 2}"
        fill="rgba(255, 255, 255, 0.1)"
        rx="${size * 0.15}"
        style="backdrop-filter: blur(10px)"
      />

      <!-- Text -->
      <text
        x="50%"
        y="${size * 0.6}"
        font-family="Space Grotesk, Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        text-anchor="middle"
        fill="white"
        filter="url(#glow)"
      >${text || 'P'}</text>
    </svg>
  `
}

/**
 * Generate Apple Touch Icon with more detail
 */
function generateAppleTouchIconSVG(): string {
  const size = 180
  const fontSize = 72
  const padding = 20

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${BRAND_COLORS.purple};stop-opacity:1" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${size}" height="${size}" fill="url(#gradient)" rx="40"/>

      <!-- Glassmorphism Effect -->
      <rect
        x="${padding}"
        y="${padding}"
        width="${size - padding * 2}"
        height="${size - padding * 2}"
        fill="rgba(255, 255, 255, 0.15)"
        rx="36"
        style="backdrop-filter: blur(15px)"
      />

      <!-- Text -->
      <text
        x="50%"
        y="${size * 0.58}"
        font-family="Space Grotesk, Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        text-anchor="middle"
        fill="white"
        filter="url(#glow)"
      >PROMO</text>
    </svg>
  `
}

/**
 * Generate favicon.ico with multiple sizes embedded
 */
async function generateFaviconICO(): Promise<Buffer> {
  // For simplicity, we'll generate a PNG that can be used as favicon.ico
  // Most browsers accept PNG as favicon.ico
  const svgBuffer = Buffer.from(generateIconSVG(32, 'P'))
  return sharp(svgBuffer).png().toBuffer()
}

/**
 * Generate all icon sizes
 */
export async function generateAllIcons() {
  const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512]
  const icons: { size: number; buffer: Buffer }[] = []

  // Generate all sizes
  for (const size of sizes) {
    const svg = generateIconSVG(size)
    const svgBuffer = Buffer.from(svg)

    const buffer = await sharp(svgBuffer)
      .png()
      .toBuffer()

    icons.push({ size, buffer })
  }

  // Generate Apple Touch Icon separately with full text
  const appleSvg = generateAppleTouchIconSVG()
  const appleBuffer = await sharp(Buffer.from(appleSvg)).png().toBuffer()

  // Generate favicon.ico
  const faviconIco = await generateFaviconICO()

  return {
    icons,
    appleTouchIcon: appleBuffer,
    faviconIco,
  }
}

/**
 * Save all icons to public directory
 */
export async function saveIconsToPublic() {
  const fs = await import('fs/promises')
  const path = await import('path')

  const publicDir = path.join(process.cwd(), 'public')

  const { icons, appleTouchIcon, faviconIco } = await generateAllIcons()

  // Save all icon sizes
  for (const { size, buffer } of icons) {
    const filename = size === 32 ? 'favicon-32x32.png' : `favicon-${size}x${size}.png`
    await fs.writeFile(path.join(publicDir, filename), buffer)
  }

  // Save Apple Touch Icon
  await fs.writeFile(
    path.join(publicDir, 'apple-touch-icon.png'),
    appleTouchIcon
  )

  // Save favicon.ico
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), faviconIco)

  // Save SVG icon
  const svgIcon = generateIconSVG(512, 'P')
  await fs.writeFile(path.join(publicDir, 'icon.svg'), svgIcon)

  console.log('All icons generated successfully!')
}
