import { Star } from 'lucide-react';
import ScrollReveal from './motion/ScrollReveal';
import Counter from './motion/Counter';
import { testimonials, stats } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section id="stories" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <ScrollReveal direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-clay mb-2 inline-block">Travelers' stories</span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">What our travelers say</h2>
        </div>
        <p className="text-sm text-ink/50 max-w-xs leading-relaxed">
          Real journeys, real people — every trip is shaped around the traveler we're hosting.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((rev, idx) => (
          <ScrollReveal
            key={rev.id}
            direction={idx % 2 === 0 ? 'up' : 'down'}
            delay={idx * 0.12}
            amount={0.2}
            className="bg-sand/50 rounded-2xl p-7 border border-ink/5 space-y-5 flex flex-col justify-between hover:bg-sand/80 transition-colors duration-300"
          >
            <div className="space-y-4">
              <div className="flex gap-1" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-clay text-clay" />
                ))}
              </div>
              <blockquote className="text-sm text-ink/70 italic leading-relaxed font-light">
                "{rev.quote}"
              </blockquote>
              <span className="text-[11px] font-medium text-clay uppercase tracking-wide">
                Trip · {rev.trip}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-ink/10">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h4 className="text-sm font-semibold text-ink">{rev.name}</h4>
                <p className="text-xs text-ink/45">{rev.location}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Stats band */}
      <ScrollReveal direction="none" className="mt-20">
        <div className="bg-ink rounded-3xl px-6 sm:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="space-y-2">
              <div className="font-display text-4xl sm:text-5xl text-ivory">
                <Counter value={stat.value} suffix={stat.suffix} duration={1.4 + idx * 0.15} />
              </div>
              <p className="text-xs text-ivory/50 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}