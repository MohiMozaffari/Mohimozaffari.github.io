import React from "react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Prose from "../components/ui/Prose";
import Reveal from "../components/ui/Reveal";
import useSiteSettings from "../hooks/useSiteSettings";

const SKILL_GROUPS = [
  {
    category: "Programming & tooling",
    items: ["Python", "NumPy / pandas / PyTorch", "Tkinter & Pygame (GUI and game development)"],
  },
  {
    category: "Complex systems & network science",
    items: [
      "Persistent homology / topological data analysis",
      "Brain network & connectome analysis",
      "Statistical physics of complex systems",
    ],
  },
  {
    category: "Machine learning & AI",
    items: ["Model development and evaluation", "Feature engineering", "Deep learning for medical imaging"],
  },
  {
    category: "Teaching & mentoring",
    items: ["Python, data analysis, and ML instruction", "1:1 and group teaching, project-based learning"],
  },
];

const EXPERIENCE = [
  {
    period: "2022 – Present",
    title: "Researcher",
    organization: "CCNet (Complexity & Complex Networks Lab)",
    description:
      "Collaborated on projects in complex systems, network science, and topological data analysis with applications in neuroscience and machine learning.",
  },
  {
    period: "2022 – Present",
    title: "Python & AI Instructor",
    organization: "Independent / online",
    description:
      "Teaching Python, scientific computing, and AI through hands-on projects — game development, interactive simulations, and real-world applications.",
  },
];

// Same CV-verified facts as the Education block on Research.js (kept in sync
// by hand — see CLAUDE.md "Key facts"). Not admin-managed content.
const EDUCATION = [
  {
    period: "Sep 2022 – Mar 2025",
    title: "MSc Physics — Statistical Physics and Complex Systems",
    detail: (
      <>
        Shahid Beheshti University. Thesis:{" "}
        <em className="text-content">
          Analysis of Topological Features of Brain Networks in Autism Spectrum Disorder Using
          Persistent Homology
        </em>
        , graded Outstanding. Advised by Prof. G. Reza Jafari. Ranked 2nd in cohort.
      </>
    ),
  },
  {
    period: "Sep 2018 – May 2022",
    title: "BSc Physics",
    detail: "Shahid Beheshti University. Ranked 1st in cohort.",
  },
];

const APPROACH = [
  {
    label: "Research-driven",
    text: "Every project and lesson is grounded in current research and best practices in computational science and complex systems theory.",
  },
  {
    label: "Practical focus",
    text: "I believe in learning by doing. All my courses emphasize hands-on projects that solve real-world problems and build practical skills.",
  },
  {
    label: "Student-centered",
    text: "Every student learns differently. I adapt my teaching style to individual needs and learning preferences.",
  },
];

const About = () => {
  const settings = useSiteSettings();

  return (
    <div className="relative z-10">
      {/* ══ HEADER — avatar styled like Home's headshot treatment ═══════ */}
      <Section background="surface" border="bottom" padY="pb-14 pt-16">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-3">
              <div className="relative mx-auto h-32 w-32 sm:h-36 sm:w-36">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-iris-500/25 via-orchid-500/10 to-orchid-400/25 blur-xl" />
                <img
                  src={`${process.env.PUBLIC_URL}/headshot-avatar.jpg`}
                  alt="Mohaddeseh Mozaffari"
                  className="relative h-full w-full rounded-full border border-line-strong object-cover shadow-raise"
                />
              </div>
            </div>
            <div className="md:col-span-9">
              {/* split={false}: this header already shares a row with the avatar,
                  so it keeps the stacked form rather than splitting again. */}
              <PageHeader size="lg" maxWidth="max-w-2xl" split={false} description={settings.about_intro}>
                About
              </PageHeader>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ══ JOURNEY — editorial, matches the Research-statement pattern ═ */}
      <Section background="ink">
        {/* Centred reading column — see Research.js: prose caps near ~75ch, so
            the leftover width is split into even margins instead of one dead band. */}
        <p className="mx-auto max-w-[80ch] font-mono text-meta uppercase text-iris-400">
          My journey
        </p>
        <Reveal className="mx-auto mt-5 max-w-[80ch] space-y-6">
          <Prose justify className="max-w-none">
            {settings.about_journey_1}
          </Prose>
          <Prose justify className="max-w-none">
            {settings.about_journey_2}
          </Prose>
          <Prose justify className="max-w-none">
            {settings.about_journey_3}
          </Prose>
        </Reveal>
      </Section>

      {/* ══ SKILLS — plain grouped lists, no percentage bars ═════════════ */}
      <Section background="surface" border="top">
        <h2 className="border-b border-line pb-5 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
          Skills &amp; expertise
        </h2>
        <Reveal className="mt-8 grid gap-5 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <Card key={group.category} radius="lg" padding="md" interactive={false}>
              <h3 className="font-mono text-micro uppercase tracking-[0.08em] text-iris-400">
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-content-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </Reveal>
      </Section>

      {/* ══ EXPERIENCE ════════════════════════════════════════════════════ */}
      <Section background="ink">
        <h2 className="border-b border-line pb-5 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
          Experience
        </h2>
        <Reveal className="mt-2">
          {EXPERIENCE.map((exp, i) => (
            <div
              key={exp.title}
              className={`grid gap-6 py-8 md:grid-cols-12 ${
                i < EXPERIENCE.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="md:col-span-3">
                <p className="tnum font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                  {exp.period}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-xl font-semibold tracking-tight">{exp.title}</h3>
                <p className="mt-1.5 font-mono text-caption text-content-faint">{exp.organization}</p>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-content-muted">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
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
              key={edu.title}
              className={`grid gap-6 py-8 md:grid-cols-12 ${
                i < EDUCATION.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="md:col-span-3">
                <p className="tnum font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                  {edu.period}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-xl font-semibold tracking-tight">{edu.title}</h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-content-muted">
                  {edu.detail}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ══ APPROACH — plain prose, no icon circles (theme.md: rounded-full
          is reserved for status pips and the avatar only) ═══════════════ */}
      <Section background="ink">
        <h2 className="border-b border-line pb-5 font-display text-h2 font-semibold leading-tight tracking-tight text-iris-200">
          Approach
        </h2>
        <Reveal className="mt-8 grid gap-10 sm:grid-cols-3">
          {APPROACH.map((a) => (
            <div key={a.label}>
              <p className="font-mono text-micro uppercase tracking-[0.08em] text-iris-400">{a.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-content-muted">{a.text}</p>
            </div>
          ))}
        </Reveal>
      </Section>
    </div>
  );
};

export default About;
