import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, GitFork, Calendar } from 'lucide-react';
import { projects } from '../data/projects';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const languages = ['all', ...new Set(projects.map(p => p.language.toLowerCase()))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.language.toLowerCase() === filter);

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

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              My Projects
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              A collection of my computational physics simulations, data analysis projects, 
              and educational tools that bridge theory and practice.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  filter === lang
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-900/50 text-purple-200 hover:bg-purple-700 hover:text-white'
                }`}
              >
                {lang === 'all' ? 'All Projects' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-purple-900/30 rounded-xl border border-purple-700/50 overflow-hidden hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white pr-4">{project.name}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs text-white font-semibold ${getLanguageColor(project.language)}`}>
                      {project.language}
                    </div>
                  </div>

                  <p className="text-purple-200 mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-purple-300 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.updated_at).getFullYear()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 text-sm"
                    >
                      View on GitHub
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                    
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-purple-400 hover:text-purple-300 font-semibold text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-purple-200 text-lg">
                No projects found for the selected filter.
              </p>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Interested in Collaboration?
              </h3>
              <p className="text-purple-200 mb-6 leading-relaxed">
                I'm always excited to work on new projects involving complex systems, 
                computational biology, or educational technology.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;