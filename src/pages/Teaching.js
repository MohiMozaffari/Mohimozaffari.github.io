import React, { useMemo, useState } from "react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import coursesData from "../data/courses";
import useSiteSettings from "../hooks/useSiteSettings";

// Real, sign-off'd supervisor names — never placeholders (CLAUDE.md).
const taExperience = [
  { course: "Complex Systems Physics", supervisor: "Prof. G. Reza Jafari" },
  { course: "Complex Networks & Graph Theory", supervisor: "Prof. G. Reza Jafari" },
  { course: "Stochastic Processes", supervisor: "Prof. S. Ali Hosseiny" },
  { course: "Numerical Simulations", supervisor: "Prof. S. Ali Hosseiny" },
  { course: "Analytical Mechanics", supervisor: "Prof. Marzieh Farhang" },
];

const PUBLIC_EMAIL = "mohaddeseh.mozaffarii@gmail.com";

export default function Teaching() {
  const settings = useSiteSettings();
  const [activeId, setActiveId] = useState("pythonFundamentals");

  const courses = useMemo(() => coursesData, []);
  const currentCourse = useMemo(
    () => courses.find((c) => c.id === activeId) || courses[0],
    [courses, activeId]
  );

  // booking_url dependency (Part D / design/ia-spec.md): when set, booking CTAs
  // link out to it in a new tab; when empty, they fall back to a mailto — never
  // a dead "#" link.
  const bookingUrl = settings.booking_url;
  const bookingHref = bookingUrl || `mailto:${PUBLIC_EMAIL}`;
  const bookingExternalProps = bookingUrl
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="relative z-10">
      {/* ══ PAGE HEADER — lighter register than Research (B4, structural) ══ */}
      <Section background="surface" border="bottom" maxWidth="max-w-7xl" padY="pb-14 pt-16">
        <Reveal>
          <PageHeader
            size="lg"
            maxWidth="max-w-3xl"
            description={settings.teaching_intro}
          >
            Teaching
          </PageHeader>
        </Reveal>

        {/* ══ BOOKING CTA — the one loud thing on this page ═══════════════ */}
        <Reveal index={1} className="mt-10 overflow-hidden rounded-xl border border-coral-400/30 bg-gradient-to-r from-coral-400/10 to-transparent">
          <div className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-coral-300">
                Book a session
              </h2>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-content-muted">
                Pick a time that works for you &mdash; 1:1 or small group, beginner through advanced.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <a
                href={bookingHref}
                {...bookingExternalProps}
                className="rounded-lg bg-coral-400 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-coral-300"
              >
                Book a session →
              </a>
              <a
                href={`mailto:${PUBLIC_EMAIL}`}
                className="rounded-lg border border-line-strong bg-surface-raised px-5 py-3 text-sm font-medium text-content transition-colors hover:border-iris-500"
              >
                Message me
              </a>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ══ COURSES — anonymized, topic-based only ═══════════════════════ */}
      <Section background="ink" maxWidth="max-w-7xl">
        <h2 className="border-b border-line pb-5 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
          What I teach
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-12">
          {/* selector rail */}
          <div className="md:col-span-4">
            <div className="flex flex-col gap-1">
              {courses.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`rounded-md border px-4 py-3 text-left transition-colors ${
                      isActive
                        ? "border-iris-500/40 bg-iris-500/10"
                        : "border-transparent hover:border-line hover:bg-surface-raised"
                    }`}
                  >
                    <span
                      className={`block text-sm ${
                        isActive ? "font-semibold text-iris-200" : "font-medium text-content-muted"
                      }`}
                    >
                      {c.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                      {c.level} &middot; {c.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* detail */}
          <div className="md:col-span-8">
            <Card radius="xl" padding="lg" raise interactive={false}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-iris-400/30 bg-iris-400/10 px-2.5 py-1 font-mono text-micro uppercase tracking-[0.1em] text-iris-300">
                  {currentCourse.level}
                </span>
                <span className="rounded-md border border-line px-2.5 py-1 font-mono text-micro uppercase tracking-[0.1em] text-content-faint">
                  {currentCourse.duration}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                {currentCourse.title}
              </h3>
              <p className="mt-3 max-w-prose text-base leading-relaxed text-content-muted">
                {currentCourse.description}
              </p>

              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-micro uppercase tracking-[0.1em] text-content-faint">
                    Covers
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-content-muted">
                    {currentCourse.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-iris-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-micro uppercase tracking-[0.1em] text-content-faint">
                    Projects
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-content-muted">
                    {currentCourse.projects.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 border-t border-line pt-5">
                <a href={bookingHref} {...bookingExternalProps} className="link text-sm font-medium">
                  Book a session for this track →
                </a>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ══ TA EXPERIENCE — real, signed-off supervisor names ════════════ */}
      <Section background="surface" border="top" maxWidth="max-w-7xl">
        <h2 className="border-b border-line pb-5 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
          Teaching assistantships
        </h2>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-content-muted">
          Undergraduate and graduate courses at Shahid Beheshti University.
        </p>

        <Reveal>
          <dl className="mt-7 divide-y divide-line rounded-lg border border-line bg-surface-raised/60">
            {taExperience.map((ta) => (
              <div
                key={ta.course}
                className="flex flex-wrap items-baseline justify-between gap-3 px-5 py-4"
              >
                <dt className="text-base font-medium text-content">{ta.course}</dt>
                <dd className="font-mono text-micro text-content-faint">{ta.supervisor}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ══ PHILOSOPHY — plain prose, no icon circles, no cards ══════════ */}
      <Section background="ink" maxWidth="max-w-7xl">
        <h2 className="border-b border-line pb-5 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
          How I teach
        </h2>
        <Reveal className="mt-8 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.08em] text-iris-400">Hands-on</p>
            <p className="mt-3 text-sm leading-relaxed text-content-muted">
              Learning by doing. Every concept is reinforced through practical projects that solve
              real-world problems.
            </p>
          </div>
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.08em] text-iris-400">
              Personalized
            </p>
            <p className="mt-3 text-sm leading-relaxed text-content-muted">
              Each student learns differently. I adapt my teaching style to match your learning
              preferences and pace.
            </p>
          </div>
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.08em] text-iris-400">
              Examples first
            </p>
            <p className="mt-3 text-sm leading-relaxed text-content-muted">
              Clear explanations, examples before abstraction, and step-by-step, project-based
              learning.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-xl border border-line bg-surface-raised p-6 sm:flex-row sm:items-center">
          <p className="text-body text-content-muted">Ready to start?</p>
          <div className="flex gap-3">
            <a
              href={bookingHref}
              {...bookingExternalProps}
              className="rounded-lg bg-coral-400 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-coral-300"
            >
              Book a session
            </a>
            <a
              href={`mailto:${PUBLIC_EMAIL}`}
              className="rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-content transition-colors hover:border-iris-500"
            >
              Email
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
