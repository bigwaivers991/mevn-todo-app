const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists in database
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    
    req.user = { id: user._id, username: user.username, email: user.email };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = auth;