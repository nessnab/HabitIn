const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');  
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middleware/authMiddleware');

// express app
const app = express();

// Middleware & static files
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(checkUser);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// habit routes

app.use('/', habitRoutes);
app.use('/auth', authRoutes);

module.exports = app;
