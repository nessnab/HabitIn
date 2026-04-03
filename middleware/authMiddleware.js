const jwt = require('jsonwebtoken');
// const User = require('../models/User');

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


// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (token) {
//     jwt.verify(token, 'this is top secret', async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

module.exports = { requireAuth };