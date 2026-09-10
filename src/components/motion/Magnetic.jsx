import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion, useIsTouchDevice } from '../../hooks/UseMediaQuery';

/**
 * Magnetic — gently pulls its child toward the pointer within a small radius,
 * then springs back on leave. Deliberately restrained: operates on a fraction
 * of the offset so it reads as tactility, never a magnet carnival.
 *
 * Disabled for touch devices and prefers-reduced-motion (renders children as-is).
 */
export default function Magnetic({
  children,
  strength = 0.18,
  radius = 120,
  className = '',
  spring = { stiffness: 240, damping: 16, mass: 0.4 },
}) {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < radius) {
      // Fall off smoothly toward the edge of the capture radius.
      const falloff = 1 - dist / radius;
      x.set(dx * strength * falloff);
      y.set(dy * strength * falloff);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduceMotion || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}