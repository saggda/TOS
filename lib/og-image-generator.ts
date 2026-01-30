/**
 * OG Image Generator Script
 *
 * Для создания Open Graph изображений для социальных сетей.
 *
 * Использование:
 * 1. Создайте изображение размером 1200x630px
 * 2. Сохраните как og-image.jpg в public/
 *
 * Рекомендации:
 * - Используйте брендовые цвета (#EF4444, #8B5CF6)
 * - Добавьте логотип PROMO Team
 * - Включите краткий description
 * - Текст должен быть читаемым
 */

export const OG_IMAGE_CONFIG = {
  width: 1200,
  height: 630,
  format: 'jpg',
  quality: 90,
  path: '/og-image.jpg',
}

// Для создания OG изображения используйте Figma, Photoshop или другой дизайн-инструмент
// Или используйте сервисы вроде:
// - https://og-image.vercel.app/
// - https://www.cape.io/blog/open-graph-image-generator/
// - https://maketext.io/

export default OG_IMAGE_CONFIG
