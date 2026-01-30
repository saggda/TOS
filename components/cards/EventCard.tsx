'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Event } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const trackClick = () => {
    console.log('event_click', { slug: event.slug })
  }

  return (
    <Link
      href={`/afisha/${event.slug}`}
      onClick={trackClick}
      className="block group touch-manipulation"
    >
      <div className="glass-card h-full overflow-hidden relative">
        {/* Image */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={event.poster}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />

          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-brand-red text-white text-xs font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full backdrop-blur-sm z-10">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="text-brand-red font-semibold text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)}
          </div>

          <h3 className="font-display font-bold text-lg sm:text-xl mb-2 text-white line-clamp-2">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-gray-400 mb-3 sm:mb-4">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs sm:text-sm">{event.city}, {event.venue}</span>
          </div>

          {/* Hover/Touch indicator - no animation */}
          <div className="flex items-center gap-2 text-brand-red text-xs sm:text-sm font-medium">
            <span>Подробнее</span>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
