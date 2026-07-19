import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import NetworkMotif from "../components/ui/NetworkMotif";
import { getPublications } from "../api/publications";
import useSiteSettings from "../hooks/useSiteSettings";

// Hardcoded, CV-verified education record (same pattern as the pre-redesign
// Research.js — not admin-managed content, so this stays a literal array
// rather than a new DB/settings plumbing addition).
const EDUCATION = [
  {
    eyebrow: "Sep 2022 – Mar 2025",
    tag: "Outstanding",
    heading: "MSc Physics — Statistical Physics and Complex Systems",
    detail: (
      <>
        Shahid Beheshti University. Thesis:{" "}
        <em className="text-content">
          Analysis of Topological Features of Brain Networks in Autism Spectrum Disorder Using
          Persistent Homology
        </em>
        . Advised by Prof. G. Reza Jafari. Ranked 2nd in cohort.
      </>
    ),
  },
  {
    eyebrow: "Sep 2018 – May 2022",
    tag: "Ranked 1st",
    heading: "BSc Physics",
    detail: "Shahid Beheshti University. Ranked 1st in cohort.",
  },
];

// One entry, shared by the Publications and Conference-presentations lists so
// the two sections stay visually identical apart from their heading.
function PublicationEntry({ pub, index }) {
  return (
    <li className="group relative border-b border-line py-9">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="tnum font-mono text-micro text-content-faint">
            {String(index + 1).padStart(2, "0")}
          </p>
          <Badge status={pub.status} className="mt-3" />
          {pub.venue && (
            <p className="mt-3 font-mono text-micro leading-relaxed text-content-faint">
              {pub.venue}
            </p>
          )}
        </div>
        <div className="md:col-span-9">
          <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-content">
            {pub.title}
          </h3>
          {pub.authors && (
            <p className="mt-3 font-mono text-caption text-content-faint">{pub.authors}</p>
          )}
          {pub.description && (
            <p className="mt-4 max-w-prose text-base leading-relaxed text-content-muted">
              {pub.description}
            </p>
          )}
          {pub.url && (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-4 inline-block font-mono text-caption"
            >
              {formatUrl(pub.url)} →
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

const formatUrl = (url) => {
  try {
    const u = new URL(url);
    return `${u.hostname}${u.pathname}${u.search}`.replace(/\/$/, "");
  } catch {
    return url;
  }
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

  // Blank-line-separated paragraphs; falls back to one block if unsplit.
  const statementParagraphs = (settings.research_statement || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Conference talks are listed separately from papers (academic convention):
  // an accepted oral presentation is not a published paper.
  const papers = publications.filter((p) => p.status !== "presentation");
  const presentations = publications.filter((p) => p.status === "presentation");

  // One focus area per line, "Title — detail". Admin-editable (research_focus).
  const focusAreas = (settings.research_focus || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("—");
      return { title: title.trim(), detail: rest.join("—").trim() };
    });

  return (
    <div className="relative z-10">
      {/* ══ PAGE HEADER + RESEARCH STATEMENT — narrative first ═══════════ */}
      <section className="relative overflow-hidden mesh">
        <NetworkMotif viewBox="0 0 1200 520" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20">
          <Reveal>
            <PageHeader size="xl" maxWidth="max-w-3xl">
              Research &amp; Publications
            </PageHeader>
          </Reveal>

          {/* Prose has to stay near ~75ch to stay readable, which on a wide screen
              leaves a large gap. Rather than dumping that gap on one side (reads as
              a broken half-empty page), the width is used: statement left, a compact
              facts rail right. Everything in the rail is existing site data. */}
          <Reveal index={1} className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-meta uppercase text-iris-400">Research statement</p>
              {/* The statement is one long DB string; rendering it as a single
                  block is an unreadable wall. Split on blank lines so paragraphing
                  stays editable from the admin Content tab. The opening paragraph
                  is set larger as a lead — no drop cap, which only added clutter. */}
              <div className="mt-5 space-y-5 text-justify hyphens-auto">
                {statementParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-body text-content sm:text-h3 sm:leading-[1.65]"
                        : "text-body text-content-muted"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* The kicker sits outside the panel, level with "Research statement",
                so the panel's top edge lines up with the statement's first line
                rather than floating above it. */}
            <aside className="lg:col-span-4">
              <p className="font-mono text-meta uppercase text-iris-400">Focus areas</p>
              <div className="mt-5 rounded-xl border border-line bg-surface-raised/60 p-6 lg:sticky lg:top-24">
                <ul className="space-y-4">
                  {focusAreas.map(({ title, detail }) => (
                    <li key={title}>
                      <p className="flex gap-2.5 text-sm font-medium leading-snug text-content">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-coral-400" />
                        <span>{title}</span>
                      </p>
                      {detail && (
                        <p className="ml-[calc(0.25rem+0.625rem)] mt-1 text-caption leading-relaxed text-content-faint">
                          {detail}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ══ PUBLICATIONS — the visual centerpiece (B3) ═══════════════════ */}
      <Section background="surface" border="top">
        <div className="flex items-end justify-between gap-6 border-b border-line-strong pb-5">
          <h2 className="font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
            Publications
          </h2>
          <p className="tnum font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
            {papers.length} {papers.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        {/* Legend makes status literal — never make an admissions reader guess. */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-micro uppercase tracking-[0.08em]">
          <span className="inline-flex items-center gap-2 text-mint-400">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
            Published
          </span>
          <span className="inline-flex items-center gap-2 text-coral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-coral-400" />
            Under review
          </span>
          <span className="inline-flex items-center gap-2 text-iris-400">
            <span className="h-1.5 w-1.5 rounded-full bg-iris-400" />
            Preprint
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner size="medium" />
          </div>
        ) : papers.length === 0 ? (
          <p className="mt-6 text-content-muted">No publications listed yet.</p>
        ) : (
          <Reveal>
            <ol className="mt-4">
              {papers.map((pub, i) => (
                <PublicationEntry key={pub._id} pub={pub} index={i} />
              ))}
            </ol>
          </Reveal>
        )}
      </Section>

      {/* ══ CONFERENCE PRESENTATIONS — separate from papers, per academic
             convention: an accepted talk is not a published paper. ═════════ */}
      {presentations.length > 0 && (
        <Section background="ink">
          <div className="flex items-end justify-between gap-6 border-b border-line-strong pb-5">
            <h2 className="font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
              Conference presentations
            </h2>
            <p className="tnum font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
              {presentations.length} {presentations.length === 1 ? "entry" : "entries"}
            </p>
          </div>
          <Reveal>
            <ol className="mt-4">
              {presentations.map((pub, i) => (
                <PublicationEntry key={pub._id} pub={pub} index={i} />
              ))}
            </ol>
          </Reveal>
        </Section>
      )}

      {/* ══ RESEARCH SOFTWARE — NeuroPHorm gets a real slot ══════════════ */}
      <Section background="ink">
        <h2 className="border-b border-line pb-5 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
          Research software
        </h2>
        <Reveal>
          <Card radius="xl" padding="lg" raise interactive={false} className="mt-8">
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                  Zenodo DOI
                </p>
                <p className="mt-2 font-mono text-caption text-coral-400">10.5281/zenodo.17542598</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl font-semibold tracking-tight">NeuroPHorm</h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-content-muted">
                  Open-source Python package for topological data analysis of brain networks &mdash;
                  the pipeline behind the persistent-homology thesis work, packaged so other
                  researchers can build on it.
                </p>
                <a
                  href="https://github.com/MohiMozaffari/NeuroPHorm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link mt-4 inline-block font-mono text-caption"
                >
                  github.com/MohiMozaffari/NeuroPHorm →
                </a>
              </div>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* ══ EDUCATION ═════════════════════════════════════════════════════ */}
      <Section background="surface" border="top">
        <h2 className="border-b border-line pb-5 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
          Education
        </h2>
        <Reveal className="mt-2">
          {EDUCATION.map((edu, i) => (
            <div
              key={edu.heading}
              className={`grid gap-6 py-8 md:grid-cols-12 ${
                i < EDUCATION.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="md:col-span-3">
                <p className="tnum font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                  {edu.eyebrow}
                </p>
                <p className="mt-2 inline-block rounded-md border border-coral-400/30 bg-coral-400/10 px-2.5 py-1 font-mono text-micro uppercase tracking-[0.1em] text-coral-300">
                  {edu.tag}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-xl font-semibold tracking-tight">{edu.heading}</h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-content-muted">
                  {edu.detail}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>
    </div>
  );
}
