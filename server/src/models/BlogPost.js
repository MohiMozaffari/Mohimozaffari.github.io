const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    body: { type: String, required: true },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', blogPostSchema);
