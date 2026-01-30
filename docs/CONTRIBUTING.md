# Contributing Guide

Guide for contributors to the PROMO Team Site project.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Component Guidelines](#component-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Overview

Thank you for your interest in contributing! This guide will help you get started.

### Ways to Contribute

- **Bug fixes**: Fix reported issues
- **New features**: Add functionality
- **Documentation**: Improve docs
- **Content**: Add events, products, posts
- **Design**: UI/UX improvements
- **Performance**: Optimize code
- **Testing**: Add tests

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed and configured
- GitHub account
- Text editor (VS Code recommended)

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Fork and Clone

1. **Fork the repository**

   Click "Fork" button on GitHub

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/promo-team-site.git
   cd promo-team-site
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/promo-team-site.git
   ```

### Install Dependencies

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Branch Strategy

```bash
main          # Production code
└── feature/  # New features
└── fix/      # Bug fixes
└── docs/     # Documentation
└── refactor/ # Code refactoring
```

### Creating a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Code**
   ```bash
   npm run dev
   ```

2. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:

```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix(event-card): correct date formatting"
git commit -m "docs: update deployment guide"
```

### Syncing with Upstream

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your branch
git merge upstream/main

# Resolve conflicts if any
# Push to your fork
git push origin feature/your-feature
```

## Code Style

### TypeScript

**Use TypeScript for all files**:

```typescript
// ✅ Good
interface EventProps {
  event: Event
  onBook?: (eventId: string) => void
}

export function EventCard({ event, onBook }: EventProps) {
  // ...
}

// ❌ Bad
export function EventCard(props: any) {
  // ...
}
```

**Define types explicitly**:

```typescript
// lib/types.ts
export interface Event {
  id: string
  slug: string
  title: string
  // ...
}
```

### React Components

**Use function components**:

```typescript
// ✅ Good
export function Button({ variant, size, children }: ButtonProps) {
  return <button className={cn(styles[variant], styles[size])}>{children}</button>
}

// ❌ Avoid
class Button extends Component {
  // ...
}
```

**Server vs Client Components**:

```typescript
// Server component (default)
export default function EventList() {
  const events = await getEvents()
  return <div>{/* ... */}</div>
}

// Client component (interactive)
'use client'
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  return <div>{/* ... */}</div>
}
```

### Naming Conventions

**Components**: PascalCase
```typescript
// ✅ Good
export function EventCard() {}
export function ProductList() {}

// ❌ Bad
export function eventCard() {}
export const product_list = () => {}
```

**Files**: PascalCase for components
```
components/
├── EventCard.tsx      ✅
├── ProductList.tsx    ✅
└── event-card.tsx     ❌
```

**Utilities**: camelCase
```
lib/
├── content.ts        ✅
├── utils.ts          ✅
└── contentHelpers.ts ❌
```

### Imports

**Order imports**:

```typescript
// 1. React/Next.js
import Link from 'next/link'
import { useState } from 'react'

// 2. External libraries
import { motion } from 'framer-motion'

// 3. Internal components
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

// 4. Types
import type { Event } from '@/lib/types'

// 5. Utilities
import { cn } from '@/lib/utils'
```

**Use path aliases**:

```typescript
// ✅ Good
import { Button } from '@/components/ui/Button'
import { getEvents } from '@/lib/content'

// ❌ Bad
import { Button } from '../../../components/ui/Button'
import { getEvents } from '../../lib/content'
```

### Styling

**Use Tailwind CSS**:

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-lg">

// ❌ Bad
<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
```

**Use cn() for conditional classes**:

```typescript
// ✅ Good
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'primary' && 'primary-classes'
)}>

// ❌ Bad
<div className={`base-classes ${isActive ? 'active-classes' : ''}`}>
```

## Component Guidelines

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// 2. Types/Interfaces
interface MyComponentProps {
  title: string
  description?: string
  onAction?: () => void
}

// 3. Component
export function MyComponent({
  title,
  description,
  onAction
}: MyComponentProps) {
  // 4. Hooks
  const [state, setState] = useState(null)

  // 5. Event handlers
  const handleClick = () => {
    onAction?.()
  }

  // 6. Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```

### Props Default Values

```typescript
// ✅ Good
interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

export function Button({
  size = 'md',
  variant = 'primary'
}: Props) {
  // ...
}

// ❌ Bad
export function Button({ size, variant }: Props) {
  const finalSize = size ?? 'md'
  // ...
}
```

### Children Prop

```typescript
// ✅ Good - Use ReactNode
interface Props {
  children: React.ReactNode
}

// ❌ Bad - Too restrictive
interface Props {
  children: JSX.Element
}
```

