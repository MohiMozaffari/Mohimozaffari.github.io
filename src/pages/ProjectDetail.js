// src/pages/ProjectDetail.jsx
import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  Code,
} from "lucide-react";
import projects, { getProject } from "../data/projects";

/* ---------- helpers ---------- */
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

const getProjectLanguages = (p) =>
  (Array.isArray(p?.languages) ? p.languages : p?.language ? [p.language] : ["Unknown"])
    .flat()
    .filter((x) => x != null && x !== "")
    .map((x) => String(x).trim());

/* ---------- component ---------- */
export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProject(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project?.id]);

  const num = useMemo(() => new Intl.NumberFormat(), []);
  const year = useMemo(() => {
    const d = project?.updated_at || project?.created_at;
    return d ? new Date(d).getFullYear() : "—";
  }, [project]);

  const langs = useMemo(() => getProjectLanguages(project || {}), [project]);

  // related = same language overlap (exclude self), sort by most recent
  const related = useMemo(() => {
    const set = new Set(langs.map((l) => l.toLowerCase()));
    return projects
      .filter((p) => p.id !== project?.id)
      .filter((p) =>
        getProjectLanguages(p)
          .map((l) => l.toLowerCase())
          .some((l) => set.has(l))
      )
      .sort((a, b) => {
        const da = new Date(a.updated_at || a.created_at || 0);
        const db = new Date(b.updated_at || b.created_at || 0);
        return db - da;
      })
      .slice(0, 3);
  }, [project?.id, langs]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
          <Link
            to="/projects"
            className="inline-flex items-center text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back */}
          <Link
            to="/projects"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
          </Link>

          {/* Header */}
          <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1
                  className="text-4xl font-bold text-white mb-3 break-words"
                  title={String(project.name ?? "").replaceAll("_", " ")}
                >
                  {String(project.name ?? "").replaceAll("_", " ")}
                </h1>

                {/* Multiple language badges, same height, one-line text */}
                <div className="flex flex-wrap gap-2">
                  {langs.map((lang) => (
                    <span
                      key={lang}
                      className={`text-xs ${getLangColor(
                        lang
                      )} text-white flex items-center justify-center h-6 px-3 rounded-full whitespace-nowrap`}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6 mt-4 md:mt-0 text-purple-300">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5" />
                  <span>{num.format(project.stars || 0)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="w-5 h-5" />
                  <span>{num.format(project.forks || 0)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{year}</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-white leading-relaxed mb-6">
              {project?.details?.overview}
            </p>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300"
            >
              <Code className="mr-2 w-5 h-5" /> View on GitHub{" "}
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-2">
                {(project.details?.features || []).map((f, i) => (
                  <li key={i} className="text-purple-200 flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {(project.details?.technologies || []).map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-700 text-purple-200 rounded-full text-sm whitespace-nowrap"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Applications</h3>
            <p className="text-purple-200 leading-relaxed">
              {project.details?.applications}
            </p>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Related Projects</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rp) => {
                  const rLangs = getProjectLanguages(rp);
                  return (
                    <Link
                      key={rp.id}
                      to={`/projects/${rp.slug}`}
                      className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/50 hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {String(rp.name ?? "").replaceAll("_", " ")}
                      </h4>
                      <p className="text-purple-200 text-sm mb-3 line-clamp-3">
                        {rp.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-purple-300">
                        {/* mini language badges */}
                        <div className="flex flex-wrap gap-2">
                          {rLangs.map((lang) => (
                            <span
                              key={lang}
                              className={`text-[10px] ${getLangColor(
                                lang
                              )} text-white flex items-center justify-center h-5 px-2 rounded-full whitespace-nowrap`}
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                        <span>⭐ {num.format(rp.stars || 0)}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
