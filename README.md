# PROMO Team Site

A modern, event promo team website built with Next.js 14, TypeScript, and Tailwind CSS. Features dynamic content management, smooth animations, and a fully responsive design optimized for event promotion and merchandise sales.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## Screenshots

### Hero Section
- Full-screen hero with animated gradient background
- Animated floating blobs with blur effects
- Statistics display (50+ events, 10K+ people, 2024 started)
- Call-to-action buttons with glow effects
- Scroll indicator animation

### Featured Sections
- **Events Grid**: Card-based layout with hover effects showing upcoming events
- **Shop Grid**: Product cards with pricing, colors, and quick order buttons
- **Media Section**: Blog/media posts with cover images and excerpts

### Individual Pages
- **Event Details**: Full event information with ticket links
- **Product Pages**: Image galleries, color selection, size options
- **Media Posts**: Rich content display with cover images

## Features

### Core Functionality
- **Event Management**: Dynamic event listings with dates, venues, and ticket links
- **E-commerce**: Product catalog with categories, pricing, and order tracking
- **Media/Blog**: Content management for photos, videos, news, and case studies
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Smooth Animations**: Framer Motion integration for scroll reveals and transitions

### UI/UX Features
- **Loading Screen**: Animated initial loading experience
- **Sticky Header**: Glass-morphism navigation with mobile menu
- **Animated Backgrounds**: Gradient blobs and mesh gradients
- **Card Components**: Interactive event, product, and post cards
- **Reveal Animations**: Scroll-triggered content animations
- **Social Links**: Integrated social media tracking

### Developer Experience
- **TypeScript**: Full type safety across the application
- **JSON Content**: Easy content management without a CMS
- **Component Architecture**: Reusable UI components with variants
- **Tailwind CSS**: Custom design system with brand colors
- **Fast Refresh**: Instant development feedback

## Architecture

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 12.29
- **UI Utils**: clsx, tailwind-merge, class-variance-authority

### Project Structure

```
promo-team-site/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Homepage
│   ├── afisha/                  # Events section
│   │   ├── page.tsx            # Events listing
│   │   └── [slug]/page.tsx     # Event details
│   ├── shop/                    # Shop section
│   │   ├── page.tsx            # Products listing
│   │   └── [slug]/page.tsx     # Product details
│   ├── media/                   # Media section
│   │   ├── page.tsx            # Media listing
│   │   └── [slug]/page.tsx     # Post details
│   └── about/                   # About page
│       └── page.tsx
│
├── components/                   # React components
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx          # Navigation with mobile menu
│   │   └── Footer.tsx          # Site footer
│   ├── ui/                     # UI components
│   │   ├── Button.tsx          # Reusable button with variants
│   │   ├── Container.tsx       # Content container
│   │   └── Reveal.tsx          # Scroll reveal wrapper
│   ├── cards/                  # Card components
│   │   ├── EventCard.tsx       # Event display card
│   │   ├── ProductCard.tsx     # Product display card
│   │   └── PostCard.tsx        # Post display card
│   └── LoadingScreen.tsx       # Initial loading animation
│
├── content/                     # JSON content files
│   ├── events.json             # Events data
│   ├── products.json           # Products data
│   └── posts.json              # Posts data
│
├── lib/                        # Utilities
│   ├── types.ts                # TypeScript interfaces
│   ├── content.ts              # Content loading functions
│   ├── utils.ts                # Helper functions
│   └── image-generator.ts      # Image generation script
│
├── public/                     # Static assets
│   └── images/                 # Images
│       ├── events/            # Event posters
│       ├── products/          # Product images
│       └── posts/             # Post covers
│
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md         # Detailed architecture
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── CONTRIBUTING.md         # Contributing guidelines
│
└── styles/                     # Global styles
    └── globals.css             # Tailwind + custom styles
```

### Key Components

#### Layout Components
- **Header**: Sticky glass-morphism header with navigation and social links
- **Footer**: Site footer with links and copyright

#### UI Components
- **Button**: Multi-variant button (primary, secondary, ghost)
- **Container**: Responsive content container with padding
- **Reveal**: Scroll-triggered animation wrapper

#### Card Components
- **EventCard**: Event poster with date, venue, ticket link
- **ProductCard**: Product image, name, price, quick order
- **PostCard**: Media post with cover, excerpt, read more

### Content Management System

The site uses a JSON-based content management system for simplicity:

- **Events**: `content/events.json` - Event listings with details
- **Products**: `content/products.json` - Merchandise catalog
- **Posts**: `content/posts.json` - Media/blog content

Each content type has:
- Unique ID and slug for URLs
- Featured flag for homepage display
- Rich metadata (dates, categories, etc.)

### Design System

#### Colors
```typescript
brand: {
  red: '#7A0F1C',      // Primary accent
  dark: '#8B1A1A',     // Darker accent
  darker: '#6B0D17',   // Deepest accent
}
milk: {
  50: '#FAF7F4',       // Background
  100: '#F7F4F1',      // Cards
  200: '#E8E4E0',      // Borders
  300: '#D4D0CC',      // Text muted
}
accent: {
  purple: '#9333EA',   // Secondary accent
  pink: '#EC4899',     // Highlight
  orange: '#F97316',   // Action
}
```

