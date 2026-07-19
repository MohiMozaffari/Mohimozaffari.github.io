-- REMOTE-SAFE VERSION: excludes the Network Neuroscience publication already live in prod.
-- Adds the 3 remaining verified publications from the CV repo's publications.md.
-- Run once only - no unique constraint on title, so re-running duplicates rows.
-- After running successfully, delete this file (its content is preserved in server/seed.sql,
-- which is the full/local-dev version - this trimmed one is a one-time hand-off only).

INSERT INTO publications (title, authors, status, venue, url, doi, description, order_num)
VALUES ('Nonlinear optical response of IMIP ionic liquid-stabilized magnetic graphene oxide sheets', 'Mohammadi, M.S., Shahrokhi, S., Mozaffari, M., et al.', 'published', 'Journal of Materials Science: Materials in Electronics', 'https://doi.org/10.1007/s10854-022-08262-1', '10.1007/s10854-022-08262-1', 'Journal of Materials Science: Materials in Electronics, 33, 13224-13233 (2022). Co-authored; Mozaffari is a co-author, not first or senior author.', 4);

INSERT INTO publications (title, authors, status, venue, url, doi, description, order_num)
VALUES ('Automated Noninvasive FFR Estimation from Biplane Coronary Angiography Using a Transformer-Based Deep Learning Framework', 'Yousefzadeh, M., Shirzadeh Barough, S., Fakharifar, A., Mozaffari, M., Eghbali, N., Taeb, H., Tayyarazad, Y.', 'presentation', '2nd National Meeting on Artificial Intelligence in Medical Imaging (Oral Presentation), Rajaee Heart Institute, Tehran, Iran', '', '', 'Accepted for oral presentation, 11-13 June 2025. Co-authored transformer-based deep learning framework for FFR estimation from biplane coronary angiography.', 3);

INSERT INTO publications (title, authors, status, venue, url, doi, description, order_num)
VALUES ('Coronary Artery Segmentation and Vessel-Type Classification in X-Ray Angiography: Machine-Learning Generalized Image Processing and Deep Neural Networks', 'Yousefzadeh, M., Shirzadeh Barough, S., Fakharifar, A., Tayyarazad, Y., Eghbali, N., Mozaffari, M., et al.', 'preprint', 'arXiv', 'https://arxiv.org/abs/2601.17429', '', 'Preprint. Contributed to the deep-learning segmentation and vessel-type classification pipeline, including DICOM processing and data augmentation.', 2);



-- Seed 3 real research-notes blog posts (Task 4 nice-to-have).

INSERT INTO blog_posts (title, slug, date, body, tags, published)
VALUES ('What persistent homology found in autism spectrum disorder brain networks', 'persistent-homology-asd-brain-networks', '2026-07-16T09:00:00.000Z', 'My master''s thesis, "Analysis of Topological Features of Brain Networks in Autism Spectrum Disorder Using Persistent Homology," asked a simple question in a nonstandard way: instead of comparing brain connectivity matrices directly, what happens if you compare their topology?

Working with resting-state fMRI data under Prof. G. Reza Jafari at Shahid Beheshti University, I applied persistent homology to detect topological differences between autism spectrum disorder (ASD) and control brain networks. Rather than relying on a single fixed connectivity threshold, I developed a node-removal-based approach that tracks how a network''s topological features change as nodes are progressively removed. I also looked at how these topological differences vary with age, since brain network organization changes across development.

The thesis was graded Outstanding and defended in March 2025, and I ranked 2nd in my cohort. A manuscript based on this work, "Persistent Homology Reveals Topological Alterations in Resting-State Brain Networks of Autism Spectrum Disorder," is now under review at Network Neuroscience.

I also released the analysis pipeline behind this work as an open-source package, NeuroPHorm, so other researchers working with TDA and brain networks don''t have to start from scratch. More on that in a separate post.', '["research","neuroscience","phd-applications"]', 1);

INSERT INTO blog_posts (title, slug, date, body, tags, published)
VALUES ('Releasing NeuroPHorm: an open-source toolkit for topological data analysis of brain networks', 'releasing-neurophorm', '2026-07-16T10:00:00.000Z', 'I recently released NeuroPHorm, an open-source Python package for topological data analysis (TDA) of brain networks, with a DOI on Zenodo (10.5281/zenodo.17542598).

NeuroPHorm packages the pipeline I built during my master''s thesis on autism spectrum disorder (ASD) brain networks: correlation-to-distance transforms, persistent homology, Betti curves, persistence entropy, and Wasserstein/bottleneck distances. Instead of leaving that pipeline as one-off scripts, I turned it into a documented, reusable library so other researchers working with fMRI and TDA don''t have to rebuild the same tooling from scratch.

The core idea behind TDA in this context: instead of asking "which brain regions are connected," persistent homology asks "what shapes appear in a network''s structure as you vary a connectivity threshold, and how long do they persist?" That gives a description of network topology that''s more robust to noise and threshold choice than a single connectivity matrix.

NeuroPHorm is on GitHub (github.com/MohiMozaffari/NeuroPHorm) and Zenodo. If you''re working with fMRI connectivity data and want to try a TDA approach, I''d be glad to hear from you.', '["research","open-source","neuroscience"]', 1);

INSERT INTO blog_posts (title, slug, date, body, tags, published)
VALUES ('Machine learning for coronary angiography: segmentation, classification, and an oral presentation', 'ml-coronary-angiography', '2026-07-16T11:00:00.000Z', 'Alongside my work on brain networks, I''ve spent the past couple of years contributing to a medical imaging project with CCNet and the Rajaee Heart Institute in Tehran: using deep learning to analyze coronary X-ray angiography.

I contributed to a coronary artery segmentation and vessel-type classification pipeline, working with DICOM file processing and developing custom data augmentation techniques for the training data. That work is now a preprint, "Coronary Artery Segmentation and Vessel-Type Classification in X-Ray Angiography: Machine-Learning Generalized Image Processing and Deep Neural Networks" (arXiv:2601.17429).

I also co-authored a related paper on a transformer-based deep learning framework for automated, noninvasive FFR (fractional flow reserve) estimation from biplane coronary angiography, presented orally at the 2nd National Meeting on Artificial Intelligence in Medical Imaging at Rajaee Heart Institute.

This was a team effort under Prof. G. Reza Jafari''s supervision, and it''s shaped how I think about applying deep learning to noisy, high-stakes medical imaging data - a perspective I bring back to my brain-network work.', '["research","ml","conference"]', 1);
