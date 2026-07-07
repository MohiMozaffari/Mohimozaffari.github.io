const Publication = require('../models/Publication');

async function list(req, res) {
  const publications = await Publication.find().sort({ order: 1, createdAt: -1 });
  res.json(publications);
}

async function create(req, res) {
  const publication = await Publication.create(req.body);
  res.status(201).json(publication);
}

async function update(req, res) {
  const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!publication) return res.status(404).json({ error: 'Not found' });
  res.json(publication);
}

async function remove(req, res) {
  const publication = await Publication.findByIdAndDelete(req.params.id);
  if (!publication) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
}

module.exports = { list, create, update, remove };
