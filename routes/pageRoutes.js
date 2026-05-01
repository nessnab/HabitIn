const express = require('express');
const router = require('express').Router();
const pageController = require('../controllers/pageController');
const { checkUser, requireAuth } = require('../middleware/authMiddleware');


router.get('/', checkUser, pageController.landingPage);
router.get('/app', checkUser, requireAuth, pageController.appPage);
// router.post('/app', checkUser, requireAuth, pageController.appPage);

module.exports = router;
