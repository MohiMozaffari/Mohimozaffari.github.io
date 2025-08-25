import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Code, Users } from 'lucide-react';
import NeuralNetwork from '../components/NeuralNetwork';
import { projects } from '../data/projects';

const Home = () => {
  // Show only first 3 projects for featured section
  const featuredProjects = projects.slice(0, 3);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                variants={itemVariants}
              >
                Mohaddeseh
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Mozaffari
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl text-purple-200 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Researcher in Complex Systems & Biological Physics
                <br />
                <span className="text-purple-300">
                  Educator in Python, AI, and Game Development
                </span>
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  View My Work
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-purple-400 text-purple-200 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <NeuralNetwork className="w-full max-w-md h-80" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <p className="text-lg text-purple-200 leading-relaxed mb-6">
                I'm a passionate researcher specializing in Biological Physics and Complex Systems, 
                with a deep fascination for the intricate patterns that emerge in living systems. 
                My work bridges the gap between theoretical physics and computational biology.
              </p>
              
              <p className="text-lg text-purple-200 leading-relaxed mb-6">
                As an educator, I believe in making complex concepts accessible through hands-on 
                programming and interactive learning. I teach Python, AI, and Game Development, 
                helping students discover the joy of computational thinking.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold"
              >
                Learn more about my journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              <div className="bg-purple-900/50 p-6 rounded-xl border border-purple-700/50">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Research</h3>
                <p className="text-purple-200">Complex Systems & Biological Physics</p>
              </div>

              <div className="bg-purple-900/50 p-6 rounded-xl border border-purple-700/50">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Development</h3>
                <p className="text-purple-200">Python & Scientific Computing</p>
              </div>

              <div className="bg-purple-900/50 p-6 rounded-xl border border-purple-700/50">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Teaching</h3>
                <p className="text-purple-200">AI & Game Development</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-950/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-purple-900/50 p-6 rounded-xl border border-purple-700/50 hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                    {project.language}
                  </span>
                </div>
                
                <p className="text-purple-200 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-purple-300">
                    <span>⭐ {project.stars}</span>
                    <span>🍴 {project.forks}</span>
                  </div>
                  
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 font-semibold text-sm"
                  >
                    View on GitHub →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;