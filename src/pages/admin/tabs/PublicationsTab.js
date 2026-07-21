import React, { useEffect, useState } from 'react';
import { getPublications, createPublication, updatePublication, deletePublication } from '../../../api/publications';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const emptyForm = { title: '', authors: '', status: 'submitted', venue: '', url: '', doi: '', description: '' };

const inputClasses =
  'rounded-lg border border-line bg-surface-overlay px-4 py-3 text-sm text-content placeholder-content-faint transition-colors focus:border-iris-500 focus:outline-none';

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
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-3 rounded-xl border border-line bg-surface-raised p-6 sm:grid-cols-2"
      >
        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={`sm:col-span-2 ${inputClasses}`}
        />
        <input
          placeholder="Authors"
          value={form.authors}
          onChange={(e) => setForm({ ...form, authors: e.target.value })}
          className={inputClasses}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className={inputClasses}
        >
          {/* Must stay in sync with STATUS_CONFIG in src/components/ui/Badge.jsx.
              "preprint" was previously missing here even though the DB used it,
              so preprints could not be set from the admin at all. */}
          <option value="submitted">Submitted</option>
          <option value="under-review">Under Review</option>
          <option value="preprint">Preprint</option>
          <option value="published">Published</option>
          <option value="presentation">Oral Presentation (conference)</option>
        </select>
        <input
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
          className={inputClasses}
        />
        <input
          placeholder="URL"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className={inputClasses}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`sm:col-span-2 ${inputClasses}`}
        />
        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit" variant="primary">
            {editingId ? 'Update' : 'Add'} Publication
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
        {publications.map((pub) => (
          <div
            key={pub._id}
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-raised p-4"
          >
            <div className="min-w-0">
              <p className="font-semibold text-content">{pub.title}</p>
              <Badge status={pub.status} className="mt-2" />
            </div>
            <div className="flex shrink-0 gap-4">
              <button
                onClick={() => startEdit(pub)}
                className="text-sm font-semibold text-iris-300 transition-colors hover:text-iris-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pub._id)}
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

export default PublicationsTab;
