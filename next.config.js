/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'promoteam.ru', // Твой домен
      },
      {
        protocol: 'https',
        hostname: '**.kassir.ru', // Если используешь Kassir
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com', // Если нужны Instagram фото
      },
    ],
    // Добавь лимиты
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig
