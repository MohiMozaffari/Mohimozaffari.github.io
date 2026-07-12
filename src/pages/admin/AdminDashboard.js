import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout } from '../../api/auth';
import ProjectsTab from './tabs/ProjectsTab';
import PublicationsTab from './tabs/PublicationsTab';
import BlogTab from './tabs/BlogTab';
import MessagesTab from './tabs/MessagesTab';
import AnalyticsTab from './tabs/AnalyticsTab';

const TABS = [
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
    <div className="relative z-10 min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950">
      <nav className="bg-purple-950/90 backdrop-blur-sm border-b border-purple-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center text-purple-300 hover:text-white text-sm font-semibold"
          >
            <LogOut className="mr-1 w-4 h-4" /> Log out
          </button>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 pb-3 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-200 hover:bg-purple-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActiveComponent />
      </main>
    </div>
  );
};

export default AdminDashboard;
