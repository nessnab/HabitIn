require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(dbURI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('mongodb failed to connect', err));