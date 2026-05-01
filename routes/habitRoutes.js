const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const { checkUser, requireAuth } = require('../middleware/authMiddleware');

// router.get('/', checkUser, habitController.habit_index);
// router.get('/habits', checkUser, habitController.habit_habit);
// router.get('/add-habit', checkUser, habitController.habit_add_get);
// router.post('/add-habit', checkUser, requireAuth, habitController.habit_add_post);
// router.get('/habits/:id', checkUser, habitController.habit_edit_get);
// router.post('/habits/:id', checkUser, habitController.habit_edit_post);
// router.delete('/habits/:id', checkUser, habitController.habit_delete);

router.get('/api/habits', habitController.getHabits);
router.post('/api/habits', habitController.createHabit);
router.put('/api/habits/:id', habitController.updateHabit);
router.get('/api/habits/:id', habitController.getHabitById);
router.delete('/api/habits/:id', habitController.deleteHabit);

// Timer routes
router.post('/api/habits/:id/start', habitController.startTimer);
router.post('/api/habits/:id/stop', habitController.stopTimer);
router.get('/api/habits/:id/timer', habitController.getTimer);

module.exports = router;
