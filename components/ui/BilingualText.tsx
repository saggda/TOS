'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BilingualTextProps {
    en: string;
    ru: string;
    className?: string;
    autoCaps?: boolean;
}

export function BilingualText({
    en,
    ru,
    className = '',
    autoCaps = true
}: BilingualTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className={cn(
                "relative inline-grid place-items-center group whitespace-nowrap min-w-fit",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ gridTemplateAreas: "'content'" }}
        >
            {/* English Text */}
            <motion.span
                className={cn(
                    "row-start-1 col-start-1 block pointer-events-none",
                    autoCaps && "uppercase"
                )}
                style={{ gridArea: "content" }}
                animate={{
                    opacity: isHovered ? 0 : 1,
                    y: isHovered ? -10 : 0,
                    filter: isHovered ? 'blur(4px)' : 'blur(0px)'
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {en}
            </motion.span>

            {/* Russian Text */}
            <motion.span
                className={cn(
                    "row-start-1 col-start-1 block text-brand-crimson font-hype pointer-events-none",
                    autoCaps && "uppercase"
                )}
                style={{ gridArea: "content" }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10,
                    filter: isHovered ? 'blur(0px)' : 'blur(4px)'
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {ru}
            </motion.span>
        </span >
    );
}
