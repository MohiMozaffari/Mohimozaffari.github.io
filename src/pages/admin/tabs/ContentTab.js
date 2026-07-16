import React, { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../../../api/settings';

const FIELDS = [
  { key: 'home_hero_line1', label: 'Home — Hero tagline (line 1)', type: 'input' },
  { key: 'home_hero_line2', label: 'Home — Hero tagline (line 2)', type: 'input' },
  { key: 'home_about_paragraph', label: 'Home — About Me paragraph', type: 'textarea' },
  { key: 'about_intro', label: 'About — Header subtitle', type: 'textarea' },
  { key: 'about_journey_1', label: 'About — My Journey (paragraph 1)', type: 'textarea' },
  { key: 'about_journey_2', label: 'About — My Journey (paragraph 2)', type: 'textarea' },
  { key: 'about_journey_3', label: 'About — My Journey (paragraph 3)', type: 'textarea' },
  { key: 'research_statement', label: 'Research — Research statement', type: 'textarea' },
  { key: 'teaching_intro', label: 'Teaching — Header intro', type: 'textarea' },
  { key: 'contact_intro', label: 'Contact — Header subtitle', type: 'textarea' },
  { key: 'footer_tagline', label: 'Site footer tagline', type: 'input' },
];

const ContentTab = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    getSettings()
      .then(setValues)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => setValues((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateSettings(values);
      setValues(updated);
      setSavedAt(new Date());
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-purple-300">Loading content...</p>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <p className="text-purple-300 text-sm">
        Edit the text that appears across the public site. Changes go live as soon as you save.
      </p>

      {FIELDS.map((field) => (
        <div key={field.key} className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/50">
          <label className="block text-white font-semibold text-sm mb-2">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              rows={3}
              value={values[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
            />
          ) : (
            <input
              value={values[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full bg-purple-950/50 border border-purple-700/50 rounded-lg px-3 py-2 text-white text-sm"
            />
          )}
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {savedAt && (
          <span className="text-green-400 text-sm">Saved at {savedAt.toLocaleTimeString()}</span>
        )}
      </div>
    </form>
  );
};

export default ContentTab;
