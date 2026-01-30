'use client';

import { useEffect, useState } from 'react';

export function CRTMonitorContent() {
  const [currentLine, setCurrentLine] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const lines = [
    '> INITIALIZING PROMO TEAM OS v2.0...',
    '> LOADING MODULES...',
    '  [OK] EVENT MANAGEMENT',
    '  [OK] MUSIC CURATION',
    '  [OK] MERCHANDISE',
    '  [OK] COMMUNITY',
    '',
    '> WELCOME TO PROMO TEAM',
    '> ELECTRONIC MUSIC EVENT SPECIALISTS',
    '',
    '> UPCOMING EVENTS: 50+',
    '> COMMUNITY SIZE: 10,000+',
    '> SINCE: 2024',
    '',
    '> CONNECT WITH US:',
    '  [ telegram ]',
    '  [ instagram ]',
    '',
    '> PRESS ANY BUTTON TO GLITCH_',
  ];

  const currentText = lines[currentLine] || '';

  useEffect(() => {
    if (!isTyping) {
      const lineTimer = setTimeout(() => {
        if (currentLine < lines.length - 1) {
          setCurrentLine(prev => prev + 1);
          setVisibleChars(0);
          setIsTyping(true);
        }
      }, 300);
      return () => clearTimeout(lineTimer);
    }

    const charTimer = setTimeout(() => {
      if (visibleChars < currentText.length) {
        setVisibleChars(prev => prev + 1);
      } else {
        setIsTyping(false);
      }
    }, Math.random() * 50 + 30);

    return () => clearTimeout(charTimer);
  }, [visibleChars, currentText, currentLine, isTyping, lines.length]);

  return (
    <div className="space-y-1 text-sm sm:text-base">
      {lines.slice(0, currentLine + 1).map((line, index) => {
        const isCurrentLine = index === currentLine;
        const displayText = isCurrentLine ? line.slice(0, visibleChars) : line;

        return (
          <div key={index} className="font-mono">
            <span className={isCurrentLine ? 'animate-pulse' : ''}>
              {displayText}
            </span>
            {isCurrentLine && <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />}
          </div>
        );
      })}
    </div>
  );
}
