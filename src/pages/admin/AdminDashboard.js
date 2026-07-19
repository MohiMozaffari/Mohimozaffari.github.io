import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout } from '../../api/auth';
import ProjectsTab from './tabs/ProjectsTab';
import PublicationsTab from './tabs/PublicationsTab';
import BlogTab from './tabs/BlogTab';
import MessagesTab from './tabs/MessagesTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import ContentTab from './tabs/ContentTab';

const TABS = [
  { key: 'content', label: 'Content', component: ContentTab },
  { key: 'projects', label: 'Projects', component: ProjectsTab },
  { key: 'publications', label: 'Publications', component: PublicationsTab },
  { key: 'blog', label: 'Blog', component: BlogTab },
  { key: 'messages', label: 'Messages', component: MessagesTab },
  { key: 'analytics', label: 'Analytics', component: AnalyticsTab },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();

  const ActiveComponent = TABS.find((t) => t.key === activeTab).component;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="relative z-10 min-h-screen bg-ink">
      <nav className="border-b border-line bg-surface/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-h3 font-semibold tracking-tight text-content">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center text-sm font-semibold text-content-faint transition-colors hover:text-content"
          >
            <LogOut className="mr-1 h-4 w-4" /> Log out
          </button>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'border-iris-500/40 bg-iris-500/10 text-iris-200'
                  : 'border-transparent text-content-muted hover:border-line hover:bg-surface-raised hover:text-content'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <ActiveComponent />
      </main>
    </div>
  );
};

export default AdminDashboard;
