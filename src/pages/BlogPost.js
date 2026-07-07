import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPost } from "../api/blog";
import LoadingSpinner from "../components/LoadingSpinner";

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
      <div className="relative z-10 py-20 flex justify-center">
        <LoadingSpinner size="medium" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <Link to="/blog" className="inline-flex items-center text-purple-400 hover:text-purple-300">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Research Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/blog" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Research Notes
          </Link>

          <div className="flex items-center gap-2 text-purple-300 text-sm mb-3">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {(post.tags || []).map((tag) => (
              <span key={tag} className="text-xs bg-purple-700 text-purple-100 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50">
            <p className="text-purple-100 leading-relaxed whitespace-pre-line">{post.body}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
