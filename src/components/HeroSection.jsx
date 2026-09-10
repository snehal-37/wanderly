import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import SearchBar from './SearchBar';
import { heroSlides } from '../data/destinations';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE_CINEMA = [0.65, 0, 0.35, 1];
const EASE_OUT = [0.22, 1, 0.36, 1];
const SLIDE_MS = 8000;

const scene = {
  hidden: { clipPath: 'inset(0 0 0 100%)', scale: 1.1, x: '4%' },
  enter: (d) => ({
    clipPath: d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    scale: 1.1,
    x: d > 0 ? '4%' : '-4%',
  }),
  center: { clipPath: 'inset(0 0 0 0%)', scale: 1, x: '0%' },
  exit: (d) => ({ x: d > 0 ? '-3%' : '3%', scale: 1.06 }),
};

const pad = (n) => String(n + 1).padStart(2, '0');

export default function HeroSection({ ready = true }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduceMotion = usePrefersReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Chapter bridge — as the hero is scrolled away the scene gently zooms,
  // the copy rises, darkness gathers, and an oversized editorial label
  // surfaces at the fold like the title of the next chapter.
  const bgZoom = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const bridgeDark = useTransform(scrollYProgress, [0, 0.75], [0, 0.55]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-42%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const chapterLabelOpacity = useTransform(scrollYProgress, [0.5, 0.82], [0, 1]);
  const chapterLabelY = useTransform(scrollYProgress, [0.5, 0.82], ['40%', '0%']);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setDir(1);
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const slide = heroSlides[index];

  return (
    <section
      id="top"
      ref={heroRef}
      data-cursor="explore"
      className="relative h-[100svh] min-h-[560px] bg-ink text-ivory overflow-hidden"
      aria-label="Featured destinations"
    >
      {/* Cinematic scene stack */}
      <motion.div style={{ scale: bgZoom }} className="absolute inset-0">
        <AnimatePresence initial={reduceMotion ? false : true}>
          <motion.div
            key={slide.id}
            custom={dir}
            variants={scene}
            initial={reduceMotion ? 'center' : 'hidden'}
            animate={reduceMotion || ready ? 'center' : 'hidden'}
            exit={reduceMotion ? undefined : 'exit'}
            transition={{ duration: 1.2, ease: EASE_CINEMA }}
            className="absolute inset-0"
          >
            <motion.img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              initial={false}
              animate={reduceMotion ? { x: 0, scale: 1 } : { x: [0, '-1%', 0], scale: [1, 1.08, 1] }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 26, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }
              }
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(20,20,15,0.52) 0%, rgba(20,20,15,0.18) 42%, rgba(9,9,6,0.72) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 vignette pointer-events-none" aria-hidden="true" />

      {/* Copy — choreographed per scene */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center pb-28 sm:pb-32"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-3xl"
            exit={{ opacity: 0, transition: { duration: 0.01 } }}
          >
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { delay: 0.25, duration: 0.7, ease: EASE_OUT },
                    }
              }
              className="text-[13px] font-medium text-ivory/75 tracking-[0.22em] uppercase mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-clay-light inline-block" />
              {slide.title}
            </motion.p>

            <h1 className="font-display font-normal text-[13vw] sm:text-6xl lg:text-[5.4rem] leading-[1.02] tracking-[-0.01em]">
              {slide.heading.split('\n').map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <motion.span
                    className="block"
                    initial={reduceMotion ? false : { y: '108%', filter: 'blur(8px)' }}
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            y: '0%',
                            filter: 'blur(0px)',
                            transition: { delay: i === 0 ? 0.4 : 0.5, duration: 0.9, ease: EASE_OUT },
                          }
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { delay: 0.7, duration: 0.7, ease: EASE_OUT },
                    }
              }
              className="mt-6 text-base sm:text-lg text-ivory/80 max-w-md font-light leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Search stays put — it belongs to the hero, not to any single scene */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26, filter: 'blur(4px)' }}
          animate={
            reduceMotion || ready
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 26, filter: 'blur(4px)' }
          }
          transition={
            reduceMotion ? { duration: 0 } : { delay: 0.9, duration: 0.8, ease: EASE_OUT }
          }
          className="mt-10 max-w-2xl"
        >
          <SearchBar />
        </motion.div>
      </motion.div>

      {/* Editorial progress system */}
      <div className="absolute bottom-7 left-6 sm:left-10 z-10 flex items-center gap-5">
        <div className="flex items-baseline gap-1.5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="font-display text-2xl leading-none"
            >
              {pad(index)}
            </motion.span>
          </AnimatePresence>
          <span className="font-display text-2xl leading-none text-ivory/30">
            / {pad(heroSlides.length - 1)}
          </span>
        </div>
        <div className="w-32 sm:w-44 h-px bg-ivory/20 relative overflow-hidden">
          <motion.div
            key={index}
            className="absolute inset-y-0 left-0 w-full origin-left bg-ivory/80"
            initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: SLIDE_MS / 1000, ease: 'linear' }
            }
          />
        </div>
      </div>


      {/* Chapter bridge label */}
      <motion.div
        style={{ opacity: chapterLabelOpacity, y: chapterLabelY }}
        className="absolute inset-x-0 -bottom-2 z-10 text-center pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-display italic text-ivory/90 text-[clamp(2.6rem,7vw,6rem)] leading-none tracking-tight">
          Wander further
        </span>
      </motion.div>
    </section>
  );
}