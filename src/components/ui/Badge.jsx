// Midnight Iris design system (design/theme.md, PROMPT.md Part A / B3).
// Presentational-only publication status badge. `status` maps 1:1 to the
// D1 `publications.status` column values — do not invent new statuses.
// Reproduces the pill + status-dot treatment from design/research.html.
import React from 'react';

const STATUS_CONFIG = {
  published: {
    label: 'Published',
    classes: 'border-mint-400/30 bg-mint-400/10 text-mint-400',
    dot: 'bg-mint-400',
  },
  'under-review': {
    label: 'Under review',
    classes: 'border-coral-400/30 bg-coral-400/10 text-coral-300',
    dot: 'bg-coral-400',
  },
  preprint: {
    label: 'Preprint',
    classes: 'border-iris-400/30 bg-iris-400/10 text-iris-300',
    dot: 'bg-iris-400',
  },
  // A peer-accepted conference talk is not a published paper — it gets its own
  // status so the green "Published" badge never overstates a presentation.
  presentation: {
    label: 'Oral presentation',
    classes: 'border-orchid-400/30 bg-orchid-400/10 text-orchid-400',
    dot: 'bg-orchid-400',
  },
  // Admin previously offered "submitted" while the badge only knew the three
  // above, so a submitted entry silently rendered no badge at all.
  submitted: {
    label: 'Submitted',
    classes: 'border-coral-400/30 bg-coral-400/10 text-coral-300',
    dot: 'bg-coral-400',
  },
};

/**
 * @param {'published'|'under-review'|'preprint'|'presentation'|'submitted'} status
 * @param {string} [label] - override the default label text.
 */
export default function Badge({ status, label, className = '' }) {
  const config = STATUS_CONFIG[status];

  if (!config) {
    // Unknown status: render nothing rather than inventing a new visual state.
    return null;
  }

  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded-md border px-2.5 py-1
        font-mono text-micro uppercase tracking-[0.1em]
        ${config.classes} ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {label || config.label}
    </span>
  );
}
