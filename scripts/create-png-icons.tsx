/**
 * Create actual PNG favicon files
 * This script uses Next.js ImageResponse API to generate PNGs
 */

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { ImageResponse } from 'next/og'

const BRAND_COLORS = {
  red: '#7A0F1C',
  purple: '#9333EA',
}

async function generatePNG(size: number, text: string, filename: string) {
  const response = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.5,
          fontWeight: 'bold',
          color: 'white',
          background: `linear-gradient(135deg, ${BRAND_COLORS.red} 0%, ${BRAND_COLORS.purple} 100%)`,
          borderRadius: `${size * 0.2}px`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: size * 0.1,
            left: size * 0.1,
            right: size * 0.1,
            bottom: size * 0.1,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: `${size * 0.16}px`,
            backdropFilter: 'blur(10px)',
          }}
        />
        <div
          style={{
            zIndex: 1,
            textShadow: `0 0 ${Math.max(2, size / 50)}px rgba(255, 255, 255, 0.5)`,
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  )

  const buffer = await response.arrayBuffer()
  const publicDir = join(process.cwd(), 'public')
  await writeFile(join(publicDir, filename), Buffer.from(buffer))
  console.log(`✅ Generated ${filename}`)
}

async function generateAppleTouchIcon() {
  const size = 180
  const response = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.4,
          fontWeight: 'bold',
          color: 'white',
          background: `linear-gradient(135deg, ${BRAND_COLORS.red} 0%, ${BRAND_COLORS.purple} 100%)`,
          borderRadius: '40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '36px',
            backdropFilter: 'blur(15px)',
          }}
        />
        <div
          style={{
            zIndex: 1,
            textShadow: '0 0 3px rgba(255, 255, 255, 0.5)',
          }}
        >
          PROMO
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  )

  const buffer = await response.arrayBuffer()
  const publicDir = join(process.cwd(), 'public')
  await writeFile(join(publicDir, 'apple-touch-icon.png'), Buffer.from(buffer))
  console.log(`✅ Generated apple-touch-icon.png`)
}

async function main() {
  console.log('🎨 Generating PNG icons for PROMO Team...\n')

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

  for (const { size, name } of sizes) {
    await generatePNG(size, 'P', name)
  }

  await generateAppleTouchIcon()

  console.log('\n✨ All PNG icons generated successfully!')
}

main().catch(console.error)
