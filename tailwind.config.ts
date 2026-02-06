import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#8B0000',
          crimson: '#DC143C',
          blood: '#6B0000',
          dark: '#0a0a0a',
          darker: '#050505',
        },
        chrome: {
          light: '#e8e8e8',
          mid: '#a0a0a0',
          dark: '#4a4a4a',
          shine: '#ffffff',
        },
        milk: {
          50: '#FAF7F4',
          100: '#F2F0ED',
          200: '#E8E4E0',
          300: '#D4D0CC',
        },
        accent: {
          silver: '#C0C0C0',
          steel: '#71797E',
          crimson: '#DC143C',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'Manrope', 'system-ui', 'sans-serif'],
        y2k: ['var(--font-russo)', 'system-ui', 'sans-serif'],
        hype: ['var(--font-syne)', 'sans-serif'],
      },
      fontSize: {
        'display': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'heading': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'title': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, rgba(122, 15, 28, 0.1) 0%, rgba(100, 10, 20, 0.05) 50%, rgba(50, 0, 0, 0.05) 100%)',
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-cd': 'spin 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'chrome-shine': 'chrome-shine 3s ease-in-out infinite',
        'chrome-sweep': 'chrome-sweep 4s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'chrome-sweep': {
          '0%, 100%': { transform: 'translateX(-200%)' },
          '50%': { transform: 'translateX(400%)' },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
          '75%': { opacity: '0.98' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-2px, 2px)' },
          '66%': { transform: 'translate(2px, -2px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
