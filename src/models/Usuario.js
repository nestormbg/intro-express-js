const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
