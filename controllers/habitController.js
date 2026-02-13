const Habit = require('../models/habit');

const habit_index = (req, res) => {
    res.render('habits/index', { title: 'Habit Tracker' });
};
const habit_get = (req, res) => {
    res.render('habits/add', { title: 'Add Habit' });
}

const habit_post = (req, res) => {
    const habit = new Habit(req.body);
        habit.save()
            .then((result) => {
                res.redirect('habits/add');
            })
            .catch((err) => {
                console.log(err);
            })
}


module.exports = {
    habit_index,
    habit_get,
    habit_post
};