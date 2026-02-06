'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import { getPostBySlug } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Post } from '@/lib/types'
import { validateSlug } from '@/lib/validation'

export default function PostPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.slug) {
      try {
        const validatedSlug = validateSlug(params.slug as string)
        getPostBySlug(validatedSlug).then((data) => {
          setPost(data ?? null)
          setLoading(false)
          if (!data) {
            notFound()
          }
        }).catch(() => {
          notFound()
        })
      } catch (error) {
        console.error('Invalid slug:', error)
        notFound()
      }
    }
  }, [params.slug])

  if (loading) {
    return (
      <Container className="py-12">
        <p className="text-center text-white/70">Загрузка...</p>
      </Container>
    )
  }

  if (!post) {
    notFound()
  }

  const typeColors = {
    photo: 'bg-blue-500',
    video: 'bg-purple-500',
    news: 'bg-brand-red',
    case: 'bg-green-500',
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <a
          href="/media"
          className="inline-block mb-6 text-white/70 hover:text-brand-red transition-colors"
        >
          ← Назад к медиа
        </a>

        <article>
          {/* Cover Image */}
          <div className="aspect-[16/10] relative rounded-xl overflow-hidden mb-8">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-4">
            <span className={`${typeColors[post.type]} text-white text-xs px-3 py-1 rounded-full capitalize`}>
              {post.type}
            </span>
            <span className="text-white/70 text-sm drop-shadow-sm">{formatDate(post.date)}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">{post.title}</h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-white/90 leading-relaxed whitespace-pre-line drop-shadow-md">
              {post.content}
            </p>
          </div>
        </article>
      </div>
    </Container>
  )
}
