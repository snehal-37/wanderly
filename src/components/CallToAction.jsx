import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

export default function CallToAction() {
  const reduceMotion = usePrefersReducedMotion();

  const handleStart = () => {
    const section = document.getElementById('destinations');
    if (section) section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      <div
        className="relative rounded-3xl overflow-hidden py-24 sm:py-32 px-8 text-center text-ivory bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(20,20,15,0.55), rgba(20,20,15,0.72)), url('/images/09-pangong-lake.jpg')` }}
      >
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto space-y-5"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-clay-light inline-block">
            Your next adventure awaits
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            The world is waiting.
          </h2>
          <p className="text-sm text-ivory/70 font-light leading-relaxed max-w-md mx-auto">
            Your next unforgettable journey starts here — one search away from somewhere extraordinary.
          </p>
          <motion.button
            onClick={handleStart}
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
            whileTap={reduceMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-clay hover:bg-clay-light text-ink text-sm font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg"
          >
            Start Exploring <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}