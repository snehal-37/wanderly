import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/UseMediaQuery';

const OFFSETS = {
  up: { y: 36, x: 0 },
  down: { y: -36, x: 0 },
  left: { y: 0, x: 48 },
  right: { y: 0, x: -48 },
  none: { y: 0, x: 0 },
};

/**
 * Wrap any element to have it reveal once as it enters the viewport.
 * `direction` controls the entry offset; `delay`/`duration` control pacing.
 * This is the single, shared reveal primitive — vary direction/delay per
 * section rather than inventing bespoke reveal logic per component.
 */
export default function ScrollReveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.9,
  amount = 0.3,
  className = '',
  ...rest
}) {
  const reduceMotion = usePrefersReducedMotion();
  const offset = OFFSETS[direction] ?? OFFSETS.up;
  const MotionTag = motion[Tag] ?? motion.div;

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}