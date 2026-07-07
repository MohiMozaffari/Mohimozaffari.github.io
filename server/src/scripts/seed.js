require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Project = require('../models/Project');
const { slugify } = require('../services/githubSync');

// One-off seed for content that has no corresponding public GitHub repo (verified via the
// GitHub API — see plan notes). Safe to re-run: upserts by slug, won't duplicate.
async function seed() {
  await connectDB();

  const slug = slugify('Coronary Artery Segmentation');
  const existing = await Project.findOne({ slug });

  if (existing) {
    console.log('Coronary Artery Segmentation project already seeded, skipping.');
  } else {
    await Project.create({
      source: 'manual',
      name: 'Coronary Artery Segmentation',
      slug,
      description:
        'Deep learning approach for coronary artery segmentation in X-ray coronary angiography.',
      htmlUrl: 'https://arxiv.org/abs/2601.17429',
      featured: true,
      overrides: {
        arxivUrl: 'https://arxiv.org/abs/2601.17429',
        publicationStatus: 'preprint',
      },
    });
    console.log('Seeded Coronary Artery Segmentation project.');
  }

  console.log(
    '\nREMINDER: nothing auto-seeds the Network Neuroscience manuscript — log into the admin ' +
      'panel and add it as a Publication ("Persistent Homology Reveals Topological Alterations ' +
      'in Resting-State Brain Networks of Autism Spectrum Disorder", status: under-review).'
  );

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
