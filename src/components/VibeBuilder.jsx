import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Compass, Landmark, Utensils, Trees, Sparkles, ArrowRight, Check } from 'lucide-react';
import ScrollReveal from './motion/ScrollReveal';

const vibes = [
  { name: 'Relaxation', icon: Sun, blurb: 'Slow mornings, spa days' },
  { name: 'Adventure', icon: Compass, blurb: 'Trails, peaks, adrenaline' },
  { name: 'Culture', icon: Landmark, blurb: 'Museums, heritage, craft' },
  { name: 'Food', icon: Utensils, blurb: 'Markets, feasts, hidden tables' },
  { name: 'Nature', icon: Trees, blurb: 'Forests, lakes, open skies' },
  { name: 'Luxury', icon: Sparkles, blurb: 'Boutique stays, private access' },
];

export default function VibeBuilder() {
  const [selected, setSelected] = useState(['Relaxation']);
  const [submitted, setSubmitted] = useState(false);

  const toggleVibe = (name) => {
    setSelected(prev => prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]);
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="vibe-builder" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <ScrollReveal direction="up">
        <div className="bg-pine rounded-3xl p-8 lg:p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pine-light/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-clay/20 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-start justify-between gap-10">
            <div className="max-w-md space-y-8">
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-clay-light inline-block mb-3">Find your fit</span>
                <h2 className="font-display text-4xl sm:text-5xl text-ivory leading-tight">Build your perfect trip</h2>
                <p className="text-sm text-ivory/60 mt-4 leading-relaxed">
                  Tell us what you're in the mood for and we'll craft a personalized journey around it.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vibes.map((vibe, i) => {
                  const Icon = vibe.icon;
                  const active = selected.includes(vibe.name);
                  return (
                    <motion.button
                      key={vibe.name}
                      onClick={() => toggleVibe(vibe.name)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      aria-pressed={active}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.5 }}
                      className={`flex flex-col items-start gap-2 p-3.5 rounded-xl border text-left transition-all duration-300 ${
                        active
                          ? 'bg-clay text-ink border-clay'
                          : 'bg-ivory/5 text-ivory/80 border-ivory/10 hover:bg-ivory/10'
                      }`}
                    >
                      <span className="flex items-center justify-between w-full">
                        <Icon className="w-4 h-4" />
                        {active && <Check className="w-3.5 h-3.5" />}
                      </span>
                      <span className="text-xs font-semibold">{vibe.name}</span>
                      <span className={`text-[10px] ${active ? 'text-ink/60' : 'text-ivory/40'}`}>{vibe.blurb}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="bg-ivory/10 backdrop-blur-md p-8 rounded-2xl border border-ivory/10 max-w-sm w-full lg:w-80">
              <h3 className="font-display text-2xl text-ivory">What kind of traveler are you?</h3>
              <p className="text-xs text-ivory/60 mt-2 leading-relaxed">
                {selected.length === 0
                  ? 'Select at least one vibe above.'
                  : `We'll weave ${selected.join(', ')} into one seamless route.`}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.map((name) => (
                  <span key={name} className="text-[11px] font-medium bg-clay/90 text-ink px-3 py-1 rounded-full">
                    {name}
                  </span>
                ))}
              </div>

              <motion.button
                onClick={handleSubmit}
                disabled={selected.length === 0}
                whileHover={selected.length > 0 ? { scale: 1.03 } : {}}
                whileTap={selected.length > 0 ? { scale: 0.97 } : {}}
                className={`w-full mt-6 text-sm font-medium py-3 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-sage text-ink'
                    : selected.length > 0
                    ? 'bg-clay hover:bg-clay-light text-ink'
                    : 'bg-ivory/10 text-ivory/30 cursor-not-allowed'
                }`}
              >
                {submitted ? (
                  <>Journey queued! Check your inbox</>
                ) : (
                  <>Create My Journey <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}