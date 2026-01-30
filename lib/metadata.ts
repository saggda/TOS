import { Metadata } from 'next'

// Site configuration
export const siteConfig = {
  name: 'PROMO Team',
  title: 'PROMO Team - Event Promo Team',
  description: 'Event promo team creating unforgettable experiences. Electronic music events, exclusive merchandise, and media content.',
  url: 'https://promoteam.ru', // Замените на реальный URL
  ogImage: '/og-image.jpg', // Будет создано
  links: {
    telegram: 'https://t.me/',
    instagram: 'https://instagram.com/',
  },
}

// Base metadata types
interface PageMetadata {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

/**
 * Generate metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: PageMetadata): Metadata {
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url
  const ogImage = image || `${siteConfig.url}${siteConfig.ogImage}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'ru_RU',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  }
}

/**
 * Generate metadata for event pages
 */
export function generateEventMetadata(event: {
  title: string
  description: string
  slug: string
  image?: string
}): Metadata {
  const title = `${event.title} | PROMO Team`
  const url = `${siteConfig.url}/afisha/${event.slug}`
  const image = event.image || `${siteConfig.url}${siteConfig.ogImage}`

  return {
    title,
    description: event.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: event.description,
      url,
      siteName: siteConfig.name,
      locale: 'ru_RU',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: event.description,
      images: [image],
    },
  }
}

/**
 * Generate metadata for product pages
 */
export function generateProductMetadata(product: {
  title: string
  description: string
  slug: string
  image?: string
  price?: number
}): Metadata {
  const title = `${product.title} | PROMO Team Shop`
  const description = product.description || `Купить ${product.title} в магазине PROMO Team. Эксклюзивный мерч.`
  const url = `${siteConfig.url}/shop/${product.slug}`
  const image = product.image || `${siteConfig.url}${siteConfig.ogImage}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'ru_RU',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    other: {
      'product:price:amount': product.price?.toString() || '',
      'product:price:currency': 'RUB',
    },
  }
}

/**
 * Generate metadata for media/blog posts
 */
export function generatePostMetadata(post: {
  title: string
  description: string
  slug: string
  image?: string
  type?: string
}): Metadata {
  const title = `${post.title} | PROMO Team Media`
  const typeLabel = post.type ? `[${post.type}] ` : ''
  const description = post.description || `${typeLabel}${post.title}`
  const url = `${siteConfig.url}/media/${post.slug}`
  const image = post.image || `${siteConfig.url}${siteConfig.ogImage}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'ru_RU',
      type: 'article',
      publishedTime: new Date().toISOString(),
      authors: [siteConfig.name],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

/**
 * Generate metadata for listing pages (afisha, shop, media)
 */
export function generateListingMetadata(params: {
  title: string
  description: string
  path: string
}): Metadata {
  return generatePageMetadata({
    title: `${params.title} | PROMO Team`,
    description: params.description,
    path: params.path,
  })
}
