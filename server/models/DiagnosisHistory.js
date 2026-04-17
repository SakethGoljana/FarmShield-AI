const mongoose = require('mongoose');

const DiagnosisHistorySchema = new mongoose.Schema({
    userId: { type: String },
    imageUrl: { type: String },
    diseaseName: { type: String },
    displayName: { type: String },
    confidence: { type: Number },
    isHealthy: { type: Boolean },
    remedySuggested: [{ type: String }],
    soilData: {
        N: Number,
        P: Number,
        K: Number,
        pH: Number
    },
    soilAdvice: { type: String },
    cropRecommendations: [{ type: String }],
    weatherAtTime: {
        temperature: Number,
        humidity: Number,
        rainfall: Number
    },
    location: {
        state: String,
        district: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DiagnosisHistory', DiagnosisHistorySchema);
