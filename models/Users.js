const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

});

module.exports = User = mongoose.model('Users', UserSchema);
