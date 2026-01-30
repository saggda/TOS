'use client';

import { useEffect, useRef, useState } from 'react';

export function useParallax(speed: number = 0.5, offset: number = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let requestAnimationFrameId: number;

    const updateTransform = () => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const windowHeight = window.innerHeight;

      // Calculate how far the element is from the center of the viewport
      const distanceFromCenter = (elementTop - scrollTop) - windowHeight / 2;

      // Apply parallax based on scroll position and speed
      const parallaxValue = distanceFromCenter * speed + offset;

      setTransform(-parallaxValue);

      requestAnimationFrameId = requestAnimationFrame(updateTransform);
    };

    // Initial update
    updateTransform();

    // Update on scroll
    const handleScroll = () => {
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
      requestAnimationFrameId = requestAnimationFrame(updateTransform);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
    };
  }, [speed, offset]);

  return { ref, transform };
}
