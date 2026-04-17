const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const keepAlive = require('./utils/keepAlive');

dotenv.config();

connectDB();
keepAlive();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/diagnosis', require('./routes/diagnosis'));
app.use('/api/soil', require('./routes/soil'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/history', require('./routes/history'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/feedback', require('./routes/feedback'));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
