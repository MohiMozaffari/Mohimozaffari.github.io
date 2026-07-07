const express = require('express');
const requireSyncAuth = require('../middleware/syncAuth');
const ctrl = require('../controllers/syncController');

const router = express.Router();

router.post('/github', requireSyncAuth, ctrl.runSync);

module.exports = router;
