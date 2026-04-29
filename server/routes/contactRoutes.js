const express = require('express');
const router = express.Router();
const { ContactMessage } = require('../models');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMsg = await ContactMessage.create({
      name, email, subject, message
    });

    return res.status(201).json({ message: 'Message sent successfully', data: newMsg });
  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

module.exports = router;
