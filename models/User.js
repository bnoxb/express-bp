const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    // unique: true,
    // required: true
  },
  email: {
    type: String,
    // unique: true,
    // required: true
  },
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  }
});

module.exports = mongoose.model('User', userSchema);