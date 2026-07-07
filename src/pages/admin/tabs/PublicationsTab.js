import React, { useEffect, useState } from 'react';
import { getPublications, createPublication, updatePublication, deletePublication } from '../../../api/publications';

const emptyForm = { title: '', authors: '', status: 'submitted', venue: '', url: '', doi: '', description: '' };

const PublicationsTab = () => {
  const [publications, setPublications] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const load = () => getPublications().then(setPublications);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePublication(editingId, form);
    } else {
      await createPublication(form);
    }
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const startEdit = (pub) => {
    setEditingId(pub._id);
    setForm({
      title: pub.title || '',
      authors: pub.authors || '',
      status: pub.status || 'submitted',
      venue: pub.venue || '',
      url: pub.url || '',
      doi: pub.doi || '',
      description: pub.description || '',
    });
  };

  const handleDelete = async (id) => {
    await deletePublication(id);
    load();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 mb-8 grid sm:grid-cols-2 gap-3">
        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="sm:col-span-2 bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        />
        <input
          placeholder="Authors"
          value={form.authors}
          onChange={(e) => setForm({ ...form, authors: e.target.value })}
          className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        >
          <option value="submitted">Submitted</option>
          <option value="under-review">Under Review</option>
          <option value="published">Published</option>
        </select>
        <input
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
          className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        />
        <input
          placeholder="URL"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="sm:col-span-2 bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
        />
        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">
            {editingId ? 'Update' : 'Add'} Publication
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="px-4 py-2 text-purple-300 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {publications.map((pub) => (
          <div key={pub._id} className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/50 flex items-center justify-between gap-3">
            <div>
              <p className="text-white font-semibold">{pub.title}</p>
              <p className="text-purple-400 text-xs">{pub.status}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => startEdit(pub)} className="text-purple-400 hover:text-purple-300 text-sm font-semibold">Edit</button>
              <button onClick={() => handleDelete(pub._id)} className="text-red-400 hover:text-red-300 text-sm font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationsTab;
