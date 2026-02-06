/**
 * Санитизация текстового контента
 */
export function sanitizeText(text: string): string {
  if (typeof text !== 'string') return ''
  
  // Базовая санитизация - удаляем опасные символы
  return text
    .replace(/[<>]/g, '') // Удаляем < и >
    .replace(/javascript:/gi, '') // Удаляем javascript:
    .replace(/on\w+=/gi, '') // Удаляем обработчики событий
    .trim()
}

/**
 * Санитизация HTML (если понадобится)
 */
export function sanitizeHTML(html: string): string {
  if (typeof html !== 'string') return ''
  // Базовая санитизация HTML
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Удаляем скрипты
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Удаляем стили
    .replace(/on\w+\s*=/gi, '') // Удаляем обработчики событий
}

/**
 * Санитизация объекта продукта/события
 */
export function sanitizeContent<T extends Record<string, any>>(content: T): T {
  const sanitized: Record<string, any> = { ...content }

  // Санитизируем все строковые поля
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      // Если это URL - не санитизируем, иначе валидируем
      if (key.includes('url') || key.includes('href') || key.includes('link')) {
        continue
      }
      sanitized[key] = sanitizeText(sanitized[key] as string)
    }
  }

  return sanitized as T
}