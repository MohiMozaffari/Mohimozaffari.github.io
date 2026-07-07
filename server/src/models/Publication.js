const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: { type: String, default: '' },
    status: {
      type: String,
      enum: ['submitted', 'under-review', 'published'],
      default: 'submitted',
    },
    venue: { type: String, default: '' },
    url: { type: String, default: '' },
    doi: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Publication', publicationSchema);
