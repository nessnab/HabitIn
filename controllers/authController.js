const User = require('../models/user');
const jwt = require('jsonwebtoken');

// jwt
const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET, {
    expiresIn: '15m'
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: '7d'
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax'
  // secure: true,
  // sameSite: 'None'
};



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

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {
      cookieOptions,
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user: user._id });
  }
  catch (err) {
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
    
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    
    user.refreshToken = refreshToken;
    await user.save();
    
    res.cookie('accessToken', accessToken, {
      cookieOptions,
      maxAge: 15 * 60 * 1000
    });
    
    res.cookie('refreshToken', refreshToken, {
      cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.status(200).json({ user: user._id });
    // console.log(user);
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

// refresh token
module.exports.refresh_token = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.sendStatus(403);
    }

    const accessToken = createAccessToken(decoded.id);

    res.cookie('accessToken', accessToken, {
      cookieOptions,
      maxAge: 15 * 60 * 1000
    });

    res.sendStatus(200);

  } catch (err) {
    return res.sendStatus(403);
  }
};

// logout
module.exports.logout_get = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
      const user = await User.findById(decoded.id);

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    } catch (err) {}
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.redirect('/');
};