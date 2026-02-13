const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://user-1:user1321@cluster01.6eethjm.mongodb.net/?appName=Cluster01';
mongoose.connect(dbURI)
  .then((result) => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.log(err));

// Middleware & static files
app.use(express.static('public'));
// app.use(express.static('dist'));
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
app.get('/add', (req, res) => {
  res.render('habits/add', { title: 'Add Habit' });
});

// habit routes
app.use('/habits', habitRoutes);

// start server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});