import React, { useEffect, useState } from 'react';
import { getAnalyticsSummary } from '../../../api/analytics';

const AnalyticsTab = () => {
  const [summary, setSummary] = useState({ byDay: [], byPath: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-purple-300">Loading analytics...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50">
        <h3 className="text-lg font-bold text-white mb-4">Views by day (last 30)</h3>
        <div className="space-y-2">
          {summary.byDay.map((d) => (
            <div key={d._id} className="flex items-center justify-between text-sm">
              <span className="text-purple-300">{d._id}</span>
              <span className="text-white font-semibold">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50">
        <h3 className="text-lg font-bold text-white mb-4">Top pages</h3>
        <div className="space-y-2">
          {summary.byPath.map((p) => (
            <div key={p._id} className="flex items-center justify-between text-sm">
              <span className="text-purple-300">{p._id}</span>
              <span className="text-white font-semibold">{p.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
