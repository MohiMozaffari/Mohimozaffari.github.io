import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Code,
  Users,
  Cpu,
  Bot,
  Gamepad2,
} from "lucide-react";
import NeuralNetwork from "../components/NeuralNetwork";
import { projects } from "../data/projects";
import { useMemo } from "react";

const getLangColor = (lang) => {
  const key = String(lang ?? "unknown").toLowerCase();
  const colors = {
    python: "bg-blue-500",
    "jupyter notebook": "bg-orange-500",
    tex: "bg-green-500",
    javascript: "bg-yellow-500",
    "c++": "bg-indigo-500",
    unknown: "bg-gray-500",
  };
  return colors[key] || "bg-purple-500";
};

const getProjectLanguages = (project) => {
  const raw = Array.isArray(project?.languages)
    ? project.languages
    : project?.language
    ? [project.language]
    : ["Unknown"];

  return raw
    .flat()
    .filter((x) => x != null && x !== "")
    .map((x) => String(x).trim());
};

const Home = () => {
  // Show only first 3 projects for featured section

  // pick your three featured repos by id/slug/name
  const featuredIds = useMemo(
    () => [
      "analyzing-oscar-data",
      "tda-brain-asd-thesis",
      "ising-simulation-cpp",
    ],
    []
  );

  // compute once (sorted by date, then filtered by ids)
  const featuredProjects = useMemo(() => {
    const want = new Set(featuredIds.map((x) => String(x).toLowerCase()));
    const sorted = [...projects].sort((a, b) => {
      const da = new Date(a.updated_at || a.created_at || 0);
      const db = new Date(b.updated_at || b.created_at || 0);
      return db - da;
    });
    return sorted.filter((p) => {
      const id = (p.id || "").toLowerCase();
      const slug = (p.slug || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      return want.has(id) || want.has(slug) || want.has(name);
    });
  }, [featuredIds]);

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
                I started in physics, curious about how simple rules create
                complex patterns. That curiosity grew into my master’s research
                on brain networks and autism, where I used tools like persistent
                homology to study the hidden structure of the brain.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold"
              >
                Learn more about my journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            >
              {/* Card template */}
              {[
                {
                  title: "Python & Simulations",
                  desc: "Numerical models, Monte Carlo, ODE/PDE solvers.",
                  Icon: Code,
                },
                {
                  title: "Complex Systems & Neuroscience",
                  desc: "Networks, dynamics, TDA, connectomes.",
                  Icon: Brain,
                },
                {
                  title: "Machine Learning & AI",
                  desc: "Modeling, evaluation, feature engineering.",
                  Icon: Cpu,
                },
                {
                  title: "Tkinter & Pygame",
                  desc: "Desktop GUIs and 2D gameplay loops.",
                  Icon: Gamepad2,
                },
              ].map(({ title, desc, Icon }, i) => (
                <div
                  key={i}
                  className="bg-purple-900/50 rounded-xl border border-purple-700/50 
                 aspect-square flex items-center justify-center 
                 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/30 
                 transition-all duration-300 
                 p-3 sm:p-4 lg:p-6"
                >
                  <div className="flex flex-col items-center text-center w-full h-full justify-center">
                    {/* Icon */}
                    <div
                      className="bg-purple-600 rounded-lg grid place-items-center mb-2 sm:mb-3 lg:mb-4
                     w-12 h-12 sm:w-14 sm:h-14 lg:w-12 lg:h-12"
                    >
                      <Icon className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-6 lg:h-6" />
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold text-white 
                     text-sm sm:text-base lg:text-sm 
                     leading-tight mb-1 sm:mb-2"
                    >
                      {title}
                    </h3>

                    {/* Description (hide on small) */}
                    <p className="hidden md:block text-purple-200 text-xs sm:text-sm leading-snug">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
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

          {/** pick your three featured repos by id/slug/name (robust matching) */}
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => {
              const year = project.updated_at
                ? new Date(project.updated_at).getFullYear()
                : project.created_at
                ? new Date(project.created_at).getFullYear()
                : "—";

              const langs = getProjectLanguages(project);

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="bg-purple-900/50 p-6 rounded-xl border border-purple-700/50 hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <h3
                      className="text-xl font-bold text-white leading-snug break-words whitespace-normal mr-3"
                      title={String(project.name ?? "").replaceAll("_", " ")}
                    >
                      {String(project.name ?? "").replaceAll("_", " ")}
                    </h3>

                    {/* language badges (supports 1..n) */}
                    {/* multiple language badges */}
                    <div className="flex flex-wrap gap-2 justify-end">
                      {langs.map((lang) => (
                        <span
                          key={lang}
                          className={`text-xs ${getLangColor(
                            lang
                          )} text-white px-2 py-1 rounded-full`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-purple-200 mb-4 text-sm leading-relaxed break-words">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-purple-300">
                      <span>⭐ {numberFmt.format(project.stars || 0)}</span>
                      <span>🍴 {numberFmt.format(project.forks || 0)}</span>
                      <span className="hidden sm:inline">📅 {year}</span>
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
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
