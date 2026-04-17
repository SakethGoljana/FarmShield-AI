const express = require('express');
const router = express.Router();
const DiagnosisHistory = require('../models/DiagnosisHistory');

const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
    try {
        // Only return history for the authenticated user
        const histories = await DiagnosisHistory.find({ userId: req.user.uid }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: histories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await DiagnosisHistory.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
