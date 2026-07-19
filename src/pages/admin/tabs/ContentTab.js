import React, { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../../../api/settings';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const FIELDS = [
  { key: 'home_hero_line1', label: 'Home — Hero tagline (line 1)', type: 'input' },
  { key: 'home_hero_line2', label: 'Home — Hero tagline (line 2)', type: 'input' },
  { key: 'home_about_paragraph', label: 'Home — About Me paragraph', type: 'textarea' },
  { key: 'about_intro', label: 'About — Header subtitle', type: 'textarea' },
  { key: 'about_journey_1', label: 'About — My Journey (paragraph 1)', type: 'textarea' },
  { key: 'about_journey_2', label: 'About — My Journey (paragraph 2)', type: 'textarea' },
  { key: 'about_journey_3', label: 'About — My Journey (paragraph 3)', type: 'textarea' },
  { key: 'research_statement', label: 'Research — Research statement', type: 'textarea' },
  {
    key: 'research_focus',
    label: 'Research — Focus areas (one per line, "Title — detail")',
    type: 'textarea',
  },
  { key: 'teaching_intro', label: 'Teaching — Header intro', type: 'textarea' },
  {
    key: 'booking_url',
    label: 'Teaching — "Book a session" link (Google Appointment Schedule or Cal.com URL)',
    type: 'input',
  },
  { key: 'contact_intro', label: 'Contact — Header subtitle', type: 'textarea' },
  { key: 'footer_tagline', label: 'Site footer tagline', type: 'input' },
];

const inputClasses =
  'w-full rounded-lg border border-line bg-surface-overlay px-4 py-3 text-sm text-content placeholder-content-faint transition-colors focus:border-iris-500 focus:outline-none';

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

  if (loading) return <p className="text-content-faint">Loading content...</p>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <p className="text-sm text-content-muted">
        Edit the text that appears across the public site. Changes go live as soon as you save.
      </p>

      {FIELDS.map((field) => (
        <Card key={field.key} padding="md" radius="xl" interactive={false}>
          <label className="mb-2 block font-mono text-micro uppercase tracking-[0.08em] text-content-faint">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              rows={3}
              value={values[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className={inputClasses}
            />
          ) : (
            <input
              value={values[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className={inputClasses}
            />
          )}
        </Card>
      ))}

      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary" disabled={saving} className="disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
        {savedAt && (
          <span className="text-sm font-medium text-mint-400">
            Saved at {savedAt.toLocaleTimeString()}
          </span>
        )}
      </div>
    </form>
  );
};

export default ContentTab;
