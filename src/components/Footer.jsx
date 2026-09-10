import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './motion/Magnetic';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7h2.4l.45-3H13.5V9.3c0-.87.26-1.5 1.6-1.5h1.4V5.1c-.71-.1-1.44-.14-2.17-.14-2.15 0-3.6 1.3-3.6 3.67V11H8v3h2.7v7h2.8Z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  { name: 'Instagram', icon: InstagramIcon, href: '#top', label: 'Follow Wanderly on Instagram' },
  { name: 'Facebook', icon: FacebookIcon, href: '#top', label: 'Follow Wanderly on Facebook' },
  { name: 'X', icon: XIcon, href: '#top', label: 'Follow Wanderly on X' },
];

const discoverLinks = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#featured-trip', label: 'Travel Guides' },
  { href: '#stories', label: 'Stories' },
];

const companyLinks = [
  { label: 'Contact', href: '#top' },
  { label: 'Privacy', href: '#top' },
  { label: 'Terms', href: '#top' },
];

/** A quiet underline that draws in on hover. */
const HoverLink = ({ href, children, bold = false }) => (
  <a
    href={href}
    data-cursor="link"
    className={`group inline-flex items-center gap-1 text-sm transition-colors duration-300 ${
      bold ? 'text-ivory font-medium' : 'text-ivory/55 hover:text-ivory font-light'
    }`}
  >
    <span className="relative inline-block">
      {children}
      <span className="absolute left-0 -bottom-0.5 w-full h-px bg-clay-light scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
    </span>
  </a>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const successTimer = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => () => clearTimeout(successTimer.current), []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setError('');
    setStatus('success');
    setEmail('');
    successTimer.current = setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="bg-pine text-ivory/60 pt-20 pb-10 px-6 sm:px-10 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay grain-layer" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 right-0 w-[420px] h-[420px] rounded-full bg-clay/[0.07] blur-3xl" aria-hidden="true" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-12 pb-14 border-b border-ivory/10"
      >
        {/* Brand */}
        <div className="space-y-6">
          <a href="#top" data-cursor="link" className="inline-block" aria-label="Wanderly — back to top">
            <span className="font-display text-3xl sm:text-4xl tracking-tight text-ivory">
              Wanderly
            </span>
            <span className="block w-8 h-[3px] bg-clay mt-2" aria-hidden="true" />
          </a>
          <p className="text-ivory/50 text-sm leading-relaxed max-w-[22ch] font-light">
            Extraordinary places. Unforgettable stories. Carefully paced, quietly curated.
          </p>
          <div className="flex gap-3 pt-1">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <Magnetic key={s.name} strength={0.35} radius={90}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    data-cursor="link"
                    className="w-10 h-10 rounded-full border border-ivory/15 text-ivory/70 hover:bg-clay hover:border-clay hover:text-ink flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon />
                  </a>
                </Magnetic>
              );
            })}
          </div>
        </div>

        {/* Discover */}
        <nav aria-label="Discover links">
          <h4 className="font-sans text-ivory font-medium mb-6 uppercase tracking-[0.22em] text-[11px]">Discover</h4>
          <ul className="space-y-3.5">
            {discoverLinks.map((l) => (
              <li key={l.label}>
                <HoverLink href={l.href}>{l.label}</HoverLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company links">
          <h4 className="font-sans text-ivory font-medium mb-6 uppercase tracking-[0.22em] text-[11px]">Company</h4>
          <ul className="space-y-3.5">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <HoverLink href={l.href}>{l.label}</HoverLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter */}
        <div>
          <h4 className="font-sans text-ivory font-medium mb-6 uppercase tracking-[0.22em] text-[11px]">Join our newsletter</h4>
          <p className="text-ivory/50 text-sm mb-5 leading-relaxed font-light max-w-[30ch]">
            Travel inspiration and exclusive offers, straight to your inbox. No noise.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center bg-ivory/[0.06] rounded-full p-1 border border-ivory/15 focus-within:border-clay/70 transition-colors duration-300" noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Your email address"
              aria-label="Email address"
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              className="bg-transparent min-w-0 flex-1 px-3.5 py-2 text-sm text-ivory placeholder-ivory/30 focus:outline-none"
            />
            <button
              type="submit"
              aria-label={status === 'success' ? 'Subscribed' : 'Subscribe to newsletter'}
              className="bg-clay text-ink px-4 ml-1 rounded-full shrink-0 h-9 transition-colors duration-300 hover:bg-clay-light inline-flex items-center justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.svg
                    key="check"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M3 8.5L6.5 12L13 4.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.svg>
                ) : (
                  <motion.span
                    key="arrow"
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="mt-3" aria-live="polite">
            {status === 'error' && (
              <p id="newsletter-error" role="alert" className="text-[11px] text-clay-light">
                {error}
              </p>
            )}
            {status === 'success' && (
              <p role="status" className="flex items-center gap-2 text-[11px] text-sage">
                <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" aria-hidden="true" />
                Subscribed! Welcome aboard.
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-ivory/35">
        <p>© 2026 Wanderly. All rights reserved.</p>
        <p className="flex items-center gap-2">
          Made for curious travelers
          <span className="w-6 h-px bg-ivory/20 inline-block" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}