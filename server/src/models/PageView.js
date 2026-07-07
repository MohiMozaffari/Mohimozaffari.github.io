const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  path: { type: String, required: true },
  ts: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('PageView', pageViewSchema);
