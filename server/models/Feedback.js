const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feature: {
    type: String,
    required: true,
    enum: ['Diagnosis', 'Soil Analysis', 'Crop Match']
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  feedbackText: {
    type: String,
    default: ''
  },
  userId: {
    type: String, // Optional, depending on if user is logged in
    default: 'anonymous'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
