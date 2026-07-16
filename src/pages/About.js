import React from "react";
import { motion } from "framer-motion";
import { Brain, Code, BookOpen, Users, Award, Target } from "lucide-react";
import useSiteSettings from "../hooks/useSiteSettings";

const About = () => {
  const settings = useSiteSettings();
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

  const skillGroups = [
    {
      category: "Programming & Tooling",
      items: ["Python", "NumPy / pandas / PyTorch", "Tkinter & Pygame (GUI and game development)"],
    },
    {
      category: "Complex Systems & Network Science",
      items: ["Persistent homology / topological data analysis", "Brain network & connectome analysis", "Statistical physics of complex systems"],
    },
    {
      category: "Machine Learning & AI",
      items: ["Model development and evaluation", "Feature engineering", "Deep learning for medical imaging"],
    },
    {
      category: "Teaching & Mentoring",
      items: ["Python, data analysis, and ML instruction", "1:1 and group teaching, project-based learning"],
    },
  ];

  const experiences = [
    {
      title: "Researcher",
      organization: "CCNet (Complexity & Complex Networks Lab)",
      period: "2022 - Present",
      description:
        "Collaborated on projects in complex systems, network science, and topological data analysis with applications in neuroscience and machine learning.",
    },
    {
      title: "Python & AI Instructor",
      organization: "Independent / Online",
      period: "2022 - Present",
      description:
        "Teaching Python, scientific computing, and AI through hands-on projects. Designed courses that include game development, interactive simulations, and real-world applications.",
    },
  ];

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
            <img
              src={`${process.env.PUBLIC_URL}/headshot-avatar.jpg`}
              alt="Mohaddeseh Mozaffari"
              className="w-36 h-36 rounded-full object-cover mx-auto mb-8 border-4 border-purple-700/50 shadow-lg shadow-purple-950/50"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About Me
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              {settings.about_intro}
            </p>
          </motion.div>

          {/* Personal Story */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="bg-purple-900/30 p-8 md:p-12 rounded-2xl border border-purple-700/50">
              <h2 className="text-3xl font-bold text-white mb-8">My Journey</h2>
              <div className="grid md:grid-cols-1 gap-8">
                <div>
                  <p className="text-lg text-purple-200 leading-relaxed mb-6">
                    {settings.about_journey_1}
                  </p>

                  <p className="text-lg text-purple-200 leading-relaxed mb-6">
                    {settings.about_journey_2}
                  </p>

                  <p className="text-lg text-purple-200 leading-relaxed">
                    {settings.about_journey_3}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skillGroups.map((group) => (
                <div
                  key={group.category}
                  className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50"
                >
                  <h3 className="text-white font-semibold mb-3">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-purple-200 text-sm flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50"
                >
                  <div className="flex flex-col md:flex-row md:justify-between mb-4 text-left">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-purple-300">{exp.organization}</p>
                    </div>
                    <span className="text-purple-400 font-semibold mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-purple-200 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Education
            </h2>
            <div className="space-y-8">
              <motion.div
                variants={itemVariants}
                className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50"
              >
                <div className="flex flex-col md:flex-row md:justify-between mb-4 text-left">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      M.Sc. Statistical Physics & Complex Systems
                    </h3>
                    <p className="text-purple-300">
                      Shahid Beheshti University
                    </p>
                  </div>
                  <span className="text-purple-400 font-semibold mt-2 md:mt-0">
                    2022 – 2025
                  </span>
                </div>
                <p className="text-purple-200 leading-relaxed">
                  Thesis: "Analysis of Topological Features of Brain Networks in Autism Spectrum
                  Disorder Using Persistent Homology," graded Outstanding, defended March 11, 2025.
                  Ranked 2nd in the program.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50"
              >
                <div className="flex flex-col md:flex-row md:justify-between mb-4 text-left">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      B.Sc. Physics
                    </h3>
                    <p className="text-purple-300">
                      Shahid Beheshti University
                    </p>
                  </div>
                  <span className="text-purple-400 font-semibold mt-2 md:mt-0">
                    2018 – 2022
                  </span>
                </div>
                <p className="text-purple-200 leading-relaxed">
                  Studied fundamental and applied physics with a focus on
                  complex systems. Ranked 1st in the program.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Values & Approach */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              My Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Research-Driven
                </h3>
                <p className="text-purple-200 leading-relaxed">
                  Every project and lesson is grounded in current research and
                  best practices in computational science and complex systems
                  theory.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Practical Focus
                </h3>
                <p className="text-purple-200 leading-relaxed">
                  I believe in learning by doing. All my courses emphasize
                  hands-on projects that solve real-world problems and build
                  practical skills.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Student-Centered
                </h3>
                <p className="text-purple-200 leading-relaxed">
                  Every student learns differently. I adapt my teaching style to
                  meet individual needs and learning preferences for maximum
                  effectiveness.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
