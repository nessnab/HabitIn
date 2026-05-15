const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);

// router.get('/signup', authController.signup_get);
// router.get('/login', authController.login_get);

router.post('/refresh', authController.refresh_token);

router.get('/logout', authController.logout_get);

// react
router.get('/me', requireAuth, (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email
  });
})


module.exports = router;