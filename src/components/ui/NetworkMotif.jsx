// Midnight Iris design system (design/theme.md §Background motif, PROMPT.md A5).
// Static, zero-JS SVG background motif — replaces the old JS-driven canvas
// engine entirely. A sparse graph (nodes + edges) overlaid with a few
// translucent "filtration ball" disks, resolving from iris into orchid
// left-to-right, evoking a Vietoris–Rips persistent-homology complex.
// Ported verbatim from design/hero.html's .motif SVG.
//
// Purely decorative/presentational: aria-hidden, pointer-events-none, no
// data or interactivity.
import React from 'react';

function MotifSvg({ viewBox }) {
  return (
    <svg viewBox={viewBox} fill="none" preserveAspectRatio="xMidYMid slice">
      <g stroke="#8B5CF6" strokeOpacity="0.16" strokeWidth="1">
        <path d="M120 180 L300 120 L470 210 L300 330 Z" />
        <path d="M300 120 L470 210 M120 180 L300 330 M470 210 L640 150 M640 150 L780 260 M300 330 L470 480 M470 480 L640 150 M470 480 L700 560" />
      </g>
      {/* the graph resolves from iris into orchid as it moves right */}
      <g stroke="#E0559C" strokeOpacity="0.18" strokeWidth="1">
        <path d="M780 260 L960 200 M960 200 L1080 380 M700 560 L900 470 M900 470 L1080 380 M780 260 L900 470" />
      </g>
      {/* filtration balls: the epsilon-radius disks of persistent homology */}
      <g fill="#8B5CF6" fillOpacity="0.05" stroke="#A683FF" strokeOpacity="0.10">
        <circle cx="300" cy="120" r="72" />
        <circle cx="470" cy="210" r="72" />
        <circle cx="300" cy="330" r="72" />
        <circle cx="640" cy="150" r="72" />
      </g>
      <g fill="#E0559C" fillOpacity="0.05" stroke="#EC72B6" strokeOpacity="0.14">
        <circle cx="900" cy="470" r="72" />
        <circle cx="1080" cy="380" r="72" />
        <circle cx="960" cy="200" r="72" />
      </g>
      <g fill="#C4A9FF" fillOpacity="0.5">
        <circle cx="120" cy="180" r="3" />
        <circle cx="300" cy="120" r="4" />
        <circle cx="470" cy="210" r="4" />
        <circle cx="300" cy="330" r="3" />
        <circle cx="640" cy="150" r="4" />
        <circle cx="780" cy="260" r="3" />
        <circle cx="470" cy="480" r="4" />
        <circle cx="700" cy="560" r="3" />
      </g>
      <g fill="#EC72B6" fillOpacity="0.6">
        <circle cx="960" cy="200" r="4" />
        <circle cx="900" cy="470" r="4" />
        <circle cx="1080" cy="380" r="3.5" />
      </g>
    </svg>
  );
}

/**
 * @param {boolean} fixed - render as a full-viewport fixed backdrop (for
 *   App.js) instead of an absolutely-positioned section overlay.
 * @param {boolean} mesh - also apply the .mesh radial-gradient wash behind
 *   the graph (matches design/hero.html's hero section treatment).
 * @param {string} viewBox - SVG viewBox, in case a section needs a different
 *   aspect ratio (design/research.html uses "0 0 1200 520").
 */
export default function NetworkMotif({
  fixed = false,
  mesh = true,
  viewBox = '0 0 1200 700',
  className = '',
}) {
  if (fixed) {
    return (
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${mesh ? 'mesh' : ''} ${className}`.trim()}
      >
        <MotifSvg viewBox={viewBox} />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`motif ${className}`.trim()}>
      <MotifSvg viewBox={viewBox} />
    </div>
  );
}
