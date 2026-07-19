import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPost } from "../api/blog";
import LoadingSpinner from "../components/LoadingSpinner";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getPost(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="relative z-10 flex justify-center py-20">
        <LoadingSpinner size="medium" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-content">Post not found</h2>
          <Link to="/blog" className="link mt-4 inline-flex items-center text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to research notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <Section background="ink" maxWidth="max-w-3xl">
        <Reveal>
          <Link to="/blog" className="link mb-8 inline-flex items-center text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to research notes
          </Link>

          <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-content sm:text-4xl">
            {post.title}
          </h1>

          {(post.tags || []).length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
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

          <Card radius="xl" padding="lg" raise interactive={false} className="mt-8">
            <p className="whitespace-pre-line text-base leading-relaxed text-content-muted">
              {post.body}
            </p>
          </Card>
        </Reveal>
      </Section>
    </div>
  );
}
