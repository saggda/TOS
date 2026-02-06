'use client';

import React from 'react';

export function LiquidGlassObject() {
    return (
        <div className="relative w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] animate-pulse-slow">
            {/* Inner Glowing Core */}
            <div className="absolute inset-0 bg-brand-crimson/20 rounded-full blur-[100px] animate-pulse" />

            {/* Liquid Chrome Shape (CSS representation) */}
            <div className="absolute inset-20 bg-gradient-to-br from-chrome-shine via-chrome-mid to-chrome-dark rounded-full opacity-30 blur-3xl animate-blob mix-blend-overlay" />

            {/* Glass Reflections */}
            <div className="absolute inset-0 rounded-full border border-white/10 opacity-20 scale-90 rotate-45" />
            <div className="absolute inset-0 rounded-full border border-white/5 opacity-10 scale-110 -rotate-12" />
        </div>
    );
}
