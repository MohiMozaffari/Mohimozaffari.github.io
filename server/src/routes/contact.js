const express = require('express');
const requireAdmin = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiters');
const ctrl = require('../controllers/contactController');

const router = express.Router();

router.post('/', contactLimiter, ctrl.create);
router.get('/admin/all', requireAdmin, ctrl.list);
router.patch('/admin/:id/read', requireAdmin, ctrl.markRead);

module.exports = router;
