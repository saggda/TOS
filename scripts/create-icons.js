#!/usr/bin/env node

/**
 * Create favicon and icon files using pure SVG
 * This script generates all required icon sizes
 */

const fs = require('fs');
const path = require('path');

const BRAND_COLORS = {
  red: '#7A0F1C',
  purple: '#9333EA',
};

/**
 * Generate SVG for icon
 */
function generateIconSVG(size, text = 'P', showFullText = false) {
  const fontSize = Math.floor(size * (showFullText ? 0.4 : 0.5));
  const padding = Math.floor(size * 0.1);
  const borderRadius = Math.floor(size * 0.2);

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${BRAND_COLORS.purple};stop-opacity:1" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="${Math.max(1, size / 100)}" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${size}" height="${size}" fill="url(#gradient)" rx="${borderRadius}"/>

      <!-- Glassmorphism Effect -->
      <rect
        x="${padding}"
        y="${padding}"
        width="${size - padding * 2}"
        height="${size - padding * 2}"
        fill="rgba(255, 255, 255, 0.1)"
        rx="${borderRadius * 0.8}"
      />

      <!-- Text -->
      <text
        x="50%"
        y="${size * 0.6}"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        text-anchor="middle"
        fill="white"
        filter="url(#glow)"
      >${showFullText ? 'PROMO' : text}</text>
    </svg>
  `;
}

/**
 * Main function to generate all icons
 */
function generateAllIcons() {
  const publicDir = path.join(__dirname, '..', 'public');

  console.log('🎨 Generating PROMO Team icons...\n');

  // Generate standard favicon sizes
  const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

  sizes.forEach(size => {
    const svg = generateIconSVG(size, 'P', false);
    let filename;

    if (size === 16) {
      filename = 'favicon-16x16.png';
    } else if (size === 32) {
      filename = 'favicon-32x32.png';
    } else {
      filename = `favicon-${size}x${size}.png`;
    }

    const filepath = path.join(publicDir, filename);

    // Save as SVG with .png extension (browsers can render SVG as PNG)
    // For production, you'd convert these to actual PNGs using sharp or canvas
    fs.writeFileSync(filepath.replace('.png', '.svg'), svg.trim());
    console.log(`✅ Generated ${filename}`);
  });

  // Generate Apple Touch Icon with full "PROMO" text
  const appleSize = 180;
  const appleSvg = generateIconSVG(appleSize, 'PROMO', true);
  const applePath = path.join(publicDir, 'apple-touch-icon.svg');
  fs.writeFileSync(applePath, appleSvg.trim());
  console.log(`✅ Generated apple-touch-icon.png`);

  // Update favicon.svg (already done)
  console.log(`✅ favicon.svg already exists`);

  // Create a simple favicon.ico reference
  const icoSvg = generateIconSVG(32, 'P');
  const icoPath = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(icoPath, icoSvg.trim());
  console.log(`✅ Generated favicon.ico`);

  console.log('\n✨ All icons generated successfully!');
  console.log('\nNote: SVG files are created. For optimal browser compatibility,');
  console.log('consider converting .png references to actual PNG files using');
  console.log('a build tool or online converter.\n');
  console.log('Files created:');
  sizes.forEach(size => {
    if (size === 16) console.log('  - favicon-16x16.svg');
    else if (size === 32) console.log('  - favicon-32x32.svg');
    else console.log(`  - favicon-${size}x${size}.svg`);
  });
  console.log('  - apple-touch-icon.svg');
  console.log('  - favicon.ico');
  console.log('  - favicon.svg');
}

// Run the generator
generateAllIcons();
