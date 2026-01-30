'use client';

import { useEffect, useRef } from 'react';
import { useParticleSystem } from '@/hooks/useParticleSystem';

interface ParticleSystemProps {
  particleCount?: number;
  interactive?: boolean;
  className?: string;
}

export function ParticleSystem({
  particleCount = 50,
  interactive = true,
  className = ''
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useParticleSystem(canvasRef, prefersReducedMotion.current ? 20 : particleCount);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${interactive ? 'pointer-events-auto' : ''} ${className}`}
      style={{ opacity: prefersReducedMotion.current ? 0.3 : 1 }}
    />
  );
}
