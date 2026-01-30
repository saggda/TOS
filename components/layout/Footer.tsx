'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { useToast } from '@/hooks/useToast'

const navigationLinks = [
  { href: '/afisha', label: 'Афиша' },
  { href: '/shop', label: 'Магазин' },
  { href: '/media', label: 'Медиа' },
  { href: '/about', label: 'О нас' },
]

const quickLinks = [
  { href: '/privacy', label: 'Политика конфиденциальности' },
  { href: '/terms', label: 'Условия использования' },
  { href: '/faq', label: 'FAQ' },
  { href: '/support', label: 'Поддержка' },
]

const socialLinks = [
  { name: 'Telegram', href: 'https://t.me/', icon: '📱' },
  { name: 'Instagram', href: 'https://instagram.com/', icon: '📸' },
  { name: 'VK', href: 'https://vk.com/', icon: '💬' },
]

const contactInfo = {
  email: 'info@promo-team.ru',
  phone: '+7 (999) 123-45-67',
  address: 'Москва, Россия',
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [emailInput, setEmailInput] = useState('')
  const toast = useToast()

  const trackSocialClick = (platform: string) => {
    console.log('social_click', { platform })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('newsletter_signup', { email: emailInput })

    toast.success('Спасибо за подписку на рассылку!', 4000)

    setEmailInput('')
  }

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-brand-dark/5 to-purple-900/5" />

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl border-t border-white/50" />

      {/* Content */}
      <div className="relative">
        <Container>
          <div className="py-12 sm:py-16">
            {/* Main Footer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <Link href="/" className="inline-block mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gradient">PROMO</h3>
                </Link>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Event promo team. Creating unforgettable experiences since 2024.
                </p>

                {/* Social Links - Circle Buttons */}
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackSocialClick(social.name)}
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/60 hover:bg-brand-red hover:text-white backdrop-blur-sm border border-white/50 text-xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                      title={social.name}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                  Навигация
                </h4>
                <ul className="space-y-3">
                  {navigationLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-brand-red transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red/0 group-hover:bg-brand-red mr-2 transition-all duration-300" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                  Информация
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-brand-red transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red/0 group-hover:bg-brand-red mr-2 transition-all duration-300" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter & Contact */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                  Рассылка
                </h4>
                <form onSubmit={handleNewsletterSubmit} className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Ваш email"
                      className="flex-1 px-4 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all duration-300"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-red hover:bg-brand-dark text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                      Подписаться
                    </button>
                  </div>
                </form>

                {/* Contact Info */}
                <div className="space-y-3 text-sm">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center text-gray-600 hover:text-brand-red transition-colors duration-300 group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/60 group-hover:bg-brand-red group-hover:text-white mr-3 transition-all duration-300">
                      ✉
                    </span>
                    {contactInfo.email}
                  </a>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center text-gray-600 hover:text-brand-red transition-colors duration-300 group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/60 group-hover:bg-brand-red group-hover:text-white mr-3 transition-all duration-300">
                      📞
                    </span>
                    {contactInfo.phone}
                  </a>
                  <div className="flex items-center text-gray-600">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/60 mr-3">
                      📍
                    </span>
                    {contactInfo.address}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200/50 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                {/* Copyright */}
                <p className="text-center md:text-left">
                  © {currentYear} PROMO Team. Все права защищены.
                </p>

                {/* Bottom Links */}
                <div className="flex items-center space-x-6">
                  <Link
                    href="/privacy"
                    className="hover:text-brand-red transition-colors duration-300"
                  >
                    Конфиденциальность
                  </Link>
                  <Link
                    href="/terms"
                    className="hover:text-brand-red transition-colors duration-300"
                  >
                    Условия
                  </Link>
                  <Link
                    href="/cookies"
                    className="hover:text-brand-red transition-colors duration-300"
                  >
                    Cookies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
