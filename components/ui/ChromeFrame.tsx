'use client'

import React from 'react'

interface ChromeFrameProps {
    children: React.ReactNode
    className?: string
    glowColor?: 'blood' | 'chrome' | 'none'
    thickness?: number
}

export function ChromeFrame({
    children,
    className = '',
    glowColor = 'none',
    thickness = 2
}: ChromeFrameProps) {

    const glowClasses = {
        blood: 'hover:shadow-[0_0_30px_rgba(220,20,60,0.4)] border-brand-red/30',
        chrome: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border-white/30',
        none: 'border-white/10'
    }

    return (
        <div className={`relative group ${className}`}>
            {/* Outer chrome border */}
            <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 via-transparent to-black/40 pointer-events-none z-20`}
                style={{ padding: thickness }}
            >
                <div className="w-full h-full bg-black/90 rounded-[inherit]" />
            </div>

            {/* Inner metallic frame */}
            <div
                className={`relative z-10 rounded-xl overflow-hidden transition-all duration-300 border ${glowClasses[glowColor]} bg-[#0a0a0a]`}
            >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>

                {children}
            </div>

            {/* Corner metallic accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/50 rounded-tl-lg z-30" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/50 rounded-tr-lg z-30" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/50 rounded-bl-lg z-30" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/50 rounded-br-lg z-30" />
        </div>
    )
}
