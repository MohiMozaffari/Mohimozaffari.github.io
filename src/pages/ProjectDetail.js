import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
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
      <div className="relative z-10 flex justify-center py-20">
        <LoadingSpinner size="medium" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-content">Project not found</h2>
          <Link to="/projects" className="link mt-4 inline-flex items-center text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const { overrides = {} } = project;

  return (
    <div className="relative z-10">
      <Section background="ink" maxWidth="max-w-4xl">
        <Reveal>
          <Link to="/projects" className="link mb-8 inline-flex items-center text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
          </Link>

          {/* ══ HEADER PANEL ═════════════════════════════════════════════ */}
          <Card radius="xl" padding="lg" raise interactive={false}>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1
                  className="break-words font-display text-3xl font-semibold leading-tight tracking-tight text-content sm:text-4xl"
                  title={displayName(project)}
                >
                  {displayName(project)}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {project.language && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                      <span
                        className={`h-2 w-2 rounded-full ${getLangColor(project.language)}`}
                        aria-hidden="true"
                      />
                      {project.language}
                    </span>
                  )}
                  {(project.topics || []).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-md border border-line px-2 py-1 font-mono text-micro uppercase tracking-[0.08em] text-content-faint"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {project.source !== "manual" && (
                <div className="tnum flex shrink-0 items-center gap-5 font-mono text-caption text-content-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-4 w-4" />
                    {num.format(project.stars || 0)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitFork className="h-4 w-4" />
                    {num.format(project.forksCount || 0)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {projectYear(project)}
                  </span>
                </div>
              )}
            </div>

            <p className="max-w-prose text-base leading-relaxed text-content-muted">
              {displayDescription(project)}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={project.htmlUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                <span className="inline-flex items-center">
                  <Code className="mr-2 h-4 w-4" />
                  {project.source === "manual" ? "View preprint" : "View on GitHub"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </span>
              </Button>

              {overrides.arxivUrl && project.source !== "manual" && (
                <Button href={overrides.arxivUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                  <span className="inline-flex items-center">
                    <FileText className="mr-2 h-4 w-4" /> arXiv preprint
                  </span>
                </Button>
              )}

              {overrides.zenodoDoi && (
                <Button
                  href={`https://doi.org/${overrides.zenodoDoi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  <span className="inline-flex items-center">
                    <Database className="mr-2 h-4 w-4" /> Zenodo DOI
                  </span>
                </Button>
              )}
            </div>
          </Card>

          {/* ══ OVERVIEW ═════════════════════════════════════════════════ */}
          {project.readmeExcerpt && (
            <Card radius="lg" padding="lg" interactive={false} className="mt-8">
              <h3 className="font-display text-xl font-semibold tracking-tight text-content">
                Overview
              </h3>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-content-muted">
                {project.readmeExcerpt}
              </p>
            </Card>
          )}

          {/* ══ RELATED — same lighter register as the Projects grid ═══════ */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="border-b border-line pb-4 font-display text-xl font-semibold tracking-tight text-content">
                Related projects
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((rp) => (
                  <Link key={rp._id} to={`/projects/${rp.slug}`} className="block">
                    <Card radius="lg" padding="sm" className="h-full">
                      <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-content">
                        {displayName(rp)}
                      </h4>
                      <p className="mt-2 line-clamp-3 text-caption leading-relaxed text-content-muted">
                        {displayDescription(rp)}
                      </p>
                      <div className="mt-4 flex items-center justify-between font-mono text-micro text-content-faint">
                        {rp.language && (
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${getLangColor(rp.language)}`}
                              aria-hidden="true"
                            />
                            {rp.language}
                          </span>
                        )}
                        <span className="tnum inline-flex items-center gap-1">
                          <Star className="h-3 w-3" /> {num.format(rp.stars || 0)}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </Section>
    </div>
  );
}
