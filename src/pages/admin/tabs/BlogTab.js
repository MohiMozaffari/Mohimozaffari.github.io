import React, { useEffect, useState } from 'react';
import { getAllPostsAdmin, createPost, updatePost, deletePost } from '../../../api/blog';
import Button from '../../../components/ui/Button';

const emptyForm = { title: '', body: '', tags: '', published: true };

// Shared with the other admin tabs / the Contact form — the Midnight Iris input.
const inputClasses =
  'w-full rounded-lg border border-line bg-surface-overlay px-4 py-3 text-sm text-content placeholder-content-faint transition-colors focus:border-iris-500 focus:outline-none';

const BlogTab = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const load = () => getAllPostsAdmin().then(setPosts);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
    if (editingId) {
      await updatePost(editingId, payload);
    } else {
      await createPost(payload);
    }
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const startEdit = (post) => {
    setEditingId(post._id);
    setForm({
      title: post.title || '',
      body: post.body || '',
      tags: (post.tags || []).join(', '),
      published: post.published !== false,
    });
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    load();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-3 rounded-xl border border-line bg-surface-raised p-6"
      >
        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClasses}
        />
        <textarea
          placeholder="Body"
          required
          rows={6}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className={inputClasses}
        />
        <input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className={inputClasses}
        />
        <label className="flex items-center gap-2 text-sm text-content-muted">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>
        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary">
            {editingId ? 'Update' : 'Add'} Post
          </Button>
          {editingId && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => { setEditingId(null); setForm(emptyForm); }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-raised p-4"
          >
            <div>
              <p className="font-semibold text-content">{post.title}</p>
              <p className="font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                {post.published ? 'Published' : 'Draft'}
              </p>
            </div>
            <div className="flex shrink-0 gap-4">
              <button
                onClick={() => startEdit(post)}
                className="text-sm font-semibold text-iris-300 transition-colors hover:text-iris-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-sm font-semibold text-coral-400 transition-colors hover:text-coral-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogTab;
