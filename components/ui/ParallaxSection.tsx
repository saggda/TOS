'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
  disabled?: boolean;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  offset = 0,
  className = '',
  disabled = false
}: ParallaxSectionProps) {
  const { ref, transform } = useParallax(speed, offset);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        willChange: 'transform',
        transform: `translateY(${transform}px)`
      }}
    >
      {children}
    </motion.div>
  );
}
