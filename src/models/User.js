const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
