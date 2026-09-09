import { useState } from 'react';
import { Check, Play, ArrowRight } from 'lucide-react';
import ScrollReveal from './motion/ScrollReveal';
import ImageReveal from './motion/ImageReveal';

const included = [
  'Guided city tours in Positano & Amalfi',
  'Boat trip along the coastline',
  'Local food & wine experiences',
  'Handpicked boutique hotels',
];

export default function FeaturedTrip() {
  const [showJourney, setShowJourney] = useState(false);

  return (
    <section id="featured-trip" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-sand/60 to-ivory rounded-3xl p-8 lg:p-14 border border-ink/5">
        <div className="relative">
          <ImageReveal
            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
            alt="Amalfi Coast, Italy"
            variant="curtain"
            className="rounded-2xl h-96 lg:h-[28rem]"
          />
          <button
            onClick={() => setShowJourney(!showJourney)}
            aria-pressed={showJourney}
            className="absolute bottom-6 left-6 bg-ivory/95 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center gap-2 text-xs font-medium text-ink shadow-md hover:bg-ivory transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Play className={`w-3.5 h-3.5 fill-pine text-pine transition-transform ${showJourney ? 'rotate-90' : ''}`} />
            {showJourney ? 'Journey paused' : 'Watch the journey'}
          </button>
        </div>

        <div className="space-y-6">
          <ScrollReveal direction="right">
            <span className="text-xs font-medium uppercase tracking-widest text-clay inline-block mb-3">Featured trip</span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
              A different way to experience the world.
            </h2>
          </ScrollReveal>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-ink/70">
            <span className="bg-ivory px-3 py-1.5 rounded-full border border-ink/10 flex items-center gap-1.5">7 Days</span>
            <span className="bg-ivory px-3 py-1.5 rounded-full border border-ink/10 flex items-center gap-1.5">Amalfi Coast, Italy</span>
          </div>

          <div className="space-y-2.5 pt-2">
            <p className="text-xs font-medium uppercase tracking-wider text-ink/40">Your journey includes</p>
            {included.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-ink/75">
                <Check className="w-4 h-4 text-pine shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-ink/10">
            <div>
              <span className="text-xs text-ink/40">From</span>
              <div className="text-2xl font-semibold font-display text-pine">
                $1,799 <span className="text-xs font-normal text-ink/50 font-sans">per person</span>
              </div>
            </div>
            <button
              onClick={() => alert('Journey details coming soon — start planning with our Search bar above!')}
              className="bg-pine hover:bg-pine-light text-ivory font-medium text-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              View Journey <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}