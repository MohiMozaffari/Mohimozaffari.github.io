import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, GraduationCap, ExternalLink } from "lucide-react";
import { getPublications } from "../api/publications";
import LoadingSpinner from "../components/LoadingSpinner";
import useSiteSettings from "../hooks/useSiteSettings";

const STATUS_LABEL = {
  submitted: "Submitted",
  "under-review": "Under Review",
  published: "Published",
};

const education = [
  {
    degree: "MSc, Statistical Physics & Complex Systems",
    institution: "Shahid Beheshti University",
    period: "2022 – 2025",
    detail: "Ranked 2nd. Thesis: \"Analysis of Topological Features of Brain Networks in Autism Spectrum Disorder Using Persistent Homology,\" graded Outstanding, defended March 11, 2025.",
  },
  {
    degree: "BSc, Physics",
    institution: "Shahid Beheshti University",
    period: "2018 – 2022",
    detail: "Ranked 1st.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Research() {
  const settings = useSiteSettings();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublications()
      .then(setPublications)
      .catch(() => setPublications([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Research</h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Publications, ongoing work, and academic background.
            </p>
          </motion.div>

          {/* Research Statement */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className="text-lg text-purple-100 leading-relaxed max-w-4xl mx-auto text-left bg-purple-900/20 p-8 rounded-xl border border-purple-700/40">
              {settings.research_statement}
            </p>
          </motion.div>

          {/* Publications */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-400" /> Publications
            </h2>

            {loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="medium" />
              </div>
            ) : publications.length === 0 ? (
              <p className="text-purple-300">No publications listed yet.</p>
            ) : (
              <div className="space-y-6">
                {publications.map((pub) => (
                  <div
                    key={pub._id}
                    className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-white">{pub.title}</h3>
                      <span className="shrink-0 text-xs bg-purple-700 text-purple-100 px-3 py-1 rounded-full whitespace-nowrap">
                        {STATUS_LABEL[pub.status] || pub.status}
                      </span>
                    </div>
                    {pub.authors && <p className="text-purple-300 text-sm mb-2">{pub.authors}</p>}
                    {pub.description && (
                      <p className="text-purple-200 text-sm leading-relaxed mb-3">{pub.description}</p>
                    )}
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-semibold"
                      >
                        View {pub.venue || "manuscript"} <ExternalLink className="ml-1 w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-purple-400" /> Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                    <span className="shrink-0 text-purple-300 text-sm">{edu.period}</span>
                  </div>
                  <p className="text-purple-300 text-sm mb-2">{edu.institution}</p>
                  <p className="text-purple-200 text-sm leading-relaxed">{edu.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
