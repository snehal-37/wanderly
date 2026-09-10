import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE = [0.22, 1, 0.36, 1];

/**
 * ChapterMarker — a quiet editorial divider between acts of the page.
 * A hairline, a small Outsider-style number, and the act label. The number
 * and label reveal on their own cadence, so the reader registers a new
 * chapter of the journal rather than another section.
 */
export default function ChapterMarker({ number, label, tone = 'light', className = '' }) {
  const reduceMotion = usePrefersReducedMotion();
  const dark = tone === 'dark';

  return (
    <div className={`relative w-full max-w-7xl mx-auto px-6 sm:px-10 ${className}`} aria-hidden="true">
      <div className={`flex items-center gap-4 py-1 ${dark ? 'text-ivory/45' : 'text-ink/40'}`}>
        <motion.span
          className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase shrink-0"
          initial={reduceMotion ? false : { y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {String(number).padStart(2, '0')}
        </motion.span>

        <motion.span
          className={`flex-1 h-px ${dark ? 'bg-ivory/25' : 'bg-ink/20'}`}
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
          style={{ originX: 0 }}
        />

        <motion.span
          className="font-sans text-[10px] font-medium tracking-[0.34em] uppercase shrink-0"
          initial={reduceMotion ? false : { opacity: 0, letterSpacing: '0.5em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.34em' }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
        >
          {label}
        </motion.span>
      </div>
    </div>
  );
}