import React, { useEffect, useState } from 'react';
import { getAnalyticsSummary } from '../../../api/analytics';
import Card from '../../../components/ui/Card';

const AnalyticsTab = () => {
  const [summary, setSummary] = useState({ byDay: [], byPath: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-content-faint">Loading analytics...</p>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card padding="lg" radius="xl" interactive={false}>
        <h3 className="mb-4 font-display text-h3 font-semibold tracking-tight text-iris-200">
          Views by day (last 30)
        </h3>
        <div className="space-y-2">
          {summary.byDay.map((d) => (
            <div key={d._id} className="flex items-center justify-between text-sm">
              <span className="text-content-muted">{d._id}</span>
              <span className="tnum font-semibold text-content">{d.count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="lg" radius="xl" interactive={false}>
        <h3 className="mb-4 font-display text-h3 font-semibold tracking-tight text-iris-200">
          Top pages
        </h3>
        <div className="space-y-2">
          {summary.byPath.map((p) => (
            <div key={p._id} className="flex items-center justify-between text-sm">
              <span className="text-content-muted">{p._id}</span>
              <span className="tnum font-semibold text-content">{p.count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
