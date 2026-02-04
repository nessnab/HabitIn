// const Habit = require('../models/habit');

const habit_index = (req, res) => {
    res.render('habits/index', { title: 'Habit Tracker' });
};


module.exports = {
    habit_index
};