require('dotenv').config();
const express = require('express');
const app = express();
const productosRoutes = require('./routes/productosRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// REQUEST -> MIDDLEWARE -> RESPONSE.
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Nuestra app esta escuchando en el puerto: ${port}`);
});
