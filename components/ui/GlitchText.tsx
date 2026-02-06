'use client'

import React from 'react'

interface GlitchTextProps {
    children: React.ReactNode
    className?: string
    intensity?: 'low' | 'medium' | 'high'
    trigger?: 'always' | 'hover'
    as?: keyof JSX.IntrinsicElements
}

export function GlitchText({
    children,
    className = '',
    intensity = 'medium',
    trigger = 'always',
    as: Component = 'span'
}: GlitchTextProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    const isActive = trigger === 'always' || (trigger === 'hover' && isHovered)

    return (
        <Component
            className={`relative inline-block ${className} ${isActive ? 'glitch-text-active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10">{children}</span>

            {isActive && (
                <>
                    <span
                        className="absolute top-0 left-0 w-full h-full select-none pointer-events-none opacity-70 animate-[glitch_0.3s_infinite] text-cyan-400 mix-blend-screen"
                        aria-hidden="true"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px, 2px)' }}
                    >
                        {children}
                    </span>
                    <span
                        className="absolute top-0 left-0 w-full h-full select-none pointer-events-none opacity-70 animate-[glitch_0.3s_infinite_reverse] text-magenta-500 mix-blend-screen"
                        aria-hidden="true"
                        style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)', transform: 'translate(2px, -2px)' }}
                    >
                        {children}
                    </span>
                </>
            )}
        </Component>
    )
}
