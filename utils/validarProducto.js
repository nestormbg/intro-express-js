const validarProducto = (req, res, next) => {
  const { nombre, precio } = req.body;

  if (!nombre || typeof nombre !== "string" || nombre === '') {
    res.json({
      error: "nombre invalido"
    });
  }

  if (!precio || typeof precio !== "number" || precio === 0) {
    res.json({
      error: "precio invalido"
    });
  }

  next();
};

module.exports = {
  validarProducto
};