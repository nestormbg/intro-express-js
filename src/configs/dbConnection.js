const mongoose = require("mongoose");
// this function creates a connection with a MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
