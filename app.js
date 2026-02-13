const express = require('express');
const morgan = require('morgan');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

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
// app.set('views', './views');

// routes
app.get('/', (req, res) => {
  res.render('habits/index');
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