import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Journeys', href: '#journeys' },
  { label: 'Stories', href: '#stories' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setCompact(latest > 80);
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

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
      >
        <a
          href="#top"
          className={`font-display text-xl sm:text-2xl tracking-tight transition-colors duration-500 ${
            compact ? 'text-ink' : 'text-ivory'
          }`}
        >
          Wanderly
        </a>

        <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium tracking-wide">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative transition-colors duration-500 group ${
                compact ? 'text-ink/70 hover:text-ink' : 'text-ivory/80 hover:text-ivory'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-clay transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <button
            className={`text-[13px] font-medium px-5 py-2.5 rounded-full border transition-colors duration-500 ${
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
          className={`lg:hidden p-2 transition-colors duration-500 ${compact ? 'text-ink' : 'text-ivory'}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.15, 1] }}
            className="fixed inset-0 z-30 bg-pine text-ivory flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl py-2 border-b border-ivory/10"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + LINKS.length * 0.07, duration: 0.5 }}
                className="mt-8 self-start text-sm font-medium px-6 py-3 rounded-full bg-clay text-ink"
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