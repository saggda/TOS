'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: ReactNode;
  options?: {
    lerp?: number;
    duration?: number;
    orientation?: 'vertical' | 'horizontal';
    wheelMultiplier?: number;
  };
}

export function SmoothScroll({
  children,
  options = { lerp: 0.15, duration: 1.5 }
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return; // Don't initialize smooth scroll for users who prefer reduced motion
    }

    // Initialize Lenis
    lenisRef.current = new Lenis({
      lerp: options.lerp || 0.15,
      duration: options.duration || 1.5,
      orientation: options.orientation || 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: options.wheelMultiplier || 1,
      touchMultiplier: 1.5, // Slightly responsive touch
      smoothWheel: true,
      infinite: false,
    });

    // Start animation loop
    let rafId: number;
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
    };
  }, [options]);

  return <>{children}</>;
}
