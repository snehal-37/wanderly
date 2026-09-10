import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Compass, Landmark, Utensils, Trees, Sparkles, ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

const EASE_OUT = [0.22, 1, 0.36, 1];

const vibes = [
  { name: 'Relaxation', icon: Sun, blurb: 'Slow mornings, spa days', phrase: 'long unhurried mornings' },
  { name: 'Adventure', icon: Compass, blurb: 'Trails, peaks, adrenaline', phrase: 'ridges walked at dawn' },
  { name: 'Culture', icon: Landmark, blurb: 'Museums, heritage, craft', phrase: 'galleries and old bazaars' },
  { name: 'Food', icon: Utensils, blurb: 'Markets, feasts, hidden tables', phrase: 'tasting across the map' },
  { name: 'Nature', icon: Trees, blurb: 'Forests, lakes, open skies', phrase: 'forests and quiet lakes' },
  { name: 'Luxury', icon: Sparkles, blurb: 'Boutique stays, private access', phrase: 'privacy and small luxuries' },
];

// Each vibe tunes the "energy" of the room — and therefore how the
// floating orbs drift inside the dark panel.
const AURA = { Relaxation: 0.55, Adventure: 1.5, Culture: 0.95, Food: 1.15, Nature: 0.8, Luxury: 0.7 };

const ORBS = [
  { size: 260, left: '-8%', top: '-12%', fill: 'rgba(185,133,90,0.38)', mix: 'mix-blend-soft-light' },
  { size: 320, right: '-10%', top: '8%', fill: 'rgba(154,168,140,0.3)', mix: 'mix-blend-soft-light' },
  { size: 220, left: '22%', bottom: '-14%', fill: 'rgba(211,165,120,0.32)', mix: 'mix-blend-soft-light' },
  { size: 180, right: '18%', bottom: '-6%', fill: 'rgba(35,74,60,0.55)', mix: 'mix-blend-screen' },
];

