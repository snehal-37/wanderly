import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Journal', href: '#inspiration' },
  { label: 'Stories', href: '#stories' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  const menuRef = useRef(null);
  const firstLinkRef = useRef(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setCompact(latest > 80);
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
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
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          paddingTop: compact ? '0.75rem' : '1.5rem',
          paddingBottom: compact ? '0.75rem' : '1.5rem',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 flex items-center justify-between transition-colors duration-500 ${
          compact ? 'bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(20,20,15,0.08)]' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className={`font-display text-xl sm:text-2xl tracking-tight transition-colors duration-500 ${
            compact ? 'text-ink' : 'text-ivory'
          }`}
        >
          Wanderly
        </a>

        <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium tracking-wide" role="menubar">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              role="menuitem"
              className={`relative transition-colors duration-500 group py-1 ${
                compact ? 'text-ink/70 hover:text-ink' : 'text-ivory/80 hover:text-ivory'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-clay transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <button
            className={`text-[13px] font-medium px-5 py-2.5 rounded-full border transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${
              compact
                ? 'border-ink/15 text-ink hover:bg-ink hover:text-ivory'
                : 'border-ivory/30 text-ivory hover:bg-ivory hover:text-ink'
            }`}
          >
            Plan a trip
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors duration-500 ${
            compact ? 'text-ink hover:bg-ink/5' : 'text-ivory hover:bg-ivory/10'
          }`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.15, 1] }}
            className="fixed inset-0 z-30 bg-pine text-ivory flex flex-col justify-center px-8 sm:px-12"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl sm:text-5xl py-3 border-b border-ivory/10 hover:text-clay transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + LINKS.length * 0.07, duration: 0.5 }}
                className="mt-8 self-start text-sm font-medium px-6 py-3 rounded-full bg-clay text-ink hover:bg-clay-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Plan a trip
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
