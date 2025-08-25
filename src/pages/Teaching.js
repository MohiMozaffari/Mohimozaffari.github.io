import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Code, Brain, Gamepad2, CheckCircle, Star, Clock, BookOpen } from 'lucide-react';

const Teaching = () => {
  // FIX: use an existing key from `courses`
  const [activeService, setActiveService] = useState('pythonFundamentals');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    }
  };

  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  const courses = {
    pythonFundamentals: {
      title: 'Python Fundamentals',
      duration: '4-6 weeks',
      level: 'Beginner',
      price: 'Contact for pricing',
      description:
        'Learn the core concepts of Python programming, including loops, conditionals, functions, and basic programming logic.',
      features: [
        'Variables, data types, and operators',
        'Loops and conditionals',
        'Functions and modular programming',
        'Basic error handling',
        'Introduction to libraries'
      ],
      projects: ['Simple calculator', 'Text-based games', 'Mini command-line tools']
    },
    pythonAdvanced: {
      title: 'Advanced Python',
      duration: '6-10 weeks',
      level: 'Intermediate to Advanced',
      price: 'Contact for pricing',
      description:
        'Master advanced Python topics including object-oriented programming, lambda functions, filters, file handling, and robust error handling.',
      features: [
        'OOP: classes, inheritance, polymorphism',
        'Lambda, map, filter, reduce',
        'File handling and I/O',
        'Advanced error handling and debugging',
        'Best practices and code optimization'
      ],
      projects: [
        'Create a mini library management system',
        'File-based data processing scripts',
        'Object-oriented simulation projects'
      ]
    },
    tkinter: {
      title: 'GUI Programming with Tkinter',
      duration: '4-6 weeks',
      level: 'Beginner to Intermediate',
      price: 'Contact for pricing',
      description:
        'Build interactive GUI applications using Python and Tkinter. Learn event handling, layouts, and real-time interactivity.',
      features: [
        'Tkinter widgets and layout',
        'Event handling and callbacks',
        'GUI application design',
        'Integrating Python logic with GUI',
        'Simple game and interactive apps'
      ],
      projects: ['Catch the fruit game', 'Weather application', 'Mini quiz app']
    },
    pygame: {
      title: 'Game Development with Pygame',
      duration: '6-12 weeks',
      level: 'Beginner to Intermediate',
      price: 'Contact for pricing',
      description:
        'Learn Python game development using Pygame. Build fun and interactive games while mastering game loops, graphics, and controls.',
      features: [
        'Game loop and state management',
        'Sprites, animations, and physics',
        'Collision detection and scoring',
        'Sound effects and background music',
        'User input and event handling'
      ],
      projects: ['Jumper game', 'Shooting gallery', 'Spaceship war game']
    },
    dataAnalysis: {
      title: 'Data Analysis & Visualization',
      duration: '6-10 weeks',
      level: 'Intermediate',
      price: 'Contact for pricing',
      description:
        'Analyze and visualize data using Python libraries like NumPy, Pandas, Seaborn, and Plotly. Learn to extract insights and create interactive visualizations.',
      features: [
        'Data manipulation with Pandas and NumPy',
        'Exploratory data analysis',
        'Visualization with Seaborn and Plotly',
        'Statistical summaries and correlations',
        'Project-based hands-on analysis'
      ],
      projects: ['Analyze real-world datasets', 'Interactive dashboards and plots', 'Data-driven insights reports']
    },
    machineLearning: {
      title: 'Machine Learning with Scikit-Learn',
      duration: '8-12 weeks',
      level: 'Intermediate to Advanced',
      price: 'Contact for pricing',
      description:
        'Learn all core machine learning algorithms using Scikit-Learn, including regression, classification, clustering, and model evaluation.',
      features: [
        'Supervised and unsupervised learning',
        'Regression, classification, clustering algorithms',
        'Feature engineering and preprocessing',
        'Model evaluation and metrics',
        'Hands-on projects with real datasets'
      ],
      projects: ['Predict house prices', 'Build a spam classifier', 'Customer segmentation analysis']
    },
    ai: {
      title: 'AI with PyTorch',
      duration: '10-14 weeks',
      level: 'Advanced',
      price: 'Contact for pricing',
      description:
        'Dive into artificial intelligence with PyTorch. Learn neural networks, CNNs, and other AI architectures through practical projects.',
      features: [
        'Building neural networks from scratch',
        'Convolutional Neural Networks (CNNs)',
        'Data preprocessing and augmentation',
        'Training, evaluation, and optimization',
        'Deploying AI models'
      ],
      projects: ['Image classification with CNN', 'Simple neural network projects', 'Mini AI applications']
    }
  };

  const currentCourse = courses[activeService];

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Teaching & Courses</h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Learn Python, AI, and computational thinking through hands-on projects and real-world applications. Each
              course is designed to build practical skills while fostering deep understanding.
            </p>
          </motion.div>

          {/* Course Selection */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid md:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveService('pythonFundamentals')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'pythonFundamentals'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Code className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Python</div>
                <div className="text-sm opacity-80">Fundamentals</div>
              </button>

              <button
                onClick={() => setActiveService('pythonAdvanced')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'pythonAdvanced'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Code className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Python</div>
                <div className="text-sm opacity-80">Advanced</div>
              </button>

              <button
                onClick={() => setActiveService('tkinter')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'tkinter'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Brain className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Tkinter</div>
                <div className="text-sm opacity-80">GUI Apps</div>
              </button>

              <button
                onClick={() => setActiveService('pygame')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'pygame'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Gamepad2 className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Pygame</div>
                <div className="text-sm opacity-80">Game Dev</div>
              </button>

              <button
                onClick={() => setActiveService('dataAnalysis')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'dataAnalysis'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Data</div>
                <div className="text-sm opacity-80">Analysis & Viz</div>
              </button>

              <button
                onClick={() => setActiveService('machineLearning')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'machineLearning'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Brain className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">ML</div>
                <div className="text-sm opacity-80">Scikit-Learn</div>
              </button>

              <button
                onClick={() => setActiveService('ai')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'ai'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Brain className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">AI</div>
                <div className="text-sm opacity-80">PyTorch</div>
              </button>
            </div>
          </motion.div>

          {/* Course Details */}
          {/** GUARD: don't render details if key drift ever happens */}
          {currentCourse && (
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="bg-purple-900/30 rounded-xl border border-purple-700/50 overflow-hidden">
                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-4">{currentCourse.title}</h2>
                      <p className="text-lg text-purple-200 leading-relaxed mb-6">{currentCourse.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center">
                          <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                          <div className="text-white font-semibold">{currentCourse.duration}</div>
                          <div className="text-purple-300 text-sm">Duration</div>
                        </div>
                        <div className="text-center">
                          <BookOpen className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                          <div className="text-white font-semibold">{currentCourse.level}</div>
                          <div className="text-purple-300 text-sm">Level</div>
                        </div>
                        <div className="text-center">
                          <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                          <div className="text-white font-semibold">{currentCourse.price}</div>
                          <div className="text-purple-300 text-sm">Investment</div>
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                      >
                        Enroll Now
                      </Link>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">What You'll Learn</h3>
                      <div className="space-y-3 mb-8">
                        {currentCourse.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-purple-200">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-4">Course Projects</h3>
                      <div className="space-y-2">
                        {currentCourse.projects.map((project, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <span className="text-purple-400 font-bold">•</span>
                            <span className="text-purple-200">{project}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Teaching Philosophy */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">My Teaching Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Hands-On Learning</h3>
                <p className="text-purple-200 leading-relaxed">
                  I believe in learning by doing. Every concept is reinforced through practical projects that solve
                  real-world problems.
                </p>
              </div>

              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Personalized Approach</h3>
                <p className="text-purple-200 leading-relaxed">
                  Each student learns differently. I adapt my teaching style to match your learning preferences and
                  pace.
                </p>
              </div>

              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Practical Skills</h3>
                <p className="text-purple-200 leading-relaxed">
                  Focus on skills that you can immediately apply in your work, studies, or personal projects.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 rounded-xl border border-purple-700/50 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h3>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                Whether you're a complete beginner or looking to advance your skills, I'm here to guide you every step
                of the way. Let's discuss which course is the perfect fit for your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Go to Contact
              </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Teaching;
