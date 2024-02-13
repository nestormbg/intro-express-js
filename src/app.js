require("dotenv").config();
const express = require("express");
const app = express();
let { productos } = require("../data/productos");
const { validarProducto } = require("../utils/validarProducto");
const { v4: uuidv4, v4 } = require("uuid");

// REQUEST -> MIDDLEWARE -> RESPONSE.
app.use(express.json());

// esta ruta maneja una petición get al recurso raiz.
app.get("/", (req, res) => {
  res.json({
    mensaje: "Hola mundo!",
  });
});

// esta ruta maneja peticiones get al recurso productos.
app.get("/productos", (req, res) => {
  const {limit} = req.query;

  let newLimit = !limit ? 3 : limit;

  console.log(newLimit);

  let a =[];

  for(let i = 1;i<=limit;i++){
    a.push(productos[i]);
  }


  
  return res.json(a);
});

// Logica de manejo de rutas.
app.post("/productos", validarProducto, (req, res) => {
  const { nombre, precio } = req.body;
  const producto = {
    id: v4(),
    nombre,
    precio,
  };

  productos.push(producto);

  res.json({
    mensaje: "guardado con exito",
    producto: producto,
  });
});

app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { precio } = req.body;

  if (!precio || isNaN(precio) || precio < 0) {
    return res.status(400).json({
      message: "Debes enviar el precio como numero mayor o igual a 0",
    });
  }

  const filteredProducts = productos.filter((value) => value.id == id);

  if (filteredProducts.length === 0) {
    return res.status(404).json({
      message: "Este usuario no existe",
    });
  }

  const updatedProducto = filteredProducts[0];

  if (!updatedProducto) {
    return res.status(500).json({
      message: "Comuniquese",
    });
  }

  console.log(updatedProducto)

  const updated = productos.map((elemento) =>
    elemento.id === updatedProducto.id
      ? {
          ...updatedProducto,
          precio,
        }
      : elemento
  );

  console.log(updated);

  productos = updated;

  console.log("Producto final");

  console.log(productos);

  return res.status(200).json({
    message:"Se pudo hacer correctamente",
    id: updatedProducto.id,
  });
});

app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);

  const filteredProducts = productos.filter((value) => value.id == id);

  if (filteredProducts.length === 0) {
    return res.status(404).json({
      message: "Este usuario no existe",
    });
  }

  const deletedProduct = filteredProducts[0];

  if (!deletedProduct) {
    return res.status(500).json({
      message: "Comuniquese",
    });
  }

  let modifiedProducts = productos.filter(
    (value) => value.id != deletedProduct.id
  );

  productos = modifiedProducts;

  return res.status(200).json({
    message: "Se elimino correctamente",
    deleted: deletedProduct.id,
  });
});

app.post("/productos/:id", (req, res) => {
  const id = req.params.id;
  const producto = productos.find((producto) => producto.id === id);

  if (!producto) {
    res.json({
      mensaje: `Producto con id: ${id} no encontrado`,
    });
  }

  productos = productos.filter((producto) => producto.id !== id);
  res.json({
    mensaje: "Producto eliminado exitosamente",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Nuestra app esta escuchando en el puerto: ${port}`);
});
