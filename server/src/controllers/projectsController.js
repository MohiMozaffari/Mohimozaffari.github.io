const Project = require('../models/Project');

async function listPublic(req, res) {
  const projects = await Project.find({ hidden: false }).sort({
    featured: -1,
    'overrides.order': 1,
    stars: -1,
  });
  res.json(projects);
}

async function getBySlug(req, res) {
  const project = await Project.findOne({ slug: req.params.slug, hidden: false });
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
}

async function listAll(req, res) {
  const projects = await Project.find().sort({ featured: -1, 'overrides.order': 1, stars: -1 });
  res.json(projects);
}

async function update(req, res) {
  const { featured, hidden, overrides } = req.body;
  const update = {};
  if (typeof featured === 'boolean') update.featured = featured;
  if (typeof hidden === 'boolean') update.hidden = hidden;
  if (overrides && typeof overrides === 'object') {
    for (const [key, value] of Object.entries(overrides)) {
      update[`overrides.${key}`] = value;
    }
  }

  const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
}

async function create(req, res) {
  const { name, description, htmlUrl, featured, overrides } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  const { slugify } = require('../services/githubSync');
  const project = await Project.create({
    source: 'manual',
    name,
    slug: slugify(name),
    description: description || '',
    htmlUrl: htmlUrl || '',
    featured: !!featured,
    overrides: overrides || {},
  });
  res.status(201).json(project);
}

module.exports = { listPublic, getBySlug, listAll, update, create };
