// Midnight Iris design system (design/theme.md, PROMPT.md Part A).
// Presentational-only button/link. Renders as <a> when `href` is given,
// otherwise a native <button>. Variants match design/hero.html and
// design/teaching.html exactly — no ad hoc gradient pills.
import React from 'react';

const VARIANTS = {
  // Iris→orchid gradient, matching the page-title gradient so the primary action
  // reads as part of the brand. A flat saturated iris-600 block was the most
  // intense colour on the page and clashed with the softer lavender headings.
  primary:
    'rounded-lg bg-gradient-to-r from-iris-400 via-iris-500 to-orchid-500 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90',
  // bordered bg-surface-raised — secondary action.
  secondary:
    'rounded-lg border border-line-strong bg-surface-raised px-5 py-3 text-sm font-medium text-content transition-colors hover:border-iris-500',
  // the .link style (coral underline) as a button-shaped affordance, no fill/border.
  ghost: 'link px-1 py-3 text-sm font-medium',
  // coral fill — reserved for the booking CTA per PROMPT.md Part D / design/teaching.html.
  cta:
    'rounded-lg bg-coral-400 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-coral-300',
};

/**
 * @param {'primary'|'secondary'|'ghost'|'cta'} variant
 */
export default function Button({
  variant = 'secondary',
  href,
  className = '',
  children,
  ...props
}) {
  const classes = `${VARIANTS[variant] || VARIANTS.secondary} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
