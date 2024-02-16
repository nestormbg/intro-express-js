const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = Schema({
  name: { type: String, required: true, unique: true },
  price: { type: String, required: true },
});

module.exports = mongoose.model('Producto', productoSchema);
