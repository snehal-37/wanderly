import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Magnetic from './motion/Magnetic';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const LINKS = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Journal', href: '#inspiration' },
  { label: 'Stories', href: '#stories' },
];

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar({ ready = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState(-1);
  const { scrollY } = useScroll();
  const menuRef = useRef(null);
  const firstLinkRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setCompact(latest > 90);
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstLinkRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.key === 'Tab' && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll('a, button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <>
      <motion.nav
        initial={reduceMotion ? false : { y: -28, opacity: 0 }}
        animate={{
          y: ready ? 0 : -28,
          opacity: ready ? 1 : 0,
        }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="fixed top-0 left-0 right-0 z-[70] flex justify-center px-4 sm:px-6"
        role="navigation"
        aria-label="Main navigation"
      >
        <motion.div
          animate={{
            maxWidth: compact ? 920 : 1280,
            marginTop: compact ? 14 : 0,
          }}
          transition={{ duration: 0.6, ease: EASE }}
          className={`relative flex items-center justify-between w-full transition-[background-color,box-shadow,backdrop-filter,border-radius,padding] duration-500 ${
            compact
              ? 'rounded-full bg-ivory/80 backdrop-blur-md shadow-[0_16px_50px_-22px_rgba(20,20,15,0.45)] py-2 pr-2 pl-5'
              : 'rounded-none bg-transparent py-5 pr-0 pl-6'
          }`}
        >
          <a
            href="#top"
            aria-label="Wanderly — back to top"
            className="relative z-10 flex items-center transition-all duration-500"
          >
            {compact ? (
              <img
                src="/images/logo.png"
                alt="Wanderly"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            ) : (
              <span className="font-display text-2xl sm:text-3xl tracking-tight text-ivory drop-shadow-[0_2px_14px_rgba(20,20,15,0.5)]">
                Wanderly
              </span>
            )}
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  role="menuitem"
                  data-cursor="link"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(-1)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(-1)}
                  className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-500 ${
                    compact ? 'text-ink/70 hover:text-ink' : 'text-ivory/85 hover:text-ivory'
                  }`}
                >
                  {link.label}
                  <AnimatePresence>
                    {active === i && (
                      <motion.span
                        layoutId="nav-clay-indicator"
                        initial={{ opacity: 0, scaleX: 0.4 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.4 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.6 }}
                        className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-clay"
                        style={{ originX: 0.5 }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                </a>
              ))}
            </div>

            <Magnetic strength={0.22} radius={140} className="hidden sm:block">
              <button
                data-cursor="cta"
                className={`group relative text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-500 hover:scale-[1.02] active:scale-[0.97] inline-flex items-center gap-1.5 ${
                  compact
                    ? 'bg-ink text-ivory hover:bg-pine shadow-[0_8px_24px_-12px_rgba(20,20,15,0.6)]'
                    : 'border border-ivory/35 text-ivory hover:bg-ivory hover:text-ink'
                }`}
              >
                Plan a trip
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>

            <button
              onClick={() => setIsOpen(!isOpen)}
              data-cursor="link"
              className={`lg:hidden p-2 rounded-full transition-colors duration-500 ${
                compact ? 'text-ink' : 'text-ivory'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] bg-pine text-ivory flex flex-col justify-center px-8 sm:px-12"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="max-w-7xl w-full mx-auto">
              <div className="flex flex-col">
                {LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ y: 36, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.55, ease: EASE }}
                    className="group flex items-baseline gap-5 py-4 border-b border-ivory/10"
                  >
                    <span className="font-sans text-xs text-clay-light tracking-[0.25em]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-4xl sm:text-5xl transition-transform duration-500 group-hover:translate-x-2 group-hover:text-clay-light">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
                <motion.button
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + LINKS.length * 0.07, duration: 0.55, ease: EASE }}
                  className="mt-8 self-start inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full bg-clay text-ink hover:bg-clay-light transition-colors active:scale-[0.97]"
                  onClick={() => setIsOpen(false)}
                >
                  Plan a trip <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}