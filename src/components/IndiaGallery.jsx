import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { indiaDestinations } from '../data/destinations';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

export default function IndiaGallery() {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62%']);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (reduceMotion) {
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
    <section id="discover-india" ref={ref} className="relative h-[300vh] bg-ivory">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section intro */}
        <div className="px-6 sm:px-10 lg:px-20 mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-clay inline-block mb-3">
              Hidden India
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight">
              Wander where
              <br />
              the stories begin
            </h2>
          </div>
          <p className="text-sm text-ink/55 max-w-xs leading-relaxed">
            Eleven frames from across the subcontinent — Golden Temple at dusk, Dal Lake at dawn, the Ganges in between.
          </p>
        </div>

        {/* Horizontal track */}
        <motion.div style={{ x }} className="flex gap-6 px-6 sm:px-10 lg:px-20 w-max">
          {indiaDestinations.map((d) => (
            <div
              key={d.id}
              className="group relative w-[68vw] sm:w-[46vw] lg:w-[30vw] xl:w-[26vw] h-[52vh] sm:h-[52vh] rounded-2xl overflow-hidden bg-sand shrink-0 cursor-pointer"
              onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
              role="button"
              tabIndex="0"
              aria-label={`Discover ${d.name} in ${d.location}`}
            >
              <img
                src={d.image}
                alt={`${d.name} — ${d.tagline}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-pine/10 transition-opacity duration-500" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ivory/15 backdrop-blur-md flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="w-4 h-px bg-clay" />
                  <p className="text-[10px] font-medium uppercase tracking-widest text-ivory/70">{d.location}</p>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl text-ivory leading-tight">{d.name}</h3>
                <p className="text-xs text-ivory/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {d.tagline}
                </p>
              </div>
            </div>
          ))}

          {/* Closing card */}
          <div className="w-[70vw] sm:w-[44vw] lg:w-[26vw] shrink-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <h3 className="font-display text-3xl text-ink">Your India awaits</h3>
              <p className="text-sm text-ink/50">Curated itineraries across every region.</p>
              <button
                onClick={() => document.getElementById('vibe-builder')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 bg-clay hover:bg-clay-light text-ink text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Build your journey <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto w-full mt-8">
          <div className="h-px bg-ink/10 relative overflow-hidden">
            <motion.div style={{ width: progress }} className="absolute top-0 left-0 h-full bg-clay" />
          </div>
        </div>
      </div>
    </section>
  );
}