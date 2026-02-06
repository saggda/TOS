'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { ChromeFrame } from '../ui/ChromeFrame'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [imageError, setImageError] = useState(false)

  const trackClick = () => {
    console.log('post_click', { slug: post.slug })
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
      className="block group touch-manipulation no-underline"
    >
      <ChromeFrame glowColor="blood" thickness={2}>
        <div className="industrial-card metal-texture h-full relative overflow-hidden flex flex-col min-h-[350px]">
          {/* Image Section */}
          <div className="aspect-[16/10] relative overflow-hidden border-b border-brand-blood/20">
            {!imageError ? (
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0"
                onError={() => setImageError(true)}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
              />
            ) : (
              <div className="absolute inset-0 bg-brand-dark flex items-center justify-center">
                <span className="text-brand-chrome/50 text-xs uppercase tracking-widest">
                  No Image
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Type Badge - Blood Neon Style */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-brand-blood/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-3 py-1 border border-white/20 shadow-[0_0_10px_rgba(220,20,60,0.5)] flex items-center gap-1.5 uppercase tracking-wider">
                <span>{typeIcons[post.type]}</span>
                <span>{post.type}</span>
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 flex-grow flex flex-col relative z-20">
            {/* Date */}
            <div className="text-brand-chrome text-xs font-bold tracking-wider mb-3 flex items-center gap-2 opacity-80">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatDate(post.date)}
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-lg sm:text-xl mb-3 text-white leading-tight group-hover:text-brand-chrome transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
              {post.excerpt}
            </p>

            {/* Fake Read Button/Link Style */}
            <div className="mt-auto flex items-center gap-2 text-brand-blood text-xs sm:text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
              <span>Читать</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </ChromeFrame>
    </Link>
  )
}