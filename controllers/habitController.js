const Habit = require('../models/habit');

const habit_index = (req, res) => {
    res.render('habits/index', {
        title: 'Your Personal Habit Tracker'
    });
};

// const habit_add_get = (req, res) => {
//     // res.render('habits/add', { title: 'Add Habit' });
//     Habit.find()
//         .then((habits) => {
//         console.log('Fetched habits:', habits); // debug
//         res.render('habits/add', { 
//             title: 'Habit Tracker',
//             habits
//         });
//         })
//         .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error loading habits');
//     });

// }

const habit_add_get = async (req, res) => {
    if (!req.user) {
    return res.redirect('/auth/login');
  }
  try {
    const habits = await Habit.find({ userId: req.user.id }); 
    console.log("Fetched habits:", habits);

    res.render("habits/add", {
      title: "Add new Habit",
      habits
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading habits");
  }
};

const habit_add_post = async (req, res) => {
  try {
    const habit = await Habit.create({
      ...req.body,
      userId: req.user.id
    });

    console.log('Habit saved:', habit);
    res.redirect('/add-habit');

  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving habit');
  }
};

const habit_edit_get = (req, res) => {
    Habit.findById(req.params.id)
        .then(habit => {
            if (!habit) return res.status(404).json({ error: 'Habit not found' });
            res.json(habit);
        })
        .catch((err) => res.status(500).json({ error: 'Error fetching habit' }));
};

const habit_edit_post = (req, res) => {
    Habit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedHabit => {
        if (!updatedHabit) return res.status(404).send('Habit not found');
        res.redirect('/add'); // or wherever your list page is
        })
        .catch(err => res.status(500).send('Error updating habit'));
};


// get timer to display on frontend
const getTimer = (req, res) => {
    const id = req.params.id;
    Habit.findById(id)
        .then(habit => {
            if (!habit) return res.status(404).json({ error: 'Habit not found' });
            res.json({ elapsedTime: habit.elapsedTime });
        })
        .catch(err => res.status(500).json({ error: 'Error fetching timer', details: err.message }));
};

// store timer on server
const updateTimer = (req, res) => {
    const id = req.params.id;
    const { elapsed } = req.body; // get elapsed time from request body
    Habit.findById(id)
        .then(habit => {
        if (!habit) return res.status(404).json({ error: 'Habit not found' });

        habit.elapsedTime = elapsed; // update field
        return habit.save();
        })
        .then(() => res.json({ message: 'Timer updated successfully' }))
        .catch(err => res.status(500).json({ error: 'Error updating timer', details: err.message }));
};


const habit_delete = (req, res) => {
    const id = req.params.id;
    Habit.findByIdAndDelete(id)
        .then(() => res.json({ redirect: '/add-habit' }))
        .catch((err) => res.status(500).json({ error: 'Error deleting habit' }));
}

module.exports = {
    habit_index,
    habit_add_get,
    habit_add_post,
    habit_delete,
    habit_edit_get,
    habit_edit_post,
    updateTimer,
    getTimer
};