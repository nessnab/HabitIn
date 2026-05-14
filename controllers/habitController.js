const Habit = require('../models/habit');

// CREATE
const createHabit = async (req, res) => {
  const habit = await Habit.create({
    ...req.body,
    userId: req.user.id
  });
  res.status(201).json(habit);
};

// GET ALL
const getHabits = async (req, res) => {
  const habits = await Habit.find({ userId: req.user.id });
  res.json(habits);
};

// GET ONE
const getHabitById = async (req, res) => {
    const habit = await Habit.findById(req.params.id);
    res.json(habit);
};

// UPDATE
const updateHabit = async (req, res) => {
  const habit = await Habit.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after',
    runValidators: true }
  );
  res.json(habit);
};

// DELETE
const deleteHabit = async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};


const startTimer = async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    if (!habit.isRunning) {
        habit.isRunning = true;
        habit.lastStartedAt = new Date();
        await habit.save();
    }

    res.json(habit);
}

const stopTimer = async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    if (habit.isRunning && habit.lastStartedAt) {
        const now = new Date();
        const diff = Math.floor((now - habit.lastStartedAt) / 1000); 
        
        habit.elapsedTime += diff;
        habit.isRunning = false;
        habit.lastStartedAt = null;

        await habit.save();
    }

    res.json(habit);
}


// get timer to display on frontend
const getTimer = async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    res.json({
        elapsedTime: habit.elapsedTime,
        isRunning: habit.isRunning,
        lastStartedAt: habit.lastStartedAt
    });
};

module.exports = {
    createHabit,
    getHabits,
    getHabitById,
    updateHabit,
    deleteHabit,
    startTimer,
    stopTimer,
    getTimer
};