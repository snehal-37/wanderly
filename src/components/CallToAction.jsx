import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Magnetic from './motion/Magnetic';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE_OUT = [0.22, 1, 0.36, 1];

// A handful of slow dust motes drifting through the frame.
const MOTES = [
  { left: '18%', top: '26%', size: 5, dur: 17, delay: 0 },
  { left: '72%', top: '18%', size: 3, dur: 21, delay: 3 },
  { left: '46%', top: '70%', size: 4, dur: 19, delay: 6 },
  { left: '84%', top: '64%', size: 6, dur: 23, delay: 2 },
  { left: '10%', top: '72%', size: 3, dur: 18, delay: 8 },
];

export default function CallToAction() {
  const reduceMotion = usePrefersReducedMotion();

  const handleStart = () => {
    document.getElementById('destinations')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="px-6 sm:px-10 max-w-7xl mx-auto pb-28">
      <div className="relative rounded-3xl overflow-hidden min-h-[520px] lg:min-h-[560px] flex items-center justify-center">
        {/* slow, continuous drift — the image is alive but never restless */}
        <div className="absolute inset-0">
          <motion.img
            src="/images/09-pangong-lake.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-[115%] object-cover relative"
            animate={
              reduceMotion
                ? { y: 0, scale: 1 }
                : {
                    y: ['0%', '-9%', '0%'],
                    scale: [1.05, 1.14, 1.05],
                  }
            }
            transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '-4%' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/35 to-ink/20" />
        <div className="absolute inset-0 vignette" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay grain-layer" aria-hidden="true" />

        {/* dust motes */}
        {!reduceMotion &&
          MOTES.map((mote, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-ivory/80 blur-[1px]"
              style={{ left: mote.left, top: mote.top, width: mote.size, height: mote.size }}
              animate={{
                y: [0, -60, 30, 0],
                x: [0, 24, -18, 0],
                opacity: [0.15, 0.7, 0.25, 0.15],
              }}
              transition={{ duration: mote.dur, delay: mote.delay, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          ))}

        <div className="relative max-w-2xl mx-auto px-8 text-center text-ivory">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE_OUT }}
            className="text-[11px] font-medium uppercase tracking-[0.3em] text-clay-light inline-block mb-6"
          >
            Your next adventure awaits
          </motion.span>

          {/* masked headline — line by line */}
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.03] tracking-tight">
            {['The world is', 'waiting.'].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { y: '115%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 1, ease: [0.65, 0, 0.35, 1] }}
                >
                  {i === 1 ? (
                    <em className="italic font-display">{line}</em>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-sm text-ivory/70 font-light leading-relaxed max-w-md mx-auto mt-6"
          >
            Your next unforgettable journey starts here — one search away from somewhere extraordinary.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.75, duration: 0.7, ease: EASE_OUT }}
            className="mt-10 inline-block"
          >
            <Magnetic strength={0.25}>
              <button
                onClick={handleStart}
                data-cursor="cta"
                whileTap={!reduceMotion ? { scale: 0.96 } : undefined}
                className="group relative bg-clay hover:bg-clay-light text-ink text-sm font-semibold px-10 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-3 shadow-[0_18px_45px_-18px_rgba(185,133,90,0.65)]"
              >
                Start Exploring
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}