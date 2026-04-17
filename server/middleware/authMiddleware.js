const admin = require('../config/firebase-admin');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Firebase token verification error:', error);
        res.status(403).json({ message: 'Unauthorized' });
    }
};

module.exports = { verifyToken };
