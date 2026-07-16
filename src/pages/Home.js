import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Cpu,
  Download,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { getProjects } from "../api/projects";
import { getLangColor, displayName, displayDescription, projectYear } from "../utils/projectDisplay";
import useSiteSettings from "../hooks/useSiteSettings";

const Home = () => {
  const settings = useSiteSettings();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data.filter((p) => p.featured)))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const numberFmt = useMemo(() => new Intl.NumberFormat(), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left"
            >
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
                {settings.home_hero_line1}
                <br />
                <span className="text-purple-300">
                  {settings.home_hero_line2}
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

                <a
                  href={`${process.env.PUBLIC_URL}/CV.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 border-2 border-purple-400 text-purple-200 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  Download CV
                  <Download className="ml-2 w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <img
                src={`${process.env.PUBLIC_URL}/headshot-hero.jpg`}
                alt="Mohaddeseh Mozaffari"
                className="w-full max-w-sm rounded-2xl border border-purple-700/50 shadow-lg shadow-purple-950/50 object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-purple-200 leading-relaxed mb-6">
                {settings.home_about_paragraph}
              </p>

              <Link
                to="/about"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold"
              >
                Learn more about my journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  title: "Complex Systems & Neuroscience",
                  desc: "Networks, dynamics, topological data analysis, connectomes.",
                  Icon: Brain,
                },
                {
                  title: "Machine Learning & AI",
                  desc: "Modeling, evaluation, and feature engineering for medical imaging and brain-network data.",
                  Icon: Cpu,
                },
              ].map(({ title, desc, Icon }, i) => (
                <div
                  key={i}
                  className="bg-purple-900/50 rounded-xl border border-purple-600/60
                 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/30
                 transition-all duration-300 p-6 flex items-start gap-4"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg grid place-items-center w-12 h-12 shrink-0">
                    <Icon className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight mb-1">{title}</h3>
                    <p className="text-purple-200 text-sm leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-950/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Featured Projects
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="medium" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-purple-900/50 p-6 rounded-xl border border-purple-700/50 hover:border-purple-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <h3
                      className="text-xl font-bold text-white leading-snug break-words whitespace-normal mr-3"
                      title={displayName(project)}
                    >
                      {displayName(project)}
                    </h3>

                    {project.language && (
                      <span
                        className={`text-xs ${getLangColor(project.language)} text-white px-2 py-1 rounded-full whitespace-nowrap`}
                      >
                        {project.language}
                      </span>
                    )}
                  </div>

                  <p className="text-purple-200 mb-4 text-sm leading-relaxed break-words">
                    {displayDescription(project)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-purple-300">
                      <span>⭐ {numberFmt.format(project.stars || 0)}</span>
                      <span>🍴 {numberFmt.format(project.forksCount || 0)}</span>
                      <span className="hidden sm:inline">📅 {projectYear(project)}</span>
                    </div>

                    <a
                      href={project.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-semibold text-sm"
                    >
                      {project.source === "manual" ? "View Preprint →" : "View on GitHub →"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
