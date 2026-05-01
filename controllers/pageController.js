const Habit = require('../models/habit');

const landingPage = async (req, res) => {
  res.render('habits/index', {
    title: 'Your Personal Habit Tracker',
  });
};

const appPage = async (req, res) => {
  const habits = await Habit.find({ userId: req.user.id });

  res.render('habits/app', {
    title: 'Start a New Habit',
    user: req.user,
    habits
  });
};

module.exports = {
  landingPage,
  appPage
};
