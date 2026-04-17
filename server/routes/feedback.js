const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const { feature, rating, feedbackText, userId } = req.body;
    
    if (!feature || !rating) {
      return res.status(400).json({ success: false, message: 'Feature and rating are required.' });
    }

    const newFeedback = new Feedback({
      feature,
      rating,
      feedbackText: feedbackText || '',
      userId: userId || 'anonymous'
    });

    await newFeedback.save();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Feedback Error:', error);
    res.status(500).json({ success: false, message: 'Backend error saving feedback.' });
  }
});

module.exports = router;
