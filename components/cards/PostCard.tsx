'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { useTilt } from '@/hooks/useTilt'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { ref, style, isHovered } = useTilt({
    max: 8,
    scale: 1.025,
    speed: 450
  })

  const trackClick = () => {
    console.log('post_click', { slug: post.slug })
  }

  const typeColors = {
    photo: 'bg-blue-500',
    video: 'bg-accent-purple',
    news: 'bg-brand-red',
    case: 'bg-accent-pink',
  }

  const typeIcons = {
    photo: '📷',
    video: '🎥',
    news: '📰',
    case: '💼',
  }

  return (
    <Link
      href={`/media/${post.slug}`}
      onClick={trackClick}
      className="block group touch-manipulation"
    >
      <div
        ref={ref}
        style={style}
        className="glass-card h-full overflow-hidden relative"
      >
        {/* Image */}
        <div className="aspect-[16/10] relative overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className={`${typeColors[post.type]} text-white text-xs font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1 sm:gap-1.5`}>
              <span>{typeIcons[post.type]}</span>
              <span className="capitalize">{post.type}</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDate(post.date)}
          </div>

          <h3 className="font-display font-bold text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-brand-red group-active:text-brand-red transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Hover/Touch indicator */}
          <div className="flex items-center gap-2 text-brand-red text-xs sm:text-sm font-medium mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 transform translate-z-10">
            <span>Читать</span>
            <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
