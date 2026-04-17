const express = require('express');
const router = express.Router();
const axios = require('axios');

const { verifyToken } = require('../middleware/authMiddleware');

router.post('/recommend', verifyToken, async (req, res) => {
    try {
        const { lat, lon, city, N, P, K, pH } = req.body;
        
        if (!process.env.OPENWEATHER_API_KEY) {
            return res.status(400).json({ success: false, message: 'Please add OPENWEATHER_API_KEY to server/.env' });
        }

        // Support BOTH: GPS coords OR typed city name
        let weatherUrl;
        if (lat && lon) {
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
        } else if (city) {
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
        } else {
            return res.status(400).json({ success: false, message: 'Provide lat/lon or city name' });
        }

        const weatherRes = await axios.get(weatherUrl);
        
        const temperature = weatherRes.data.main.temp;
        const humidity = weatherRes.data.main.humidity;
        const rainfall = (weatherRes.data.rain && weatherRes.data.rain['1h']) ? weatherRes.data.rain['1h'] * 24 : 100; 

        let recommended_crops = ['Wheat', 'Rice', 'Maize']; // Fallback if AI fails
        
        let detailed = [];
        try {
            const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001';
            const mlResponse = await axios.post(`${mlUrl}/recommend-crop`, {
                N, P, K, temperature, humidity, pH, rainfall
            });
            recommended_crops = mlResponse.data.recommended_crops || recommended_crops;
            detailed = mlResponse.data.detailed || [];
        } catch (mlErr) {
            console.warn('⚠️ ML service offline or failed, using fallback mock data.', mlErr.message);
        }

        // Save to history if user is authenticated
        if (req.user) {
            const DiagnosisHistory = require('../models/DiagnosisHistory');
            const country = weatherRes.data.sys.country;
            const history = new DiagnosisHistory({
                userId: req.user.uid,
                displayName: `Crop Match: ${weatherRes.data.name}`,
                cropRecommendations: recommended_crops.slice(0, 3),
                weatherAtTime: {
                    temperature: Math.round(temperature),
                    humidity,
                    rainfall: Math.round(rainfall)
                },
                location: {
                    district: weatherRes.data.name,
                    state: country // OpenWeather returns 'IN' for country
                },
                createdAt: new Date()
            });
            await history.save();
        }

        res.status(200).json({ 
            success: true, 
            recommended_crops,
            detailed,
            weather: { city: weatherRes.data.name, temperature: Math.round(temperature), humidity, rainfall: Math.round(rainfall) }
         });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
