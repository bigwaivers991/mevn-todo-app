// backend/routes/trips.js
const express = require('express');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all trips for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

// Create new trip
router.post('/', auth, async (req, res) => {
  try {
    const { destination, startDate, endDate, people, price, notes, booked } = req.body;
    
    if (!destination || !startDate || !endDate) {
      return res.status(400).json({ message: 'Destination, start date, and end date are required' });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const trip = new Trip({ 
      user: req.user.id,
      destination, 
      startDate, 
      endDate, 
      people: people || 1, 
      price: price || 0, 
      notes: notes || '', 
      booked: booked || false 
    });
    
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    console.error('Create trip error:', err);
    res.status(500).json({ message: 'Could not create trip' });
  }
});

// Update trip
router.put('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    res.json(trip);
  } catch (err) {
    console.error('Update trip error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// Delete trip
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Delete trip error:', err);
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;