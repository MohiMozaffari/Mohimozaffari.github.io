import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useSiteSettings from '../hooks/useSiteSettings';

// Midnight Iris design system (design/theme.md, PROMPT.md Part A; IA per
// design/ia-spec.md B1). Research/Projects/About lead the nav; Teaching,
// Blog, Contact sit behind an "Also" divider in a visibly subordinate
// register. The wordmark is the Home link — no separate "Home" text item.

const PRIMARY_NAV_ITEMS = [
  // `lead: true` keeps Research at full text-content brightness (vs. the
  // muted default for Projects/About) even when it isn't the active page —
  // this is the "Research reads as the lead" hierarchy from B1, not just an
  // active-state effect.
  { name: 'Research', path: '/research', lead: true },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
];

const SECONDARY_NAV_ITEMS = [
  { name: 'Teaching', path: '/teaching' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const CV_HREF = `${process.env.PUBLIC_URL}/CV.pdf`;

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const settings = useSiteSettings();

  const primaryLinkClasses = (item) => {
    const isActive = location.pathname === item.path;
    if (isActive) return 'font-medium text-iris-300';
    return item.lead
      ? 'font-medium text-content transition-colors hover:text-iris-300'
      : 'font-medium text-content-muted transition-colors hover:text-iris-300';
  };

  const secondaryLinkClasses = (item) => {
    const isActive = location.pathname === item.path;
    return isActive
      ? 'text-caption text-content-muted underline decoration-line-strong underline-offset-4'
      : 'text-caption text-content-faint transition-colors hover:text-content-muted';
  };

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          {/* Wordmark is set in the sans, not the display serif: Fraunces at nav
              size (20px) rendered with the display optical size (opsz 144) has
              hairline-thin strokes and is hard to read. Her name must be instantly
              legible, so UI/nav uses the sans and content headings keep the serif. */}
          <Link
            to="/"
            className="mr-auto font-sans text-xl font-semibold tracking-[-0.01em] text-content"
          >
            Mohaddeseh Mozaffari
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 text-sm md:flex">
            {PRIMARY_NAV_ITEMS.map((item) => (
              <Link key={item.name} to={item.path} className={primaryLinkClasses(item)}>
                {item.name}
              </Link>
            ))}

            {/* the "Also" divider: Teaching/Blog/Contact are visibly subordinate */}
            <span className="ml-1 h-4 w-px bg-line-strong" aria-hidden="true" />
            <span className="font-mono text-micro uppercase tracking-[0.14em] text-content-faint">
              Also
            </span>
            {SECONDARY_NAV_ITEMS.map((item) => (
              <Link key={item.name} to={item.path} className={secondaryLinkClasses(item)}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* persistent chrome, per CLAUDE.md */}
          <a
            href={CV_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md border border-line-strong bg-surface-raised px-3.5 py-2 font-mono text-micro uppercase tracking-[0.1em] text-content transition-colors hover:border-iris-500 hover:text-iris-200 md:inline-block"
          >
            CV ↓
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-md p-2 text-content-muted transition-colors hover:text-content md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="border-t border-line bg-ink/95 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-1 px-6 py-4">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-md px-2 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-iris-300' : 'text-content hover:text-iris-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="mt-2 flex items-center gap-3 px-2">
                <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
                <span className="font-mono text-micro uppercase tracking-[0.14em] text-content-faint">
                  Also
                </span>
              </div>

              {SECONDARY_NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-md px-2 py-2 text-caption transition-colors ${
                      isActive
                        ? 'text-content-muted underline decoration-line-strong underline-offset-4'
                        : 'text-content-faint hover:text-content-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <a
                href={CV_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 inline-block rounded-md border border-line-strong bg-surface-raised px-3.5 py-2 text-center font-mono text-micro uppercase tracking-[0.1em] text-content transition-colors hover:border-iris-500 hover:text-iris-200"
              >
                CV ↓
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <footer className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="h-px w-24 rule-orchid" />
          <p className="mt-5 font-mono text-micro text-content-faint">
            mohaddeseh.mozaffarii@gmail.com &middot; github.com/MohiMozaffari &middot;{' '}
            linkedin.com/in/mohimozaffari
          </p>
          {settings.footer_tagline && (
            <p className="mt-2 font-mono text-micro text-content-faint/80">
              {settings.footer_tagline}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
