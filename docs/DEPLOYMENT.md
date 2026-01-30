# Deployment Guide

Complete guide for deploying the PROMO Team Site to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Netlify Deployment](#netlify-deployment)
- [Docker Deployment](#docker-deployment)
- [Traditional Hosting](#traditional-hosting)
- [Environment Variables](#environment-variables)
- [Custom Domain](#custom-domain)
- [Performance Monitoring](#performance-monitoring)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- [x] Node.js 18+ installed
- [x] Git initialized
- [x] Code pushed to GitHub
- [x] Dependencies installed (`npm install`)
- [x] Build works locally (`npm run build`)

## Vercel Deployment (Recommended)

Vercel is the recommended platform for Next.js applications.

### Why Vercel?

- Zero configuration
- Automatic HTTPS
- Global CDN
- Preview deployments
- Analytics built-in
- Next.js creators

### Step-by-Step Deployment

#### 1. Prepare Your Repository

```bash
# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial commit: PROMO Team Site"

# Create GitHub repository
gh repo create promo-team-site --public --source=.

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/promo-team-site.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

**Option B: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Click **"Deploy"**

#### 3. Configure Project Settings

In Vercel dashboard:

**Build & Development Settings**:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

**Environment Variables** (optional):
```bash
# Add any environment variables here
# NEXT_PUBLIC_ANALYTICS_ID=your-id
```

#### 4. Automatic Deployments

Vercel automatically:
- Deploys on every push to `main`
- Creates preview URLs for pull requests
- Handles rollback to previous deployments

#### 5. Custom Domain

1. Go to **Settings** → **Domains**
2. Add your domain: `promo-team.com`
3. Configure DNS records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Wait for SSL certificate (automatic)

### Vercel Analytics

Enable built-in analytics:

1. Go to **Analytics** tab
2. Click **Enable Analytics**
3. Add to your project:

```bash
# Install
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Netlify Deployment

Netlify is another great option with similar features.

### Step-by-Step Deployment

#### 1. Build Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

#### 2. Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click **"Deploy site"**

#### 3. Environment Variables

Go to **Site settings** → **Environment variables**:

```bash
NODE_VERSION=18
```

#### 4. Custom Domain

1. **Domain settings** → **Add custom domain**
2. Configure DNS:

```
Type: A
Name: @
Value: 75.2.70.75

Type: CNAME
Name: www
Value: your-site.netlify.app
```

## Docker Deployment

For containerized deployments.

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Docker
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
```

### Build and Run

```bash
# Build image
docker build -t promo-team-site .

# Run container
docker run -p 3000:3000 promo-team-site
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## Traditional Hosting

For traditional VPS or shared hosting.

### Build for Production

```bash
# Install dependencies
npm install

# Build application
npm run build

# Start production server
npm start
```

### PM2 Process Manager

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start npm --name "promo-team" -- start

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

### PM2 Ecosystem File

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'promo-team-site',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
```

Start with:

```bash
pm2 start ecosystem.config.js
```

### Nginx Reverse Proxy

Configure Nginx:

```nginx
server {
    listen 80;
    server_name promo-team.com www.promo-team.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

### Required Variables

None required for basic deployment.

### Optional Variables

Create `.env.production`:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API Keys (if integrating services)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...

# Social Media Links
NEXT_PUBLIC_TELEGRAM=https://t.me/your-channel
NEXT_PUBLIC_INSTAGRAM=https://instagram.com/your-account
```

### Using Variables in Code

```typescript
// Access with NEXT_PUBLIC_ prefix
const gaId = process.env.NEXT_PUBLIC_GA_ID

// Server-side only variables
const apiKey = process.env.API_KEY
```

## Custom Domain

### DNS Configuration

#### For Vercel

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### For Netlify

```
Type: A
Name: @
Value: 75.2.70.75

Type: CNAME
Name: www
Value: your-site.netlify.app
```

### SSL/HTTPS

All recommended platforms provide:
- **Automatic SSL certificates**
- **HTTP/2 support**
- **Certificate renewal**
- **Security headers**

### Security Headers

Add to `next.config.js`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
}
```

## Performance Monitoring

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics 4

Create `app/layout.tsx`:

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}
```

### Performance Monitoring Tools

- **Lighthouse**: Core Web Vitals
- **PageSpeed Insights**: Google's performance tool
- **WebPageTest**: Detailed performance analysis
- **Vercel Speed Insights**: Built-in monitoring

### Performance Budgets

Set performance budgets in `package.json`:

```json
{
  "lighthouse": {
    "performance": 90,
    "accessibility": 100,
    "best-practices": 90,
    "seo": 100
  }
}
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Required Secrets

Add to GitHub repository settings:

- `VERCEL_TOKEN`: Your Vercel token
- `ORG_ID`: Vercel organization ID
- `PROJECT_ID`: Vercel project ID

## Troubleshooting

### Build Failures

**Issue**: Build fails on deployment

```bash
# Check build logs
# Common issues:
# - Missing dependencies: npm install
# - TypeScript errors: npm run lint
# - Import errors: Check file paths
```

### Image Optimization Issues

**Issue**: Images not loading

**Solution**: Update `next.config.js`:

```javascript
images: {
  unoptimized: true, // Disable optimization for debugging
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
}
```

### Environment Variables Not Working

**Issue**: `process.env` returns `undefined`

**Solution**:
- Variables must start with `NEXT_PUBLIC_` for client access
- Rebuild after changing variables
- Check platform's environment variables section

### Performance Issues

**Issue**: Slow page loads

**Solutions**:

1. **Check bundle size**:
```bash
npm run build
# Check output for bundle sizes
```

2. **Use dynamic imports**:
```tsx
const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
})
```

3. **Optimize images**:
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-fold images
/>
```

### Deployment Tips

1. **Always test locally first**:
```bash
npm run build
npm start
```

2. **Check Node.js version**:
```bash
node --version  # Should be 18+
```

3. **Clear cache**:
```bash
rm -rf .next node_modules
npm install
npm run build
```

4. **Verify environment**:
```bash
npm run dev
# Check console for errors
```

5. **Monitor deployment logs**:
- Vercel: Dashboard → Deployments → Click build
- Netlify: Deploys → Click build → Deploy log

## Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] All pages are accessible
- [ ] Images are displaying
- [ ] Links work properly
- [ ] Mobile responsive design
- [ ] Social links open correctly
- [ ] No console errors
- [ ] SEO meta tags present
- [ ] Analytics tracking works
- [ ] Performance scores (Lighthouse)
- [ ] SSL certificate valid
- [ ] Custom domain resolves
- [ ] Forms/submissions work (if any)

## Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Major updates
npx npm-check-updates -u
npm install
```

### Monitoring

- Check analytics weekly
- Monitor performance scores
- Review error logs
- Update content regularly

### Backup Strategy

For traditional hosting:

```bash
# Backup database/content
cp -r content content.backup.$(date +%Y%m%d)

# Backup to cloud
aws s3 sync content/ s3://your-bucket/backups/
```

---

For more information, see:
- [Architecture](./ARCHITECTURE.md)
- [Contributing](./CONTRIBUTING.md)
- [Next.js Docs](https://nextjs.org/docs)
