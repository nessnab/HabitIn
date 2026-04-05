const User = require('../models/user');
const jwt = require('jsonwebtoken');

// check user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
      jwt.verify(token, 'this is top secret', async (err, decodedToken) => {
      if (err) {
        req.user = null;
        res.locals.user = null;
        next();
      } else {
        try {
          const user = await User.findById(decodedToken.id);
          req.user = user;
          res.locals.user = user;
        } catch (error) {
          req.user = null;
          res.locals.user = null;
        }
        next();
      }
    });
  } else {
    req.user = null;
    res.locals.user = null;
    next();
  }
}

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check jwt exists and is verified
  if (token) {
    jwt.verify(token, 'this is top secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/auth/signup');
      } else {
        console.log(decodedToken); 
        next();
      }
    })
  } else {
    res.redirect('/auth/signup');
  }
}

module.exports = { checkUser, requireAuth };