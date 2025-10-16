const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('📩 Contact form received:', { name, email, subject, message });
  // In real apps, send email with nodemailer or store in DB
  res.status(200).json({ message: 'Thanks! Your message was received.' });
});

module.exports = router;
