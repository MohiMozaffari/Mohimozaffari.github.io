// Midnight Iris design system (design/theme.md, PROMPT.md Part A).
// Presentational-only page header: gradient display heading + the rule-orchid
// underline. `size` controls the two header registers (Research is the "lead
// section" xl treatment; subordinate pages like Teaching use the lighter lg).
// The mono kicker/eyebrow the mockups had above each title was removed at
// Mohi's request — the title now leads directly.
import React from 'react';

const SIZES = {
  xl: 'font-display display-optical text-display-lg font-semibold',
  lg: 'font-display text-h1 font-semibold leading-tight tracking-tight',
};

/**
 * @param {'xl'|'lg'} size - heading size register.
 * @param {string} maxWidth - Tailwind max-width class for the heading.
 * @param {boolean} gradient - paint the title with the iris→orchid gradient
 *   instead of flat white. On by default: page titles carry the brand colour so
 *   the site isn't wall-to-wall white text; section headings stay flat.
 */
export default function PageHeader({
  children,
  size = 'xl',
  maxWidth = 'max-w-3xl',
  className = '',
  description,
  gradient = true,
  split = true,
}) {
  const title = (
    <>
      <h1 className={`${maxWidth} ${SIZES[size] || SIZES.xl} ${gradient ? 'gradient-word' : ''}`.trim()}>
        {children}
      </h1>
      <div className="mt-6 h-px w-32 rule-orchid" />
    </>
  );

  // Two-column editorial header: a short title alone in a full-width band reads
  // as empty, so on md+ the intro sits beside the title instead of under it.
  // Stacks to a single column on mobile. `split={false}` keeps the stacked form
  // (used by About, whose header already shares a row with the avatar).
  if (description && split) {
    return (
      <div className={className}>
        <div className="grid gap-x-10 gap-y-5 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">{title}</div>
          <p className="max-w-prose text-body text-content-muted md:col-span-7 md:pt-1">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {title}
      {description && (
        <p className="mt-5 max-w-prose text-body text-content-muted">{description}</p>
      )}
    </div>
  );
}
