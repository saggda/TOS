/**
 * Image Generator Utility
 * Creates SVG placeholder images with brand gradients
 */

// Brand colors
export const BRAND_COLORS = {
  red: '#7A0F1C',
  purple: '#9333EA',
  pink: '#EC4899',
  dark: '#0A0A0A',
  light: '#FAFAFA',
};

export type GradientType = 'red-purple' | 'purple-pink' | 'red-pink' | 'diagonal' | 'radial';

/**
 * Generate SVG gradient definitions
 */
function generateGradient(
  id: string,
  type: GradientType = 'diagonal'
): string {
  const gradients: Record<GradientType, string> = {
    'diagonal': `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
        <stop offset="50%" style="stop-color:${BRAND_COLORS.purple};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.pink};stop-opacity:1" />
      </linearGradient>
    `,
    'red-purple': `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.purple};stop-opacity:1" />
      </linearGradient>
    `,
    'purple-pink': `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%">
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
    'radial': `
      <radialGradient id="${id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style="stop-color:${BRAND_COLORS.pink};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${BRAND_COLORS.red};stop-opacity:1" />
      </radialGradient>
    `,
  };

  return gradients[type] || gradients.diagonal;
}

/**
 * Generate SVG pattern overlay
 */
function generatePattern(patternId: string, opacity: number = 0.1): string {
  return `
    <pattern id="${patternId}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="white" fill-opacity="${opacity}"/>
    </pattern>
  `;
}

/**
 * Generate main SVG placeholder
 */
export function generateSVG(
  width: number,
  height: number,
  title: string,
  gradientType: GradientType = 'diagonal',
  includePattern: boolean = true
): string {
  const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;
  const patternId = `pattern-${Math.random().toString(36).substr(2, 9)}`;

  const fontSize = Math.min(width, height) * 0.08;
  const padding = 20;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${generateGradient(gradientId, gradientType)}
    ${includePattern ? generatePattern(patternId) : ''}
  </defs>

  <!-- Background gradient -->
  <rect width="${width}" height="${height}" fill="url(#${gradientId})"/>

  ${includePattern ? `<rect width="${width}" height="${height}" fill="url(#${patternId})"/>` : ''}

  <!-- Decorative circles -->
  <circle cx="${width * 0.1}" cy="${height * 0.1}" r="${Math.min(width, height) * 0.15}" fill="white" fill-opacity="0.1"/>
  <circle cx="${width * 0.9}" cy="${height * 0.9}" r="${Math.min(width, height) * 0.2}" fill="white" fill-opacity="0.05"/>

  <!-- Title text -->
  <text x="${width / 2}" y="${height / 2}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">
    ${title}
  </text>
</svg>`;
}

/**
 * Generate Event placeholder (3:4 aspect ratio)
 */
export function generateEventPlaceholder(
  index: number,
  title: string,
  width: number = 600,
  height: number = 800
): string {
  const gradientTypes: GradientType[] = ['diagonal', 'red-purple', 'purple-pink', 'red-pink', 'radial'];
  const gradientType = gradientTypes[index % gradientTypes.length];

  return generateSVG(width, height, title, gradientType, true);
}

/**
 * Generate Product placeholder (1:1 aspect ratio)
 */
export function generateProductPlaceholder(
  index: number,
  title: string,
  size: number = 800
): string {
  const gradientTypes: GradientType[] = ['red-pink', 'purple-pink', 'red-purple', 'diagonal', 'radial', 'diagonal'];
  const gradientType = gradientTypes[index % gradientTypes.length];

  return generateSVG(size, size, title, gradientType, true);
}

/**
 * Generate Post placeholder (16:10 aspect ratio)
 */
export function generatePostPlaceholder(
  index: number,
  title: string,
  width: number = 1600,
  height: number = 1000
): string {
  const gradientTypes: GradientType[] = ['purple-pink', 'red-pink', 'diagonal', 'red-purple', 'radial'];
  const gradientType = gradientTypes[index % gradientTypes.length];

  return generateSVG(width, height, title, gradientType, true);
}

/**
 * Save SVG to file
 */
export async function saveSVG(
  svg: string,
  filepath: string
): Promise<void> {
  try {
    const fs = await import('fs/promises');
    await fs.writeFile(filepath, svg, 'utf-8');
    console.log(`✓ Generated: ${filepath}`);
  } catch (error) {
    console.error(`✗ Error generating ${filepath}:`, error);
    throw error;
  }
}

/**
 * Generate all placeholders
 */
export async function generateAllPlaceholders(
  outputDir: string = '/Users/danielsagdeew/Desktop/workhub/TOS2/promo-team-site/public/images'
): Promise<void> {
  console.log('🎨 Generating SVG placeholders...\n');

  // Events (3:4 vertical)
  const events = [
    { index: 0, title: 'SUMMIT 2025' },
    { index: 1, title: 'WORKSHOP' },
    { index: 2, title: 'MEETUP' },
    { index: 3, title: 'CONFERENCE' },
    { index: 4, title: 'HACKATHON' },
  ];

  console.log('📅 Events (3:4 vertical):');
  for (const event of events) {
    const svg = generateEventPlaceholder(event.index, event.title);
    const filepath = `${outputDir}/events/event-${event.index + 1}.svg`;
    await saveSVG(svg, filepath);
  }

  // Products (1:1 square)
  const products = [
    { index: 0, title: 'COURSE #1' },
    { index: 1, title: 'COURSE #2' },
    { index: 2, title: 'MENTORING' },
    { index: 3, title: 'COMMUNITY' },
    { index: 4, title: 'BOOTCAMP' },
    { index: 5, title: 'TOOLKIT' },
  ];

  console.log('\n📦 Products (1:1 square):');
  for (const product of products) {
    const svg = generateProductPlaceholder(product.index, product.title);
    const filepath = `${outputDir}/products/product-${product.index + 1}.svg`;
    await saveSVG(svg, filepath);
  }

  // Posts (16:10 horizontal)
  const posts = [
    { index: 0, title: 'INSIGHT #1' },
    { index: 1, title: 'INSIGHT #2' },
    { index: 2, title: 'INSIGHT #3' },
    { index: 3, title: 'INSIGHT #4' },
    { index: 4, title: 'INSIGHT #5' },
  ];

  console.log('\n📝 Posts (16:10 horizontal):');
  for (const post of posts) {
    const svg = generatePostPlaceholder(post.index, post.title);
    const filepath = `${outputDir}/posts/post-${post.index + 1}.svg`;
    await saveSVG(svg, filepath);
  }

  console.log('\n✅ All placeholders generated successfully!');
}

// Run if executed directly
generateAllPlaceholders().catch(console.error);
