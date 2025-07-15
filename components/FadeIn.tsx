'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  className?: string;
};

const directionsMap: Record<
  NonNullable<FadeInProps['direction']>,
  { opacity: number; x?: number; y?: number }
> = {
  up: { opacity: 0, y: 40 },
  down: { opacity: 0, y: -40 },
  left: { opacity: 0, x: 40 },
  right: { opacity: 0, x: -40 },
};

export default function FadeIn({
  children,
  direction = 'up',
  className = '',
  duration = 0.8,
  delay = 0.2,
}: FadeInProps) {
  const initial = directionsMap[direction] || { opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
