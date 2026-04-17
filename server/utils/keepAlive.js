const axios = require('axios');

const keepAlive = () => {
  setInterval(async () => {
    try {
      const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001';
      await axios.get(`${mlUrl}/health`);
      console.log('ML service pinged ✅');
    } catch (err) {
      console.log('ML service ping failed (normal if just started)', err.message);
    }
  }, 10 * 60 * 1000); // every 10 minutes
};

module.exports = keepAlive;
