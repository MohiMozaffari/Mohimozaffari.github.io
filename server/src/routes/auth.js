const express = require('express');
const requireAdmin = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiters');
const ctrl = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginLimiter, ctrl.login);
router.get('/me', requireAdmin, ctrl.me);

module.exports = router;
