const express = require('express');
const habitController = require('../controllers/habitController');
const router = express.Router();

router.get('/', habitController.habit_index);
router.get('/add', habitController.habit_add_get);
router.post('/add', habitController.habit_add_post);

module.exports = router;
