'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorTrail } from '@/hooks/useCursorTrail';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface CursorEffectsProps {
  showTrail?: boolean;
  showRipple?: boolean;
  magneticElements?: string;
}

export function CursorEffects({
  showTrail = true,
  showRipple = true,
  magneticElements = 'button, a, .card'
}: CursorEffectsProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const { mousePosition, trailsRef } = useCursorTrail();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const rippleIdRef = useRef(0);

  // Draw trail on canvas
  useEffect(() => {
    if (!showTrail) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation loop for trail
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trails = trailsRef.current;
      trails.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [showTrail, trailsRef]);

  // Handle click ripple
  useEffect(() => {
    if (!showRipple) return;

    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        id: rippleIdRef.current++
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showRipple]);

  // Magnetic effect for elements
  useEffect(() => {
    if (!magneticElements) return;

    const elements = document.querySelectorAll(magneticElements);

    const handleMouseEnter = (_e: Event) => {
      const target = _e.target as HTMLElement;
      target.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent & { target: HTMLElement };
      const target = mouseEvent.target;
      const rect = target.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;

      target.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    };

    const handleMouseLeave = (_e: Event) => {
      const target = _e.target as HTMLElement;
      target.style.transform = 'translate(0, 0) scale(1)';
    };

    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mousemove', handleMouseMove as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mousemove', handleMouseMove as EventListener);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [magneticElements]);

  return (
    <>
      {/* Trail canvas */}
      {showTrail && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[40]"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="pointer-events-none fixed z-[50]"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-red via-purple-500 to-pink-500" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
