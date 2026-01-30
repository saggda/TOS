'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CRTMonitorProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

export function CRTMonitor({
  children,
  className = '',
  intensity = 'medium',
  interactive = true
}: CRTMonitorProps) {
  const monitorRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

  // Intensity settings
  const intensitySettings = {
    low: { scanlineOpacity: 0.03, glow: 5, curvature: 2 },
    medium: { scanlineOpacity: 0.05, glow: 8, curvature: 3 },
    high: { scanlineOpacity: 0.08, glow: 12, curvature: 4 }
  };

  const settings = intensitySettings[intensity];

  // VHS noise effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const noise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0x00000000;
        }
      }

      ctx.putImageData(idata, 0, 0);
      requestAnimationFrame(noise);
    };

    noise();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse move handler for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !monitorRef.current) return;

    const rect = monitorRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / window.innerWidth);
    y.set((e.clientY - centerY) / window.innerHeight);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Glitch effect on click
  const handleClick = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);
  };

  return (
    <motion.div
      ref={monitorRef}
      className={`crt-monitor ${className}`}
      style={{
        perspective: '1000px',
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Monitor Frame */}
      <div className="crt-frame">
        {/* Screen Container */}
        <div
          ref={screenRef}
          className={`crt-screen ${isGlitching ? 'glitching' : ''}`}
          style={{
            '--scanline-opacity': settings.scanlineOpacity,
            '--glow-amount': `${settings.glow}px`,
            '--curvature-amount': `${settings.curvature}px`
          } as React.CSSProperties}
        >
          {/* Screen Content */}
          <div className="crt-content">
            {children}
          </div>

          {/* Scanlines Overlay */}
          <div className="crt-scanlines" />

          {/* CRT Overlay Effects */}
          <div className="crt-overlay">
            {/* Vignette */}
            <div className="crt-vignette" />

            {/* Screen Glow */}
            <div className="crt-glow" />

            {/* Horizontal Line */}
            <div className="crt-horizontal-line" />

            {/* RGB Separation Effect */}
            <div className="crt-rgb-split" />
          </div>

          {/* VHS Noise Canvas */}
          <canvas
            ref={canvasRef}
            className="crt-noise"
            style={{ opacity: intensity === 'high' ? 0.03 : 0.015 }}
          />
        </div>

        {/* Monitor Controls/Buttons */}
        <div className="crt-controls">
          <div className="crt-led" />
          <div className="crt-label">PROMO TV</div>
        </div>
      </div>

      {/* SVG Filters */}
      <svg className="svg-filters">
        <defs>
          {/* Chromatic Aberration Filter */}
          <filter id="crt-chromatic">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>

          {/* Glitch Displacement Filter */}
          <filter id="crt-displacement">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.00001"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
