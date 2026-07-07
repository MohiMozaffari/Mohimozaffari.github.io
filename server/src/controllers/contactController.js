const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../services/emailService');

async function create(req, res) {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }

  const saved = await ContactMessage.create({ name, email, message });

  try {
    await sendContactNotification({ name, email, message });
  } catch (err) {
    console.error('Failed to send contact notification email:', err.message);
  }

  res.status(201).json({ id: saved._id });
}

async function list(req, res) {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
}

async function markRead(req, res) {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!message) return res.status(404).json({ error: 'Not found' });
  res.json(message);
}

module.exports = { create, list, markRead };
