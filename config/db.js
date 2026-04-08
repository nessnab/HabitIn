const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then((result) => console.log(`Connected to MongoDB`))
  .catch((err) => console.log('mongodb failed to connect', err));