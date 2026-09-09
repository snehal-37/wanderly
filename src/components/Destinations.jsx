import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { destinations } from '../data/destinations';
import ScrollReveal from './motion/ScrollReveal';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const pad = (n) => String(n + 1).padStart(2, '0');

export default function DestinationCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduceMotion = usePrefersReducedMotion();
  const total = destinations.length;
  const current = destinations[index];
  const next = destinations[(index + 1) % total];

  const go = useCallback((delta) => {
    setDir(delta);
    setIndex((prev) => (prev + delta + total) % total);
  }, [total]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  return (
    <section id="destinations" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <ScrollReveal direction="up" className="flex items-end justify-between mb-12 gap-6">
        <div>
          <p className="text-sm text-ink/50 mb-2 tracking-wide">A closer look</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink">Where next?</h2>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-ivory transition hover:scale-105 active:scale-95"
            aria-label="Previous destination"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(1)}
            className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-ivory transition hover:scale-105 active:scale-95"
            aria-label="Next destination"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ScrollReveal>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-stretch"
        role="region"
        aria-label="Featured destinations carousel"
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        {/* Active slide */}
        <div className="relative h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden bg-sand cursor-grab active:cursor-grabbing">
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.div
              key={current.id}
              custom={dir}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              initial={reduceMotion ? { opacity: 0 } : { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', scale: 1.05 }}
              animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.35 } }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={`${current.name}, ${current.country}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/0 to-ink/10" />

              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span className="text-ivory/80 text-xs font-medium tracking-widest uppercase bg-ink/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  {current.region}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-ivory">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id + '-copy'}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="max-w-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-ivory/80 flex items-center gap-1 text-sm">
                        <Star className="w-3.5 h-3.5 fill-clay-light text-clay-light" />
                        {current.rating}
                      </span>
                    </div>
                    <h3 className="font-display text-4xl sm:text-5xl mb-3">{current.name}</h3>
                    <p className="text-ivory/75 text-sm font-light mb-5 leading-relaxed">{current.description}</p>
                    <div className="flex items-center gap-4 text-xs text-ivory/60">
                      <span>{current.country}</span>
                      <span className="w-1 h-1 rounded-full bg-ivory/40" />
                      <span>{current.duration}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-ivory/15 backdrop-blur-md flex items-center justify-center text-ivory hover:bg-ivory hover:text-ink transition hover:scale-110 active:scale-95"
                aria-label={`Explore ${current.name}`}
                title={`Explore ${current.name}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Side rail: counter + peeking next slide */}
        <div className="flex lg:flex-col gap-4">
          <div className="hidden lg:flex flex-1 items-end justify-between p-1">
            <div className="font-display text-6xl leading-none text-ink">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  {pad(index)}
                </motion.span>
              </AnimatePresence>
              <span className="text-ink/30"> / {pad(total - 1)}</span>
            </div>
          </div>

          <button
            onClick={() => go(1)}
            className="group relative h-40 lg:h-48 rounded-2xl overflow-hidden shrink-0 flex-1 lg:flex-none"
            aria-label={`View ${next.name}`}
          >
            <img
              src={next.image}
              alt={next.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/35 group-hover:bg-ink/20 transition" />
            <div className="absolute bottom-3 left-3 text-ivory text-left">
              <span className="text-[10px] font-medium text-ivory/70">Up next</span>
              <p className="font-display text-lg">{next.name}</p>
            </div>
          </button>

          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-ivory transition"
              aria-label="Previous destination"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-ivory transition"
              aria-label="Next destination"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}