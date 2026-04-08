const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');  
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middleware/authMiddleware');

// env
require('dotenv').config();

// express app
const app = express();

// connect to MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then((result) => app.listen(process.env.PORT, () => 
    console.log(`Server is running on port ${process.env.PORT}`)))
  .catch((err) => console.log(err));

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

// routes
app.get('/', (req, res) => {
  res.render('habits/index', { title: 'Your Personal Habit Tracker' });
});

app.get('/add', checkUser, requireAuth, habitRoutes);

// habit routes
app.use('/', habitRoutes);
app.use('/auth', authRoutes);
