const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadImage, getDiagnosis } = require('../controllers/diagnosisController');

const { verifyToken } = require('../middleware/authMiddleware');

// Using the cloudinary middleware here directly
router.post('/upload', verifyToken, upload.single('image'), uploadImage);
router.get('/:id', getDiagnosis);

module.exports = router;
