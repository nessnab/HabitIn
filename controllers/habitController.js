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

module.exports = {
    habit_index,
    habit_add_get,
    habit_add_post
};