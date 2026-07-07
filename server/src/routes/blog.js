const express = require('express');
const requireAdmin = require('../middleware/auth');
const ctrl = require('../controllers/blogController');

const router = express.Router();

router.get('/', ctrl.listPublic);
router.get('/admin/all', requireAdmin, ctrl.listAll);
router.get('/:slug', ctrl.getBySlug);
router.post('/', requireAdmin, ctrl.create);
router.patch('/:id', requireAdmin, ctrl.update);
router.delete('/:id', requireAdmin, ctrl.remove);

module.exports = router;
