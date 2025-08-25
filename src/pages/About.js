import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, BookOpen, Users, Award, Target } from 'lucide-react';

const About = () => {
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

  const skills = [
    { name: 'Python', level: 95 },
    { name: 'Scientific Computing', level: 90 },
    { name: 'Complex Systems', level: 85 },
    { name: 'Machine Learning', level: 80 },
    { name: 'Game Development', level: 75 },
    { name: 'Data Analysis', level: 88 }
  ];

  const experiences = [
    {
      title: 'Research Scientist',
      organization: 'Complex Systems Lab',
      period: '2020 - Present',
      description: 'Leading research in biological physics and complex adaptive systems, focusing on computational approaches to understanding emergence in living systems.'
    },
    {
      title: 'Python Instructor',
      organization: 'Independent Teaching',
      period: '2019 - Present',
      description: 'Teaching Python programming, scientific computing, and AI concepts to students and professionals through hands-on projects and real-world applications.'
    },
    {
      title: 'Game Development Educator',
      organization: 'Code Academy',
      period: '2021 - Present',
      description: 'Developing and delivering game development curricula, helping students learn programming through interactive and engaging game projects.'
    }
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About Me
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Passionate about bridging the gap between theoretical physics and practical applications 
              through computational approaches and innovative teaching methods.
            </p>
          </motion.div>

          {/* Personal Story */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="bg-purple-900/30 p-8 md:p-12 rounded-2xl border border-purple-700/50">
              <h2 className="text-3xl font-bold text-white mb-8">My Journey</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-purple-200 leading-relaxed mb-6">
                    My fascination with complex systems began during my undergraduate studies in physics, 
                    where I was captivated by how simple rules could give rise to incredibly sophisticated 
                    behaviors. This led me to pursue research in biological physics, where I explore how 
                    life itself emerges from the interactions of countless molecular components.
                  </p>
                  
                  <p className="text-lg text-purple-200 leading-relaxed">
                    What drives me is the intersection of theory and practice. While I love diving deep 
                    into mathematical models and computational simulations, I'm equally passionate about 
                    making these concepts accessible to others through teaching and educational technology.
                  </p>
                </div>
                
                <div>
                  <p className="text-lg text-purple-200 leading-relaxed mb-6">
                    My approach to education is hands-on and project-based. I believe that students learn 
                    best when they can see immediate applications of what they're studying. That's why I 
                    incorporate game development and interactive simulations into my Python and AI courses.
                  </p>
                  
                  <p className="text-lg text-purple-200 leading-relaxed">
                    When I'm not researching or teaching, you'll find me experimenting with new algorithms, 
                    contributing to open-source projects, or exploring the latest developments in artificial 
                    intelligence and their applications to biological systems.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span className="text-purple-300">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-purple-950 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-purple-300">{exp.organization}</p>
                    </div>
                    <span className="text-purple-400 font-semibold mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-purple-200 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values & Approach */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white text-center mb-12">My Approach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Research-Driven</h3>
                <p className="text-purple-200 leading-relaxed">
                  Every project and lesson is grounded in current research and best practices in 
                  computational science and complex systems theory.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Practical Focus</h3>
                <p className="text-purple-200 leading-relaxed">
                  I believe in learning by doing. All my courses emphasize hands-on projects that 
                  solve real-world problems and build practical skills.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Student-Centered</h3>
                <p className="text-purple-200 leading-relaxed">
                  Every student learns differently. I adapt my teaching style to meet individual needs 
                  and learning preferences for maximum effectiveness.
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