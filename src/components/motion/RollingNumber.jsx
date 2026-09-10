import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/UseMediaQuery';

const EASE = [0.22, 1, 0.36, 1];
const CELL = 0.9; // each digit occupies 0.9em — matches the leading on the window

/**
 * Digit — a single counter column. The strip is translated by
 * `value * 0.9em` when the value is revealed, showing the target digit
 * through a hard-clipped window. Inline styles are used for the clip so
 * nothing (utility-class edge cases, inline-flex overflow rules) can
 * break the mask.
 */
function Digit({ value, delay, start }) {
  return (
    <span
      style={{ height: `${CELL}em`, overflow: 'hidden', display: 'block', lineHeight: 1 }}
      aria-hidden="true"
    >
      <motion.span
        style={{ display: 'flex', flexDirection: 'column' }}
        initial={{ y: '0em' }}
        animate={start ? { y: `-${value * CELL}em` } : { y: '0em' }}
        transition={{ delay, duration: 1.5, ease: EASE }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} style={{ height: `${CELL}em`, display: 'flex', alignItems: 'flex-end' }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/**
 * RollingNumber — a premium counter made of vertical digit reels.
 * Columns slide through 0→9 inside a masked window as soon as they enter
 * the viewport. Reduced motion renders the final value statically.
 */
export default function RollingNumber({ value, suffix = '', className = '' }) {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.55 });

  if (reduceMotion) {
    return (
      <span className={`inline-flex items-baseline ${className}`}>
        {value}
        {suffix && <span className="ml-0.5">{suffix}</span>}
      </span>
    );
  }

  const digits = String(value).split('').map(Number);

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`} role="text">
      <span
        style={{ height: `${CELL}em`, overflow: 'hidden', lineHeight: 1 }}
        className="inline-flex"
        aria-hidden="true"
      >
        {digits.map((d, i) => (
          <Digit key={`${i}-${d}`} value={d} delay={0.08 * i} start={inView} />
        ))}
      </span>
      {suffix && (
        <motion.span
          className="inline-block pl-1"
          initial={{ opacity: 0, x: 6 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}