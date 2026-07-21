import React, { useEffect, useState } from 'react';
import { RefreshCw, Plus } from 'lucide-react';
import { getAllProjectsAdmin, updateProjectAdmin, createProjectAdmin } from '../../../api/projects';
import { triggerSync } from '../../../api/auth';
import Button from '../../../components/ui/Button';

const emptyForm = { name: '', description: '', htmlUrl: '', featured: false };

const inputClasses =
  'rounded-lg border border-line bg-surface-overlay px-4 py-3 text-sm text-content placeholder-content-faint transition-colors focus:border-iris-500 focus:outline-none';

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [overridesDraft, setOverridesDraft] = useState({});
  const [newProject, setNewProject] = useState(emptyForm);
  const [showNewForm, setShowNewForm] = useState(false);

  const load = () => {
    setLoading(true);
    getAllProjectsAdmin()
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    const created = await createProjectAdmin(newProject);
    setProjects((prev) => [created, ...prev]);
    setNewProject(emptyForm);
    setShowNewForm(false);
  };

  const toggle = async (project, field) => {
    const updated = await updateProjectAdmin(project._id, { [field]: !project[field] });
    setProjects((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
  };

  const startEditOverrides = (project) => {
    setEditingId(project._id);
    setOverridesDraft(project.overrides || {});
  };

  const saveOverrides = async (project) => {
    const updated = await updateProjectAdmin(project._id, { overrides: overridesDraft });
    setProjects((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    setEditingId(null);
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const result = await triggerSync();
      setSyncMessage(`Synced: ${result.created} new, ${result.updated} updated, ${result.total} total repos.`);
      load();
    } catch (err) {
      // Surface the worker's actual reason (missing/expired GITHUB_TOKEN, rate
      // limit, expired admin JWT). A bare "Sync failed." leaves no way to debug.
      const res = err?.response;
      const detail = res?.data?.detail || res?.data?.error || err?.message || 'Unknown error';
      const status = res?.status ? ` (HTTP ${res.status})` : '';
      setSyncMessage(`Sync failed${status}: ${detail}`);
    } finally {
      setSyncing(false);
    }
  };

  if (loading) return <p className="text-content-faint">Loading projects...</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Button onClick={handleSync} variant="primary" disabled={syncing}>
          <span className="inline-flex items-center">
            <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Refresh from GitHub'}
          </span>
        </Button>
        {syncMessage && <span className="text-sm text-content-muted">{syncMessage}</span>}
        <Button onClick={() => setShowNewForm((v) => !v)} variant="secondary" className="ml-auto">
          <span className="inline-flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add Manual Project
          </span>
        </Button>
      </div>

      {showNewForm && (
        <form
          onSubmit={handleCreate}
          className="mb-6 grid gap-3 rounded-xl border border-line bg-surface-raised p-4 sm:grid-cols-2"
        >
          <input
            placeholder="Name"
            required
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className={inputClasses}
          />
          <input
            placeholder="Link (arXiv, external URL, etc.)"
            value={newProject.htmlUrl}
            onChange={(e) => setNewProject({ ...newProject, htmlUrl: e.target.value })}
            className={inputClasses}
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className={`sm:col-span-2 ${inputClasses}`}
          />
          <label className="flex items-center gap-2 text-sm text-content-muted">
            <input
              type="checkbox"
              checked={newProject.featured}
              onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
            />
            Featured
          </label>
          <div className="sm:col-span-2">
            <Button type="submit" variant="primary">
              Create
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="rounded-xl border border-line bg-surface-raised p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-content">{p.name}</span>
                <span className="ml-2 font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
                  {p.source}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-sm text-content-muted">
                  <input
                    type="checkbox"
                    checked={!!p.featured}
                    onChange={() => toggle(p, 'featured')}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-1 text-sm text-content-muted">
                  <input
                    type="checkbox"
                    checked={!!p.hidden}
                    onChange={() => toggle(p, 'hidden')}
                  />
                  Hidden
                </label>
                <button
                  onClick={() => startEditOverrides(p)}
                  className="text-sm font-semibold text-iris-300 transition-colors hover:text-iris-200"
                >
                  Edit overrides
                </button>
              </div>
            </div>

            {editingId === p._id && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="arXiv URL"
                  value={overridesDraft.arxivUrl || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, arxivUrl: e.target.value })}
                  className={inputClasses}
                />
                <input
                  placeholder="Zenodo DOI"
                  value={overridesDraft.zenodoDoi || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, zenodoDoi: e.target.value })}
                  className={inputClasses}
                />
                <input
                  placeholder="Custom title"
                  value={overridesDraft.customTitle || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, customTitle: e.target.value })}
                  className={inputClasses}
                />
                <input
                  placeholder="Publication status"
                  value={overridesDraft.publicationStatus || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, publicationStatus: e.target.value })}
                  className={inputClasses}
                />
                <textarea
                  placeholder="Custom description"
                  value={overridesDraft.customDescription || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, customDescription: e.target.value })}
                  className={`sm:col-span-2 ${inputClasses}`}
                />
                <div className="flex gap-3 sm:col-span-2">
                  <Button onClick={() => saveOverrides(p)} variant="primary">
                    Save
                  </Button>
                  <Button onClick={() => setEditingId(null)} variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
