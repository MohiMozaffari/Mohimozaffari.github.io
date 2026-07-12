import React, { useEffect, useState } from 'react';
import { RefreshCw, Plus } from 'lucide-react';
import { getAllProjectsAdmin, updateProjectAdmin, createProjectAdmin } from '../../../api/projects';
import { triggerSync } from '../../../api/auth';

const emptyForm = { name: '', description: '', htmlUrl: '', featured: false };

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
      setSyncMessage('Sync failed.');
    } finally {
      setSyncing(false);
    }
  };

  if (loading) return <p className="text-purple-300">Loading projects...</p>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 disabled:opacity-60"
        >
          <RefreshCw className={`mr-2 w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Refresh from GitHub'}
        </button>
        {syncMessage && <span className="text-purple-300 text-sm">{syncMessage}</span>}
        <button
          onClick={() => setShowNewForm((v) => !v)}
          className="ml-auto inline-flex items-center px-4 py-2 bg-purple-900/50 border border-purple-700/50 text-purple-200 font-semibold rounded-lg hover:border-purple-600 transition-all duration-300"
        >
          <Plus className="mr-2 w-4 h-4" /> Add Manual Project
        </button>
      </div>

      {showNewForm && (
        <form onSubmit={handleCreate} className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/50 mb-6 grid sm:grid-cols-2 gap-3">
          <input
            placeholder="Name"
            required
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
          />
          <input
            placeholder="Link (arXiv, external URL, etc.)"
            value={newProject.htmlUrl}
            onChange={(e) => setNewProject({ ...newProject, htmlUrl: e.target.value })}
            className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="sm:col-span-2 bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
          />
          <label className="flex items-center gap-2 text-purple-200 text-sm">
            <input
              type="checkbox"
              checked={newProject.featured}
              onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
            />
            Featured
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">
              Create
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-white font-semibold">{p.name}</span>
                <span className="ml-2 text-xs text-purple-400">{p.source}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-sm text-purple-200">
                  <input
                    type="checkbox"
                    checked={!!p.featured}
                    onChange={() => toggle(p, 'featured')}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-1 text-sm text-purple-200">
                  <input
                    type="checkbox"
                    checked={!!p.hidden}
                    onChange={() => toggle(p, 'hidden')}
                  />
                  Hidden
                </label>
                <button
                  onClick={() => startEditOverrides(p)}
                  className="text-purple-400 hover:text-purple-300 text-sm font-semibold"
                >
                  Edit overrides
                </button>
              </div>
            </div>

            {editingId === p._id && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <input
                  placeholder="arXiv URL"
                  value={overridesDraft.arxivUrl || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, arxivUrl: e.target.value })}
                  className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
                />
                <input
                  placeholder="Zenodo DOI"
                  value={overridesDraft.zenodoDoi || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, zenodoDoi: e.target.value })}
                  className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
                />
                <input
                  placeholder="Custom title"
                  value={overridesDraft.customTitle || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, customTitle: e.target.value })}
                  className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
                />
                <input
                  placeholder="Publication status"
                  value={overridesDraft.publicationStatus || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, publicationStatus: e.target.value })}
                  className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
                />
                <textarea
                  placeholder="Custom description"
                  value={overridesDraft.customDescription || ''}
                  onChange={(e) => setOverridesDraft({ ...overridesDraft, customDescription: e.target.value })}
                  className="sm:col-span-2 bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
                />
                <div className="sm:col-span-2 flex gap-3">
                  <button
                    onClick={() => saveOverrides(p)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 text-purple-300 text-sm"
                  >
                    Cancel
                  </button>
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
