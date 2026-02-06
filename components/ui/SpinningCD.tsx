'use client'

import { useState, useEffect } from 'react'

interface SpinningCDProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    label?: string
    className?: string
    speed?: 'slow' | 'normal' | 'fast'
}

const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80 md:w-96 md:h-96',
}

const speedClasses = {
    slow: 'animate-[spin_8s_linear_infinite]',
    normal: 'animate-[spin_4s_linear_infinite]',
    fast: 'animate-[spin_2s_linear_infinite]',
}

export function SpinningCD({
    size = 'lg',
    label = '217',
    className = '',
    speed = 'normal'
}: SpinningCDProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className={`${sizeClasses[size]} rounded-full bg-chrome-dark/50 ${className}`} />
        )
    }

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* Blood glow behind - ENHANCED */}
            <div className="absolute inset-0 rounded-full bg-brand-red/40 blur-[60px] animate-pulse-slow" />
            <div className="absolute -inset-4 rounded-full bg-brand-crimson/20 blur-[80px] animate-pulse-slow delay-700" />

            {/* Main CD disc */}
            <div className={`relative ${sizeClasses[size]} ${speedClasses[speed]}`}>
                {/* Outer chrome ring with enhanced texture */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #4a4a4a 20%, #e8e8e8 40%, #ffffff 50%, #e8e8e8 60%, #4a4a4a 80%, #1a1a1a 100%)',
                        boxShadow: `
              0 0 60px rgba(139, 0, 0, 0.4),
              0 0 100px rgba(139, 0, 0, 0.2),
              inset 0 0 30px rgba(0, 0, 0, 0.8)
            `,
                    }}
                />

                {/* Animated chrome sweep */}
                <div className="absolute inset-0 rounded-full overflow-hidden mix-blend-overlay opacity-50">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent w-[200%] h-full animate-chrome-sweep" />
                </div>

                {/* CD grooves - concentric circles */}
                <div className="absolute inset-2 rounded-full overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border border-white/5"
                            style={{
                                inset: `${i * 4}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Chrome reflective shine - Organic */}
                <div
                    className="absolute inset-0 rounded-full opacity-60 mix-blend-color-dodge"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.8) 10%, transparent 20%, transparent 50%, rgba(255,255,255,0.6) 60%, transparent 70%)',
                    }}
                />

                {/* Data area - darker ring with noise */}
                <div
                    className="absolute rounded-full overflow-hidden"
                    style={{
                        inset: '15%',
                        background: 'linear-gradient(145deg, #050505, #151515, #252525)',
                    }}
                >
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] mix-blend-overlay" />
                </div>

                {/* Center label area - RED NEON */}
                <div
                    className="absolute rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                        inset: '35%',
                        background: 'radial-gradient(circle, #DC143C 0%, #8B0000 70%, #000000 100%)',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
                    }}
                >
                    {/* Glitch effect on label text */}
                    <div className="relative z-10 animate-glitch">
                        <span
                            className="font-black text-white text-xl md:text-2xl tracking-widest uppercase"
                            style={{
                                textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(220,20,60,0.8)',
                            }}
                        >
                            {label}
                        </span>
                    </div>
                </div>

                {/* Center hole */}
                <div
                    className="absolute rounded-full bg-black border border-white/10"
                    style={{
                        inset: '47%',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,1)',
                    }}
                />

                {/* Holographic rainbow effect - stronger */}
                <div
                    className="absolute inset-[15%] rounded-full opacity-40 pointer-events-none"
                    style={{
                        background: 'conic-gradient(from 0deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)',
                        mixBlendMode: 'color-dodge',
                    }}
                />
            </div>
        </div>
    )
}
