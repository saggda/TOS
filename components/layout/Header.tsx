'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/Container'

const navLinks = [
  { href: '/afisha', label: 'Афиша' },
  { href: '/shop', label: 'Магазин' },
  { href: '/media', label: 'Медиа' },
  { href: '/about', label: 'О нас' },
]

const socialLinks = [
  { name: 'Telegram', href: 'https://t.me/', icon: '📱' },
  { name: 'Instagram', href: 'https://instagram.com/', icon: '📸' },
  { name: 'VK', href: 'https://vk.com/', icon: '💬' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const trackSocialClick = (platform: string) => {
    console.log('social_click', { platform })
  }

  return (
    <header className="glass-header sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gradient group-hover:scale-105 transition-transform">
              PROMO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 sm:px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  pathname === link.href
                    ? 'text-brand-red bg-brand-red/10'
                    : 'text-gray-700 hover:text-brand-red hover:bg-brand-red/5'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-red rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick(social.name)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/30 text-lg hover:scale-110 transition-all duration-300"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-gray-900 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/30 animate-slide-up">
            <nav className="py-4 sm:py-6 space-y-1 sm:space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-colors touch-manipulation ${
                    pathname === link.href
                      ? 'text-brand-red bg-brand-red/10'
                      : 'text-gray-700 hover:text-brand-red hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-2 sm:space-x-3 pt-4 sm:pt-6 px-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackSocialClick(social.name)}
                    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/30 text-lg sm:text-xl touch-manipulation"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}
