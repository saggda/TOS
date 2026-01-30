#!/usr/bin/env tsx

/**
 * Script to generate all favicon and icon files
 * Run: npm run generate-icons
 */

import { saveIconsToPublic } from '../lib/icon-generator'

async function main() {
  console.log('🎨 Generating PROMO Team icons...')

  try {
    await saveIconsToPublic()
    console.log('✅ Icons generated successfully!')
    console.log('\nGenerated files:')
    console.log('  - favicon.ico')
    console.log('  - icon.svg')
    console.log('  - apple-touch-icon.png')
    console.log('  - favicon-16x16.png')
    console.log('  - favicon-32x32.png')
    console.log('  - favicon-72x72.png')
    console.log('  - favicon-96x96.png')
    console.log('  - favicon-128x128.png')
    console.log('  - favicon-144x144.png')
    console.log('  - favicon-152x152.png')
    console.log('  - favicon-192x192.png')
    console.log('  - favicon-384x384.png')
    console.log('  - favicon-512x512.png')
  } catch (error) {
    console.error('❌ Error generating icons:', error)
    process.exit(1)
  }
}

main()
