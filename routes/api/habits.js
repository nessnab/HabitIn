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

// router.get

module.exports = router;
