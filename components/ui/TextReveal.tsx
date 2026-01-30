'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

type RevealVariant = 'fade-up' | 'typewriter' | 'blur-reveal' | 'mask-reveal';

interface TextRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  stagger?: number;
  delay?: number;
  className?: string;
  duration?: number;
}

// Split text into characters
function splitText(text: string): string[] {
  return text.split('');
}

// Variants for different animations
const variants: Record<RevealVariant, Variants> = {
  'fade-up': {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  'typewriter': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'blur-reveal': {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 }
  },
  'mask-reveal': {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0 0 0 0)', opacity: 1 }
  }
};

export function TextReveal({
  children,
  variant = 'fade-up',
  stagger = 0.03,
  delay = 0,
  className = '',
  duration = 0.5
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // If user prefers reduced motion, just render children without animation
  if (prefersReducedMotion.current) {
    return <span className={className}>{children}</span>;
  }

  const currentVariant = variants[variant];
  const transition = {
    duration,
    ease: [0.16, 1, 0.3, 1] as const
  };

  // Get text content from children
  const getText = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getText).join('');
    if (node && typeof node === 'object' && 'props' in node) {
      return getText((node.props as { children?: ReactNode }).children);
    }
    return '';
  };

  const text = getText(children);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {variant === 'mask-reveal' ? (
        // Mask reveal variant - animate entire word
        <motion.div
          initial="hidden"
          animate={hasAnimated ? 'visible' : 'hidden'}
          variants={currentVariant}
          transition={{ ...transition, delay }}
        >
          {children}
        </motion.div>
      ) : (
        // Character-by-character animation
        splitText(text).map((char, index) => (
          <motion.span
            key={index}
            initial="hidden"
            animate={hasAnimated ? 'visible' : 'hidden'}
            variants={currentVariant}
            transition={{
              ...transition,
              delay: delay + index * stagger
            }}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </motion.span>
        ))
      )}
    </div>
  );
}
