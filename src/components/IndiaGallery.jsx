import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowUpRight } from 'lucide-react';
import { indiaDestinations } from '../data/destinations';
import Magnetic from './motion/Magnetic';
import { usePrefersReducedMotion, useIsDesktop } from '../hooks/UseMediaQuery';

const VERT = [0, -40, 26, -20, 46, -6, 30, -34, 14, 40, -16, 0];
const TOTAL = indiaDestinations.length;
const ITEMS = TOTAL + 1;

const gauss = (d) => Math.exp(-(d * d) * 2.4);
const focusAt = (v) => Math.max(0, Math.min(ITEMS - 1, v * (ITEMS - 1)));

function useTargetScroll(hash) {
  const lenis = useLenis();
  return () => {
    if (lenis) {
      lenis.scrollTo(hash, { offset: -20, duration: 1.4 });
    } else {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

function GalleryCard({ item, index, progress }) {
  const focus = (v) => (index - focusAt(v));
  const scale = useTransform(progress, (v) => 1 + 0.055 * gauss(focus(v)));
  const opacity = useTransform(progress, (v) => 0.62 + 0.38 * gauss(focus(v)));
  const accent = useTransform(progress, (v) => Math.min(1, gauss(focus(v)) * 2));
  const layerX = useTransform(progress, (v) => -focus(v) * (index % 2 === 0 ? 34 : 18));
  const goTo = useTargetScroll('#vibe-builder');

  return (
    <motion.div
      style={{ scale, opacity, y: VERT[index] }}
      className={`group relative w-[74vw] sm:w-[46vw] lg:w-[29vw] shrink-0 ${
        index % 2 === 0 ? 'mt-[6vh]' : '-mt-[6vh]'
      }`}
      role="button"
      tabIndex="0"
      data-cursor="view"
      aria-label={`Discover ${item.name} in ${item.location}`}
      onClick={goTo}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') goTo();
      }}
    >
      <div className="relative h-[44vh] rounded-2xl overflow-hidden bg-sand">
        <motion.img
          src={item.image}
          alt={`${item.name} — ${item.tagline}`}
          loading="lazy"
          style={{ x: layerX }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

        <motion.span
          style={{ scaleX: accent, opacity: accent }}
          className="absolute top-4 left-5 w-16 h-[3px] rounded-full bg-clay-light origin-left"
          aria-hidden="true"
        />

        <div className="absolute top-[3.5rem] left-5">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/85">
            {item.location}
          </span>
        </div>

        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ivory/15 backdrop-blur-md border border-ivory/15 flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="font-display text-2xl lg:text-[1.8rem] text-ivory leading-[1.05]">
            {item.name}
          </h3>
          <motion.p style={{ opacity: accent }} className="text-xs text-ivory/65 mt-1 font-light">
            {item.tagline}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

function ClosingCard({ index, progress }) {
  const focus = (v) => (index - focusAt(v));
  const scale = useTransform(progress, (v) => 1 + 0.055 * gauss(focus(v)));
  const opacity = useTransform(progress, (v) => 0.62 + 0.38 * gauss(focus(v)));
  const goTo = useTargetScroll('#vibe-builder');

  return (
    <motion.div
      style={{ scale, opacity, y: VERT[index] }}
      className="w-[70vw] sm:w-[44vw] lg:w-[26vw] shrink-0 flex items-center justify-center"
    >
      <div className="text-center space-y-4 px-4">
        <span className="font-display italic text-3xl text-ink">Your India awaits</span>
        <p className="text-sm text-ink/45 font-light">Curated itineraries across every region.</p>
        <Magnetic strength={0.2}>
          <button
            onClick={goTo}
            data-cursor="cta"
            className="group inline-flex items-center gap-2 bg-clay hover:bg-clay-light text-ink text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
          >
            Build your journey
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
}

export default function IndiaGallery() {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // main track + depth layers
  const x = useTransform(scrollYProgress, [0, 1], ['-6%', '-82%']);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const word1x = useTransform(scrollYProgress, [0, 1], ['8%', '-58%']);
  const word2x = useTransform(scrollYProgress, [0, 1], ['34%', '-34%']);
  const word3x = useTransform(scrollYProgress, [0, 1], ['58%', '-14%']);
  const glowX = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  if (reduceMotion || !isDesktop) {
    return (
      <section id="discover-india" className="py-24 px-6 sm:px-10 bg-pine text-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto mb-10">
          <span className="text-xs font-medium uppercase tracking-widest text-clay-light inline-block mb-3">
            Hidden India
          </span>
          <h2 className="font-display text-4xl sm:text-5xl">Wander where the stories begin</h2>
          <p className="text-ivory/60 text-sm mt-3 max-w-lg leading-relaxed">
            From the Golden Temple at dusk to the floating gardens of Dal Lake — eleven frames from across the subcontinent.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {indiaDestinations.map((d) => (
            <div key={d.id} className="group relative h-80 rounded-2xl overflow-hidden">
              <img src={d.image} alt={`${d.name} — ${d.tagline}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[10px] font-medium uppercase tracking-widest text-ivory/60">{d.location}</p>
                <h3 className="font-display text-2xl text-ivory">{d.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="discover-india" ref={ref} className="relative h-[340vh] bg-ivory overflow-clip">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* atmospheric wash */}
        <motion.div
          style={{ x: glowX }}
          className="absolute -top-[20%] -right-[10%] w-[70vh] h-[70vh] rounded-full opacity-45"
          aria-hidden="true"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#d3c49b_0%,#b9855a_38%,transparent_70%)] blur-[90px]" />
        </motion.div>

        {/* oversized editorial typography layers */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <motion.span
            style={{ x: word1x }}
            className="absolute top-[10%] left-0 font-display font-light text-[24vw] leading-none display-outline text-ink/[0.07] whitespace-nowrap select-none"
          >
            INDIA
          </motion.span>
          <motion.span
            style={{ x: word2x }}
            className="absolute top-[58%] left-0 font-display italic font-light text-[20vw] leading-none text-clay/[0.07] whitespace-nowrap select-none"
          >
            WANDER
          </motion.span>
          <motion.span
            style={{ x: word3x }}
            className="absolute top-[80%] left-0 font-display font-light text-[22vw] leading-none display-outline text-ink/[0.05] whitespace-nowrap select-none -translate-y-1/2"
          >
            DISCOVER
          </motion.span>
        </div>

        {/* intro */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-20 mt-[7vh] flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-clay inline-block mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-clay inline-block" />
              Hidden India
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] text-ink leading-[1.02]">
              Wander where
              <br />
              <em className="italic">the stories</em> begin
            </h2>
          </div>
          <p className="text-sm text-ink/55 max-w-[15rem] leading-relaxed font-light">
            Eleven frames from across the subcontinent — Golden Temple at dusk, Dal Lake at dawn, the Ganges in between.
          </p>
        </div>

        {/* horizontal track */}
        <motion.div style={{ x }} className="relative z-10 flex items-center gap-6 pl-[6vw] pr-[8vw] w-max mt-[4vh] h-[58vh]">
          {indiaDestinations.map((d, i) => (
            <GalleryCard key={d.id} item={d} index={i} progress={scrollYProgress} />
          ))}
          <ClosingCard index={ITEMS - 1} progress={scrollYProgress} />
        </motion.div>

        {/* progress */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto w-full mt-[2vh]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-ink/35">11 frames</span>
            <div className="h-px bg-ink/10 relative overflow-hidden flex-1 mx-6">
              <motion.div style={{ width: progress }} className="absolute top-0 left-0 h-full bg-clay" />
            </div>
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-ink/35">Keep scrolling</span>
          </div>
        </div>
      </div>
    </section>
  );
}