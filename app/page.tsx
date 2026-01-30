import Link from 'next/link'
import { getFeaturedEvents, getFeaturedProducts, getFeaturedPosts } from '@/lib/content'
import { EventCard } from '@/components/cards/EventCard'
import { ProductCard } from '@/components/cards/ProductCard'
import { PostCard } from '@/components/cards/PostCard'
import { Testimonials } from '@/components/sections/Testimonials'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { ParticleSystem } from '@/components/ui/ParticleSystem'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { TextReveal } from '@/components/ui/TextReveal'
import { ParallaxSection } from '@/components/ui/ParallaxSection'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'PROMO Team',
  description: 'Event promo team creating unforgettable experiences. Electronic music events, exclusive merchandise, and media content.',
})

export default async function HomePage() {
  const [events, products, posts] = await Promise.all([
    getFeaturedEvents(),
    getFeaturedProducts(),
    getFeaturedPosts(),
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-brand-red/20 rounded-full blur-3xl float" />
          <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent-purple/20 rounded-full blur-3xl float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-brand-red/10 to-accent-pink/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6 sm:mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-gray-200">Event Promo Team</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-y2k text-4xl sm:text-5xl md:text-heading lg:text-display font-bold mb-4 sm:mb-6 text-balance text-white">
              Creating <span className="text-gradient">unforgettable</span> experiences
            </h1>

            {/* Subheading */}
            <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Event promo team bringing you the best in electronic music, culture, and lifestyle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center animate-slide-up w-full sm:w-auto" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" className="btn-primary pulse-glow w-full sm:w-auto" href="/afisha">
                Афиша
              </Button>
              <Button size="lg" className="btn-secondary w-full sm:w-auto" href="/shop">
                Магазин
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-lg mx-auto mt-12 sm:mt-16 md:mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">50+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Events</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">10K+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">People</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">2024</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Started</div>
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />
        <Container className="relative">
          <Reveal variant="slide-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <p className="text-brand-red font-medium mb-2 uppercase tracking-wider text-xs sm:text-sm">Events</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-title font-bold">Ближайшие события</h2>
              </div>
              <Button variant="ghost" href="/afisha" className="flex items-center gap-2 text-sm">
                Все события
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.slice(0, 3).map((event, index) => (
              <Reveal key={event.id} variant="slide-up" delay={index * 100}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-accent-purple/5 pointer-events-none" />

        <Container className="relative">
          <Reveal variant="slide-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <p className="text-brand-red font-medium mb-2 uppercase tracking-wider text-xs sm:text-sm">Shop</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-title font-bold">Мерч</h2>
              </div>
              <Button variant="ghost" href="/shop" className="flex items-center gap-2 text-sm">
                Весь магазин
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 4).map((product, index) => (
              <Reveal key={product.id} variant="scale-in" delay={index * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      <section className="py-24 relative">
        <Container className="relative">
          <Reveal variant="slide-up">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-brand-red font-medium mb-2 uppercase tracking-wider text-sm">Media</p>
                <h2 className="font-display text-title font-bold">Медиа</h2>
              </div>
              <Button variant="ghost" href="/media" className="hidden md:flex items-center gap-2">
                Все материалы
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, index) => (
              <Reveal key={post.id} variant="slide-up" delay={index * 100}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <Reveal variant="fade-in">
        <Testimonials />
      </Reveal>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red via-brand-dark to-accent-purple" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Animated patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/20 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <Container className="relative z-10">
          <Reveal variant="fade-in">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="font-display text-heading md:text-title font-bold text-white mb-6">
                Следите за нами
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Подпишитесь на наши соцсети, чтобы не пропустить следующие события и эксклюзивный мерч
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-brand-red hover:bg-white/90" href="https://t.me/" target="_blank">
                  Telegram канал
                </Button>
                <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20" href="https://instagram.com/" target="_blank">
                  Instagram
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
