import React from 'react';

/**
 * Infinite horizontal marquee. Content is duplicated once so the CSS
 * animation can loop seamlessly at -50%. Keep to one or two per page.
 */
export default function Marquee({ items = [], className = '', textClassName = '' }) {
  const content = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track">
        {content.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className={textClassName}>{item}</span>
            <span className="mx-8 opacity-40 select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}