// backend/routes/tasks.js
const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all tasks for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Add new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      priority,
      dueDate
    });
    res.json({ task });
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Could not create task' });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json({ task: updated });
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;