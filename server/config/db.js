const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.warn('⚠️ MONGODB_URI not found in env variables. Database not connected.');
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI);
        // Explicit ping to confirm actual connectivity
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('MongoDB Connected & Pinged ✅');
    } catch (err) {
        console.error('MongoDB Connection Error ❌');
        console.error(err);
        console.log('⚠️ Running without database! History saving will fail but UI testing can proceed.');
    }
};

module.exports = connectDB;
