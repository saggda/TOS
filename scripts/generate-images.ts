/**
 * Generate all placeholder images
 */

import { generateAllPlaceholders } from '../lib/image-generator';

async function main() {
  try {
    await generateAllPlaceholders();
    process.exit(0);
  } catch (error) {
    console.error('Error generating images:', error);
    process.exit(1);
  }
}

main();
