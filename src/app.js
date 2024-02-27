require('dotenv').config();
const express = require('express');
const app = express();
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./configs/dbConnection');
const mongoose = require('mongoose');

// REQUEST -> MIDDLEWARE -> RESPONSE.
app.use(express.json());
connectDB();
// this route handles requests made to the user route
app.use('/api/user', userRoutes);

// this route handles requests made to the products route
app.use('/api/products', productsRoutes);

app.get('/api', (req, res) => {
  res.json({
    mensaje: 'CRUD del curso de introducción a Express.js',
  });
});

const port = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection started');
  app.listen(port, () => {
    console.log(`Listening in port: ${port}`);
  });
});
