import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { getPosts } from "../api/blog";
import LoadingSpinner from "../components/LoadingSpinner";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative z-10">
      {/* ══ PAGE HEADER ═══════════════════════════════════════════════════ */}
      <Section background="surface" border="bottom" maxWidth="max-w-7xl" padY="pb-14 pt-16">
        <Reveal>
          <PageHeader
            size="lg"
            maxWidth="max-w-2xl"
            description="Notes on research progress, papers, and the PhD application process."
          >
            Blog
          </PageHeader>
        </Reveal>
      </Section>

      {/* ══ POSTS ═════════════════════════════════════════════════════════ */}
      <Section background="ink" maxWidth="max-w-7xl">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="medium" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-content-muted">No posts yet &mdash; check back soon.</p>
        ) : (
          <Reveal className="space-y-4">
            {posts.map((post) => (
              <Link key={post._id} to={`/blog/${post.slug}`} className="block">
                <Card radius="lg" padding="lg">
                  <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-content">
                    {post.title}
                  </h2>
                  {(post.tags || []).length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(post.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-line px-2 py-1 font-mono text-micro uppercase tracking-[0.08em] text-content-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="link mt-4 inline-block text-sm font-medium">Read more →</span>
                </Card>
              </Link>
            ))}
          </Reveal>
        )}
      </Section>
    </div>
  );
}
