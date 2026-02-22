const Habit = require('../models/habit');

const habit_index = (req, res) => {
    res.render('habits/index');
};

const habit_add_get = (req, res) => {
    // res.render('habits/add', { title: 'Add Habit' });
    Habit.find()
        .then((habits) => {
        console.log('Fetched habits:', habits); // debug
        res.render('habits/add', { 
            title: 'Habit Tracker',
            habits
        });
        })
        .catch((err) => {
        console.error(err);
        res.status(500).send('Error loading habits');
    });

}

const habit_add_post = (req, res) => {
    const habit = new Habit(req.body);
    habit.save()
        .then(() => {
        res.redirect('/add');
        console.log('Habit saved successfully:', req.body);
        })
        .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving habit');
        });
}

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



const habit_delete = (req, res) => {
    const id = req.params.id;
    Habit.findByIdAndDelete(id)
        .then(() => res.json({ redirect: '/add' }))
        .catch((err) => res.status(500).json({ error: 'Error deleting habit' }));
}

module.exports = {
    habit_index,
    habit_add_get,
    habit_add_post,
    habit_delete,
    habit_edit_get,
    habit_edit_post
};