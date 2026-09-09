import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import AnimatedText from './motion/AnimatedText';
import SearchBar from './SearchBar';
import { heroSlides } from '../data/destinations';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Hero "zooms out" and content lifts at a different rate — classic
  // cinematic parallax, kept subtle so it never feels like a gimmick.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    // Initial mask reveal fires shortly after mount.
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[index];

  return (
    <section id="top" ref={heroRef} className="relative h-[105vh] bg-ink text-ivory overflow-hidden">
      {/* Background — mask-reveals on load, then crossfades between slides */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: reduceMotion ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' }}
        animate={{ clipPath: loaded ? 'inset(0 0 0 0%)' : undefined }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(20,20,15,0.55) 0%, rgba(20,20,15,0.15) 45%, rgba(20,20,15,0.65) 100%), url('${slide.image}')`,
              }}
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-between pt-32 pb-14"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="inline-block text-[13px] font-medium text-ivory/70 mb-5"
          >
            {slide.title}
          </motion.span>

          <AnimatedText
            as="h1"
            text={slide.heading}
            delay={1.45}
            className="font-display text-[13vw] sm:text-6xl lg:text-[5.2rem] leading-[0.98] font-normal"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.1, duration: 0.7 }}
            className="mt-6 text-base text-ivory/75 max-w-md font-light"
          >
            {slide.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <SearchBar />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-6 right-6 sm:right-10 z-10 flex items-center gap-2 text-ivory/60"
      >
        <span className="text-[11px] font-medium tracking-wide hidden sm:inline">Scroll</span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}