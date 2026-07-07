const express = require('express');
const requireAdmin = require('../middleware/auth');
const ctrl = require('../controllers/projectsController');

const router = express.Router();

router.get('/', ctrl.listPublic);
router.get('/:slug', ctrl.getBySlug);

// Admin
router.get('/admin/all', requireAdmin, ctrl.listAll);
router.post('/admin', requireAdmin, ctrl.create);
router.patch('/admin/:id', requireAdmin, ctrl.update);

module.exports = router;
