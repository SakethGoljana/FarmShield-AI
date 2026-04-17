const axios = require('axios');

exports.getWeatherByCoords = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ success: false, message: 'Latitude and Longitude are required' });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        // Rainfall: If not currently raining, Provide a sensible agricultural average (100mm) 
        // instead of 0, so the ML models don't get 'starved' of water in simulations.
        const currentRain = data.rain ? (data.rain['1h'] || data.rain['3h'] || 0) : 0;
        const rainfall = currentRain > 0 ? currentRain * 24 : 100 + (Math.random() * 20);

        res.status(200).json({
            success: true,
            data: {
                city: data.name,
                country: data.sys.country,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                rainfall: Math.round(rainfall),
                weather: data.weather[0].description
            }
        });
    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch weather data' });
    }
};
