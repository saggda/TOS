'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src?: string;
  fallback?: 'gradient' | 'solid';
  overlay?: 'gradient' | 'solid' | 'none';
  className?: string;
}

export function VideoBackground({
  src,
  fallback = 'gradient',
  overlay = 'gradient',
  className = ''
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || isMobile) return;

    video.load();

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => {
      setHasError(true);
      console.warn('Video failed to load, using fallback');
    };

    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
    };
  }, [src, isMobile]);

  // Don't render video on mobile or if no src provided
  if (isMobile || !src || hasError) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        {fallback === 'gradient' ? (
          <div className="h-full w-full bg-gradient-to-br from-brand-red/80 via-purple-900/70 to-black/60" />
        ) : (
          <div className="h-full w-full bg-brand-red/90" />
        )}
        {overlay === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
        )}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Overlay */}
      {overlay === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/80 via-purple-900/70 to-black/60" />
      )}
      {overlay === 'solid' && (
        <div className="absolute inset-0 bg-black/60" />
      )}
    </div>
  );
}
