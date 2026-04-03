const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };