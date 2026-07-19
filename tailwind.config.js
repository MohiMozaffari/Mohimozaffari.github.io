/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    // Midnight Iris design system — ported verbatim from design/tailwind-theme.js
    // (see design/theme.md for rationale). Do not hand-edit values here without
    // updating the design/ source of truth first.
    extend: {
      colors: {
        ink: '#0A0910',
        surface: {
          DEFAULT: '#100E1A',
          raised: '#171426',
          overlay: '#1E1A31',
        },
        line: {
          DEFAULT: '#241F38',
          strong: '#382F55',
        },
        content: {
          DEFAULT: '#F2EEF9',
          muted: '#B7AECD',
          faint: '#7C7391',
        },
        iris: {
          200: '#DCCBFF',
          300: '#C4A9FF',
          400: '#A683FF',
          500: '#8B5CF6',
          600: '#7442E0',
          700: '#5B2FB8',
          900: '#2A1259',
          950: '#180A34',
        },
        orchid: {
          400: '#EC72B6',
          500: '#E0559C',
        },
        coral: {
          300: '#F7A991',
          400: '#F2856B',
          500: '#E56A4E',
        },
        mint: {
          400: '#6FD9A6',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      // One deliberate scale. Every size below is a named step — no arbitrary
      // text-[13px] one-offs, which is how the site ended up with 10/11/12/13/15px
      // all in play at once. Steps: 11 · 12 · 14 · 16 · 17 · 20 · 24 · 32 · 40 · fluid.
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1.5' }], // 11px — mono labels/eyebrows
        meta: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }], // 12px uppercase
        caption: ['0.75rem', { lineHeight: '1.55' }], // 12px plain — venues, authors, dates
        body: ['1.0625rem', { lineHeight: '1.7' }], // 17px — long-form prose
        h3: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }], // 20px
        h2: ['2rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }], // 32px
        h1: ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 40px
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(3rem, 7vw, 5.25rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '24px',
      },
      boxShadow: {
        raise: 'inset 0 1px 0 rgba(255,255,255,.04), 0 12px 32px -12px rgba(0,0,0,.8)',
        focus: '0 0 0 1px rgba(139,92,246,.35), 0 16px 48px -16px rgba(139,92,246,.35)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};