import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Prose from "../components/ui/Prose";
import Reveal from "../components/ui/Reveal";
import NetworkMotif from "../components/ui/NetworkMotif";
import { getProjects } from "../api/projects";
import { getPublications } from "../api/publications";
import { getLangColor, displayName, displayDescription } from "../utils/projectDisplay";
import useSiteSettings from "../hooks/useSiteSettings";

// Internal-route nav actions can't use the Button primitive (it only renders
// <a>/<button>, no react-router <Link>), so the primary/ghost class strings
// are mirrored here for the two Link-based CTAs (View research, Book a call
// fallback). Kept in sync with src/components/ui/Button.jsx by hand.
const PRIMARY_LINK_CLASSES =
  "rounded-lg bg-gradient-to-r from-iris-400 via-iris-500 to-orchid-500 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90";
const GHOST_LINK_CLASSES = "link px-1 py-3 text-sm font-medium";
const SECONDARY_LINK_CLASSES =
  "rounded-lg border border-line-strong bg-surface-raised px-5 py-3 text-sm font-medium text-content transition-colors hover:border-iris-500";
const QUIET_CTA_CLASSES =
  "rounded-lg border border-coral-400/40 bg-coral-400/10 px-5 py-3 text-sm font-semibold text-coral-300 transition-colors hover:bg-coral-400/20";

const PUBLIC_EMAIL = "mohaddeseh.mozaffarii@gmail.com";

const Home = () => {
  const settings = useSiteSettings();
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [publications, setPublications] = useState([]);
  const [pubsLoading, setPubsLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data.filter((p) => p.featured)))
      .catch(() => setProjects([]))
      .finally(() => setProjectsLoading(false));
  }, []);

  useEffect(() => {
    getPublications()
      .then(setPublications)
      .catch(() => setPublications([]))
      .finally(() => setPubsLoading(false));
  }, []);

  const heroMetaParts = (settings.home_hero_line2 || "")
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);

  const topPublications = publications.slice(0, 2);
  const bookingUrl = settings.booking_url;

  return (
    <div className="relative z-10">
      {/* ══ HERO (B5) ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh">
        <NetworkMotif viewBox="0 0 1200 700" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 md:min-h-[calc(100svh-4.25rem)] md:grid-cols-12 md:gap-12">
          <Reveal className="order-2 md:order-none md:col-span-7">
            <h1 className="font-display display-optical text-display-xl font-semibold">
              <span className="gradient-word">{settings.home_hero_line1}</span>
            </h1>

            <div className="mt-6 h-px w-32 rule-orchid" />

            {heroMetaParts.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-meta uppercase text-content-faint">
                {heroMetaParts.map((part, i) => (
                  <React.Fragment key={part}>
                    {i > 0 && <span className="text-orchid-500">/</span>}
                    <span>{part}</span>
                  </React.Fragment>
                ))}
              </div>
            )}

            <Prose className="mt-6 text-base">{settings.home_about_paragraph}</Prose>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/research" className={PRIMARY_LINK_CLASSES}>
                View research
              </Link>
              <Button
                href={`${process.env.PUBLIC_URL}/CV.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Download CV
              </Button>
              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={GHOST_LINK_CLASSES}
                >
                  Book a call →
                </a>
              ) : (
                <Link to="/teaching" className={GHOST_LINK_CLASSES}>
                  Book a call →
                </Link>
              )}
            </div>
          </Reveal>

          {/* order-1 on mobile: stacked, the text column is tall enough to push
              the photo below the fold, so it reads as missing. Photo leads on
              mobile; on md+ the grid restores the text-left / photo-right layout. */}
          <Reveal index={1} className="order-1 md:order-none md:col-span-5">
            <div className="mx-auto w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] md:ml-auto md:mr-0">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-iris-500/25 via-orchid-500/10 to-orchid-400/25 blur-xl" />
                <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface-raised shadow-raise">
                  <img
                    src={`${process.env.PUBLIC_URL}/headshot-hero.jpg`}
                    alt="Mohaddeseh Mozaffari"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SELECTED PUBLICATIONS (B2/B3) ═══════════════════════════════ */}
      <Section background="surface" border="y">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
          <div>
            <p className="font-mono text-meta uppercase text-iris-400">01 / Research</p>
            <h2 className="mt-2 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
              Selected publications
            </h2>
          </div>
          <Link to="/research" className="link shrink-0 pb-1 text-sm">
            All research →
          </Link>
        </div>

        {pubsLoading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner size="medium" />
          </div>
        ) : topPublications.length === 0 ? (
          <p className="mt-6 text-content-muted">No publications listed yet.</p>
        ) : (
          <ol className="mt-2">
            {topPublications.map((pub, i) => (
              <Reveal as="li" index={i} key={pub._id} className="group border-b border-line py-7">
                <Link to="/research" className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <Badge status={pub.status} />
                    {pub.venue && (
                      <p className="mt-2 font-mono text-micro text-content-faint">{pub.venue}</p>
                    )}
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-xl font-semibold leading-snug text-content transition-colors group-hover:text-iris-200">
                      {pub.title}
                    </h3>
                    {pub.authors && (
                      <p className="mt-2 font-mono text-caption text-content-faint">{pub.authors}</p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        )}
      </Section>

      {/* ══ FEATURED PROJECTS — deliberately lighter than publications ═══ */}
      <Section background="ink">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
          <div>
            <p className="font-mono text-meta uppercase text-iris-400">02 / Projects</p>
            <h2 className="mt-2 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
              Selected work
            </h2>
          </div>
          <Link to="/projects" className="link shrink-0 pb-1 text-sm">
            All projects →
          </Link>
        </div>

        {projectsLoading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner size="medium" />
          </div>
        ) : projects.length === 0 ? (
          <p className="mt-6 text-content-muted">No featured projects yet.</p>
        ) : (
          <Reveal className="mt-8 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project.slug}`}
                className="block rounded-lg border border-line bg-surface-raised p-5 transition-colors hover:border-line-strong"
              >
                <p className="font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                  {project.language || "Project"}
                </p>
                <h3 className="mt-2 text-base font-semibold text-content">
                  {displayName(project)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">
                  {displayDescription(project)}
                </p>
                {project.language && (
                  <span
                    className={`mt-3 inline-block h-1.5 w-1.5 rounded-full ${getLangColor(project.language)}`}
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </Reveal>
        )}
      </Section>

      {/* ══ TEACHING + CONTACT CTA — one quiet strip, not a peer section ══ */}
      <Section background="surface" border="top">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-meta uppercase text-content-faint">Also</p>
            <p className="mt-2 max-w-xl text-body text-content-muted">{settings.teaching_intro}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link to="/teaching" className={SECONDARY_LINK_CLASSES}>
              Teaching
            </Link>
            {bookingUrl ? (
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={QUIET_CTA_CLASSES}>
                Book a session
              </a>
            ) : (
              <a href={`mailto:${PUBLIC_EMAIL}`} className={QUIET_CTA_CLASSES}>
                Book a session
              </a>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
