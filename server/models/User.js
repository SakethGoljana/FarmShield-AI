const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firebaseUid: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    profilePicture: { type: String },
    location: {
        state: String,
        district: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
