/* Midnight Iris — shared Tailwind theme for the /design mockups.
 * This object is the literal payload for tailwind.config.js `theme.extend` when the
 * mockups are approved (PROMPT.md A2, Sonnet step 2). Keep the two in sync. */
window.midnightIris = {
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
    fontSize: {
      meta: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      body: ['1.0625rem', { lineHeight: '1.7' }],
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
};
