import { z } from 'zod'

// Slug валидация
export const slugSchema = z.string()
  .min(1, 'Slug не может быть пустым')
  .max(100, 'Slug слишком длинный')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Неверный формат slug')
  .transform(val => val.toLowerCase())

export function validateSlug(slug: string): string {
  try {
    return slugSchema.parse(slug)
  } catch (error) {
    console.error('Invalid slug:', slug)
    throw new Error('Неверный формат идентификатора')
  }
}

// Валидация URL
export const urlSchema = z.string().url('Неверный формат URL')

export function validateUrl(url: string): string {
  try {
    return urlSchema.parse(url)
  } catch (error) {
    console.error('Invalid URL:', url)
    throw new Error('Неверный формат ссылки')
  }
}