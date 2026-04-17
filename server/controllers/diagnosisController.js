const axios = require('axios');
const DiagnosisHistory = require('../models/DiagnosisHistory');
const FormData = require('form-data');

// Import the new descriptive, dual-language remedies
const REMEDIES_PART1 = require('../data/remedies_part1');
const REMEDIES_PART2 = require('../data/remedies_part2');
const REMEDIES_PART3 = require('../data/remedies_part3');

const REMEDY_MAP = {
    ...REMEDIES_PART1,
    ...REMEDIES_PART2,
    ...REMEDIES_PART3
};

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }

        const lang = req.query.lang || 'en';
        const imageUrl = req.file.path;
        let diseaseObj = {
            disease: "Tomato___healthy",
            confidence: 0.95,
            is_healthy: true
        };

        try {
            const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001';
            const imageUrlData = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const formData = new FormData();
            formData.append('image', Buffer.from(imageUrlData.data), 'image.jpg');
            
            // Forward plant_type filter if provided
            const plantType = req.body?.plant_type || '';
            if (plantType) {
                formData.append('plant_type', plantType);
            }
            
            const mlResponse = await axios.post(`${mlUrl}/predict-disease`, formData, {
                headers: formData.getHeaders()
            });
            diseaseObj = mlResponse.data;
        } catch (mlErr) {
            if (mlErr.response && mlErr.response.status === 503) {
                return res.status(503).json({ success: false, message: mlErr.response.data.error || "AI is waking up." });
            }
            console.warn('⚠️ ML service offline or failed, using fallback mock data.', mlErr.message);
            diseaseObj.fallback_used = true;
            diseaseObj.fallback_message = "Python Backend is completely offline or crashed. Used Node fallback mock data.";
        }

        // Get descriptive remedies in the requested language
        let remedyEntry = REMEDY_MAP[diseaseObj.disease];
        if (!remedyEntry) {
            remedyEntry = REMEDY_MAP['default_disease'];
        }
        
        let remedies = remedyEntry[lang] || remedyEntry['en'];
        
        // Translate the display name if Hindi
        let displayName = diseaseObj.disease.replace(/___/g, ' ').replace(/_/g, ' ');
        if (lang === 'hi') {
             const translations = {
                 'Apple': 'सेब', 'Bell pepper': 'शिमला मिर्च', 'Blueberry': 'ब्लूबेरी',
                 'Cassava': 'कसावा', 'Cherry': 'चेरी', 'Coffee': 'कॉफी', 'Corn': 'मक्का',
                 'Grape': 'अंगूर', 'Orange': 'संतरा', 'Peach': 'आड़ू', 'Potato': 'आलू',
                 'Raspberry': 'रसभरी', 'Rice': 'धान', 'Rose': 'गुलाब', 'Soybean': 'सोयाबीन',
                 'Squash': 'स्क्वैश', 'Strawberry': 'स्ट्रॉबेरी', 'Sugercane': 'गन्ना',
                 'Tomato': 'टमाटर', 'Watermelon': 'तरबूज',
                 'bacterial spot': 'बैक्टीरियल स्पॉट', 'early blight': 'अगेती झुलसा',
                 'late blight': 'पछेती झुलसा', 'healthy': 'स्वस्थ', 'leaf curl': 'लीफ कर्ल',
                 'scab': 'पपड़ी', 'rust': 'रस्ट'
             };
             // Basic replacement for display
             Object.keys(translations).forEach(k => {
                 const regex = new RegExp(k, 'gi');
                 displayName = displayName.replace(regex, translations[k]);
             });
        }

        const history = new DiagnosisHistory({
            userId: req.user ? req.user.uid : null,
            imageUrl,
            diseaseName: diseaseObj.disease,
            displayName: displayName,
            confidence: diseaseObj.confidence,
            isHealthy: diseaseObj.is_healthy,
            remedySuggested: remedies
        });

        try {
            await history.save();
        } catch (dbErr) {
            console.warn('⚠️ Warning: Could not save history to DB.');
        }

        // Send plain object so confidence serializes correctly
        res.status(200).json({ 
            success: true, 
            data: history.toObject(),
            confidence: diseaseObj.confidence,
            fallback_used: diseaseObj.fallback_used || false,
            fallback_message: diseaseObj.fallback_message || null
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getDiagnosis = async (req, res) => {
    try {
        const history = await DiagnosisHistory.findById(req.params.id);
        if (!history) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


