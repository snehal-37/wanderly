import { useRef } from 'react';
import { Star, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import ScrollReveal from './motion/ScrollReveal';
import { experiences } from '../data/destinations';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

export default function Experience() {
  const trackRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  const scroll = (delta) => {
    trackRef.current?.scrollBy({ left: delta, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') scroll(-360);
    if (e.key === 'ArrowRight') scroll(360);
  };

  return (
    <section id="experiences" className="py-24 sm:py-32 overflow-x-clip">
      <div className="px-6 sm:px-10 max-w-7xl mx-auto">
        <ScrollReveal direction="up" className="flex justify-between items-end mb-10 gap-6">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-clay mb-3 inline-block">
              Popular experiences
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink">Experiences worth traveling for</h2>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll(-360)}
              className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-ivory transition hover:scale-105 active:scale-95"
              aria-label="Scroll experiences left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(360)}
              className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-ivory transition hover:scale-105 active:scale-95"
              aria-label="Scroll experiences right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="px-6 sm:px-10 max-w-7xl mx-auto">
        <div
          ref={trackRef}
          tabIndex="0"
          role="region"
          aria-label="Experiences carousel"
          onKeyDown={handleKeyDown}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 sm:-mx-10 px-6 sm:px-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded-2xl"
        >
          {experiences.map((exp, idx) => (
            <ScrollReveal
              key={exp.title}
              direction="up"
              delay={idx * 0.08}
              amount={0.2}
              className="group relative shrink-0 snap-start w-[82vw] sm:w-[58vw] lg:w-[46vw] xl:w-[38%] bg-sand rounded-3xl overflow-hidden hover:bg-ink transition-colors duration-500"
            >
              <article className="relative h-[420px] sm:h-[460px] lg:h-[480px] flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src={exp.image}
                    alt={`${exp.title} in ${exp.location}`}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-[1200ms] ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition-opacity duration-500 group-hover:from-ink/90" />
                </div>

                <div className="absolute top-5 left-5 flex items-center gap-1 bg-ivory/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-ink shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-clay text-clay" />
                  <span className="text-xs font-semibold">{exp.rating}</span>
                  <span className="text-[10px] text-ink/50">({exp.reviews})</span>
                </div>

                <button
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-ivory/15 backdrop-blur-md flex items-center justify-center text-ivory opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-clay hover:text-ink"
                  aria-label={`Explore ${exp.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="relative p-6 sm:p-8 text-ivory">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-ivory/60 mb-2">{exp.location}</p>
                  <h3 className="font-display text-3xl sm:text-4xl leading-tight mb-3">{exp.title}</h3>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-ivory/50">From</span>
                      <p className="font-display text-xl text-ivory">{exp.price}</p>
                    </div>
                    <button className="text-xs font-semibold px-5 py-2.5 rounded-full bg-ivory text-ink hover:bg-clay hover:text-ink transition-all duration-300 hover:scale-105 active:scale-95 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      Explore
                    </button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}

          <div className="shrink-0 snap-start w-[70vw] sm:w-[40vw] lg:w-[26%] flex items-center justify-center">
            <a
              href="#destinations"
              className="group text-center space-y-4 flex flex-col items-center"
            >
              <span className="w-16 h-16 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors duration-300 group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight className="w-6 h-6" />
              </span>
              <span className="font-display text-2xl text-ink">View all experiences</span>
              <span className="text-xs text-ink/50">Browse the full collection</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}