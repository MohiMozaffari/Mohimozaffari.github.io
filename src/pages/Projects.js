import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import { getProjects } from "../api/projects";
import LoadingSpinner from "../components/LoadingSpinner";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
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

  // Featured-first, then most recently updated — kept exactly as before.
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

  return (
    <div className="relative z-10">
      {/* ══ PAGE HEADER — lighter register, no mesh/motif ═══════════════ */}
      <Section background="surface" border="bottom" maxWidth="max-w-7xl" padY="pb-14 pt-16">
        <Reveal>
          <PageHeader
            size="lg"
            maxWidth="max-w-2xl"
            description="Research tooling and applied engineering, synced automatically from GitHub."
          >
            Projects
          </PageHeader>
        </Reveal>
      </Section>

      {/* ══ FILTERS + GRID — deliberately lighter register than publications ══ */}
      <Section background="ink">
        <Reveal className="flex flex-wrap gap-2.5">
          {languages.map((lang) => {
            const isActive = filter === lang;
            const label =
              lang === "all"
                ? "All projects"
                : lang
                    .split(" ")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" ");
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setFilter(lang)}
                className={`rounded-md border px-3.5 py-2 font-mono text-micro uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? "border-iris-500/40 bg-iris-500/10 text-iris-200"
                    : "border-line text-content-faint hover:border-line-strong hover:text-content-muted"
                }`}
              >
                {label}
              </button>
            );
          })}
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="medium" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <p className="mt-10 text-center text-content-muted">
            No projects found for the selected filter.
          </p>
        ) : (
          <Reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <Card key={p._id} padding="sm" radius="lg" className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                      {p.language || "Project"}
                    </p>
                    {p.featured && (
                      <span className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.08em] text-orchid-400">
                        <span className="h-1 w-1 rounded-full bg-orchid-400" />
                        Featured
                      </span>
                    )}
                  </div>
                  {p.language && (
                    <span
                      className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${getLangColor(p.language)}`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <h3
                  className="mt-3 text-base font-semibold leading-snug text-content"
                  title={displayName(p)}
                >
                  {displayName(p)}
                </h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-content-muted">
                  {displayDescription(p)}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <div className="tnum flex items-center gap-3.5 font-mono text-micro text-content-faint">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      {numberFmt.format(p.stars || 0)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      {numberFmt.format(p.forksCount || 0)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {projectYear(p)}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <a
                      href={p.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={p.source === "manual" ? "View preprint" : "View on GitHub"}
                      className="text-content-faint transition-colors hover:text-iris-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <Link to={`/projects/${p.slug}`} className="link text-caption font-medium">
                      Details →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </Reveal>
        )}
      </Section>
    </div>
  );
}
