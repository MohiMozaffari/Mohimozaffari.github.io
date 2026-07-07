const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    source: { type: String, enum: ['github', 'manual'], default: 'github' },

    // GitHub-sourced (upserted by sync; ignored for source:'manual')
    repoId: { type: Number, index: true, sparse: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    htmlUrl: { type: String, default: '' },
    topics: { type: [String], default: [] },
    language: { type: String, default: '' },
    stars: { type: Number, default: 0 },
    forksCount: { type: Number, default: 0 },
    readmeExcerpt: { type: String, default: '' },
    pushedAt: { type: Date },
    ghCreatedAt: { type: Date },
    ghUpdatedAt: { type: Date },
    lastSyncedAt: { type: Date },

    // Curation (set via admin, never overwritten by sync)
    featured: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    overrides: {
      arxivUrl: { type: String, default: '' },
      zenodoDoi: { type: String, default: '' },
      publicationStatus: { type: String, default: '' },
      customTitle: { type: String, default: '' },
      customDescription: { type: String, default: '' },
      order: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
