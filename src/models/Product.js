const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true, // this set createdAt and updatedAt fields automatically for every new document
  }
);

module.exports = mongoose.model('Product', productSchema);
