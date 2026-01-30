# Architecture Documentation

Detailed architecture overview of the PROMO Team Site.

## Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Routing Strategy](#routing-strategy)
- [Performance Optimization](#performance-optimization)
- [Design System](#design-system)
- [Animation System](#animation-system)

## System Overview

The PROMO Team Site is a **static-first Next.js application** using the App Router architecture. It follows a **component-based, page-centric** approach with JSON-based content management.

### Architecture Principles

1. **Static Generation**: Pre-render pages at build time for optimal performance
2. **Type Safety**: Full TypeScript coverage for reliability
3. **Component Reusability**: Shared components with variant support
4. **Progressive Enhancement**: Mobile-first, works without JavaScript
5. **Performance First**: Core Web Vitals optimization

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      Next.js App Router                      │
│  ┌───────────┐  ┌──────────┐  ┌──────────────────────┐     │
│  │  Pages    │  │ Layouts  │  │  Server Components    │     │
│  └───────────┘  └──────────┘  └──────────────────────┘     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐     │
│  │   Layout   │  │     UI     │  │      Cards         │     │
│  │ Components │  │ Components │  │    Components      │     │
│  └────────────┘  └────────────┘  └────────────────────┘     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────┐  ┌─────────┐  ┌────────────────────────┐      │
│  │   JSON   │  │  Types  │  │  Content Functions     │      │
│  │  Files   │  │  TS     │  │  (getEvents, etc.)     │      │
│  └──────────┘  └─────────┘  └────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Core Framework

**Next.js 14.2**
- App Router (not Pages Router)
- React Server Components
- Static Site Generation (SSG)
- File-based routing
- Optimized bundling

**React 18.3**
- Client Components (interactive features)
- Server Components (data fetching)
- Suspense boundaries
- Concurrent rendering

### Language & Tooling

**TypeScript 5.9**
- Strict mode enabled
- Path aliases (`@/`)
- Interface definitions
- Type inference

**Package Managers**
- npm (package management)
- npx (script execution)

### Styling

**Tailwind CSS 3.4**
- Utility-first CSS
- Custom design tokens
- Responsive utilities
- Dark mode ready

**PostCSS**
- Autoprefixer
- CSS nesting
- Custom properties

### Animation

**Framer Motion 12.29**
- Scroll-triggered animations
- Page transitions
- Gesture support
- Performance optimized

### UI Utilities

- **clsx**: Conditional class names
- **tailwind-merge**: Merge Tailwind classes
- **class-variance-authority**: Component variants

## Project Structure

### Directory Layout

```
promo-team-site/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (fonts, metadata)
│   ├── page.tsx                 # Homepage (server component)
│   ├── globals.css              # Global styles & Tailwind
│   │
│   ├── afisha/                  # Events section
│   │   ├── page.tsx            # Events listing page
│   │   └── [slug]/             # Dynamic event routes
│   │       └── page.tsx        # Event detail page
│   │
│   ├── shop/                    # Shop section
│   │   ├── page.tsx            # Products listing
│   │   └── [slug]/             # Dynamic product routes
│   │       └── page.tsx        # Product detail page
│   │
│   ├── media/                   # Media section
│   │   ├── page.tsx            # Media listing
│   │   └── [slug]/             # Dynamic post routes
│   │       └── page.tsx        # Post detail page
│   │
│   └── about/                   # About section
│       └── page.tsx            # About page
│
├── components/                   # React components
│   ├── layout/                 # Layout components (server)
│   │   ├── Header.tsx          # Navigation, social links
│   │   └── Footer.tsx          # Footer, links
│   │
│   ├── ui/                     # UI components (mixed)
│   │   ├── Button.tsx          # Button with variants
│   │   ├── Container.tsx       # Responsive container
│   │   └── Reveal.tsx          # Scroll animation wrapper
│   │
│   ├── cards/                  # Data cards (server)
│   │   ├── EventCard.tsx       # Event display
│   │   ├── ProductCard.tsx     # Product display
│   │   └── PostCard.tsx        # Post display
│   │
│   └── LoadingScreen.tsx       # Initial load animation (client)
│
├── content/                     # JSON content
│   ├── events.json             # Events data
│   ├── products.json           # Products data
│   └── posts.json              # Posts data
│
├── lib/                        # Utilities
│   ├── types.ts                # TypeScript interfaces
│   ├── content.ts              # Content loading functions
│   ├── utils.ts                # Helper functions (cn)
│   └── image-generator.ts      # Image generation script
│
├── public/                     # Static files
│   └── images/                 # Image assets
│       ├── events/            # Event posters
│       ├── products/          # Product photos
│       └── posts/             # Post covers
│
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md         # This file
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── CONTRIBUTING.md         # Contributing guide
│
└── Configuration Files
    ├── package.json            # Dependencies
    ├── tsconfig.json           # TypeScript config
    ├── tailwind.config.ts      # Tailwind config
    ├── next.config.js          # Next.js config
    └── postcss.config.js       # PostCSS config
```

### File Naming Conventions

- **Pages**: `page.tsx` (App Router convention)
- **Components**: `PascalCase.tsx`
- **Utilities**: `kebab-case.ts` or `camelCase.ts`
- **Types**: `types.ts` (colocated with usage)
- **Content**: `kebab-case.json`

## Component Architecture

### Component Hierarchy

```
app/layout.tsx (Root)
├── components/layout/Header.tsx
│   ├── components/ui/Button.tsx
│   └── components/ui/Container.tsx
│
└── {children}
    ├── app/page.tsx
    │   ├── components/cards/EventCard.tsx
    │   ├── components/cards/ProductCard.tsx
    │   ├── components/cards/PostCard.tsx
    │   └── components/ui/Reveal.tsx
    │
    ├── app/afisha/page.tsx
    └── app/afisha/[slug]/page.tsx
    └── ... (other pages)
```

### Component Types

#### Server Components (Default)

Most components are Server Components for optimal performance:

```tsx
// ✅ Server Component (no 'use client')
export default function HomePage() {
  const events = await getEvents()
  return <div>{events.map(...)}</div>
}
```

**Server Components**:
- `app/page.tsx` and all page files
- `components/cards/*` - Data presentation
- `components/layout/*` - Navigation, footer
- Can fetch data directly
- No client-side JavaScript

#### Client Components

Interactive components need `'use client'`:

```tsx
'use client'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  // ...
}
```

**Client Components**:
- `components/LoadingScreen.tsx`
- `components/layout/Header.tsx` (interactive menu)
- `components/ui/Reveal.tsx` (scroll listeners)

### Component Patterns

#### 1. Container Components

Server components that fetch and pass data:

```tsx
// app/page.tsx
export default async function HomePage() {
  const [events, products, posts] = await Promise.all([
    getFeaturedEvents(),
    getFeaturedProducts(),
    getFeaturedPosts(),
  ])

  return (
    <>
      <EventGrid events={events} />
      <ProductGrid products={products} />
      <PostGrid posts={posts} />
    </>
  )
}
```

#### 2. Presentational Components

Dumb components that receive props:

```tsx
// components/cards/EventCard.tsx
export function EventCard({ event }: { event: Event }) {
  return (
    <Card>
      <Image src={event.poster} alt={event.title} />
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <Button href={event.ticketUrl}>Buy Tickets</Button>
    </Card>
  )
}
```

#### 3. Variant Components

Components with multiple styles using CVA:

```tsx
// components/ui/Button.tsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        primary: "bg-brand-red text-white",
        secondary: "bg-gray-100 text-gray-900",
        ghost: "hover:bg-gray-100",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
      },
    },
  }
)
```

## Data Flow

### Content Loading Flow

```
User Request
    ↓
Next.js Server
    ↓
lib/content.ts
    ↓
content/*.json (Read files)
    ↓
TypeScript Validation (Types)
    ↓
Component Props
    ↓
Rendered HTML
```

### Content Functions

Located in `lib/content.ts`:

```typescript
// Get all events
export async function getEvents(): Promise<Event[]>

// Get featured events only
export async function getFeaturedEvents(): Promise<Event[]>

// Get event by slug
export async function getEventBySlug(slug: string): Promise<Event | null>

// Similar functions for products and posts
```

### Example Data Flow

```tsx
// 1. Server Component fetches data
export default async function EventPage({ params }) {
  const event = await getEventBySlug(params.slug)

  // 2. Pass to client component
  return <EventDetail event={event} />
}

// 3. Client component receives data
'use client'
export function EventDetail({ event }: { event: Event }) {
  const [liked, setLiked] = useState(false)
  // Interactive logic
}
```

## State Management

### Server State

**No server state management needed** - data is fetched per request:

```typescript
// Each page fetches fresh data
export default async function Page() {
  const events = await getEvents() // Always fresh
}
```

### Client State

**React Hooks** for local component state:

```typescript
// useState for local state
const [menuOpen, setMenuOpen] = useState(false)

// useEffect for side effects
useEffect(() => {
  // Track page view
}, [])

// useRef for DOM references
const observerRef = useRef<IntersectionObserver>()
```

### No Global State

**No Redux/Zustand needed** - app is mostly static:

- Data comes from JSON files
- No user sessions
- No complex state interactions
- Props drilling is minimal

## Routing Strategy

### File-Based Routing

```
app/
├── page.tsx              → /
├── afisha/
│   ├── page.tsx         → /afisha
│   └── [slug]/
│       └── page.tsx     → /afisha/:slug
├── shop/
│   ├── page.tsx         → /shop
│   └── [slug]/
│       └── page.tsx     → /shop/:slug
└── media/
    ├── page.tsx         → /media
    └── [slug]/
        └── page.tsx     → /media/:slug
```

### Dynamic Routes

```tsx
// app/afisha/[slug]/page.tsx
export default async function EventPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    notFound() // Next.js 404 page
  }

  return <EventDetail event={event} />
}
```

### Navigation

- **Link Component**: Client-side navigation
```tsx
import Link from 'next/link'
<Link href="/afisha">Events</Link>
```

- **usePathname**: Active link detection
```tsx
const pathname = usePathname()
const isActive = pathname === '/afisha'
```

### Metadata

Each page can define metadata:

```tsx
export const metadata = {
  title: 'Events | PROMO Team',
  description: 'Upcoming events and parties',
}
```

## Performance Optimization

### Static Generation

All pages are pre-rendered at build time:

```bash
npm run build
# Generates static HTML for all routes
```

**Benefits**:
- Instant page loads
- No server rendering latency
- CDN-friendly
- SEO-optimized

### Image Optimization

Next.js Image component for automatic optimization:

```tsx
import Image from 'next/image'

<Image
  src="/images/event.jpg"
  alt="Event"
  width={800}
  height={600}
  priority // Above-the-fold images
/>
```

**Features**:
- Automatic resizing
- WebP/AVIF conversion
- Lazy loading
- Responsive images

### Font Optimization

`next/font` for automatic font optimization:

```tsx
import { Space_Grotesk } from 'next/font/google'

const space = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
})
```

**Benefits**:
- Self-hosting (no Google Fonts requests)
- Automatic fallback
- Preloading
- No layout shift

### Code Splitting

Automatic code splitting by route:

```
/.next/static/chunks/
├── pages/          # Route-specific chunks
├── framework.js    # React/Next.js
├── main.js         # Main bundle
└── vendor.js       # Dependencies
```

### CSS Optimization

Tailwind CSS purges unused styles:

```bash
# Production build removes unused CSS
npm run build
# CSS size: ~10KB (minimized + gzipped)
```

## Design System

### Color System

```typescript
colors: {
  // Brand colors
  brand: {
    red: '#7A0F1C',      // Primary accent
    dark: '#8B1A1A',     // Darker accent
    darker: '#6B0D17',   // Deepest accent
  },

  // Neutral/Background
  milk: {
    50: '#FAF7F4',       // Primary background
    100: '#F7F4F1',      // Card background
    200: '#E8E4E0',      // Borders
    300: '#D4D0CC',      // Muted text
  },

  // Accent colors
  accent: {
    purple: '#9333EA',   // Secondary accent
    pink: '#EC4899',     // Highlights
    orange: '#F97316',   // Call-to-action
  },
}
```

### Typography System

```typescript
fontFamily: {
  // Display font (headings, hero)
  display: ['var(--font-space)', 'Manrope', 'sans-serif'],

  // Body font (content, UI)
  sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
},

fontSize: {
  'display': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
  'heading': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
  'title': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
},
```

### Spacing System

Tailwind's default spacing scale:

```typescript
// 4px base unit
spacing: {
  '0': '0px',
  '1': '0.25rem',   // 4px
  '2': '0.5rem',    // 8px
  '4': '1rem',      // 16px
  '6': '1.5rem',    // 24px
  '8': '2rem',      // 32px
  '12': '3rem',     // 48px
  '16': '4rem',     // 64px
  // ...
}
```

### Component Tokens

```typescript
// Buttons
'btn-primary': 'bg-brand-red text-white hover:bg-brand-dark'
'btn-secondary': 'bg-gray-100 text-gray-900 hover:bg-gray-200'

// Cards
'card': 'bg-white rounded-2xl shadow-lg hover:shadow-xl'

// Inputs
'input': 'border border-gray-200 rounded-lg px-4 py-2'
```

## Animation System

### Framer Motion Integration

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Reveal Component

Scroll-triggered animation wrapper:

```tsx
// components/ui/Reveal.tsx
export function Reveal({
  children,
  variant = 'fade-in',
  delay = 0,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
```

### Tailwind Animations

Custom animations in `tailwind.config.ts`:

```typescript
animation: {
  'fade-in': 'fade-in 0.6s ease-out',
  'slide-up': 'slide-up 0.6s ease-out',
  'scale-in': 'scale-in 0.4s ease-out',
  'shimmer': 'shimmer 2s linear infinite',
},

keyframes: {
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  'slide-up': {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
},
```

### Animation Patterns

#### Hero Animation
```tsx
<div className="animate-fade-in">Fade in on load</div>
<div className="animate-slide-up">Slide up on load</div>
```

#### Staggered List
```tsx
{items.map((item, i) => (
  <Reveal key={item.id} delay={i * 100}>
    <ItemCard item={item} />
  </Reveal>
))}
```

#### Hover Effects
```tsx
<div className="hover:scale-105 transition-transform duration-300">
  Scale on hover
</div>
```

### Performance Considerations

**Will-change/Layer Promotion**:
```tsx
// Promote to GPU layer for smooth animations
style={{ willChange: 'transform, opacity' }}
```

**Viewport Awareness**:
```tsx
// Only animate when in viewport
viewport={{ once: true, margin: '-100px' }}
```

**Reduced Motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

## Type Safety

### TypeScript Interfaces

```typescript
// lib/types.ts
export interface Event {
  id: string
  slug: string
  title: string
  date: string          // ISO date string
  city: string
  venue: string
  poster: string        // Image path
  description: string
  ticketUrl: string
  featured?: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  category: 'tshirts' | 'hoodies' | 'caps' | 'accessories'
  price: number
  images: string[]
  colors: string[]
  sizes: string[]
  description: string
  featured?: boolean
}

export interface Post {
  id: string
  slug: string
  title: string
  date: string
  type: 'photo' | 'video' | 'news' | 'case'
  cover: string
  excerpt: string
  content: string
  featured?: boolean
}
```

### Type Guards

```typescript
function isValidEvent(data: unknown): data is Event {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'slug' in data &&
    // ... other checks
  )
}
```

## Security Considerations

### Content Validation

```typescript
// Validate image paths
const VALID_PATHS = ['/images/events', '/images/products', '/images/posts']

function isValidImage(path: string): boolean {
  return VALID_PATHS.some(prefix => path.startsWith(prefix))
}
```

### External Links

```tsx
// All external links have rel="noopener noreferrer"
<a
  href={externalUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  Link
</a>
```

### No Database

**JSON-based CMS** means:
- No SQL injection risks
- No authentication needed
- Read-only content
- Simple security model

## Browser Support

### Target Browsers

- **Chrome/Edge**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Mobile**: iOS Safari 12+, Chrome Android

### Progressive Enhancement

- Core content works without JavaScript
- Enhanced experience with JS enabled
- Mobile-first responsive design
- Fallbacks for unsupported features

## Monitoring & Analytics

### Event Tracking

Console-based tracking (replace with real analytics):

```typescript
// Track ticket clicks
console.log('ticket_click', {
  eventId: event.id,
  eventName: event.title,
  timestamp: new Date().toISOString(),
})

// Track social clicks
console.log('social_click', {
  platform: 'telegram',
  source: 'header',
})
```

### Recommended Analytics

- **Google Analytics 4**: Free, comprehensive
- **Plausible**: Privacy-friendly, simple
- **Vercel Analytics**: Built-in, privacy-focused

## Testing Strategy

### Recommended Tests

```typescript
// Component tests
describe('EventCard', () => {
  it('renders event details', () => {})
  it('links to event page', () => {})
})

// Content tests
describe('Content Loading', () => {
  it('loads events from JSON', () => {})
  it('filters featured events', () => {})
})

// Accessibility tests
describe('Accessibility', () => {
  it('has valid ARIA labels', () => {})
  it('supports keyboard navigation', () => {})
})
```

### Testing Tools

- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **Lighthouse**: Performance testing

## Deployment Architecture

### Build Process

```bash
npm run build
# 1. TypeScript compilation
# 2. Next.js optimization
# 3. Static page generation
# 4. Asset optimization
# 5. Bundle analysis
```

### Output Structure

```
.next/
├── static/              # Static assets
│   ├── chunks/         # Code-split chunks
│   ├── media/          # Optimized images
│   └── css/            # CSS bundles
├── server/             # Server bundle (if needed)
└── prerender/          # Pre-rendered pages
```

### Edge Deployment

Ready for edge deployment:
- **Vercel Edge Network**: Global CDN
- **Cloudflare Workers**: Edge compute
- **Netlify Edge**: Edge functions

---

For deployment guides, see [DEPLOYMENT.md](./DEPLOYMENT.md)
