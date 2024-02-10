require('dotenv').config();
const express = require('express');
const app = express();
let { productos } = require('../data/productos');
const { validarProducto } = require('../utils/validarProducto');
const { v4: uuidv4, v4 } = require('uuid');

// REQUEST -> MIDDLEWARE -> RESPONSE.
app.use(express.json());


// Configuración de la ruta raiz para manejo de peticiones 'GET'
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Bienvenidos a esta introducción de Node JS'
  });
});

// Configuración de la ruta /productos para obtener el listado de productos almacenados
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Configuración de ruta /productos para creación de nuevos productos con el método 'POST'
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

// Configuración de ruta /productos/id para eliminación de productos con el método 'POST'
// a través de un id
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


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Nuestra app esta escuchando en el puerto: http://localhost:${port}`);
});