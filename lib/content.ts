import { Event, Product, Post, Testimonial } from './types'

export async function getEvents(): Promise<Event[]> {
  const events = await import('@/content/events.json')
  return events.default.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await getEvents()
  return events.find(event => event.slug === slug)
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents()
  return events.filter(event => event.featured)
}

export async function getProducts(): Promise<Product[]> {
  const products = await import('@/content/products.json')
  return products.default as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find(product => product.slug === slug)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(product => product.category === category)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(product => product.featured)
}

export async function getPosts(): Promise<Post[]> {
  const posts = await import('@/content/posts.json')
  return posts.default.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts()
  return posts.find(post => post.slug === slug)
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(post => post.featured)
}

export async function getPostsByType(type: string): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(post => post.type === type)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await import('@/content/testimonials.json')
  return testimonials.default as Testimonial[]
}

export async function getTestimonialById(id: string): Promise<Testimonial | undefined> {
  const testimonials = await getTestimonials()
  return testimonials.find(testimonial => testimonial.id === id)
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials()
  return testimonials.filter(testimonial => testimonial.featured)
}
