const User = require('../models/User');

exports.syncUser = async (req, res) => {
    try {
        const { uid, email, name, picture, phone_number } = req.user;
        let user = await User.findOne({ firebaseUid: uid });
        
        if (!user) {
            user = new User({
                firebaseUid: uid,
                email,
                name: name || "Guest User",
                profilePicture: (picture && picture.includes('localhost:5000')) ? null : picture,
                phone: phone_number
            });
            await user.save();
        } else {
            if (name) user.name = name;
            // Only update picture if it's not a localhost fallback from a previous local session
            if (picture && !picture.includes('localhost:5000')) {
                user.profilePicture = picture;
            }
            if (email) user.email = email;
            if (phone_number) user.phone = phone_number;
            await user.save();
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.verifyPhone = async (req, res) => {
    try {
        const { uid, phone_number } = req.user;
        let user = await User.findOne({ firebaseUid: uid });
        
        if (!user) {
            user = new User({
                firebaseUid: uid,
                phone: phone_number
            });
            await user.save();
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.uploadAvatar = async (req, res) => {
    try {
        const { uid } = req.user;
        const { base64Image } = req.body;
        
        let user = await User.findOne({ firebaseUid: uid });
        if (user) {
            user.profilePicture = base64Image;
            await user.save();
            res.status(200).json({ success: true });
        } else {
            // Create user if they upload an avatar before standard sync (edge case)
            user = new User({ firebaseUid: uid, profilePicture: base64Image });
            await user.save();
            res.status(200).json({ success: true });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAvatar = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findOne({ firebaseUid: uid });
        if (user && user.profilePicture && user.profilePicture.startsWith('data:image')) {
            const base64Data = user.profilePicture.split(',')[1];
            const imgBuffer = Buffer.from(base64Data, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': imgBuffer.length
            });
            res.end(imgBuffer);
        } else {
            const name = user && user.name ? user.name : 'User';
            res.redirect(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
