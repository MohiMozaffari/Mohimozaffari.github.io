const express = require('express');
const requireAdmin = require('../middleware/auth');
const { pageviewLimiter } = require('../middleware/rateLimiters');
const ctrl = require('../controllers/analyticsController');

const router = express.Router();

router.post('/pageview', pageviewLimiter, ctrl.record);
router.get('/summary', requireAdmin, ctrl.summary);

module.exports = router;
