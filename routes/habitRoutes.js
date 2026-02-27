const express = require('express');
const habitController = require('../controllers/habitController');
const router = express.Router();

router.get('/', habitController.habit_index);
router.get('/add', habitController.habit_add_get);
router.post('/add', habitController.habit_add_post);
router.get('/habits/:id', habitController.habit_edit_get);
router.post('/habits/:id', habitController.habit_edit_post);
router.delete('/habits/:id', habitController.habit_delete);
// Timer routes
// router.post('/:id/timer/start', habitController.startTimer);
// router.post('/:id/timer/stop', habitController.stopTimer);
router.get('/habits/:id/timer', habitController.getTimer);
router.post('/habits/:id/timer', habitController.updateTimer);


module.exports = router;
