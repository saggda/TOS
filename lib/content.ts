import { Event, Product, Post, Testimonial } from './types'
import {
  validateEvents,
  validateProducts,
  validatePosts,
} from './content-validation'
import { sanitizeContent } from './content-sanitizer'

/**
 * Загрузка событий с валидацией
 */
export async function getEvents(): Promise<Event[]> {
  try {
    const eventsModule = await import('@/content/events.json')
    const eventsData = eventsModule.default as unknown[]

    const { valid, errors, duplicates } = validateEvents(eventsData)

    if (errors.length > 0) {
      console.error('⚠️ Content validation errors in events.json:')
      errors.forEach(err => console.error(`  - ${err}`))
    }

    if (duplicates.length > 0) {
      console.warn('⚠️ Duplicate slugs found:', duplicates.join(', '))
    }

    if (process.env.NODE_ENV === 'development' && errors.length > 0) {
      throw new Error(`Invalid events data:\n${errors.join('\n')}`)
    }

    // Применяем санитизацию к валидированным данным
    return valid.map(event => sanitizeContent(event)).sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  } catch (error) {
    console.error('❌ Failed to load events:', error)
    return []
  }
}

/**
 * Загрузка события по slug с валидацией
 */
export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  try {
    const events = await getEvents()
    return events.find(e => e.slug === slug)
  } catch (error) {
    console.error(`❌ Failed to load event "${slug}":`, error)
    return undefined
  }
}

/**
 * Загрузка продуктов с валидацией
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const productsModule = await import('@/content/products.json')
    const productsData = productsModule.default as unknown[]

    const { valid, errors, duplicates } = validateProducts(productsData)

    if (errors.length > 0) {
      console.error('⚠️ Content validation errors in products.json:')
      errors.forEach(err => console.error(`  - ${err}`))
    }

    if (duplicates.length > 0) {
      console.warn('⚠️ Duplicate slugs found:', duplicates.join(', '))
    }

    if (process.env.NODE_ENV === 'development' && errors.length > 0) {
      throw new Error(`Invalid products data:\n${errors.join('\n')}`)
    }

    // Применяем санитизацию к валидированным данным
    return valid.map(product => sanitizeContent(product) as Product)
  } catch (error) {
    console.error('❌ Failed to load products:', error)
    return []
  }
}

/**
 * Загрузка продукта по slug с валидацией
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const products = await getProducts()
    return products.find(p => p.slug === slug)
  } catch (error) {
    console.error(`❌ Failed to load product "${slug}":`, error)
    return undefined
  }
}

/**
 * Загрузка продуктов по категории
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(product => product.category === category)
}

/**
 * Загрузка постов с валидацией
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const postsModule = await import('@/content/posts.json')
    const postsData = postsModule.default as unknown[]

    const { valid, errors, duplicates } = validatePosts(postsData)

    if (errors.length > 0) {
      console.error('⚠️ Content validation errors in posts.json:')
      errors.forEach(err => console.error(`  - ${err}`))
    }

    if (duplicates.length > 0) {
      console.warn('⚠️ Duplicate slugs found:', duplicates.join(', '))
    }

    if (process.env.NODE_ENV === 'development' && errors.length > 0) {
      throw new Error(`Invalid posts data:\n${errors.join('\n')}`)
    }

    // Применяем санитизацию к валидированным данным
    return valid.map(post => sanitizeContent(post)).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('❌ Failed to load posts:', error)
    return []
  }
}

/**
 * Загрузка поста по slug с валидацией
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const posts = await getPosts()
    return posts.find(p => p.slug === slug)
  } catch (error) {
    console.error(`❌ Failed to load post "${slug}":`, error)
    return undefined
  }
}

/**
 * Загрузка отзывов с валидацией
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonialsModule = await import('@/content/testimonials.json')
    const testimonials = testimonialsModule.default as unknown[] as Testimonial[]
    
    // Применяем санитизацию к отзывам
    return testimonials.map(t => sanitizeContent(t) as Testimonial)
  } catch (error) {
    console.error('❌ Failed to load testimonials:', error)
    return []
  }
}

// Featured функции
export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents()
  return events.filter(e => e.featured)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(p => p.featured)
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(p => p.featured)
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials()
  return testimonials.filter(t => t.featured)
}