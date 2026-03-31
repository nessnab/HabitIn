const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Password must be at least 6 characters long']
  }
});

// fire a function before doc saved to db
userSchema.pre('save', async function () {
  // console.log('user about to be created & saved', this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// fire a function after doc saved to db
// userSchema.post('save', async function (doc) {
//   console.log('new user was created & saved', doc);
// });

const User = mongoose.model('user', userSchema);

module.exports = User;