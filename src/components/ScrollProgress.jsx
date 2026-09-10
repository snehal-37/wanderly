import { motion, useScroll, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

/**
 * ScrollProgress — a barely-there 1px clay hairline at the very top of the
 * viewport that tracks page progress. Kept almost invisible; it exists to
 * anchor the storytelling, not to decorate.
 */
export default function ScrollProgress() {
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px z-[80] origin-left bg-clay/70"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}