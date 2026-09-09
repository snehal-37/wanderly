import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/UseMediaQuery';

export default function Counter({ value, suffix = '', duration = 1.6, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}