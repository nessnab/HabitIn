// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// jwt
// const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
// const createToken = (id) => {
//   return jwt.sign({ id }, 'this is top secret', { expiresIn: maxAge });
// }

// signup
module.exports.signup_get = (req, res) => {
    res.render('auth/signup', { title: 'Signup' });
  }

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    
    console.log(email, password);
    res.send('new signup');
}

// login
module.exports.login_get = (req, res) => {
    res.render('auth/login', { title: 'Login' });
  }

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    console.log(email, password);
    res.send('new login');
}