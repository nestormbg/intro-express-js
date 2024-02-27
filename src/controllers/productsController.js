const { v4: uuidv4, v4 } = require("uuid");
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    await Product.create({
      name,
      price,
    });

    return res.status(201).json({
      message: "product saved succesfully",
      product: {
        name,
        price,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);

  if (!product) {
    res.json({
      message: `Product with id: ${id} not found`,
    });
  }
  products = products.filter((product) => product.id !== id);
  res.json({
    message: "Product deleted successfully",
  });
};

exports.getProducts = (req, res) => {
  const { limit } = req.query;
  let newLimit = !limit ? 3 : limit;
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  if (!price || isNaN(price) || price < 0) {
    return res.status(400).json({
      message: ''
    });
  }

  const filteredProducts = productos.filter((value) => value.id == id);

  if (filteredProducts.length === 0) {
    return res.status(404).json({
      message: 'There is no resources', });
  }

  if (!updatedProducto) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }


  const updated = productos.map((elemento) =>
    elemento.id === updatedProducto.id
      ? {
          ...updatedProducto,
          precio, }
      : elemento,
  );


  productos = updated;

  return res.status(200).json({
    message: "Se pudo hacer correctamente",
    id: updatedProducto.id,
  });
};

exports.deleteProduct = (req, res) => {
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
    (value) => value.id != deletedProduct.id,
  );

  productos = modifiedProducts;

  return res.status(200).json({
    message: "Se elimino correctamente",
    deleted: deletedProduct.id,
  });
};
