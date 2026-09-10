import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { articles } from '../data/destinations';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE_CINEMA = [0.65, 0, 0.35, 1];
const EASE_OUT = [0.22, 1, 0.36, 1];

/**
 * MagCell — an editorial magazine cell. The image sits behind a fixed type
 * layer and drifts on hover while the heading changes hue; a small arrow
 * rotates out of the corner like a turned page. Reveal is driven by an
 * explicit IntersectionObserver (useInView) so images are never left stuck
 * behind a hidden clip.
 */
function MagCell({ art, variant, delay, className = '' }) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const reveal = {
    right: { hidden: { clipPath: 'inset(0 100% 0 0)', scale: 1.12 }, shown: { clipPath: 'inset(0 0% 0 0)', scale: 1 } },
    rise: { hidden: { clipPath: 'inset(100% 0 0 0)', scale: 1.12 }, shown: { clipPath: 'inset(0% 0 0 0)', scale: 1 } },
    left: { hidden: { clipPath: 'inset(0 0 0 100%)', scale: 1.12 }, shown: { clipPath: 'inset(0 0 0 0%)', scale: 1 } },
    leftRise: { hidden: { clipPath: 'inset(0 0 100% 0)', scale: 1.12 }, shown: { clipPath: 'inset(0 0 0% 0)', scale: 1 } },
  }[variant];

  return (
    <article
      ref={ref}
      data-cursor="view"
      className={`group relative overflow-hidden rounded-2xl bg-sand ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : reveal.hidden}
        animate={inView ? reveal.shown : reveal.hidden}
        transition={{ duration: 1.1, delay, ease: EASE_CINEMA }}
      >
        <img
          src={art.image}
          alt={art.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.08] group-hover:-translate-y-[4%] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10 transition-colors duration-700 group-hover:from-ink/90" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 pointer-events-none">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: delay + 0.25, duration: 0.6, ease: EASE_OUT }}
          className="text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/70 mb-3"
        >
          <span className="w-5 h-px bg-clay-light inline-block align-middle mr-2" />
          {art.tag}
        </motion.span>

        <motion.h3
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: delay + 0.3, duration: 0.7, ease: EASE_OUT }}
          className="font-display text-2xl lg:text-3xl text-ivory leading-[1.08] transition-colors duration-500 group-hover:text-clay-light"
        >
          {art.title}
        </motion.h3>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.4, duration: 0.6 }}
          className="text-xs text-ivory/55 mt-2"
        >
          {art.categories}
        </motion.p>

        <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-ivory/85">
          Read story
          <span className="w-7 h-7 rounded-full border border-ivory/30 flex items-center justify-center transition-all duration-500 ease-out group-hover:rotate-45 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-clay-light group-hover:border-clay-light">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </span>
      </div>
    </article>
  );
}

export default function TravelInspiration() {
  const reduceMotion = usePrefersReducedMotion();
  const notesRef = useRef(null);
  const notesInView = useInView(notesRef, { once: true, amount: 0.3 });

  return (
    <section id="inspiration" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 gap-6">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-clay mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-clay inline-block" />
            Travel journal
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Get inspired</h2>
        </div>
        <a
          href="#stories"
          data-cursor="link"
          className="group text-sm font-medium text-ink/60 hover:text-ink transition hidden sm:inline-flex items-center gap-1.5"
        >
          View all articles
          <span className="inline-block transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 auto-rows-[minmax(0,auto)]">
        {/* oversized lead */}
        <MagCell
          art={articles[0]}
          variant="right"
          delay={0.05}
          className="md:col-span-2 lg:col-span-4 h-[380px] lg:h-[540px]"
        />
        <MagCell
          art={articles[1]}
          variant="rise"
          delay={0.15}
          className="lg:col-span-2 h-[380px] lg:h-[540px]"
        />

        <MagCell
          art={articles[2]}
          variant="left"
          delay={0.1}
          className="lg:col-span-2 h-[300px]"
        />

        {/* field-notes pull-card over an image */}
        <div
          ref={notesRef}
          className="lg:col-span-2 h-[300px] rounded-2xl bg-sand text-ivory p-7 flex flex-col justify-between overflow-hidden relative group"
        >
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)', scale: 1.12 }}
            animate={
              notesInView
                ? { clipPath: 'inset(0 0 0% 0)', scale: 1 }
                : { clipPath: 'inset(0 0 100% 0)', scale: 1.12 }
            }
            transition={{ duration: 1.1, delay: 0.1, ease: EASE_CINEMA }}
          >
            <img
              src="/images/10-dal-lake-shikara.jpg"
              alt="A shikara gliding across Dal Lake at dusk"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
          </motion.div>

          <div className="relative z-10 pointer-events-none">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={notesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE_OUT }}
              className="text-[10px] font-medium uppercase tracking-[0.3em] text-clay-light"
            >
              Field notes
            </motion.span>
          </div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={notesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE_OUT }}
            className="relative z-10 font-display italic text-2xl leading-[1.15]"
          >
            “Every journey is a story waiting for its first sentence.”
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={notesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="relative z-10 flex items-center justify-between text-[11px] text-ivory/70 tracking-[0.18em] uppercase"
          >
            <span>04 essays</span>
            <span>2019—2026</span>
          </motion.div>
        </div>

        <MagCell art={articles[3]} variant="leftRise" delay={0.18} className="lg:col-span-2 h-[300px]" />
      </div>
    </section>
  );
}