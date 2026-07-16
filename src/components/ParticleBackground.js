// src/components/ParticleBackground.jsx
import React, { useCallback, useMemo } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

/**
 * Faint ambient network motif in the background — a nod to network science,
 * not an interactive gimmick. No click/hover interactivity, low particle
 * count, slow drift.
 */
export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const options = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,

      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
          resize: true,
        },
      },

      particles: {
        color: { value: '#a855f7' },
        links: {
          color: '#9333ea',
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },

        collisions: { enable: false },

        move: {
          enable: true,
          directions: 'none',
          speed: 0.4,
          decay: 0,
          random: false,
          straight: false,
          outModes: { default: 'bounce' },
        },

        number: {
          density: { enable: true, area: 900 },
          value: 24,
        },

        opacity: { value: 0.2 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 2.5 } },
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
