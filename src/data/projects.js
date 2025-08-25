// src/data/projects.js  (pure JS)

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-._~]/g, '')
    .replace(/-+/g, '-');

// ---- YOUR PROJECTS ARRAY ----
// Keep your existing array here. Example:
export const projects = [
  {
    id: "computational-physics",
    name: "Computational-Physics",
    description: "Comprehensive collection of computational physics algorithms and simulations implemented in Python and Jupyter notebooks, including numerical integration methods, wave equation solvers, quantum mechanics simulations, and Monte Carlo methods.",
    url: "https://github.com/MohiMozaffari/Computational-Physics",
    language: "Jupyter Notebook",
    stars: 6,
    forks: 0,
    created_at: "2023-01-15T00:00:00Z",
    updated_at: "2023-01-15T00:00:00Z",
    details: {
      overview: "A collection of computational physics algorithms and simulations implemented in Python and Jupyter notebooks.",
      features: [
        "Numerical integration methods (Euler, Runge-Kutta)",
        "Wave equation solvers",
        "Quantum mechanics simulations",
        "Statistical mechanics examples",
        "Monte Carlo methods"
      ],
      technologies: ["Python", "NumPy", "SciPy", "Matplotlib", "Jupyter"],
      applications: "Used in courses to demonstrate physical phenomena through interactive visualizations."
    }
  },
  {
    id: "coevolutionary-simulation",
    name: "Coevolutionary-Simulation",
    description: "Sophisticated simulation framework for studying coevolutionary dynamics in complex adaptive systems, featuring multi-species evolution modeling, adaptive fitness landscapes, and network topology effects.",
    url: "https://github.com/MohiMozaffari/Coevolutionary-Simulation",
    language: "Python",
    stars: 0,
    forks: 0,

    created_at: "2023-03-20T00:00:00Z",
    updated_at: "2024-10-20T00:00:00Z",
    details: {
      overview: "A simulation framework for coevolutionary dynamics on networks.",
      features: [
        "Multi-species evolution modeling",
        "Adaptive fitness landscapes",
        "Population dynamics tracking",
        "Network topology effects",
        "Real-time visualization"
      ],
      technologies: ["Python", "NetworkX", "NumPy", "Matplotlib"],
      applications: "Research tool for emergence in biological and social systems."
    }
  },
  {
    id: "game-of-life-simulation",
    name: "Game-of-Life-Simulation",
    description: "Enhanced implementation of Conway's Game of Life with custom rule sets, pattern library, interactive editing interface, and statistical analysis tools for educational and research purposes.",
    url: "https://github.com/MohiMozaffari/Game-of-Life-Simulation",
    language: "Python",
    stars: 0,
    forks: 0,

    created_at: "2023-02-10T00:00:00Z",
    updated_at: "2024-09-10T00:00:00Z",
    details: {
      overview: "An enhanced implementation of Conway’s Game of Life with custom features.",
      features: [
        "Classic Conway’s rules",
        "Custom rule sets",
        "Pattern library (gliders, oscillators)",
        "Interactive editing interface",
        "Statistical analysis tools"
      ],
      technologies: ["Python", "Pygame", "NumPy"],
      applications: "Educational tool for demonstrating cellular automata and emergence."
    }
  },
  {
    id: "sandpile-simulation",
    name: "Sandpile-Simulation",
    description: "Implementation of the Abelian sandpile model demonstrating self-organized criticality, featuring avalanche analysis, critical exponent measurement, and 2D/3D visualizations.",
    url: "https://github.com/MohiMozaffari/Sandpile-Simulation",
    language: "Python",
    stars: 0,
    forks: 0,
        created_at: "2024-12-17T00:00:00Z",
    updated_at: "2024-12-17T00:00:00Z",
    details: {
      overview: "Implementation of the Abelian sandpile model as a classic case of self-organized criticality.",
      features: [
        "Sandpile dynamics simulation",
        "Avalanche size distribution analysis",
        "Critical exponent measurement",
        "2D and 3D visualization",
        "Batch processing support"
      ],
      technologies: ["Python", "NumPy", "Matplotlib"],
      applications: "Research into scale-free phenomena and self-organized criticality."
    }
  },
  {
    id: "analyzing-oscar-data",
    name: "Analyzing-Oscar-Academy-Awards-Data",
    description: "Comprehensive data analysis of Oscar Academy Awards spanning multiple decades, featuring predictive models, demographic insights, interactive visualizations, and statistical correlation analysis.",
    url: "https://github.com/MohiMozaffari/Analyzing-Oscar-Academy-Awards-Data",
    language: "Jupyter Notebook",
    stars: 0,
    forks: 0,

    created_at: "2024-01-30T00:00:00Z",
    updated_at: "2024-01-30T00:00:00Z",
    details: {
      overview: "Comprehensive analysis of Oscar Academy Awards with statistical and predictive models.",
      features: [
        "Historical trends analysis",
        "Winner prediction models",
        "Genre and demographic insights",
        "Interactive visualizations",
        "Statistical correlation analysis"
      ],
      technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
      applications: "Applies data science methods to entertainment industry insights."
    }
  },
  {
    id: "sbu-thesis-template",
    name: "SBU_Thesis_Template",
    description: "Professional LaTeX template for Shahid Beheshti University thesis formatting, ensuring compliance with university standards and supporting Persian/English languages with automated bibliography management.",
    url: "https://github.com/MohiMozaffari/SBU_Thesis_Template",
    language: "TeX",
    stars: 0,
    forks: 0,

    created_at: "2025-01-19T00:00:00Z",
    updated_at: "2025-01-19T00:00:00Z",
    details: {
      overview: "A LaTeX template for Shahid Beheshti University theses.",
      features: [
        "University-compliant formatting",
        "Automated bibliography",
        "Chapter and section styling",
        "Math notation support",
        "Persian/English dual language"
      ],
      technologies: ["LaTeX", "BibTeX"],
      applications: "Helps students prepare standardized theses quickly."
    }
  },
  {
    id: "tda-brain-asd-thesis",
    name: "TDA-Brain-ASD-Thesis",
    description: "Thesis materials on topological features and brain-network analysis in autism. Includes LaTeX source, structured chapters, figures, and reproducible results.",
    url: "https://github.com/MohiMozaffari/TDA-Brain-ASD-Thesis",
    language: "TeX",
    stars: 0,
    forks: 0,
    created_at: "2025-08-01T00:00:00Z",
    updated_at: "2025-08-01T00:00:00Z",
    details: {
      overview: "Thesis project exploring topological features in brain-network data of autism.",
      features: [
        "LaTeX source files",
        "Figures and tables",
        "Structured chapters",
        "Buildable PDF"
      ],
      technologies: ["LaTeX", "BibTeX"],
      applications: "Academic writing and reproducible thesis compilation."
    }
  },
  {
    id: "percolation-simulation",
    name: "Percolation-Simulation",
    description: "Simulation of site/bond percolation with cluster statistics, threshold scanning, and probability heatmaps.",
    url: "https://github.com/MohiMozaffari/Percolation-Simulation",
    language: "Python",
    stars: 0,    forks: 0,
        created_at: "2024-09-08T00:00:00Z",
    updated_at: "2024-09-08T00:00:00Z",
    details: {
      overview: "Simulation of site and bond percolation with visual analysis.",
      features: [
        "Threshold scanning",
        "Cluster labeling",
        "Probability heatmaps"
      ],
      technologies: ["Python", "NumPy", "Matplotlib"],
      applications: "Investigates percolation thresholds and finite-size effects."
    }
  },
  {
    id: "ising-model-simulation",
    name: "2D-Ising-Model-Simulation",
    description: "2D Ising model simulation with Metropolis updates, magnetization tracking, and temperature sweeps.",
    url: "https://github.com/MohiMozaffari/2D-Ising-Model-Simulation",
    language: "Python",
    stars: 0,
    forks: 0,
        created_at: "2024-09-08T00:00:00Z",
    updated_at: "2024-09-08T00:00:00Z",
    details: {
      overview: "2D Ising model using Metropolis algorithm.",
      features: [
        "Temperature sweeps",
        "Magnetization and susceptibility",
        "Spin configuration animations"
      ],
      technologies: ["Python", "NumPy", "Matplotlib"],
      applications: "Teaching tool for phase transitions and statistical physics."
    }
  },
  {
    id: "voter-model-simulation",
    name: "Voter-Model-Simulation",
    description: "Stochastic voter model on a lattice with opinion flip dynamics, magnetization curves, and animated lattice evolution.",
    url: "https://github.com/MohiMozaffari/Voter-Model-Simulation",
    language: "Python",
    stars: 0,
    forks: 0,
        created_at: "2024-09-08T00:00:00Z",
    updated_at: "2024-09-08T00:00:00Z",
    details: {
      overview: "A stochastic voter model simulation with visualization.",
      features: [
        "Opinion flip dynamics",
        "Magnetization curves",
        "Animated lattice evolution"
      ],
      technologies: ["Python", "NumPy", "Matplotlib", "Seaborn"],
      applications: "Models consensus formation in social systems."
    }
  },
  {
    id: "ising-simulation-cpp",
    name: "2D_Ising_Simulation_CPP",
    description: "Ising model exploration in Python notebooks with C++-style optimization ideas. Includes parameter exploration and visualization.",
    url: "https://github.com/MohiMozaffari/2D_Ising_Simulation_CPP",
    language: "Jupyter Notebook",
    stars: 0,    
    forks: 0,
    created_at: "2024-09-08T00:00:00Z",
    updated_at: "2024-09-08T00:00:00Z",
    details: {
      overview: "Ising model experiments in notebooks, exploring performance tricks.",
      features: [
        "Notebook-driven experiments",
        "Parameter exploration",
        "Plotting and diagnostics"
      ],
      technologies: ["Python", "NumPy", "Matplotlib", "Jupyter"],
      applications: "Fast experimentation for statistical physics simulations."
    }
  },
  {
    id: "simple-disease-simulation",
    name: "Simple_Disease_Transmission_Simulation",
    description: "Simple epidemic spread model with equations, lattice/compartment dynamics, and figure generation.",
    url: "https://github.com/MohiMozaffari/Simple_Disease_Transmission_Simulation",
    language: "TeX",
    stars: 1,
    forks: 0,
    created_at: "2023-11-20T00:00:00Z",
    updated_at: "2023-11-20T00:00:00Z",
    details: {
      overview: "Simple epidemic spread modeling project.",
      features: [
        "Lattice/compartment dynamics",
        "Parameter scanning",
        "Figure generation"
      ],
      technologies: ["TeX", "Python"],
      applications: "Illustrates basics of epidemic modeling and visualization."
    }
  },
  {
    id: "war-spaceship-game",
    name: "War-Spaceship-Game",
    description: "Two-player spaceship battle game built with Pygame, featuring projectiles, collisions, and local multiplayer.",
    url: "https://github.com/MohiMozaffari/War-Spaceship-Game",
    language: "Python",
    stars: 1,
    forks: 0,
    created_at: "2024-09-17T00:00:00Z",
    updated_at: "2024-09-17T00:00:00Z",
    details: {
      overview: "A local multiplayer spaceship shooting game built with Pygame.",
      features: [
        "Local two-player mode",
        "Projectile shooting",
        "Collision mechanics",
        "Keyboard controls",
        "Sprite-based rendering"
      ],
      technologies: ["Python", "Pygame"],
      applications: "Demonstrates event loops and collision detection in 2D games."
    }
  },
  {
    id: "catch-fruits",
    name: "Catch-fruits",
    description: "Arcade-style fruit catching game with score tracking, increasing difficulty, and keyboard input handling.",
    url: "https://github.com/MohiMozaffari/Catch-fruits",
    language: "Python",
    stars: 0,
    forks: 0,
    created_at: "2024-09-10T00:00:00Z",
    updated_at: "2024-09-10T00:00:00Z",
    details: {
      overview: "Simple fruit-catching arcade game.",
      features: [
        "Score tracking",
        "Increasing difficulty",
        "Keyboard input"
      ],
      technologies: ["Python", "Pygame"],
      applications: "Introductory project for real-time input and collision detection."
    }
  }
];


// ---- DERIVED DATA & HELPERS (JS-safe) ----
export const withSlugs = (projects || []).map((p) => ({
  ...p,
  slug: p.slug ? String(p.slug) : slugify(p.id || p.name),
}));

export const projectsById = new Map(withSlugs.map((p) => [String(p.id), p]));
export const projectsBySlug = new Map(withSlugs.map((p) => [String(p.slug), p]));
export const projectsByName = new Map(withSlugs.map((p) => [String(p.name), p]));

export const getProject = (param) => {
  if (!param) return null;
  const key = decodeURIComponent(String(param));
  const byId = projectsById.get(key);
  if (byId) return byId;
  const bySlug = projectsBySlug.get(slugify(key));
  if (bySlug) return bySlug;
  const byName = projectsByName.get(key);
  if (byName) return byName;
  return null;
};

export const allLanguages = Array.from(
  new Set(withSlugs.map((p) => (p.language || 'Unknown').toLowerCase()))
).sort();

// Optional default export (lets you `import projects from '../data/projects'`)
export default withSlugs;
