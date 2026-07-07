const express = require('express');
const requireAdmin = require('../middleware/auth');
const ctrl = require('../controllers/publicationsController');

const router = express.Router();

router.get('/', ctrl.list);
router.post('/', requireAdmin, ctrl.create);
router.patch('/:id', requireAdmin, ctrl.update);
router.delete('/:id', requireAdmin, ctrl.remove);

module.exports = router;
