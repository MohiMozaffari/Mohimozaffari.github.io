import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Star, GitFork, Calendar, Code } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Find project by ID
    const foundProject = projects.find(p => p.id === id || p.name === id);
    setProject(foundProject);
  }, [id]);

  const getLanguageColor = (language) => {
    const colors = {
      'python': 'bg-blue-500',
      'jupyter notebook': 'bg-orange-500',
      'tex': 'bg-green-500',
      'javascript': 'bg-yellow-500',
      'unknown': 'bg-gray-500'
    };
    return colors[language.toLowerCase()] || 'bg-purple-500';
  };

  const getProjectDescription = (projectName) => {
    const descriptions = {
      'Computational-Physics': {
        overview: 'A comprehensive collection of computational physics algorithms and simulations implemented in Python and Jupyter notebooks.',
        features: [
          'Numerical integration methods (Euler, Runge-Kutta)',
          'Wave equation solvers',
          'Quantum mechanics simulations',
          'Statistical mechanics examples',
          'Monte Carlo methods'
        ],
        technologies: ['Python', 'NumPy', 'SciPy', 'Matplotlib', 'Jupyter'],
        applications: 'Used in undergraduate and graduate physics courses to demonstrate complex physical phenomena through interactive visualizations.'
      },
      'Coevolutionary-Simulation': {
        overview: 'A sophisticated simulation framework for studying coevolutionary dynamics in complex adaptive systems.',
        features: [
          'Multi-species evolution modeling',
          'Adaptive fitness landscapes',
          'Population dynamics tracking',
          'Network topology effects',
          'Real-time visualization'
        ],
        technologies: ['Python', 'NetworkX', 'Matplotlib', 'NumPy'],
        applications: 'Research tool for understanding emergence in biological and social systems, used in complexity science studies.'
      },
      'Game-of-Life-Simulation': {
        overview: 'An enhanced implementation of Conway\'s Game of Life with additional features for educational and research purposes.',
        features: [
          'Classic Conway\'s rules implementation',
          'Custom rule sets',
          'Pattern library (gliders, oscillators)',
          'Interactive editing interface',
          'Statistical analysis tools'
        ],
        technologies: ['Python', 'Pygame', 'NumPy'],
        applications: 'Teaching tool for demonstrating emergence, cellular automata, and complex systems principles.'
      },
      'Sandpile-Simulation': {
        overview: 'Implementation of the Abelian sandpile model, a paradigmatic example of self-organized criticality.',
        features: [
          'Sandpile dynamics simulation',
          'Avalanche size distribution analysis',
          'Critical exponent measurement',
          '2D and 3D visualizations',
          'Batch processing capabilities'
        ],
        technologies: ['Python', 'NumPy', 'Matplotlib', 'SciPy'],
        applications: 'Research into self-organized criticality, used for understanding scale-free phenomena in complex systems.'
      },
      'Analyzing-Oscar-Academy-Awards-Data': {
        overview: 'Comprehensive data analysis of Oscar Academy Awards spanning multiple decades, revealing trends and patterns.',
        features: [
          'Historical trends analysis',
          'Winner prediction models',
          'Genre and demographic insights',
          'Interactive visualizations',
          'Statistical correlation analysis'
        ],
        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
        applications: 'Demonstrates data science techniques and statistical analysis methods for entertainment industry insights.'
      },
      'SBU_Thesis_Template': {
        overview: 'Professional LaTeX template for Shahid Beheshti University thesis formatting, ensuring compliance with university standards.',
        features: [
          'University-compliant formatting',
          'Automated bibliography management',
          'Chapter and section styling',
          'Mathematical notation support',
          'Persian and English language support'
        ],
        technologies: ['LaTeX', 'BibTeX'],
        applications: 'Used by graduate students for thesis preparation, ensuring consistent academic formatting standards.'
      }
    };
    
    return descriptions[projectName] || {
      overview: 'This project showcases advanced computational techniques and innovative approaches to solving complex problems.',
      features: ['Advanced algorithms', 'Clean code architecture', 'Comprehensive documentation'],
      technologies: [project?.language || 'Multiple'],
      applications: 'Applied in research and educational contexts.'
    };
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
          <Link
            to="/projects"
            className="inline-flex items-center text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const projectDetails = getProjectDescription(project.name);
  const relatedProjects = projects
    .filter(p => p.id !== project.id && p.language === project.language)
    .slice(0, 3);

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
                <div className={`inline-block px-3 py-1 rounded-full text-sm text-white font-semibold ${getLanguageColor(project.language)}`}>
                  {project.language}
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mt-4 md:mt-0 text-purple-300">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5" />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="w-5 h-5" />
                  <span>{project.forks}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(project.updated_at).getFullYear()}</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-purple-200 leading-relaxed mb-6">
              {projectDetails.overview}
            </p>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300"
            >
              <Code className="mr-2 w-5 h-5" />
              View on GitHub
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Features */}
            <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-2">
                {projectDetails.features.map((feature, index) => (
                  <li key={index} className="text-purple-200 flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {projectDetails.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-700 text-purple-200 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Applications</h3>
            <p className="text-purple-200 leading-relaxed">
              {projectDetails.applications}
            </p>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Related Projects</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    to={`/projects/${relatedProject.id}`}
                    className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/50 hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <h4 className="text-lg font-bold text-white mb-2">{relatedProject.name}</h4>
                    <p className="text-purple-200 text-sm mb-3">{relatedProject.description}</p>
                    <div className="flex items-center justify-between text-xs text-purple-300">
                      <span>{relatedProject.language}</span>
                      <span>⭐ {relatedProject.stars}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;