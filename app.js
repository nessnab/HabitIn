const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');  
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middleware/authMiddleware');

// express app
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
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

// serve react
app.use(express.static(
  path.join(__dirname, "client", "dist")
));

app.use(habitRoutes);
app.use('/auth', authRoutes);

// catch all routes
app.get(/.*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, "client", "dist", "index.html")
  );
});

module.exports = app;
