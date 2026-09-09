import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice, usePrefersReducedMotion } from '../hooks/UseMediaQuery';

/**
 * A subtle custom cursor that swaps to a small contextual label
 * ("VIEW", "EXPLORE", "DRAG") when hovering elements tagged with
 * data-cursor="LABEL". Disabled entirely on touch devices and when
 * reduced motion is requested — it never replaces the native cursor
 * on inputs, links needing precision, or mobile.
 */
export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reduceMotion = usePrefersReducedMotion();
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (isTouch || reduceMotion) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target.closest('[data-cursor]');
      setLabel(target ? target.getAttribute('data-cursor') : '');
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [isTouch, reduceMotion, x, y]);

  if (isTouch || reduceMotion) return null;

  const size = label ? 72 : 8;

  return (
    <motion.div
      className="wanderly-cursor"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
    >
      {label}
    </motion.div>
  );
}