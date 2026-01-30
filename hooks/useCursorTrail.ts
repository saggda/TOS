'use client';

import { useEffect, useRef, useState } from 'react';

export interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export function useCursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const trailsRef = useRef<TrailParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const mouseVelocity = useRef({ x: 0, y: 0 });

  // Brand colors for trail
  const colors = ['#7A0F1C', '#9333EA', '#EC4899'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Calculate velocity
      mouseVelocity.current = {
        x: e.clientX - lastMousePos.current.x,
        y: e.clientY - lastMousePos.current.y
      };

      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Create trail particle based on velocity
      const speed = Math.sqrt(
        mouseVelocity.current.x ** 2 + mouseVelocity.current.y ** 2
      );

      if (speed > 2) {
        trailsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: mouseVelocity.current.x * 0.1,
          vy: mouseVelocity.current.y * 0.1,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Update trails
      trailsRef.current = trailsRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        particle.alpha -= 0.02;
        particle.life -= 0.02;
        particle.size *= 0.98;

        return particle.life > 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return { mousePosition, trailsRef };
}
