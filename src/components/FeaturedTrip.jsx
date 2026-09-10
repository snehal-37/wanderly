import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, ArrowRight } from 'lucide-react';
import ImageReveal from './motion/ImageReveal';
import Magnetic from './motion/Magnetic';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE_OUT = [0.22, 1, 0.36, 1];

const included = [
  'Guided city tours in Positano & Amalfi',
  'Boat trip along the coastline',
  'Local food & wine experiences',
  'Handpicked boutique hotels',
];

export default function FeaturedTrip() {
  const [showJourney, setShowJourney] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  // General entrance for content blocks.
  const enter = (delay) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.6 },
    transition: { delay, duration: 0.8, ease: EASE_OUT },
  });

  return (
    <section id="featured-trip" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* Image — curtain opens like a story spread */}
        <div className="relative">
          <ImageReveal
            src="/images/01-taj-mahal.jpg"
            alt="Amalfi Coast, Italy"
            variant="curtain"
            className="rounded-2xl h-96 lg:h-[30rem]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl vignette" aria-hidden="true" />

          <motion.button
            onClick={() => setShowJourney(!showJourney)}
            aria-pressed={showJourney}
            data-cursor="link"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.6, duration: 0.6, ease: EASE_OUT }}
            className="absolute bottom-5 left-5 bg-ivory/90 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center gap-2 text-xs font-medium text-ink shadow-[0_10px_30px_-12px_rgba(8,8,4,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            <Play
              className={`w-3.5 h-3.5 fill-pine text-pine transition-transform duration-500 ${
                showJourney ? 'rotate-90' : ''
              }`}
            />
            {showJourney ? 'Journey paused' : 'Watch the journey'}
          </motion.button>
        </div>

        {/* Story column — the spine draws down through the reading flow */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="relative pl-7 sm:pl-9"
        >
          {/* connecting spine */}
          <motion.span
            className="absolute left-0 top-2 bottom-0 w-px bg-ink/12 origin-top"
            initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.3, delay: 0.2, ease: EASE_OUT }}
            aria-hidden="true"
          />

          {/* 1 · Featured trip */}
          <div className="relative flex items-center gap-4">
            <motion.span
              className="absolute -left-[31px] w-2 h-2 rounded-full bg-clay"
              initial={reduceMotion ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 320, damping: 20 }}
              aria-hidden="true"
            />
            <motion.span
              {...enter(0.35)}
              className="text-xs font-medium uppercase tracking-[0.28em] text-clay"
            >
              Featured trip
            </motion.span>
          </div>

          {/* Headline — reveals from beneath a mask */}
          <h2 className="mt-5 font-display text-4xl sm:text-5xl text-ink leading-[1.05]">
            {['A different way to', 'experience the world.'].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { y: '110%', filter: 'blur(8px)' }}
                  whileInView={{ y: '0%', filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.9, ease: EASE_OUT }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* 2 · destination */}
          <div className="relative mt-8 flex items-center gap-4">
            <motion.span
              className="absolute -left-[31px] w-2 h-2 rounded-full bg-clay"
              initial={reduceMotion ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 320, damping: 20 }}
              aria-hidden="true"
            />
            <motion.div {...enter(0.7)} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-ink/70">
              <span className="font-display text-2xl sm:text-[1.7rem] text-ink">Amalfi Coast, Italy</span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-ink/40 text-xs">04–10 October</span>
            </motion.div>
          </div>

          {/* 3 · duration */}
          <div className="relative mt-5 flex items-center gap-4">
            <motion.span
              className="absolute -left-[31px] w-2 h-2 rounded-full bg-clay"
              initial={reduceMotion ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ delay: 0.78, type: 'spring', stiffness: 320, damping: 20 }}
              aria-hidden="true"
            />
            <motion.p {...enter(0.88)} className="text-xs sm:text-sm text-ink/60 font-light flex items-center gap-3">
              <span className="font-medium text-ink/80">7 days</span>
              <span className="w-1 h-1 rounded-full bg-sage" />
              <span>Slow travel, open roads</span>
              <span className="w-1 h-1 rounded-full bg-sage" />
              <span>From Rome</span>
            </motion.p>
          </div>

          {/* includes — hairline editorial checklist */}
          <motion.ul {...enter(1.0)} className="mt-7 space-y-0">
            {included.map((item, idx) => (
              <li
                key={idx}
                className="flex items-baseline gap-4 border-t border-ink/[0.07] py-2.5 text-sm text-ink/65"
              >
                <span className="text-[10px] font-medium text-ink/35 tracking-[0.2em]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="flex items-center gap-2 flex-1">
                  <Check className="w-3.5 h-3.5 text-pine shrink-0" strokeWidth={2.4} />
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* 4 · price + CTA — appears last */}
          <div className="relative mt-8 flex items-center justify-between gap-6">
            <motion.span
              className="absolute -left-[31px] top-1/2 w-2 h-2 rounded-full bg-clay"
              initial={reduceMotion ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 320, damping: 20 }}
              aria-hidden="true"
            />
            <motion.div {...enter(1.15)}>
              <span className="text-[10px] text-ink/40 tracking-[0.22em] uppercase">From</span>
              <div className="font-display text-3xl text-pine">
                $1,799 <span className="text-xs font-normal text-ink/45 font-sans">per person</span>
              </div>
            </motion.div>

            <motion.div {...enter(1.3)}>
              <Magnetic strength={0.22}>
                <button
                  onClick={() => alert('Journey details coming soon — start planning with our Search bar above!')}
                  data-cursor="cta"
                  className="group bg-pine hover:bg-pine-light text-ivory font-medium text-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] inline-flex items-center gap-2"
                >
                  View Journey
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}