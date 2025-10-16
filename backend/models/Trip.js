// backend/models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true,
  },
  people: {
    type: Number,
    min: [1, 'At least one traveler'],
    default: 1,
  },
  startDate: {
    type: Date,
    required: [true, 'Start date required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date required'],
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  notes: {
    type: String,
    trim: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);