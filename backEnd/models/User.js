const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, // Explicitly defining ObjectId
  name: String,
  lastName: String,
  age: Number,
});

const User = mongoose.model('vlogusers', userSchema);

module.exports = User;
