import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Loader — a short, premium intro. "WANDERLY" typeset against ivory with a
 * thin rule that expands beneath it, then the whole card is wiped away
 * upward like a film gate opening, revealing the hero underneath.
 *
 * Max ~1.5s. Skipped entirely (with instant hero) for reduced motion.
 */
export default function Loader({ onComplete }) {
  const [closing, setClosing] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (reduceMotion) {
      onCompleteRef.current?.();
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    const start = setTimeout(() => {
      document.documentElement.style.overflow = '';
      onCompleteRef.current?.();
      setClosing(true);
    }, 1050);

    return () => {
      clearTimeout(start);
      document.documentElement.style.overflow = '';
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[160] bg-ivory text-ink flex flex-col items-center justify-center"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      animate={closing ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: closing ? 0.9 : 0, ease: EASE }}
    >
      <div className="absolute top-8 left-8 sm:top-10 sm:left-10 flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] uppercase text-ink/40">
        <span className="w-5 h-px bg-ink/30 inline-block" />
        A travel journal
      </div>
      <div className="absolute bottom-8 right-8 sm:bottom-10 sm:right-10 font-sans text-[10px] tracking-[0.3em] uppercase text-ink/40">
        Vol. 01
      </div>

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="font-display text-[13vw] sm:text-5xl lg:text-6xl leading-none tracking-tight">
          Wanderly
        </p>

        <motion.div
          className="mt-6 h-px bg-ink/80"
          initial={{ width: 0 }}
          animate={{ width: 'min(56vw, 260px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        />

        <motion.p
          className="mt-5 font-sans text-[10px] tracking-[0.32em] uppercase text-ink/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Wander far · Wander soft
        </motion.p>
      </motion.div>
    </motion.div>
  );
}