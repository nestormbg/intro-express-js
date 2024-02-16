require('dotenv').config();
const express = require('express');
const app = express();
const productosRoutes = require('./routes/productosRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const connectDB = require('./configs/dbConnection');
const mongoose = require('mongoose');

// REQUEST -> MIDDLEWARE -> RESPONSE.
app.use(express.json());
connectDB();
// esta ruta maneja peticiones al registro de usuarios.
app.use('/usuario', usuarioRoutes);

// esta ruta maneja peticiones al recurso productos.
app.use('/productos', productosRoutes);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Hola mundo!',
  });
});

const port = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  console.log('Conexion a MongoDB');
  app.listen(port, () => {
    console.log(`Nuestra app esta escuchando en el puerto: ${port}`);
  });
});
