'use client';

import React, { useEffect } from 'react';

export function InteractiveEffects() {
    useEffect(() => {
        const handleClick = () => {
            // Trigger temporary glitch class on body
            document.body.classList.add('glitch-active');

            // Remove after short duration
            setTimeout(() => {
                document.body.classList.remove('glitch-active');
            }, 200);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return null; // No canvas needed for CSS-based glitch
}
