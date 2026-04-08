const express = require('express');
// const app = express();
const router = express.Router();
const habitController = require('../controllers/habitController');
const { checkUser, requireAuth } = require('../middleware/authMiddleware');

// app.use(checkUser);

router.get('/', checkUser, habitController.habit_index);
router.get('/add', checkUser, habitController.habit_add_get);
router.post('/add', checkUser, requireAuth, habitController.habit_add_post);
router.get('/habits/:id', checkUser, habitController.habit_edit_get);
router.post('/habits/:id', checkUser, habitController.habit_edit_post);
router.delete('/habits/:id', checkUser, habitController.habit_delete);


module.exports = router;
