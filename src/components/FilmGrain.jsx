import { usePrefersReducedMotion } from '../hooks/UseMediaQuery';

/**
 * FilmGrain — a fixed, full-viewport noise layer. It sits above content and
 * imagery so everything inherits a faint cinematic texture. Static (no
 * animation) for reduced motion and appended last for performance on modest
 * GPUs; the flicker is deliberately tiny.
 */
export default function FilmGrain() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-multiply ${
        reduceMotion ? '' : 'grain-layer'
      }`}
      aria-hidden="true"
    />
  );
}