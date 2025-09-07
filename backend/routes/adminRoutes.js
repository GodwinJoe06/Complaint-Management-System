const express = require('express');
const router = express.Router();
const { getStats, getUsers } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getStats);
router.get('/users', protect, getUsers);

module.exports = router;