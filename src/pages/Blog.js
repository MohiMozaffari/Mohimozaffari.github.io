import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { getPosts } from "../api/blog";
import LoadingSpinner from "../components/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

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
    <div className="relative z-10 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Research Notes</h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Notes on research progress, papers, and the PhD application process.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="medium" />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-purple-300">No posts yet — check back soon.</p>
          ) : (
            <motion.div variants={itemVariants} className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="block bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 hover:border-purple-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-purple-300 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(post.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-purple-700 text-purple-100 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-purple-400 font-semibold text-sm">
                    Read more <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
