import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Code, Brain, Gamepad2, CheckCircle, Star, Clock, BookOpen } from 'lucide-react';

const Teaching = () => {
  const [activeService, setActiveService] = useState('python');

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

  const courses = {
    python: {
      title: 'Python for Scientific Computing',
      duration: '8-12 weeks',
      level: 'Beginner to Advanced',
      price: 'Contact for pricing',
      description: 'Master Python programming with a focus on scientific applications, data analysis, and computational problem-solving.',
      features: [
        'Fundamentals of Python programming',
        'NumPy and SciPy for numerical computing',
        'Matplotlib for data visualization',
        'Pandas for data manipulation',
        'Object-oriented programming principles',
        'Real-world scientific projects',
        'Best practices and code optimization',
        'Version control with Git'
      ],
      projects: [
        'Build a Monte Carlo simulation',
        'Create data analysis pipelines',
        'Develop scientific visualization tools',
        'Implement numerical algorithms'
      ]
    },
    ai: {
      title: 'AI & Machine Learning Fundamentals',
      duration: '10-14 weeks',
      level: 'Intermediate',
      price: 'Contact for pricing',
      description: 'Explore the fascinating world of artificial intelligence and machine learning with hands-on projects and real applications.',
      features: [
        'Machine learning algorithms and theory',
        'Neural networks and deep learning',
        'Natural language processing basics',
        'Computer vision fundamentals',
        'Model training and evaluation',
        'TensorFlow and PyTorch introduction',
        'Ethics in AI development',
        'Practical project implementation'
      ],
      projects: [
        'Build a neural network from scratch',
        'Create a chatbot application',
        'Develop image classification models',
        'Implement recommendation systems'
      ]
    },
    game: {
      title: 'Game Development with Python',
      duration: '6-10 weeks',
      level: 'Beginner to Intermediate',
      price: 'Contact for pricing',
      description: 'Learn programming through game development, combining creativity with technical skills to build engaging interactive experiences.',
      features: [
        'Game development fundamentals',
        'Pygame library mastery',
        'Game physics and mathematics',
        'Sprite animation and graphics',
        'Sound integration and effects',
        'Game loop and state management',
        'User interface design',
        'Publishing and distribution'
      ],
      projects: [
        'Create classic arcade games',
        'Build puzzle and strategy games',
        'Develop educational simulations',
        'Design interactive experiences'
      ]
    },
    complex: {
      title: 'Complex Systems & Simulations',
      duration: '12-16 weeks',
      level: 'Advanced',
      price: 'Contact for pricing',
      description: 'Dive deep into complex systems theory and computational modeling, exploring emergence and self-organization in natural and artificial systems.',
      features: [
        'Complex systems theory',
        'Agent-based modeling',
        'Network analysis and graph theory',
        'Cellular automata',
        'Chaos theory and fractals',
        'Statistical mechanics',
        'Emergence and self-organization',
        'Research methodologies'
      ],
      projects: [
        'Model ecosystem dynamics',
        'Simulate social networks',
        'Create evolutionary algorithms',
        'Analyze complex data patterns'
      ]
    }
  };

  const testimonials = [
    {
      name: 'Sarah Chen',
      course: 'Python for Scientific Computing',
      rating: 5,
      text: 'Mohaddeseh\'s teaching style is exceptional. She makes complex concepts accessible and provides real-world context that makes learning meaningful.',
      background: 'PhD Student in Biology'
    },
    {
      name: 'Ahmed Hassan',
      course: 'AI & Machine Learning',
      rating: 5,
      text: 'The AI course was transformative for my career. The hands-on projects and theoretical foundation gave me the confidence to tackle ML problems.',
      background: 'Software Engineer'
    },
    {
      name: 'Maria Rodriguez',
      course: 'Game Development',
      rating: 5,
      text: 'Learning programming through game development was so engaging! I never thought I could build games, but now I\'ve created several projects.',
      background: 'High School Teacher'
    }
  ];

  const currentCourse = courses[activeService];

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
              Teaching & Courses
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Learn Python, AI, and computational thinking through hands-on projects 
              and real-world applications. Each course is designed to build practical 
              skills while fostering deep understanding.
            </p>
          </motion.div>

          {/* Course Selection */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid md:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveService('python')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'python'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Code className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Python</div>
                <div className="text-sm opacity-80">Scientific Computing</div>
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
                <div className="font-semibold">AI & ML</div>
                <div className="text-sm opacity-80">Machine Learning</div>
              </button>

              <button
                onClick={() => setActiveService('game')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'game'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Gamepad2 className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Game Dev</div>
                <div className="text-sm opacity-80">Interactive Learning</div>
              </button>

              <button
                onClick={() => setActiveService('complex')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === 'complex'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600'
                }`}
              >
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Complex Systems</div>
                <div className="text-sm opacity-80">Advanced Topics</div>
              </button>
            </div>
          </motion.div>

          {/* Course Details */}
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
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {currentCourse.title}
                    </h2>
                    <p className="text-lg text-purple-200 leading-relaxed mb-6">
                      {currentCourse.description}
                    </p>

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
                  I believe in learning by doing. Every concept is reinforced through practical 
                  projects that solve real-world problems.
                </p>
              </div>

              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Personalized Approach</h3>
                <p className="text-purple-200 leading-relaxed">
                  Each student learns differently. I adapt my teaching style to match your 
                  learning preferences and pace.
                </p>
              </div>

              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Practical Skills</h3>
                <p className="text-purple-200 leading-relaxed">
                  Focus on skills that you can immediately apply in your work, studies, 
                  or personal projects.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Student Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-purple-200 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-purple-300 text-sm">{testimonial.background}</div>
                    <div className="text-purple-400 text-sm">{testimonial.course}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 rounded-xl border border-purple-700/50 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Learning Journey?
              </h3>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                Whether you're a complete beginner or looking to advance your skills, 
                I'm here to guide you every step of the way. Let's discuss which course 
                is the perfect fit for your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Book a Consultation
                </Link>
                <a
                  href="mailto:mohaddeseh.mozaffari@example.com"
                  className="inline-flex items-center px-8 py-4 border-2 border-purple-400 text-purple-200 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  Email Me Directly
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Teaching;