import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/UseMediaQuery';

/**
 * Splits text into lines (by \n) and words, revealing each word with a
 * masked upward stagger. Use sparingly — hero headline, section headings,
 * pull quotes. Not for body paragraphs.
 */
export default function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  once = true,
}) {
  const reduceMotion = usePrefersReducedMotion();
  const lines = text.split('\n');

  if (reduceMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </Tag>
    );
  }

  let wordIndex = 0;

  return (
    <Tag className={className}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden">
          <span className="inline-block">
            {line.split(' ').map((word, i) => {
              const idx = wordIndex++;
              return (
                <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once, amount: 0.6 }}
                    transition={{
                      duration: 0.75,
                      delay: delay + idx * stagger,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </Tag>
  );
}