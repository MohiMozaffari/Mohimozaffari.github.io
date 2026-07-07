const BlogPost = require('../models/BlogPost');

function slugify(title) {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-');
}

async function listPublic(req, res) {
  const posts = await BlogPost.find({ published: true }).sort({ date: -1 });
  res.json(posts);
}

async function getBySlug(req, res) {
  const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
}

async function listAll(req, res) {
  const posts = await BlogPost.find().sort({ date: -1 });
  res.json(posts);
}

async function create(req, res) {
  const { title, body, tags, published, date } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'title and body are required' });

  const post = await BlogPost.create({
    title,
    slug: slugify(title),
    body,
    tags: tags || [],
    published: published !== false,
    date: date || Date.now(),
  });
  res.status(201).json(post);
}

async function update(req, res) {
  const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
}

async function remove(req, res) {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
}

module.exports = { listPublic, getBySlug, listAll, create, update, remove };
