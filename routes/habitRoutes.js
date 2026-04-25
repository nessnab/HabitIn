const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const { checkUser, requireAuth } = require('../middleware/authMiddleware');

router.get('/', checkUser, habitController.habit_index);
router.get('/add-habit', checkUser, habitController.habit_add_get);
router.post('/add-habit', checkUser, requireAuth, habitController.habit_add_post);
router.get('/habits/:id', checkUser, habitController.habit_edit_get);
router.post('/habits/:id', checkUser, habitController.habit_edit_post);
router.delete('/habits/:id', checkUser, habitController.habit_delete);

// Timer routes
router.post('/api/habits/:id/start', habitController.startTimer);
router.post('/api/habits/:id/stop', habitController.stopTimer);
router.get('/api/habits/:id/timer', habitController.getTimer);

module.exports = router;
