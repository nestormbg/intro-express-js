require('dotenv').config();
const express = require('express');
const app = express();
let { productos } = require('../data/productos');
const { validarProducto } = require('../utils/validarProducto');
const { v4: uuidv4, v4 } = require('uuid');

// REQUEST -> MIDDLEWARE -> RESPONSE.
app.use(express.json());


// esta ruta maneja una petición get al recurso raiz.
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Hola mundo!'
  });
});

// esta ruta maneja peticiones get al recurso productos.
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Logica de manejo de rutas.
app.post('/productos', validarProducto, (req, res) => {
  const { nombre, precio } = req.body;
  const producto = {
    id: v4(),
    nombre,
    precio
  };

  productos.push(producto);

  res.json({
    mensaje: "guardado con exito",
    producto: producto
  });
});


app.post('/productos/:id', (req, res) => {
  const id = req.params.id;
  const producto = productos.find(producto => producto.id === id);
  
  if (!producto) {
    res.json({
      mensaje: `Producto con id: ${id} no encontrado`
    });
  }

  productos = productos.filter(producto => producto.id !== id);
  res.json({
    mensaje: "Producto eliminado exitosamente"
  });
});


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Nuestra app esta escuchando en el puerto: ${port}`);
});