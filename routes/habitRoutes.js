const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const { requireAuth } = require('../middleware/authMiddleware');

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
