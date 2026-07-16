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
  preprint: "Preprint",
};

const STATUS_STYLE = {
  submitted: "bg-blue-500/20 text-blue-300 border border-blue-500/40",
  "under-review": "bg-amber-500/20 text-amber-300 border border-amber-500/40",
  published: "bg-green-500/20 text-green-300 border border-green-500/40",
  preprint: "bg-slate-500/20 text-slate-300 border border-slate-500/40",
};

const STATUS_DOT = {
  submitted: "bg-blue-400",
  "under-review": "bg-amber-400",
  published: "bg-green-400",
  preprint: "bg-slate-400",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Research</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Publications, ongoing work, and academic background.
          </p>
        </motion.div>

        <div>
          {/* Research Statement */}
          <div className="mb-16">
            <p className="text-lg text-purple-100 leading-relaxed max-w-4xl mx-auto text-left bg-purple-900/20 p-8 rounded-xl border border-purple-700/40">
              {settings.research_statement}
            </p>
          </div>

          {/* Publications */}
          <div className="mb-16">
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
              <div className="relative border-l-2 border-purple-700/50 ml-3 space-y-10">
                {publications.map((pub) => (
                  <div key={pub._id} className="relative pl-8">
                    <span
                      className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-purple-950 ${
                        STATUS_DOT[pub.status] || "bg-purple-400"
                      }`}
                    />
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                        STATUS_STYLE[pub.status] || "bg-purple-700 text-purple-100 border border-purple-600"
                      }`}
                    >
                      {STATUS_LABEL[pub.status] || pub.status}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">{pub.title}</h3>
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
          </div>

          {/* Education */}
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
