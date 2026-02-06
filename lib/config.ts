export const siteConfig = {
  name: 'TOS',
  title: 'TOS — TwoOneSeven | Underground Electronic Events',
  description: 'Электронные музыкальные ивенты, эксклюзивный мерч и DJ культура. Events that shake the underground.',

  // URLs из env
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Социальные сети
  social: {
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/num217',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/',
  },

  // Metadata
  ogImage: '/og-image.jpg',
  author: 'TOS / 217',
}