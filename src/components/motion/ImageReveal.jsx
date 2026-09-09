import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/UseMediaQuery';

// Each variant defines a starting clip-path that resolves to a full rectangle.
const CLIP_VARIANTS = {
  curtain: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' }, // vertical curtain, left→right
  'curtain-reverse': { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0%)' },
  rise: { from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0%)' }, // rises from the bottom
  diagonal: { from: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', to: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
  frame: { from: 'inset(18% 18% 18% 18%)', to: 'inset(0% 0% 0% 0%)' }, // expands from a small frame
};

/**
 * Reveals an image (or any children) via a clip-path mask as it scrolls
 * into view, paired with a subtle 1.08 -> 1.0 scale settle on the image
 * itself. `variant` picks the mask shape so different sections can use a
 * different reveal language without duplicating the animation logic.
 */
export default function ImageReveal({
  src,
  alt = '',
  variant = 'curtain',
  duration = 1.1,
  delay = 0,
  className = '',
  imgClassName = '',
  once = true,
}) {
  const reduceMotion = usePrefersReducedMotion();
  const clip = CLIP_VARIANTS[variant] ?? CLIP_VARIANTS.curtain;

  if (reduceMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
      </div>
    );
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: clip.from }}
      whileInView={{ clipPath: clip.to }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.65, 0, 0.15, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once, amount: 0.25 }}
        transition={{ duration: duration + 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}