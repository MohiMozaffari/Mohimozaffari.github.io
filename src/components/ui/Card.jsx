// Midnight Iris design system (design/theme.md, PROMPT.md Part A).
// Presentational-only card shell: bg-surface-raised + hairline border,
// brightening to border-line-strong on hover. Matches the project-card and
// panel treatment in design/hero.html, design/research.html, design/teaching.html.
import React from 'react';

const PADDING = {
  none: '',
  sm: 'p-5',
  md: 'p-6',
  lg: 'p-7',
};

const RADIUS = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

/**
 * @param {'none'|'sm'|'md'|'lg'} padding
 * @param {'lg'|'xl'|'2xl'} radius
 * @param {boolean} raise - apply shadow-raise (used for larger feature panels).
 * @param {boolean} interactive - add hover border-brightening (default true).
 */
export default function Card({
  as: Component = 'div',
  padding = 'sm',
  radius = 'lg',
  raise = false,
  interactive = true,
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`
        border border-line bg-surface-raised
        ${RADIUS[radius] || RADIUS.lg}
        ${PADDING[padding] ?? PADDING.sm}
        ${raise ? 'shadow-raise' : ''}
        ${interactive ? 'transition-colors hover:border-line-strong' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
