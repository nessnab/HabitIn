const User = require('../models/user');
const jwt = require('jsonwebtoken');

// jwt
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // login error
  if (err.message === 'Incorrect email or password') {
    errors.password = 'Incorrect email or password'
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// signup
module.exports.signup_get = (req, res) => {
    res.render('auth/signup', { title: 'Signup' });
  }

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({  user: user._id });
    }
    catch (err) {
      // console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

// login
module.exports.login_get = (req, res) => {
    res.render('auth/login', { title: 'Login' });
  }

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    }
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

// user data
module.exports.getUserEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
