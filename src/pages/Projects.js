// src/pages/Pr
// jects.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import projects, { allLanguages } from "../data/projects";

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

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const languages = useMemo(() => ["all", ...allLanguages], []);
  const numberFmt = useMemo(() => new Intl.NumberFormat(), []);

  // 1) Sort ALL projects by updated_at (desc) once
  const sortedProjects = useMemo(() => {
    const safeDate = (p) =>
      p?.updated_at || p?.created_at || "1970-01-01T00:00:00Z";
    return [...projects].sort(
      (a, b) => new Date(safeDate(b)) - new Date(safeDate(a))
    );
  }, []);

  // 2) Apply filter over the sorted list
  const filteredProjects = useMemo(() => {
    if (filter === "all") return sortedProjects;
    return sortedProjects.filter((p) => {
      const langs = p.languages || [p.language || "unknown"];
      return langs.map((l) => l.toLowerCase()).includes(filter);
    });
  }, [filter, sortedProjects]);

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (optional) */}

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
          {filteredProjects.map((p) => {
            const year = p.updated_at
              ? new Date(p.updated_at).getFullYear()
              : p.created_at
              ? new Date(p.created_at).getFullYear()
              : "—";
            return (
              <div
                key={p.id}
                className="bg-purple-900/30 rounded-xl border border-purple-700/50 overflow-hidden hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105 flex flex-col"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Title row: name wraps, pill stays on the right */}
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className="text-xl font-bold text-white leading-snug break-words whitespace-normal pr-2"
                      title={p.name}
                    >
                      {p.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(p.languages || ["Unknown"]).map((lang) => (
                        <span
                          key={lang}
                          className={`text-xs ${getLangColor(lang)} text-white 
              flex items-center justify-center 
              h-6 px-3 rounded-full whitespace-nowrap`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description wraps; keep it from getting too tall */}
                  <p className="text-purple-200 text-sm leading-relaxed mb-6 flex-grow">
                    {p.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center justify-between text-sm text-purple-300 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{numberFmt.format(p.stars || 0)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{numberFmt.format(p.forks || 0)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{year}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 text-sm"
                    >
                      View on GitHub <ExternalLink className="ml-2 w-4 h-4" />
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
            );
          })}
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
