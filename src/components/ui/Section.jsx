// Midnight Iris design system (design/theme.md, PROMPT.md Part A).
// Presentational-only section wrapper: vertical rhythm, optional alternating
// background, hairline borders, and a centered max-width container — the
// shell every page section should compose from instead of ad hoc divs.
import React from 'react';

const BACKGROUNDS = {
  ink: 'bg-ink',
  surface: 'bg-surface',
};

const BORDERS = {
  none: '',
  top: 'border-t border-line',
  bottom: 'border-b border-line',
  y: 'border-y border-line',
};

/**
 * @param {'ink'|'surface'} background - section background token.
 * @param {'none'|'top'|'bottom'|'y'} border - hairline border edges.
 * @param {string} maxWidth - Tailwind max-width class for the inner container.
 * @param {string} padY - Tailwind vertical padding classes for the inner container.
 */
export default function Section({
  as: Component = 'section',
  background = 'ink',
  border = 'none',
  maxWidth = 'max-w-7xl',
  padY = 'py-20',
  className = '',
  containerClassName = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`${BACKGROUNDS[background] || BACKGROUNDS.ink} ${BORDERS[border] || ''} ${className}`.trim()}
      {...props}
    >
      <div className={`relative mx-auto ${maxWidth} px-6 ${padY} ${containerClassName}`.trim()}>
        {children}
      </div>
    </Component>
  );
}
