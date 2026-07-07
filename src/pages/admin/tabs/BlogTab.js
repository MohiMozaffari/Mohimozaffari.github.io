import React, { useEffect, useState } from 'react';
import { getAllPostsAdmin, createPost, updatePost, deletePost } from '../../../api/blog';

const emptyForm = { title: '', body: '', tags: '', published: true };

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
      <form onSubmit={handleSubmit} className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 mb-8 space-y-3">
        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        />
        <textarea
          placeholder="Body"
          required
          rows={6}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="w-full bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        />
        <input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        />
        <label className="flex items-center gap-2 text-purple-200 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>
        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">
            {editingId ? 'Update' : 'Add'} Post
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="px-4 py-2 text-purple-300 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post._id} className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/50 flex items-center justify-between gap-3">
            <div>
              <p className="text-white font-semibold">{post.title}</p>
              <p className="text-purple-400 text-xs">{post.published ? 'Published' : 'Draft'}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => startEdit(post)} className="text-purple-400 hover:text-purple-300 text-sm font-semibold">Edit</button>
              <button onClick={() => handleDelete(post._id)} className="text-red-400 hover:text-red-300 text-sm font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogTab;
