const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all tasks for logged-in user
router.get('/', async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ tasks });
});

// Add task
router.post('/', async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });

  const task = await Task.create({
    user: req.user.id,
    title,
    description,
    dueDate,
    priority
  });
  res.status(201).json({ task });
});

// Update task
router.put('/:id', async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ task });
});

// Delete task
router.delete('/:id', async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
