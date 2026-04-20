const express = require('express');
const router = express.Router();
const Habit = require('../../models/Habit');
const { requireAuth } = require('../../middleware/authMiddleware');

// GET all habits
router.get('/', requireAuth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });    
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

// POST create a new habit
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, goal, schedule, weeklyDay, customDays, time } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newHabit = new Habit({
      title,
      goal,
      schedule,
      weeklyDay,
      customDays,
      time,
      userId: req.user.id
    });

    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
