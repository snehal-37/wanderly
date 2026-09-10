import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE = [0.22, 1, 0.36, 1];

/**
 * BackToTop — a round floating button with a chevron that appears once the
 * page is scrolled past `offset` and smooth-scrolls back to the top.
 */
export default function BackToTop({ offset = 900 }) {
  const [show, setShow] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  const goTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: reduceMotion ? 0 : 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          key="back-to-top"
          onClick={goTop}
          data-cursor="cta"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.85 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full bg-ink text-ivory border border-ivory/25 shadow-[0_18px_45px_-18px_rgba(8,8,4,0.85)] flex items-center justify-center hover:bg-pine active:scale-95 transition-colors duration-300"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}