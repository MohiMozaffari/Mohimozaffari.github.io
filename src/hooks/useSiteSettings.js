import { useEffect, useState } from 'react';
import { getSettings } from '../api/settings';

// Defaults mirror server/src/routes/settings.js so text still renders correctly
// even before the first API response arrives (or if the request fails).
const DEFAULTS = {
  home_hero_line1: 'AI & Neuroscience Researcher',
  home_hero_line2: 'Brain Networks | Topological Data Analysis | Medical Imaging',
  home_about_paragraph:
    'I started in physics, curious about how simple rules create complex patterns. That curiosity grew into my master’s research on brain networks and autism, where I used tools like persistent homology to study the hidden structure of the brain.',
  about_intro:
    'Passionate about bridging the gap between theoretical physics and practical applications through computational approaches and innovative teaching methods.',
  about_journey_1:
    'I started in physics, curious about how simple rules create complex patterns. That curiosity grew into my master’s research on brain networks and autism, where I used tools like persistent homology to study the hidden structure of the brain.',
  about_journey_2:
    'I love when theory meets practice. Whether it’s running simulations, building models, or teaching Python and AI, I make learning hands-on with games, projects, and real-world applications.',
  about_journey_3:
    'Outside of research and teaching, I’m usually trying out new algorithms, contributing to open-source, or just recharging with yoga, TRX workouts, and a little purple aesthetic ✨.',
  contact_intro: 'Send a message directly, or reach me via Email, LinkedIn, or Telegram.',
  teaching_intro:
    'Python instructor since June 2023 (Ostadbank & Picha Club), teaching Python, data analysis, and machine learning to learners of varying backgrounds — from complete beginners to advanced deep-learning students — through 1:1 and group sessions.',
  footer_tagline: 'AI & Neuroscience Researcher | Brain Networks | Topological Data Analysis | Medical Imaging',
};

export default function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    getSettings()
      .then((data) => setSettings({ ...DEFAULTS, ...data }))
      .catch(() => {});
  }, []);

  return settings;
}
