'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Event } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { ChromeFrame } from '../ui/ChromeFrame'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false)

  const trackClick = () => {
    console.log('event_click', { slug: event.slug })
  }

  return (
    <Link
      href={`/afisha/${event.slug}`}
      onClick={trackClick}
      className="block group touch-manipulation no-underline"
    >
      <ChromeFrame glowColor="blood" thickness={2}>
        <div className="industrial-card metal-texture h-full relative overflow-hidden flex flex-col min-h-[400px]">
          {/* Image Section */}
          <div className="aspect-[3/4] relative overflow-hidden border-b border-brand-blood/20">
            {!imageError ? (
              <Image
                src={event.poster}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                onError={() => setImageError(true)}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
              />
            ) : (
              <div className="absolute inset-0 bg-[#1a1a1a] border border-brand-blood/20 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blood/10 to-transparent" />
                <span className="text-gray-500 text-[10px] uppercase tracking-[0.3em] relative z-10">No Image</span>
                <div className="w-8 h-[1px] bg-brand-blood/50 mt-2 relative z-10" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            {/* Featured Badge */}
            {event.featured && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-brand-blood/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-white/20 shadow-[0_0_10px_rgba(220,20,60,0.5)]">
                  Featured
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-5 flex-grow flex flex-col relative z-20">
            {/* Date & Location */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-brand-chrome text-lg font-bold tracking-wider drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                  {formatDate(event.date)}
                </span>
                <span className="text-gray-400 text-xs mt-1 uppercase tracking-wide flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {event.city}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-xl mb-6 text-white leading-tight group-hover:text-brand-chrome transition-colors flex-grow">
              {event.title}
            </h3>

            {/* Fake Neon Button */}
            <div className="w-full relative inline-flex items-center justify-center px-4 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-300 overflow-hidden bg-black text-white border border-brand-red/50 shadow-[0_0_10px_rgba(139,0,0,0.3)] group-hover:shadow-[0_0_20px_rgba(220,20,60,0.5)] group-hover:border-brand-crimson group-hover:bg-brand-red/10">
              {/* Background sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Билеты</span>
            </div>
          </div>
        </div>
      </ChromeFrame>
    </Link>
  )
}