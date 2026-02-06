import { z } from 'zod'
import type { Event, Product, Post } from './types'

// ===== EVENT SCHEMA =====
export const eventSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  city: z.string().min(1),
  venue: z.string().min(1),
  poster: z.string().min(1), // Accepts both URLs and relative paths
  description: z.string().min(1),
  ticketUrl: z.string().url(),
  featured: z.boolean().optional().default(false),
})

export type EventInput = z.infer<typeof eventSchema>

// ===== PRODUCT SCHEMA =====
export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string()).min(1),
  colors: z.array(z.string()).optional().default([]),
  sizes: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
})

export type ProductInput = z.infer<typeof productSchema>

// ===== POST SCHEMA =====
export const postSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  type: z.string().optional(),
  cover: z.string().min(1), // Accepts both URLs and relative paths
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featured: z.boolean().optional().default(false),
})

export type PostInput = z.infer<typeof postSchema>

// ===== VALIDATION FUNCTIONS =====

/**
 * Валидация массива событий
 */
export function validateEvents(data: unknown[]): {
  valid: Event[]
  errors: string[]
  duplicates: string[]
} {
  const errors: string[] = []
  const duplicates: string[] = []
  const valid: Event[] = []
  const slugs = new Set<string>()

  data.forEach((item, index) => {
    try {
      const event = eventSchema.parse(item)

      // Проверка дубликатов
      if (slugs.has(event.slug)) {
        duplicates.push(event.slug)
        errors.push(`Duplicate slug at index ${index}: ${event.slug}`)
        return
      }

      slugs.add(event.slug)
      valid.push(event as Event)
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(`Event at index ${index}: ${error.issues.map((e: any) => e.message).join(', ')}`)
      }
    }
  })

  return { valid, errors, duplicates }
}

/**
 * Валидация массива продуктов
 */
export function validateProducts(data: unknown[]): {
  valid: Product[]
  errors: string[]
  duplicates: string[]
} {
  const errors: string[] = []
  const duplicates: string[] = []
  const valid: Product[] = []
  const slugs = new Set<string>()

  data.forEach((item, index) => {
    try {
      const product = productSchema.parse(item)

      if (slugs.has(product.slug)) {
        duplicates.push(product.slug)
        errors.push(`Duplicate slug at index ${index}: ${product.slug}`)
        return
      }

      slugs.add(product.slug)
      valid.push(product as Product)
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(`Product at index ${index}: ${error.issues.map((e: any) => e.message).join(', ')}`)
      }
    }
  })

  return { valid, errors, duplicates }
}

/**
 * Валидация массива постов
 */
export function validatePosts(data: unknown[]): {
  valid: Post[]
  errors: string[]
  duplicates: string[]
} {
  const errors: string[] = []
  const duplicates: string[] = []
  const valid: Post[] = []
  const slugs = new Set<string>()

  data.forEach((item, index) => {
    try {
      const post = postSchema.parse(item)

      if (slugs.has(post.slug)) {
        duplicates.push(post.slug)
        errors.push(`Duplicate slug at index ${index}: ${post.slug}`)
        return
      }

      slugs.add(post.slug)
      valid.push(post as Post)
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(`Post at index ${index}: ${error.issues.map((e: any) => e.message).join(', ')}`)
      }
    }
  })

  return { valid, errors, duplicates }
}