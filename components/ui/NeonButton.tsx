'use client'

import React, { ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: 'blood' | 'chrome'
    glitchOnHover?: boolean
    href?: string
}

export function NeonButton({
    children,
    className = '',
    variant = 'blood',
    glitchOnHover = false,
    href,
    ...props
}: NeonButtonProps) {

    const baseClasses = "relative inline-flex items-center justify-center px-8 py-4 font-bold text-lg uppercase tracking-wider transition-all duration-300 overflow-hidden group"

    const variantClasses = {
        blood: "bg-black text-white border border-brand-red/50 shadow-[0_0_10px_rgba(139,0,0,0.3)] hover:shadow-[0_0_30px_rgba(220,20,60,0.6)] hover:border-brand-crimson hover:bg-brand-red/10",
        chrome: "bg-black text-white border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:border-white/80 hover:bg-white/10"
    }

    const content = (
        <>
            {/* Background sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

            {/* Text with optional glitch */}
            <span className={`relative z-10 ${glitchOnHover ? 'group-hover:animate-glitch' : ''}`}>
                {children}
            </span>

            {/* Neon border glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${variant === 'blood' ? 'bg-brand-red/5' : 'bg-white/5'}`} />
        </>
    )

    const classes = twMerge(baseClasses, variantClasses[variant], className)

    if (href) {
        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        )
    }

    return (
        <button className={classes} {...props}>
            {content}
        </button>
    )
}
