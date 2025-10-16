const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Create new contact document
    const contact = new Contact({
      name,
      email,
      message
    });

    // Save to database
    await contact.save();
    
    console.log('📩 Contact form saved to database:', { name, email, message });
    res.status(201).json({ message: 'Thanks! Your message was received and stored.' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Error saving your message. Please try again.' });
  }
});

module.exports = router;