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


// PUT update habit
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { title, goal, schedule, weeklyDay, customDays, time } = req.body;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    if (habit.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (title !== undefined) habit.title = title;
    if (goal !== undefined) habit.goal = goal;
    if (schedule !== undefined) habit.schedule = schedule;
    if (weeklyDay !== undefined) habit.weeklyDay = weeklyDay;
    if (customDays !== undefined) habit.customDays = customDays;
    if (time !== undefined) habit.time = time;

    const updatedHabit = await habit.save();
    res.status(200).json(updatedHabit);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
