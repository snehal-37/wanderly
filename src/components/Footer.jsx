import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socials = [
  { name: 'Instagram', icon: InstagramIcon, href: '#', label: 'Follow Wanderly on Instagram' },
  { name: 'Facebook', icon: FacebookIcon, href: '#', label: 'Follow Wanderly on Facebook' },
  { name: 'X', icon: XIcon, href: '#', label: 'Follow Wanderly on X' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setError('');
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="bg-pine text-ivory/60 py-16 px-6 sm:px-10 text-xs">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-ivory/10"
      >
        <div className="space-y-4">
          <a href="#top" className="font-display text-2xl text-ivory tracking-tight">
            Wanderly
          </a>
          <p className="text-ivory/50 leading-relaxed">Extraordinary places. Unforgettable stories.</p>
          <div className="flex gap-3 pt-2">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-ivory/10 hover:bg-clay hover:text-ink flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Discover links">
          <h4 className="text-ivory font-semibold mb-4 uppercase tracking-wider text-[11px]">Discover</h4>
          <ul className="space-y-2.5">
            <li><a href="#destinations" className="hover:text-ivory transition-colors">Destinations</a></li>
            <li><a href="#experiences" className="hover:text-ivory transition-colors">Experiences</a></li>
            <li><a href="#featured-trip" className="hover:text-ivory transition-colors">Travel Guides</a></li>
            <li><a href="#stories" className="hover:text-ivory transition-colors">Stories</a></li>
          </ul>
        </nav>

        <nav aria-label="Company links">
          <h4 className="text-ivory font-semibold mb-4 uppercase tracking-wider text-[11px]">Company</h4>
          <ul className="space-y-2.5">
            <li><a href="#top" className="hover:text-ivory transition-colors">Contact</a></li>
            <li><a href="#top" className="hover:text-ivory transition-colors">Privacy</a></li>
            <li><a href="#top" className="hover:text-ivory transition-colors">Terms</a></li>
          </ul>
        </nav>

        <div>
          <h4 className="text-ivory font-semibold mb-4 uppercase tracking-wider text-[11px]">Join our newsletter</h4>
          <p className="text-ivory/50 mb-4 leading-relaxed">Travel inspiration and exclusive offers, straight to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex bg-ivory/10 rounded-full p-1 border border-ivory/15 focus-within:border-clay/60 transition-colors" noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Your email address"
              aria-label="Email address"
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              className="bg-transparent px-3 text-xs w-full text-ivory placeholder-ivory/30 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="bg-clay text-ink p-2 rounded-full transition-all duration-300 hover:bg-clay-light hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              {status === 'success' ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>
          {status === 'error' && (
            <p id="newsletter-error" role="alert" className="text-[11px] text-clay-light mt-2">
              {error}
            </p>
          )}
          {status === 'success' && (
            <p role="status" className="text-[11px] text-sage mt-2">
              Subscribed! Welcome aboard.
            </p>
          )}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-ivory/35">
        <p>© 2026 Wanderly. All rights reserved.</p>
        <p>Made for curious travelers</p>
      </div>
    </footer>
  );
}