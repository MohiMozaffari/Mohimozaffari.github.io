import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  Code,
  FileText,
  Database,
} from "lucide-react";
import { getProject, getProjects } from "../api/projects";
import LoadingSpinner from "../components/LoadingSpinner";
import { getLangColor, displayName, displayDescription, projectYear } from "../utils/projectDisplay";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getProject(id)
      .then(async (p) => {
        setProject(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
        try {
          const all = await getProjects();
          const relatedList = all
            .filter((rp) => rp._id !== p._id && rp.language && rp.language === p.language)
            .sort((a, b) => new Date(b.pushedAt || 0) - new Date(a.pushedAt || 0))
            .slice(0, 3);
          setRelated(relatedList);
        } catch {
          setRelated([]);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const num = useMemo(() => new Intl.NumberFormat(), []);

  if (loading) {
    return (
      <div className="relative z-10 py-20 flex justify-center">
        <LoadingSpinner size="medium" />
      </div>
    );
  }

  if (notFound || !project) {
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

  const { overrides = {} } = project;

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
                  title={displayName(project)}
                >
                  {displayName(project)}
                </h1>

                <div className="flex flex-wrap gap-2">
                  {project.language && (
                    <span
                      className={`text-xs ${getLangColor(project.language)} text-white flex items-center justify-center h-6 px-3 rounded-full whitespace-nowrap`}
                    >
                      {project.language}
                    </span>
                  )}
                  {(project.topics || []).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-purple-700 text-purple-100 flex items-center justify-center h-6 px-3 rounded-full whitespace-nowrap"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {project.source !== "manual" && (
                <div className="flex items-center space-x-6 mt-4 md:mt-0 text-purple-300">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5" />
                    <span>{num.format(project.stars || 0)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-5 h-5" />
                    <span>{num.format(project.forksCount || 0)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-5 h-5" />
                    <span>{projectYear(project)}</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-lg text-white leading-relaxed mb-6">
              {displayDescription(project)}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={project.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300"
              >
                <Code className="mr-2 w-5 h-5" />
                {project.source === "manual" ? "View Preprint" : "View on GitHub"}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>

              {overrides.arxivUrl && project.source !== "manual" && (
                <a
                  href={overrides.arxivUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-purple-400 text-purple-200 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  <FileText className="mr-2 w-5 h-5" /> arXiv Preprint
                </a>
              )}

              {overrides.zenodoDoi && (
                <a
                  href={`https://doi.org/${overrides.zenodoDoi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-purple-400 text-purple-200 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  <Database className="mr-2 w-5 h-5" /> Zenodo DOI
                </a>
              )}
            </div>
          </div>

          {/* Overview */}
          {project.readmeExcerpt && (
            <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
              <p className="text-purple-200 leading-relaxed whitespace-pre-line">
                {project.readmeExcerpt}
              </p>
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Related Projects</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rp) => (
                  <Link
                    key={rp._id}
                    to={`/projects/${rp.slug}`}
                    className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/50 hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {displayName(rp)}
                    </h4>
                    <p className="text-purple-200 text-sm mb-3 line-clamp-3">
                      {displayDescription(rp)}
                    </p>

                    <div className="flex items-center justify-between text-xs text-purple-300">
                      {rp.language && (
                        <span
                          className={`text-[10px] ${getLangColor(rp.language)} text-white flex items-center justify-center h-5 px-2 rounded-full whitespace-nowrap`}
                        >
                          {rp.language}
                        </span>
                      )}
                      <span>⭐ {num.format(rp.stars || 0)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
