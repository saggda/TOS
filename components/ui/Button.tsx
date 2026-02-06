'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { MagneticButton } from './MagneticButton'
import { RippleButton } from './RippleButton'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-brand-red text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand-red/30',
        secondary: 'bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900',
        ghost: 'hover:bg-white/50 text-gray-900',
        link: 'text-brand-red underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-8',
        lg: 'h-14 px-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  href?: string
  target?: string
  rel?: string
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  magnetic?: boolean
  ripple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, href, target, rel, onClick, children, magnetic = true, ripple = true }, ref) => {
    const buttonContent = (
      <span className={cn(buttonVariants({ variant, size, className }))}>
        {children}
      </span>
    )

    // Авто-добавляем security для внешних ссылок
    const isExternal = href?.startsWith('http')
    const secureTarget = target || (isExternal ? '_blank' : undefined)
    const secureRel = rel || (isExternal && secureTarget === '_blank' ? 'noopener noreferrer' : undefined)

    if (href) {
      const link = (
        <a
          href={href}
          target={secureTarget}
          rel={secureRel}
          ref={ref as any}
          onClick={onClick}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </a>
      )

      if (magnetic) {
        return <MagneticButton className="inline-flex">{link}</MagneticButton>
      }
      return link
    }

    const buttonElement = (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        onClick={onClick}
      >
        {children}
      </button>
    )

    if (ripple) {
      if (magnetic) {
        return (
          <MagneticButton className="inline-flex">
            <RippleButton className={cn(buttonVariants({ variant, size, className }))}>
              {children}
            </RippleButton>
          </MagneticButton>
        )
      }
      return (
        <RippleButton className={cn(buttonVariants({ variant, size, className }))}>
          {children}
        </RippleButton>
      )
    }

    if (magnetic) {
      return (
        <MagneticButton className="inline-flex">
          {buttonElement}
        </MagneticButton>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }