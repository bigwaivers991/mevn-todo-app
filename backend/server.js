// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// ==== MIDDLEWARE ====
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ==== CONNECT TO MONGO ====
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mevn_todo';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ==== ROUTES ====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/contact', require('./routes/contact'));

app.get('/', (req, res) => res.json({ message: 'TripTrove backend running' }));

// ==== START SERVER ====
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
