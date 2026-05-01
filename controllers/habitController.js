const Habit = require('../models/habit');

// const habit_index = (req, res) => {
//     res.render('habits/index', {
//         title: 'Your Personal Habit Tracker'
//     });
// };
// const habit_habit = (req, res) => {
//     res.render('habits/habits', {
//         title: 'Start a New Habit'
//     });
// };

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



// const habit_add_get = async (req, res) => {
//     if (!req.user) {
//     return res.redirect('/auth/login');
//   }
//   try {
//     const habits = await Habit.find({ userId: req.user.id }); 
//     console.log("Fetched habits:", habits);

//     res.render("habits/add", {
//       title: "Add new Habit",
//       habits
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error loading habits");
//   }
// };

// const habit_add_post = async (req, res) => {
//   try {
//     const habit = await Habit.create({
//       ...req.body,
//       userId: req.user.id
//     });

//     console.log('Habit saved:', habit);
//     res.redirect('/add-habit');

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error saving habit');
//   }
// };

// const habit_edit_get = (req, res) => {
//     Habit.findById(req.params.id)
//         .then(habit => {
//             if (!habit) return res.status(404).json({ error: 'Habit not found' });
//             res.json(habit);
//         })
//         .catch((err) => res.status(500).json({ error: 'Error fetching habit' }));
// };

// const habit_edit_post = (req, res) => {
//     Habit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         .then(updatedHabit => {
//         if (!updatedHabit) return res.status(404).send('Habit not found');
//         res.redirect('/add-habit');
//         })
//         .catch(err => res.status(500).send('Error updating habit'));
// };



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


// const habit_delete = (req, res) => {
//     const id = req.params.id;
//     Habit.findByIdAndDelete(id)
//         .then(() => res.json({ redirect: '/add-habit' }))
//         .catch((err) => res.status(500).json({ error: 'Error deleting habit' }));
// }

module.exports = {
    // habit_index,
    // habit_habit,
    // habit_add_get,
    // habit_add_post,
    // habit_delete,
    // habit_edit_get,
    // habit_edit_post,
    createHabit,
    getHabits,
    getHabitById,
    updateHabit,
    deleteHabit,
    startTimer,
    stopTimer,
    getTimer
};