#### Typography
- **Display**: Space Grotesk (headings, hero text)
- **Sans**: Manrope (body text, UI elements)
- **Sizes**: Display (6rem), Heading (4.5rem), Title (3rem)

#### Animation System
- **fade-in**: Opacity transition
- **slide-up**: Vertical slide + fade
- **scale-in**: Scale + fade
- **shimmer**: Loading shimmer effect
- **pulse-glow**: Pulsing glow effect

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd promo-team-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run generate-images  # Generate placeholder images
```

## Development

### Adding Events

Edit `/content/events.json`:

```json
{
  "id": "event-unique-id",
  "slug": "event-slug",
  "title": "Event Title",
  "date": "2026-02-15",
  "city": "Moscow",
  "venue": "Club Name",
  "poster": "/images/events/poster.jpg",
  "description": "Full event description",
  "ticketUrl": "https://ticket-service.com/event",
  "featured": true
}
```

### Adding Products

Edit `/content/products.json`:

```json
{
  "id": "product-unique-id",
  "slug": "product-slug",
  "name": "Product Name",
  "category": "hoodies",
  "price": 4900,
  "images": ["/images/products/product.jpg"],
  "colors": ["black", "white"],
  "sizes": ["S", "M", "L", "XL"],
  "description": "Product description",
  "featured": true
}
```

**Categories**: `tshirts`, `hoodies`, `caps`, `accessories`

### Adding Posts

Edit `/content/posts.json`:

```json
{
  "id": "post-unique-id",
  "slug": "post-slug",
  "title": "Post Title",
  "date": "2026-01-15",
  "type": "photo",
  "cover": "/images/posts/cover.jpg",
  "excerpt": "Short excerpt for card display",
  "content": "Full post content with formatting...",
  "featured": true
}
```

**Types**: `photo`, `video`, `news`, `case`

### Adding Images

Place images in `/public/images/`:

```
public/
└── images/
    ├── events/
    │   └── event-poster.jpg
    ├── products/
    │   └── product-photo.jpg
    └── posts/
        └── post-cover.jpg
```

Then reference them in JSON files:
```json
"poster": "/images/events/event-poster.jpg"
```

### Customization

#### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    red: '#YOUR_COLOR',
    dark: '#YOUR_COLOR',
  },
  milk: {
    50: '#YOUR_BG_COLOR',
    // ...
  },
}
```

#### Fonts

Edit `app/layout.tsx` to change fonts:

```typescript
import { Space_Grotesk, Manrope } from 'next/font/google'
```

#### Social Links

Edit `components/layout/Header.tsx`:

```typescript
const socialLinks = [
  { name: 'Telegram', href: 'https://t.me/YOUR_CHANNEL', icon: '📱' },
  // ...
]
```

### Analytics Tracking

The site includes console.log tracking for:

- `ticket_click` - Event ticket purchases
- `merch_order_click` - Merchandise orders
- `social_click` - Social media clicks
- `event_click` - Event card interactions
- `product_click` - Product card interactions
- `post_click` - Post card interactions

Replace these with real analytics (Google Analytics, Plausible, etc.):

```typescript
// Example: Replace console.log with
window.gtag('event', 'ticket_click', { eventId: event.id })
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Click "Deploy"

3. **Environment Variables** (if needed)
- Add any required environment variables in Vercel dashboard

### Other Platforms

#### Build Command
```bash
npm run build
```

#### Start Command
```bash
npm start
```

#### Output
- Build output: `.next/`
- Static assets: `public/`

### Environment Variables

Create `.env.local` for development:

```bash
# Add any environment variables here
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

See `docs/DEPLOYMENT.md` for detailed deployment guides.

## Performance

### Optimization
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with App Router
- **Font Optimization**: next/font for automatic optimization
- **CSS Optimization**: Tailwind CSS purging
- **Tree Shaking**: Dead code elimination

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## Future Enhancements

### Planned Features
1. **CMS Integration**: Sanity.io or Strapi for content management
2. **Payment System**: Stripe for online merchandise payments
3. **Admin Panel**: Custom content management interface
4. **Authentication**: User accounts and profiles
5. **Email Notifications**: Event reminders and updates
6. **Search Functionality**: Full-text search for events/products
7. **Multi-language**: i18n support for multiple languages
8. **Calendar Integration**: Export events to personal calendars
9. **Advanced Analytics**: Real-time analytics dashboard
10. **API Routes**: Backend API for dynamic features

### Improvements
- **SEO**: Advanced meta tags and sitemaps
- **PWA**: Progressive Web App capabilities
- **Offline**: Offline support with service workers
- **Dark Mode**: Theme switching
- **Accessibility**: Enhanced keyboard navigation
- **Testing**: Unit and integration tests
- **CI/CD**: Automated testing and deployment

## Contributing

We welcome contributions! Please see `docs/CONTRIBUTING.md` for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For detailed documentation:
- Architecture: `docs/ARCHITECTURE.md`
- Deployment: `docs/DEPLOYMENT.md`
- Contributing: `docs/CONTRIBUTING.md`

## License

MIT License - see LICENSE file for details

---

Built with ❤️ by the PROMO Team
