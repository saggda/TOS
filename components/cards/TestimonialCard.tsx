'use client'

import React from 'react'
import Image from 'next/image'
import { Testimonial } from '@/lib/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? 'text-accent-orange' : 'text-white/20'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="glass-card h-full p-6 md:p-8 relative group touch-manipulation">
      {/* Quote Icon */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-6xl sm:text-8xl font-serif text-brand-red/5 group-hover:text-brand-red/10 transition-colors duration-300">
        ❝
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Rating */}
        <div className="flex items-center gap-0.5 sm:gap-1 mb-4 sm:mb-5">
          {renderStars(testimonial.rating)}
        </div>

        {/* Testimonial Text */}
        <blockquote className="flex-grow mb-5 sm:mb-6">
          <p className="text-sm sm:text-base text-white/90 leading-relaxed line-clamp-5 sm:line-clamp-none drop-shadow-sm">
            {testimonial.text}
          </p>
        </blockquote>

        {/* Author Info */}
        <div className="flex items-start gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-white/10">
          {/* Avatar */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-white/30 group-hover:ring-brand-red/50 transition-all duration-300">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Author Details */}
          <div className="flex-grow min-w-0">
            <h4 className="font-display font-bold text-sm sm:text-base text-white truncate drop-shadow-sm">
              {testimonial.name}
            </h4>
            <p className="text-xs sm:text-sm text-white/70 mb-1 sm:mb-1 truncate">
              {testimonial.role}
            </p>
            {testimonial.event && (
              <p className="text-xs text-brand-red/80 font-medium truncate flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {testimonial.event}
              </p>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-red/0 via-transparent to-accent-purple/0 group-hover:from-brand-red/5 group-hover:to-accent-purple/5 transition-all duration-500 pointer-events-none" />
      </div>
    </div>
  )
}
