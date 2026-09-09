import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './motion/ScrollReveal';
import { articles } from '../data/destinations';

export default function TravelInspiration() {
  return (
    <section id="inspiration" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto bg-gradient-to-b from-ivory to-sand/30">
      <ScrollReveal direction="left" className="flex justify-between items-end mb-12 gap-6">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-clay mb-2 inline-block">Travel journal</span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Get inspired</h2>
        </div>
        <a href="#stories" className="text-sm font-medium text-ink/60 hover:text-ink transition hidden sm:inline-flex items-center gap-1 group">
          View all articles
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((art, idx) => (
          <ScrollReveal
            key={art.title}
            direction="up"
            delay={idx * 0.1}
            amount={0.2}
            className="group bg-ivory/70 rounded-2xl overflow-hidden border border-ink/5 flex flex-col justify-between hover:shadow-[0_12px_40px_-12px_rgba(20,20,15,0.15)] transition-shadow duration-500"
          >
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-pine/80 backdrop-blur-sm text-ivory text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {art.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink group-hover:text-clay transition-colors duration-300 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-ink/45 mt-1.5">{art.categories}</p>
              </div>
            </div>
            <div className="px-5 pb-5">
              <a
                href="#featured-trip"
                className="text-xs font-semibold text-pine hover:text-pine-light transition inline-flex items-center gap-1.5 group/link"
              >
                Read more
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}