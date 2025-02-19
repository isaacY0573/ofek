const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  lastName: String,
  age: Number,
});

const User = mongoose.model('vlogusers', userSchema);


module.exports = User;
