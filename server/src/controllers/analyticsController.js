const PageView = require('../models/PageView');

async function record(req, res) {
  const { path } = req.body;
  if (!path) return res.status(400).json({ error: 'path is required' });
  await PageView.create({ path });
  res.status(204).end();
}

async function summary(req, res) {
  const byDay = await PageView.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$ts' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 30 },
  ]);

  const byPath = await PageView.aggregate([
    { $group: { _id: '$path', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);

  res.json({ byDay, byPath });
}

module.exports = { record, summary };