## Content Guidelines

### Adding Events

Edit `content/events.json`:

```json
{
  "id": "event-unique-id",
  "slug": "event-slug",
  "title": "Event Title",
  "date": "2026-02-15",
  "city": "Moscow",
  "venue": "Club Name",
  "poster": "/images/events/poster.jpg",
  "description": "Full description",
  "ticketUrl": "https://ticket-service.com",
  "featured": true
}
```

**Rules**:
- `id` must be unique
- `slug` must be URL-friendly (kebab-case)
- `date` must be ISO format (YYYY-MM-DD)
- `poster` path must exist in `/public/images/events/`

### Adding Products

Edit `content/products.json`:

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
  "description": "Description",
  "featured": true
}
```

**Valid categories**: `tshirts`, `hoodies`, `caps`, `accessories`

### Adding Posts

Edit `content/posts.json`:

```json
{
  "id": "post-unique-id",
  "slug": "post-slug",
  "title": "Post Title",
  "date": "2026-01-15",
  "type": "photo",
  "cover": "/images/posts/cover.jpg",
  "excerpt": "Short excerpt",
  "content": "Full content...",
  "featured": true
}
```

**Valid types**: `photo`, `video`, `news`, `case`

## Testing

### Linting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Type Checking

```bash
# TypeScript compiler check
npx tsc --noEmit
```

### Build Check

```bash
# Production build
npm run build

# Check for build errors
```

### Manual Testing Checklist

Before submitting, verify:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] New component renders without errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] Images load properly
- [ ] Animations work smoothly
- [ ] Accessibility (keyboard navigation)

## Submitting Changes

### Pull Request Process

1. **Update your branch**

   ```bash
   git checkout main
   git pull upstream main
   git checkout feature/your-feature
   git merge main
   ```

2. **Push to your fork**

   ```bash
   git push origin feature/your-feature
   ```

3. **Create Pull Request**

   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Click "Create Pull Request"

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] Added tests (if applicable)
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] No linting errors
- [ ] Builds successfully
- [ ] Documentation updated

## Related Issues
Closes #issue-number
```

### PR Review Process

1. **Automated checks** pass
2. **Code review** by maintainers
3. **Address feedback**
4. **Approval** and merge

### What Happens Next

- Maintainers will review your PR
- Feedback will be provided (if any)
- Make requested changes
- PR will be merged when approved

## Reporting Issues

### Before Creating an Issue

1. **Search existing issues**
2. **Check documentation**
3. **Try to reproduce** the bug

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g. macOS, Windows]
- Browser: [e.g. Chrome, Firefox]
- Node version: [e.g. 18.0.0]
- npm version: [e.g. 9.0.0]

## Additional Context
Logs, error messages, etc.
```

### Feature Request Template

```markdown
## Feature Description
What feature would you like?

## Problem Statement
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives
What alternatives have you considered?

## Additional Context
Examples, mockups, etc.
```

## Project Structure

When contributing, follow the existing structure:

```
app/                  # Next.js pages (Server Components)
components/           # React components
├── layout/          # Layout components
├── ui/              # Reusable UI components
└── cards/           # Card components
lib/                 # Utilities and types
content/             # JSON content files
public/              # Static assets
docs/                # Documentation
```

## Best Practices

### Performance

- **Use Server Components** by default
- **Client Components** only when needed (interactivity)
- **Lazy load** heavy components
- **Optimize images** with Next.js Image

```typescript
// ✅ Good - Server Component
export default function Page() {
  const events = await getEvents()
  return <EventList events={events} />
}

// ✅ Good - Lazy loaded client component
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSkeleton />,
})
```

### Accessibility

```typescript
// ✅ Good - Accessible button
<button
  onClick={handleClick}
  aria-label="Close dialog"
  className="..."
>
  <CloseIcon />
</button>

// ✅ Good - Semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><Link href="/events">Events</Link></li>
  </ul>
</nav>
```

### Error Handling

```typescript
// ✅ Good - Error boundaries
export default async function EventPage({ params }) {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    notFound() // Next.js 404 page
  }

  return <EventDetail event={event} />
}
```

## Questions?

- **Documentation**: Check `/docs` folder
- **Issues**: Browse existing GitHub issues
- **Discussions**: Start a GitHub discussion

## Recognition

Contributors will be:
- Listed in contributors section
- Credited in release notes
- Mentioned in related features

Thank you for contributing! 🎉

---

For more information:
- [Architecture](./ARCHITECTURE.md)
- [Deployment](./DEPLOYMENT.md)
- [Main README](../README.md)
