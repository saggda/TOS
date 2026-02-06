import React from 'react'
import { getFeaturedTestimonials } from '@/lib/content'
import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export async function Testimonials() {
  const testimonials = await getFeaturedTestimonials()

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <Reveal variant="slide-up">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="text-brand-red font-medium mb-3 uppercase tracking-wider text-sm md:text-base drop-shadow-md">
              Отзывы
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-title font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
              Что говорят о нас
            </h2>
            <p className="text-white/80 text-base sm:text-lg md:text-xl drop-shadow-md">
              Мнения наших гостей и посетителей о событиях и мерче
            </p>
          </div>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Reveal key={testimonial.id} variant="slide-up" delay={index * 100}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>

        {/* Optional: View All Link */}
        <Reveal variant="fade-in" delay={400}>
          <div className="text-center mt-12 md:mt-16">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-brand-red font-semibold hover:text-accent-purple transition-colors duration-300 text-sm md:text-base group"
            >
              <span>Читать все отзывы</span>
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
