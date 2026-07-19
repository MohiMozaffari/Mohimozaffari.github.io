// Midnight Iris design system (design/theme.md §Motion policy, PROMPT.md A4).
// The single approved motion wrapper — replaces per-page/per-card
// framer-motion stagger. Applies the `.reveal` CSS animation (opacity +
// translateY, 420ms) defined in src/index.css, which already respects
// prefers-reduced-motion. `index` maps to `.reveal-1` / `.reveal-2` for the
// only sanctioned stagger: within a single group, max 3 items, 60ms apart.
import React from 'react';

const STAGGER_CLASS = {
  0: '',
  1: 'reveal-1',
  2: 'reveal-2',
};

/**
 * @param {0|1|2} index - stagger position within a group (0 = no delay).
 */
export default function Reveal({
  as: Component = 'div',
  index = 0,
  className = '',
  children,
  ...props
}) {
  const stagger = STAGGER_CLASS[index] ?? '';
  return (
    <Component className={`reveal ${stagger} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
