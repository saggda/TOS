'use client'

import React from 'react'

interface LiquidChromeProps {
    className?: string
    style?: React.CSSProperties
}

export function LiquidChrome({ className = '', style }: LiquidChromeProps) {
    return (
        <div
            className={`absolute pointer-events-none opacity-60 mix-blend-screen overflow-hidden ${className}`}
            style={style}
        >
            <div
                className="w-full h-full liquid-chrome animate-float"
                style={{
                    filter: 'blur(40px) contrast(1.2)',
                    transform: 'scale(1.5)',
                }}
            />
            {/* Animated reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30 animate-chrome-shine" />
        </div>
    )
}
