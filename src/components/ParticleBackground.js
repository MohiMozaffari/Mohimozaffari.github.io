// src/components/ParticleBackground.jsx
import React, { useCallback, useMemo } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

/**
 * Background particles tuned for smooth, lively motion.
 * - Constant motion (no decay “stopping” effect)
 * - Memoized options so the engine stays stable across renders
 * - Reasonable FPS cap and interaction settings
 */
export default function ParticleBackground() {
  // Initialize tsparticles engine once
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    // You can access the container here if you want to inspect or control it
  }, []);

  // Keep options stable to avoid re-initialization
  const options = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 90, // smooth but not wasteful

      // If you noticed freezing when tab changes, keep these false
      // pauseOnBlur: false,
      // pauseOnOutsideViewport: false,

      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'repulse' },
          resize: true,
        },
        modes: {
          push: { quantity: 2 },                   // inject a couple of particles on click
          repulse: { distance: 130, duration: 0.18 } // brief repulse so motion recovers quickly
        },
      },

      particles: {
        color: { value: ['#9333ea', '#a855f7', '#c084fc', '#e879f9'] },
        links: {
          color: '#9333ea',
          distance: 150,
          enable: true,
          opacity: 0.28,
          width: 1,
        },

        // Collisions add CPU load; keep off unless you need them
        collisions: { enable: false },

        move: {
          enable: true,
          directions: 'none',
          speed: 2.2,         // ↑ increase for more energy (e.g., 2.8 or 3.2)
          decay: 0,           // 0 = no damping → constant glide
          random: false,
          straight: false,
          outModes: { default: 'bounce' },
        },

        number: {
          density: { enable: true, area: 800 },
          value: 80,
        },

        opacity: { value: 0.5 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 4 } },
      },

      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="fixed inset-0 z-0"
      options={options}
    />
  );
}
