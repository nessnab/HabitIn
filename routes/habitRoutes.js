const express = require('express');
const habitController = require('../controllers/habitController');
const router = express.Router();

router.get('/', habitController.habit_index);
router.get('/add', habitController.habit_add_get);
router.post('/add', habitController.habit_add_post);
router.delete('/habits/:id', habitController.habit_delete);

module.exports = router;
