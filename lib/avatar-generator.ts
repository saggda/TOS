/**
 * Avatar Generator Utility
 * Creates SVG avatars with initials using brand colors
 */

import { BRAND_COLORS } from './image-generator';

export type AvatarGradient = 'red-purple' | 'purple-pink' | 'red-pink' | 'pink-red' | 'dark-gradient';

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Generate avatar gradient
 */
function generateAvatarGradient(id: string, type: AvatarGradient = 'red-purple'): string {
  const gradients: Record<AvatarGradient, string> = {
    'red-purple': `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.purple};stop-opacity:1" />
      </linearGradient>
    `,
    'purple-pink': `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${BRAND_COLORS.purple};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.pink};stop-opacity:1" />
      </linearGradient>
    `,
    'red-pink': `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.pink};stop-opacity:1" />
      </linearGradient>
    `,
    'pink-red': `
      <linearGradient id="${id}" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${BRAND_COLORS.pink};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
      </linearGradient>
    `,
    'dark-gradient': `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${BRAND_COLORS.dark};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
      </linearGradient>
    `,
  };

  return gradients[type] || gradients['red-purple'];
}

/**
 * Generate SVG avatar with glass effect
 */
export function generateAvatarSVG(
  name: string,
  gradientType: AvatarGradient = 'red-purple',
  size: number = 200
): string {
  const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;
  const initials = getInitials(name);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${generateAvatarGradient(gradientId, gradientType)}
    <filter id="glass-${gradientId}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
  </defs>

  <!-- Circle background with gradient -->
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="url(#${gradientId})"/>

  <!-- Glass effect overlay -->
  <ellipse cx="${size * 0.3}" cy="${size * 0.3}" rx="${size * 0.25}" ry="${size * 0.15}" fill="white" fill-opacity="0.15"/>

  <!-- Initials -->
  <text x="${size / 2}" y="${size / 2}" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central" letter-spacing="1">
    ${initials}
  </text>

  <!-- Subtle border -->
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="none" stroke="white" stroke-opacity="0.2" stroke-width="2"/>
</svg>`;
}

/**
 * Generate all avatars
 */
export async function generateAllAvatars(
  names: string[],
  outputDir: string = '/Users/danielsagdeew/Desktop/workhub/TOS2/promo-team-site/public/images/avatars'
): Promise<void> {
  try {
    const fs = await import('fs/promises');
    await fs.mkdir(outputDir, { recursive: true });

    console.log('🎨 Generating avatars...\n');

    const gradientTypes: AvatarGradient[] = ['red-purple', 'purple-pink', 'red-pink', 'pink-red', 'dark-gradient'];

    for (let i = 0; i < names.length; i++) {
      const gradientType = gradientTypes[i % gradientTypes.length];
      const svg = generateAvatarSVG(names[i], gradientType);
      const filepath = `${outputDir}/avatar-${i + 1}.svg`;
      await fs.writeFile(filepath, svg, 'utf-8');
      console.log(`✓ Generated: ${filepath}`);
    }

    console.log('\n✅ All avatars generated successfully!');
  } catch (error) {
    console.error('✗ Error generating avatars:', error);
    throw error;
  }
}

/**
 * Generate testimonial avatars
 */
export async function generateTestimonialAvatars(): Promise<void> {
  const names = ['Алексей', 'Мария', 'Дмитрий', 'Елена', 'Максим', 'Ольга'];
  await generateAllAvatars(names);
}

// Run if executed directly
if (require.main === module) {
  generateTestimonialAvatars().catch(console.error);
}
