// Midnight Iris design system (design/theme.md, PROMPT.md Part A).
// Presentational-only body-text wrapper: caps measure at max-w-prose (68ch)
// and applies the body text scale/color used throughout the mockups.
import React from 'react';

/**
 * @param {boolean} justify - flush both edges. Paired with hyphens-auto so
 *   justification doesn't open up rivers of whitespace between words.
 */
export default function Prose({
  as: Component = 'div',
  className = '',
  justify = false,
  children,
  ...props
}) {
  return (
    <Component
      className={`max-w-prose text-body text-content-muted ${
        justify ? 'text-justify hyphens-auto' : ''
      } ${className}`.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
