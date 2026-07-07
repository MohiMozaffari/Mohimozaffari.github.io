import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import { getProjects } from "../api/projects";
import LoadingSpinner from "../components/LoadingSpinner";
import { getLangColor, displayName, displayDescription, projectYear } from "../utils/projectDisplay";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const numberFmt = useMemo(() => new Intl.NumberFormat(), []);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const languages = useMemo(() => {
    const set = new Set(projects.map((p) => (p.language || "").toLowerCase()).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [projects]);

  // Featured-first, then most recently updated
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      const da = new Date(a.pushedAt || a.ghUpdatedAt || 0);
      const db = new Date(b.pushedAt || b.ghUpdatedAt || 0);
      return db - da;
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return sortedProjects;
    return sortedProjects.filter((p) => (p.language || "").toLowerCase() === filter);
  }, [filter, sortedProjects]);

  if (loading) {
    return (
      <div className="relative z-10 py-20 flex justify-center">
        <LoadingSpinner size="medium" />
      </div>
    );
  }

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setFilter(lang)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === lang
                  ? "bg-purple-600 text-white"
                  : "bg-purple-900/50 text-purple-200 hover:bg-purple-700 hover:text-white"
              }`}
            >
              {lang === "all"
                ? "All Projects"
                : lang
                    .split(" ")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" ")}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p._id}
              className={`bg-purple-900/30 rounded-xl border overflow-hidden hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105 flex flex-col ${
                p.featured ? "border-purple-500" : "border-purple-700/50"
              }`}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className="text-xl font-bold text-white leading-snug break-words whitespace-normal pr-2"
                    title={displayName(p)}
                  >
                    {displayName(p)}
                    {p.featured && (
                      <span className="ml-2 align-middle text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                        Featured
                      </span>
                    )}
                  </h3>
                  {p.language && (
                    <span
                      className={`text-xs ${getLangColor(p.language)} text-white
              flex items-center justify-center
              h-6 px-3 rounded-full whitespace-nowrap`}
                    >
                      {p.language}
                    </span>
                  )}
                </div>

                <p className="text-purple-200 text-sm leading-relaxed mb-6 flex-grow">
                  {displayDescription(p)}
                </p>

                <div className="flex items-center justify-between text-sm text-purple-300 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{numberFmt.format(p.stars || 0)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-4 h-4" />
                      <span>{numberFmt.format(p.forksCount || 0)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{projectYear(p)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={p.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 text-sm"
                  >
                    {p.source === "manual" ? "View Preprint" : "View on GitHub"}{" "}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="text-purple-400 hover:text-purple-300 font-semibold text-sm"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-purple-200 text-lg">
            No projects found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
