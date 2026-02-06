'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { EventCard } from '@/components/cards/EventCard'
import { ProductCard } from '@/components/cards/ProductCard'
import { PostCard } from '@/components/cards/PostCard'
import { getFeaturedEvents, getFeaturedProducts, getPosts } from '@/lib/content'
import { Event, Product, Post } from '@/lib/types'
import { NeonButton } from '@/components/ui/NeonButton'
import { LiquidGlassObject } from '../components/ui/LiquidGlassObject'
import { BilingualText } from '@/components/ui/BilingualText'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [latestPosts, setLatestPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    async function loadData() {
      const [eventsList, productsList, postsList] = await Promise.all([
        getFeaturedEvents(),
        getFeaturedProducts(),
        getPosts()
      ])
      setFeaturedEvents(eventsList)
      setFeaturedProducts(productsList)
      setLatestPosts(postsList.slice(0, 3))
      setLoading(false)
    }
    loadData()
  }, [])

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Central Liquid Glass Object */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <LiquidGlassObject />
        </div>

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full"
        >
          {/* Main Title "217" */}
          <div className="mb-8 relative group">
            <h1 className="font-hype text-[25vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-float select-none">
              217
            </h1>
            <div className="absolute inset-0 font-hype text-[25vw] leading-none text-brand-crimson opacity-0 group-hover:opacity-40 animate-glitch pointer-events-none mix-blend-screen" aria-hidden="true">
              217
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-wrap gap-4 justify-center">
              <NeonButton variant="blood" href="/afisha" className="w-[180px]">
                <BilingualText en="EVENTS" ru="АФИША" />
              </NeonButton>
              <NeonButton variant="chrome" href="/shop" className="w-[180px]">
                <BilingualText en="SHOP" ru="МАГАЗИН" />
              </NeonButton>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-dark/50 to-black pointer-events-none" />
        <Container className="relative z-10">
          <div className="flex justify-between items-end mb-12">
            <Reveal>
              <h2 className="font-hype text-4xl md:text-6xl mb-4">
                <BilingualText en="EVENTS" ru="АФИША" />
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <NeonButton variant="chrome" href="/afisha" className="hidden sm:inline-flex">
                <BilingualText en="ALL EVENTS" ru="ВСЕ СОБЫТИЯ" />
              </NeonButton>
            </Reveal>
          </div>

          {loading ? (
            <div className="text-center py-20 text-white/50">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event, i) => (
                <Reveal key={event.id} delay={i * 0.1}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Shop Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-blood to-transparent opacity-50"></div>

        <Container className="relative z-10">
          <div className="flex justify-between items-end mb-12">
            <Reveal>
              <h2 className="font-hype text-4xl md:text-6xl mb-4">
                <BilingualText en="DROP" ru="ДРОП" />
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <NeonButton variant="blood" href="/shop" className="hidden sm:inline-flex">
                <BilingualText en="GO TO SHOP" ru="В МАГАЗИН" />
              </NeonButton>
            </Reveal>
          </div>

          {loading ? (
            <div className="text-center py-20 text-white/50">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, i) => (
                <Reveal key={product.id} delay={i * 0.1}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Media Section */}
      <section className="py-24 relative">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <Reveal>
              <h2 className="font-hype text-4xl md:text-6xl mb-4">
                <BilingualText en="MEDIA" ru="МЕДИА" />
              </h2>
            </Reveal>
          </div>

          {loading ? (
            <div className="text-center py-20 text-white/50">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.1}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}
