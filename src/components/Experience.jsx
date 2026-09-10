import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { experiences } from '../data/destinations';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

function ExperienceCard({ exp }) {
  return (
    <div
      data-exp-card
      className="relative shrink-0 snap-start w-[82vw] sm:w-[54vw] lg:w-[40vw] xl:w-[33%] max-w-[560px]"
    >
      <article className="relative h-[400px] sm:h-[440px] xl:h-[480px] bg-sand rounded-3xl overflow-hidden group">
        {/* image drift */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={exp.image}
            alt={`${exp.title} in ${exp.location}`}
            className="w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          {/* deepens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent opacity-90 transition-opacity duration-700 delay-75 group-hover:from-ink/95 group-hover:via-ink/40 group-hover:opacity-100" />
        </div>

        {/* rating */}
        <div className="absolute top-5 left-5 flex items-center gap-1.5 text-ivory rounded-full px-2.5 py-1 bg-ink/25 backdrop-blur-sm transition-all duration-500">
          <Star className="w-3.5 h-3.5 fill-clay-light text-clay-light" />
          <span className="text-xs font-semibold">{exp.rating}</span>
          <span className="text-[10px] text-ivory/55">({exp.reviews})</span>
        </div>

        {/* category label */}
        <p className="absolute top-5 right-5 text-[10px] font-medium uppercase tracking-[0.28em] text-ivory/65 transition-all duration-500 delay-100 group-hover:text-ivory/90 group-hover:-translate-x-2">
          {exp.location.split(',')[1]?.trim() || exp.location}
        </p>

        <div className="relative p-6 sm:p-8 text-ivory flex flex-col justify-end h-full">
          <div className="mb-3 opacity-0 translate-y-4 transition-all duration-500 ease-out delay-200 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-[11px] text-ivory/55 uppercase tracking-[0.2em]">From</span>
            <span className="font-display text-2xl text-ivory block">{exp.price}</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl leading-[1.05] transition-transform duration-500 ease-out delay-150 group-hover:-translate-y-1">
            {exp.title}
          </h3>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-ivory/60">
              {exp.location}
            </span>
            <button
              data-cursor="cta"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide opacity-0 translate-y-3 transition-all duration-500 ease-out delay-300 group-hover:opacity-100 group-hover:translate-y-0"
              aria-label={`Explore ${exp.title}`}
            >
              <span className="text-xs bg-ivory text-ink px-4 py-2 rounded-full hover:bg-clay-light transition-colors duration-300 uppercase tracking-wider">
                Explore
              </span>
            </button>
          </div>
        </div>

        <span
          className="pointer-events-none absolute bottom-6 right-6 w-9 h-9 rounded-full border border-ivory/30 flex items-center justify-center transition-all duration-500 ease-out delay-[350ms] group-hover:rotate-45 text-ivory/70"
          aria-hidden="true"
        >
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </article>
    </div>
  );
}

function ClosingRail() {
  return (
    <div className="shrink-0 snap-start w-[70vw] sm:w-[44vw] lg:w-[32%] xl:w-[26%] max-w-[440px] flex items-center justify-center">
      <a
        href="#destinations"
        data-cursor="link"
        className="group w-full h-[400px] sm:h-[440px] xl:h-[480px] bg-sand rounded-3xl flex flex-col items-center justify-center gap-5 text-center px-8"
      >
        <span className="w-14 h-14 rounded-full border border-ink/25 flex items-center justify-center text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
        </span>
        <span className="font-display text-2xl text-ink">View all experiences</span>
        <span className="text-xs text-ink/45 tracking-[0.18em] uppercase">
          Browse the full collection
        </span>
      </a>
    </div>
  );
}

export default function Experience() {
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const railInView = useInView(railRef, { once: true, amount: 0.2 });

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-exp-card]');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    const step = (card?.offsetWidth ?? 480) + gap;
    track.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="experiences"
      className="py-24 sm:py-32 overflow-x-clip"
      aria-label="Recommended experiences"
    >
      <div className="px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10 gap-6">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-clay mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-clay inline-block" />
              Popular experiences
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] text-ink leading-[1.05]">
              Experiences worth
              <br className="hidden sm:block" />
              <em className="italic">traveling</em> for
            </h2>
          </div>
        </div>
      </div>

      <div ref={railRef} className="relative px-6 sm:px-10 max-w-7xl mx-auto">
        {/* prev */}
        <button
          onClick={() => scrollByCard(-1)}
          data-cursor="link"
          aria-label="Previous experiences"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ivory text-ink border border-ink/15 shadow-[0_14px_35px_-14px_rgba(8,8,4,0.7)] flex items-center justify-center hover:bg-clay hover:text-ink active:scale-95 transition-colors duration-300"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        {/* next */}
        <button
          onClick={() => scrollByCard(1)}
          data-cursor="link"
          aria-label="Next experiences"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ivory text-ink border border-ink/15 shadow-[0_14px_35px_-14px_rgba(8,8,4,0.7)] flex items-center justify-center hover:bg-clay hover:text-ink active:scale-95 transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={railInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={trackRef}
            tabIndex="0"
            role="region"
            aria-label="Experiences carousel"
            data-cursor="drag"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') scrollByCard(-1);
              if (e.key === 'ArrowRight') scrollByCard(1);
            }}
            className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-14 -mx-6 sm:-mx-10 px-6 sm:px-10 pt-2 focus:outline-none"
          >
            {experiences.map((exp) => (
              <ExperienceCard key={exp.title} exp={exp} />
            ))}
            <ClosingRail />
          </div>
        </motion.div>
      </div>
    </section>
  );
}