export default function VibeBuilder() {
  const [selected, setSelected] = useState(['Relaxation']);
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const submitTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(submitTimer.current);
  }, []);

  const energy = useMemo(() => {
    if (selected.length === 0) return 1;
    return selected.reduce((s, n) => s + AURA[n], 0) / selected.length;
  }, [selected]);

  const speedFactor = Math.max(0.6, Math.min(2.2, 0.72 + (energy - 0.6) * 1.5));
  const glowStrength = 0.35 + selected.length * 0.07;

  const toggleVibe = (name) => {
    if (reduceMotion) {
      setSelected((prev) => (prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]));
      return;
    }
    setSelected((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]));
  };

  const handleSubmit = () => {
    if (selected.length === 0 || submitted) return;
    setSubmitted(true);
    submitTimer.current = setTimeout(() => setSubmitted(false), 2800);
  };

  const sentiment = selected.length
    ? `${selected.map((n) => vibes.find((v) => v.name === n)?.phrase).join(' · ')} — we'll weave it into one route.`
    : 'Select at least one vibe above.';

  return (
    <section id="vibe-builder" className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <div className="bg-pine rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden isolate">
        {/* atmosphere: soft light washes tuned by the selection */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <motion.div
            animate={reduceMotion ? { opacity: glowStrength * 0.6 } : { opacity: glowStrength }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_20%,rgba(185,133,90,0.28),transparent_70%)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_78%_85%,rgba(154,168,140,0.16),transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay grain-layer" />

          {ORBS.map((orb, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-[70px] will-change-transform ${orb.mix}`}
              style={{
                width: orb.size,
                height: orb.size,
                background: orb.fill,
                ...(orb.left !== undefined ? { left: orb.left } : { right: orb.right }),
                ...(orb.top !== undefined ? { top: orb.top } : { bottom: orb.bottom }),
              }}
              animate={
                reduceMotion
                  ? { opacity: 0.5 }
                  : {
                      opacity: [0.34, 0.6, 0.34],
                      x: [0, i % 2 === 0 ? 36 : -42, 0],
                      y: [0, i % 2 === 0 ? -30 : 26, 0],
                      scale: [1, 1.12, 1],
                    }
              }
              transition={{
                duration: (5.2 + i * 1.7) / speedFactor,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          <div className="max-w-md space-y-8">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-clay-light inline-block mb-3 flex items-center gap-3">
                <span className="w-6 h-px bg-clay-light/60 inline-block" />
                Find your fit
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-ivory leading-[1.05]">
                Build your
                <br />
                <em className="italic">perfect</em> trip
              </h2>
              <p className="text-sm text-ivory/60 mt-4 leading-relaxed font-light">
                Tell us what you're in the mood for and we'll shape a journey around it. The room responds as you choose.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label="Vibe selection">
              {vibes.map((vibe, i) => {
                const Icon = vibe.icon;
                const active = selected.includes(vibe.name);
                return (
                  <motion.button
                    key={vibe.name}
                    onClick={() => toggleVibe(vibe.name)}
                    data-cursor="link"
                    aria-pressed={active}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.05, duration: 0.6, ease: EASE_OUT }}
                    whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    animate={active ? { backgroundColor: 'rgba(185,133,90,0.16)', borderColor: 'rgba(185,133,90,0.55)' } : { backgroundColor: 'rgba(246,242,233,0.04)', borderColor: 'rgba(246,242,233,0.14)' }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="relative flex flex-col items-start gap-2 p-3.5 sm:p-4 rounded-xl border text-left overflow-hidden"
                  >
                    {active && (
                      <motion.span
                        layoutId="clay-glow"
                        className="absolute inset-0 rounded-xl bg-clay/20 blur-md scale-90"
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative flex items-center justify-between w-full">
                      <motion.span
                        animate={{
                          rotate: active ? -10 : 0,
                          scale: active ? 1.12 : 1,
                          color: active ? '#F6F2E9' : 'rgba(246,242,233,0.7)',
                        }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.span>
                      {active && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="w-4 h-4 rounded-full bg-clay flex items-center justify-center"
                        >
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5.5L4 8L8.5 2.5" stroke="#14140F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.span>
                      )}
                    </span>
                    <span className={`relative text-xs font-semibold ${active ? 'text-ivory' : 'text-ivory/80'}`}>
                      {vibe.name}
                    </span>
                    <span className={`relative text-[10px] leading-relaxed ${active ? 'text-clay-light/80' : 'text-ivory/40'}`}>
                      {vibe.blurb}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Journey summary panel */}
          <div className="w-full lg:w-80 shrink-0 bg-ivory/[0.03] backdrop-blur-sm p-7 rounded-2xl border border-ivory/10">
            <h3 className="font-display text-2xl text-ivory">What kind of traveler are you?</h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={sentiment}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="text-xs text-ivory/60 mt-2 leading-relaxed font-light"
              >
                {sentiment}
              </motion.p>
            </AnimatePresence>

            <div className="mt-6">
              <span className="text-[10px] text-ivory/40 uppercase tracking-[0.24em]">Your selection</span>
              <div className="mt-2 border-t border-ivory/10">
                <AnimatePresence>
                  {selected.length === 0 ? (
                    <p className="py-3 text-xs text-ivory/35 italic">Nothing chosen yet.</p>
                  ) : (
                    selected.map((name, i) => (
                      <motion.div
                        key={name}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                        className="flex items-baseline gap-3 py-2 border-b border-ivory/10 last:border-0"
                      >
                        <span className="text-[10px] text-clay-light tracking-[0.2em]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-ivory/85">{name}</span>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={selected.length === 0}
              data-cursor="cta"
              whileTap={selected.length > 0 && !reduceMotion ? { scale: 0.96 } : undefined}
              animate={submitted ? { scale: 1.03 } : { scale: 1 }}
              className={`w-full mt-7 text-sm font-medium py-3.5 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 overflow-hidden ${
                submitted
                  ? 'bg-sage text-ink'
                  : selected.length > 0
                  ? 'bg-clay hover:bg-clay-light text-ink'
                  : 'bg-ivory/10 text-ivory/30 cursor-not-allowed'
              }`}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="inline-flex items-center gap-3"
                  >
                    <svg width="64" height="22" viewBox="0 0 64 22" fill="none" className="shrink-0">
                      <motion.path
                        d="M3 18 C 14 18, 18 5, 30 10 S 48 5, 61 4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.1, ease: EASE_OUT }}
                      />
                      <motion.path
                        d="M57 1.8 L 62 4 L 57 6.6"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                      />
                    </svg>
                    <span className="whitespace-nowrap">Your journey is taking shape.</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="cta"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="inline-flex items-center gap-2"
                  >
                    Create My Journey
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}