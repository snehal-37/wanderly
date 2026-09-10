import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import RollingNumber from './motion/RollingNumber';
import { testimonials, stats } from '../data/testimonials';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE_OUT = [0.22, 1, 0.36, 1];

// Editorial drift — no two cards sit on the same baseline.
const DRIFT = [-8, 16, -4];
const ENTER_FROM = [44, -44, 36];

export default function Testimonials() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="stories"
      className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto"
      aria-label="Traveler stories"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-clay mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-clay inline-block" />
            Travelers' stories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] text-ink leading-[1.05]">
            What our
            <br />
            <em className="italic">travelers</em> say
          </h2>
        </div>
        <p className="text-sm text-ink/50 max-w-xs leading-relaxed font-light">
          Real journeys, real people — every trip is shaped around the traveler we're hosting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((rev, idx) => (
          <motion.figure
            key={rev.id}
            initial={reduceMotion ? false : { opacity: 0, y: ENTER_FROM[idx] }}
            whileInView={{ opacity: 1, y: DRIFT[idx] }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: idx * 0.14, ease: EASE_OUT }}
            className="bg-sand/40 rounded-2xl p-7 border border-ink/5 space-y-5 flex flex-col justify-between hover:bg-sand/70"
          >
            <div className="space-y-4">
              <div className="flex gap-1" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-clay text-clay" />
                ))}
              </div>

              <motion.blockquote
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: idx * 0.14 + 0.12, ease: EASE_OUT }}
                className="text-sm text-ink/70 italic leading-relaxed font-light"
              >
                "{rev.quote}"
              </motion.blockquote>

              <span className="text-[11px] font-medium text-clay uppercase tracking-wide inline-flex items-center gap-2">
                <span className="w-4 h-px bg-clay/60 inline-block" />
                Trip · {rev.trip}
              </span>
            </div>

            {/* avatar arrives a beat after the words — like meeting the traveler */}
            <motion.figcaption
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: idx * 0.14 + 0.34, ease: EASE_OUT }}
              className="flex items-center gap-3.5 pt-4 border-t border-ink/10"
            >
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-clay/20 blur-[6px]" aria-hidden="true" />
                <img src={rev.avatar} alt={rev.name} className="relative w-11 h-11 rounded-full object-cover" loading="lazy" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">{rev.name}</h4>
                <p className="text-xs text-ink/45">{rev.location}</p>
              </div>
            </motion.figcaption>
          </motion.figure>
        ))}
      </div>

      {/* Stats band */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="mt-20 relative"
      >
        <div className="bg-ink rounded-3xl px-6 sm:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-10 overflow-hidden relative">
          <div className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay grain-layer" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 right-1/4 w-72 h-72 rounded-full bg-clay/10 blur-3xl" aria-hidden="true" />
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-3">
              <div className="font-display text-4xl sm:text-5xl text-ivory tracking-tight">
                <RollingNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-ivory/50 tracking-wide uppercase">{stat.label}</p>
              <span className="block w-6 h-px bg-clay/50" aria-hidden="true" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}