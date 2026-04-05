const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');  
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middleware/authMiddleware');

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://ness:test123@cluster01.6eethjm.mongodb.net/habitin';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000, () => 
    console.log('Server is running on port 3000')))
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

app.get('/add', requireAuth, habitRoutes);

// habit routes
app.use('/', habitRoutes);
app.use('/auth', authRoutes);
