'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { BilingualText } from '@/components/ui/BilingualText';

export function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = 150;

    const resize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = 150;
    };
    window.addEventListener('resize', resize);

    // Visualizer Bars
    const barWidth = 20;
    const gap = 4;
    const barCount = Math.ceil(width / (barWidth + gap));
    const bars: number[] = new Array(barCount).fill(0);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Simulating audio data
      for (let i = 0; i < barCount; i++) {
        const targetHeight = Math.random() * height * 0.6;
        bars[i] += (targetHeight - bars[i]) * 0.1;

        ctx.fillStyle = `rgba(220, 20, 60, ${0.3 + (bars[i] / height)})`; // Blood Red Transparency

        // Draw "Liquid" Bar (rounded top, slightly fluid)
        const x = i * (barWidth + gap);
        const h = bars[i];
        const y = height - h;

        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x, y + 10);
        ctx.quadraticCurveTo(x + barWidth / 2, y - 5, x + barWidth, y + 10);
        ctx.lineTo(x + barWidth, height);
        ctx.fill();

        // Glow
        ctx.shadowColor = '#DC143C';
        ctx.shadowBlur = 15;
      }

      requestAnimationFrame(animate);
    };

    const rafInfo = { id: requestAnimationFrame(animate) };

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafInfo.id);
    };
  }, []);

  return (
    <footer className="relative mt-20 border-t border-brand-blood/20 bg-black overflow-hidden">
      {/* Visualizer Background */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] opacity-50 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <Container className="relative z-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo area */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-hype text-4xl text-brand-crimson">217</h2>
            <p className="text-xs text-brand-dark/0 select-none">PROMO</p> {/* Hidden promo text as requested */}
          </div>

          {/* Navigation */}
          <div className="flex gap-8 text-sm font-bold tracking-widest">
            <Link href="/afisha" className="hover:text-brand-crimson transition-colors">
              <BilingualText en="EVENTS" ru="АФИША" />
            </Link>
            <Link href="/shop" className="hover:text-brand-crimson transition-colors">
              <BilingualText en="SHOP" ru="МАГАЗИН" />
            </Link>
            <Link href="/media" className="hover:text-brand-crimson transition-colors">
              <BilingualText en="MEDIA" ru="МЕДИА" />
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-end gap-2 text-[10px] text-gray-500 font-mono uppercase">
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-brand-crimson transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-brand-crimson transition-colors">
                Privacy
              </Link>
            </div>
            <p>© 2024 TOS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
