import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/UseMediaQuery';

/**
 * A container-scoped parallax image: as the container crosses the viewport,
 * the image translates at `strength` px and optionally scales slightly.
 * Keep `strength` modest (40–120) — this should read as depth, not a
 * carnival-ride background.
 */
export default function ParallaxImage({
  src,
  alt = '',
  strength = 80,
  scale = false,
  className = '',
  imgClassName = '',
}) {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const s = useTransform(scrollYProgress, [0, 1], scale ? [1.15, 1] : [1, 1]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: s }}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}