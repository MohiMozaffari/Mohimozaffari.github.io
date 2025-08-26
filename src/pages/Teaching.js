// src/pages/Teaching.jsx
import React, { useRef, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  // icon set for selection buttons
  Code2,
  LayoutGrid,
  Gamepad2,
  BarChart3,
  Cpu,
  Bot,
  // details icons
  CheckCircle,
  Star,
  Clock,
  BookOpen,
} from "lucide-react";
import coursesData from "../data/courses";

const iconMap = {
  Code2,
  LayoutGrid,
  Gamepad2,
  BarChart3,
  Cpu,
  Bot,
};

export default function Teaching() {
  const [activeId, setActiveId] = useState("pythonFundamentals");
  const detailsRef = useRef(null);

  const courses = useMemo(() => coursesData, []);
  const currentCourse = useMemo(
    () => courses.find((c) => c.id === activeId),
    [courses, activeId]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
  };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  const scrollToDetails = useCallback(() => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const selectCourse = (id) => {
    setActiveId(id);
    setTimeout(scrollToDetails, 10);
  };

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Teaching & Courses</h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Learn Python, AI, and computational thinking through hands-on projects and real-world applications.
              Each course builds practical skills and deep understanding.
            </p>
          </motion.div>

          {/* Course selection grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 items-stretch">
              {courses.map((c) => {
                const Icon = iconMap[c.icon] || Code2;
                const isActive = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    onClick={() => selectCourse(c.id)}
                    className={`flex flex-col items-center justify-center text-center p-4 rounded-xl border h-full transition-all duration-300 ${
                      isActive
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-purple-900/30 border-purple-700/50 text-purple-200 hover:border-purple-600"
                    }`}
                  >
                    <Icon className="w-8 h-8 mb-2" />
                    <div className="font-semibold leading-tight">{c.label}</div>
                    <div className="text-sm opacity-80 leading-tight">{c.sublabel}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Course Details */}
          {currentCourse && (
            <motion.div
              key={activeId}
              ref={detailsRef}
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

                      {/* Centered CTA */}
                      <div className="flex justify-center">
                        <Link
                          to="/contact"
                          className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">What You'll Learn</h3>
                      <div className="space-y-3 mb-8">
                        {currentCourse.features.map((f, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-purple-200">{f}</span>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-4">Course Projects</h3>
                      <div className="space-y-2">
                        {currentCourse.projects.map((p, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <span className="text-purple-400 font-bold">•</span>
                            <span className="text-purple-200">{p}</span>
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
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Hands-On Learning</h3>
                <p className="text-purple-200 leading-relaxed">
                  I believe in learning by doing. Every concept is reinforced through practical projects that solve
                  real-world problems.
                </p>
              </div>

              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Personalized Approach</h3>
                <p className="text-purple-200 leading-relaxed">
                  Each student learns differently. I adapt my teaching style to match your learning preferences and pace.
                </p>
              </div>

              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Practical Skills</h3>
                <p className="text-purple-200 leading-relaxed">
                  Focus on skills that you can immediately apply in your work, studies, or personal projects.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action (centered) */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 rounded-xl border border-purple-700/50 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h3>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                Whether you're a beginner or advancing your skills, I’ll help you choose the best course for your goals.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
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
}
