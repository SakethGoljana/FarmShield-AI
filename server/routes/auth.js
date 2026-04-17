const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { syncUser, verifyPhone, uploadAvatar, getAvatar } = require('../controllers/authController');

router.post('/sync', verifyToken, syncUser);
router.post('/verify-phone', verifyToken, verifyPhone);
router.post('/avatar', verifyToken, uploadAvatar);
router.get('/avatar/:uid', getAvatar);

module.exports = router;
