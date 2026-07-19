import React, { useState } from "react";
import { Mail, Linkedin, Send, Loader2, CheckCircle2, Calendar } from "lucide-react";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import { sendContactMessage } from "../api/contact";
import useSiteSettings from "../hooks/useSiteSettings";

const PUBLIC_EMAIL = "mohaddeseh.mozaffarii@gmail.com";

const Contact = () => {
  const settings = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // booking_url dependency (design/ia-spec.md): link out when set, fall back
  // to mailto when empty — never a dead "#" link. Same pattern as Teaching.js.
  const bookingUrl = settings.booking_url;
  const bookingHref = bookingUrl || `mailto:${PUBLIC_EMAIL}`;
  const bookingExternalProps = bookingUrl ? { target: "_blank", rel: "noopener noreferrer" } : {};

  const contacts = [
    {
      icon: Mail,
      title: "Email",
      action: PUBLIC_EMAIL,
      link: `mailto:${PUBLIC_EMAIL}`,
      external: {},
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      action: "@mohimozaffari",
      link: "https://www.linkedin.com/in/mohimozaffari",
      external: { target: "_blank", rel: "noopener noreferrer" },
    },
    {
      icon: Send,
      title: "Telegram",
      action: "@mohimozaffari",
      link: "https://t.me/mohimozaffari",
      external: { target: "_blank", rel: "noopener noreferrer" },
    },
    {
      icon: Calendar,
      title: "Book a call",
      action: bookingUrl ? "Schedule online →" : "Email to schedule →",
      link: bookingHref,
      external: bookingExternalProps,
      accent: true,
    },
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const inputClasses =
    "rounded-lg border border-line bg-surface-overlay px-4 py-3 text-sm text-content placeholder-content-faint transition-colors focus:border-iris-500 focus:outline-none";

  return (
    <div className="relative z-10">
      {/* ══ PAGE HEADER — subordinate register, no mesh/motif ═══════════ */}
      <Section background="surface" border="bottom" maxWidth="max-w-7xl" padY="pb-14 pt-16">
        <Reveal>
          <PageHeader size="lg" maxWidth="max-w-2xl" description={settings.contact_intro}>
            Get in touch
          </PageHeader>
        </Reveal>
      </Section>

      {/* ══ FORM + WAYS TO REACH ME — side by side so the page uses its width
             instead of a narrow centred strip with dead space either side ══ */}
      <Section background="ink" maxWidth="max-w-7xl">
        {/* Equal columns + matching panel styling on both sides: a 7/5 split with
            a bare list on the right read as lopsided. Both are now the same card. */}
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col rounded-xl border border-line bg-surface-raised p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={inputClasses}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            {/* flex-1 so the message field absorbs the panel's leftover height
                instead of leaving dead space under a fixed 5-row box. */}
            <textarea
              name="message"
              required
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              className={`mt-4 w-full flex-1 resize-none ${inputClasses}`}
            />

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Button type="submit" variant="primary" disabled={status === "sending"}>
                {status === "sending" ? (
                  <span className="inline-flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending&hellip;
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    Send message <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>

              {status === "sent" && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-mint-400">
                  <CheckCircle2 className="h-4 w-4" /> Message sent, thank you.
                </span>
              )}
              {status === "error" && (
                <span className="text-sm font-medium text-coral-400">
                  Something went wrong &mdash; please try again or email me directly.
                </span>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal index={1} className="h-full">
          {/* Matches the form panel exactly. Icons sit inline rather than in
              bordered boxes, which read as clunky chips against the flat card. */}
          <div className="flex h-full flex-col rounded-xl border border-line bg-surface-raised p-7">
            <h2 className="font-display text-h3 font-semibold tracking-tight text-iris-200">
              Other ways to reach me
            </h2>

            <ul className="mt-2 flex flex-col divide-y divide-line">
              {contacts.map(({ icon: Icon, title, action, link, external, accent }) => (
                <li key={title} className="flex-1">
                  <a
                    href={link}
                    {...external}
                    className="group flex h-full items-center gap-4 py-4"
                  >
                    <Icon
                      className={`h-5 w-5 shrink-0 transition-colors ${
                        accent
                          ? "text-coral-400"
                          : "text-content-faint group-hover:text-iris-300"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-sm font-medium transition-colors ${
                          accent ? "text-coral-300" : "text-content group-hover:text-iris-200"
                        }`}
                      >
                        {title}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-caption text-content-faint">
                        {action}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-content-faint transition-transform group-hover:translate-x-0.5 group-hover:text-iris-300"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
