const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET, {
    expiresIn: '15m'
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax'
  // secure: true,
  // sameSite: 'None'
};

const checkUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // check Access token
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err, decoded) => {
      if (!err) {
        const user = await User.findById(decoded.id);
        req.user = user;
        res.locals.user = user;
        return next();
      }
      handleRefresh();
    });
  } else {
    handleRefresh();
  }

  async function handleRefresh() {
  if (!refreshToken) {
    req.user = null;
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      req.user = null;
      res.locals.user = null;
      return next();
    }

    const newAccessToken = createAccessToken(decoded.id);

    res.cookie('accessToken', newAccessToken, {
      cookieOptions,
      maxAge: 15 * 60 * 1000
    });

  } catch {
    req.user = user;
    res.locals.user = user;
    next();
  }
}
}

const requireAuth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // check Access token
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err, decoded) => {
      if (!err) {
        const user = await User.findById(decoded.id);
        req.user = user;
        return next();
      }

      // try refresh
      handleRefresh();
    });
  } else {
    handleRefresh();
  }

  async function handleRefresh() {
    if (!refreshToken) {
      return res.redirect('/auth/login');
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        return res.redirect('/auth/login');
      }

      const newAccessToken = createAccessToken(decoded.id);

      res.cookie('accessToken', newAccessToken, {
        cookieOptions,
        maxAge: 15 * 60 * 1000
      });

      req.user = user;

      next();

    } catch {
      return res.redirect('/auth/login');
    }
  }
};

module.exports = { checkUser, requireAuth };