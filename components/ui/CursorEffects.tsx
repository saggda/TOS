'use client';

import { useEffect } from 'react';

interface CursorEffectsProps {
  showTrail?: boolean;
  showRipple?: boolean;
  magneticElements?: string;
}

export function CursorEffects({
  showTrail = false,
  showRipple = false, // Disabled by default per user request
  magneticElements = '' // Disabled magnetic for now as user requested removing "chase" effects which might include this
}: CursorEffectsProps) {

  // Magnetic effect logic - Keeping this just in case, but disabling defaults
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

  return null;
}
