const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    // 1. Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Fire Email Payload
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: `FarmShield AI System <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `[FarmShield] New Contact from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #0d8abc;">New FarmShield Contact</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: none; border-top: 1px solid #eaeaea;" />
            <p style="white-space: pre-wrap;">${message}</p>
            <p style="margin-top: 30px; font-size: 0.8em; color: #888;">
              This message was submitted via the FarmShield AI 'About Us' portal.
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact Error:', error);
    res.status(500).json({ success: false, message: 'Backend error saving message' });
  }
});

module.exports = router;
