import { MetadataRoute } from 'next'
import { getEvents, getProducts, getPosts } from '@/lib/content'

const baseUrl = 'https://promoteam.ru' // Замените на реальный URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/afisha`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic routes - Events
  const events = await getEvents()
  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/afisha/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic routes - Products
  const products = await getProducts()
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dynamic routes - Posts
  const posts = await getPosts()
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/media/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Combine all routes
  return [...staticRoutes, ...eventRoutes, ...productRoutes, ...postRoutes]
}
