import { useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { destinations } from '../data/destinations';
import { usePrefersReducedMotion, useIsDesktop, useIsTouchDevice } from '../hooks/UseMediaQuery';

const EASE_CINEMA = [0.65, 0, 0.35, 1];
const EASE_OUT = [0.22, 1, 0.36, 1];

const pad = (n) => String(n + 1).padStart(2, '0');

const wipe = {
  enter: (d) => ({
    clipPath: d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    rotateY: d > 0 ? 6 : -6,
    scale: 1.05,
  }),
  center: { clipPath: 'inset(0 0 0 0%)', rotateY: 0, scale: 1 },
  exit: (d) => ({ rotateY: d > 0 ? -3 : 3, scale: 1.02 }),
};

export default function DestinationCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduceMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const isDesktop = useIsDesktop();

  const dragging = useRef(false);
  const total = destinations.length;
  const current = destinations[index];
  const next = destinations[(index + 1) % total];

  const go = useCallback((delta) => {
    setDir(delta);
    setIndex((prev) => (prev + delta + total) % total);
  }, [total]);

  // 3D tactile hover — image drifts a fraction with the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sX = useSpring(mx, { stiffness: 160, damping: 22, mass: 0.4 });
  const sY = useSpring(my, { stiffness: 160, damping: 22, mass: 0.4 });
  const imgX = useTransform(sX, (v) => v * 16);
  const imgY = useTransform(sY, (v) => v * 12);
  const imgScale = useSpring(useMotionValue(1.0), { stiffness: 160, damping: 24 });
  const glowX = useTransform(sX, (v) => v * -10);
  const glowY = useTransform(sY, (v) => v * -8);

  const onPointerMove = (e) => {
    if (dragging.current || reduceMotion || isTouch || !isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    imgScale.set(1.02);
  };

  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
    imgScale.set(1);
  };

  const onDragStart = () => {
    dragging.current = true;
    mx.set(0);
    my.set(0);
  };

  const onDragEnd = (_, info) => {
    dragging.current = false;
    imgScale.set(1);
    if (info.offset.x < -70) go(1);
    else if (info.offset.x > 70) go(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  return (
    <section
      id="destinations"
      className="py-20 sm:py-28 px-6 sm:px-10 max-w-7xl mx-auto"
      aria-label="Featured destinations"
    >
      <div className="flex items-end justify-between mb-10 gap-6">
        <div>
          <p className="text-xs text-ink/45 tracking-[0.25em] uppercase mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-clay inline-block" />
            A closer look
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] text-ink leading-[1.05]">
            Where next?
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-[11px] text-ink/40 tracking-[0.2em] uppercase hidden lg:inline">
            Drag the frame
          </span>
          <button
            onClick={() => go(-1)}
            data-cursor="link"
            className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink hover:text-ivory transition-colors duration-300 active:scale-[0.95]"
            aria-label="Previous destination"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(1)}
            data-cursor="link"
            className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink hover:text-ivory transition-colors duration-300 active:scale-[0.95]"
            aria-label="Next destination"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-12 items-start">
        {/* Cinematic image frame */}
        <div
          className="relative h-[62vh] sm:h-[70vh] lg:h-[76vh] rounded-2xl overflow-hidden bg-ink cursor-grab active:cursor-grabbing"
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          role="region"
          aria-label="Destination image frame, draggable to change destination"
          data-cursor="view"
        >
          <AnimatePresence mode="sync" initial={reduceMotion ? false : true}>
            <motion.div
              key={current.id}
              custom={dir}
              variants={wipe}
              initial={reduceMotion ? 'center' : 'enter'}
              animate="center"
              exit={reduceMotion ? undefined : 'exit'}
              transition={{ duration: 0.95, ease: EASE_CINEMA }}
              drag={reduceMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onKeyDown={handleKeyDown}
              tabIndex="0"
              className="absolute inset-0"
              style={{ transformPerspective: 1200 }}
              aria-label={`${current.name}, ${current.country}`}
            >
              <motion.img
                src={current.image}
                alt={`${current.name}, ${current.country}`}
                style={{ x: imgX, y: imgY, scale: imgScale }}
                className="absolute inset-0 w-full h-full object-cover will-change-transform"
                draggable={false}
                loading="lazy"
              />
              <motion.div
                style={{ x: glowX, y: glowY }}
                className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-ink/20"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 120px 30px rgba(10,9,6,0.45)' }} />

              {/* floating meta */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.id + '-region'}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="text-[11px] font-medium text-ivory/80 tracking-[0.3em] uppercase flex items-center gap-3"
                  >
                    <span className="w-5 h-px bg-clay-light inline-block" />
                    {current.region}
                  </motion.span>
                </AnimatePresence>
              </div>

              <button
                data-cursor="cta"
                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-11 h-11 rounded-full bg-ivory/12 backdrop-blur-md border border-ivory/20 flex items-center justify-center text-ivory transition-all duration-300 hover:bg-ivory hover:text-ink active:scale-95"
                aria-label={`Explore ${current.name}`}
                title={`Explore ${current.name}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 flex items-center gap-4 text-ivory/70">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.id + '-rating'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, delay: 0.15, ease: EASE_OUT }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Star className="w-4 h-4 fill-clay-light text-clay-light" />
                    <span className="text-ivory font-medium">{current.rating}</span>
                    <span className="text-ivory/40 text-xs">/ 5</span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Editorial rail */}
        <div className="flex flex-col lg:min-h-[76vh] lg:justify-between">
          <div>
            <div className="flex items-baseline gap-3 text-ink">
              <div className="overflow-hidden h-[64px] leading-none">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -28, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="block font-display text-[64px] leading-none"
                  >
                    {pad(index)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="font-display text-2xl text-ink/25">/ {pad(total - 1)}</span>
            </div>

            {/* masked rolling title */}
            <div className="mt-3 text-[clamp(2.6rem,5vw,4.2rem)] leading-none text-ink">
              <div className="relative overflow-hidden h-[1.15em]">
                <AnimatePresence mode="sync">
                  <motion.h3
                    key={current.id}
                    custom={dir}
                    initial={dir > 0 ? { y: '116%' } : { y: '-116%' }}
                    animate={{ y: 0 }}
                    exit={dir > 0 ? { y: '-116%' } : { y: '116%' }}
                    transition={{ duration: 0.8, ease: EASE_OUT }}
                    className="absolute inset-x-0 bottom-0 font-display leading-none tracking-[-0.02em]"
                  >
                    {current.name}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>

            <div key={index} className="mt-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.id + '-desc'}
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT }}
                  className="text-sm text-ink/60 font-light leading-relaxed max-w-sm"
                >
                  {current.description}
                </motion.p>
              </AnimatePresence>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/50">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-clay" />
                  {current.country}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sage" />
                  {current.duration}
                </span>
              </div>
            </div>
          </div>

          {/* up next + arrows */}
          <div className="mt-10 lg:mt-12 pt-6 border-t border-ink/10">
            <div className="flex items-end justify-between gap-6">
              <button
                onClick={() => go(1)}
                data-cursor="view"
                className="group relative h-32 sm:h-36 rounded-xl overflow-hidden w-full max-w-xs text-left"
                aria-label={`View ${next.name}`}
              >
                <img
                  src={next.image}
                  alt={next.name}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[9px] font-medium text-ivory/65 tracking-[0.25em] uppercase">
                    Up next
                  </span>
                  <p className="font-display text-lg text-ivory leading-tight">{next.name}</p>
                </div>
              </button>

              <div className="flex items-center gap-3 pb-1">
                <button
                  onClick={() => go(-1)}
                  data-cursor="link"
                  className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink hover:text-ivory transition-colors duration-300 active:scale-95"
                  aria-label="Previous destination"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  data-cursor="link"
                  className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink hover:text-ivory transition-colors duration-300 active:scale-95"
                  aria-label="Next destination"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}