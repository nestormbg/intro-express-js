const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productosController');
const { validarProducto } = require('../middlewares/validarProducto');
const { validarToken } = require('../middlewares/validarToken');

router.get('/', validarToken, productosController.mostrarProductos);
router.post(
  '/',
  [validarToken, validarProducto],
  productosController.crearProducto
);
router.put('/:id', validarToken, productosController.actualizarProducto);
router.post('/:id', validarToken, productosController.eliminarProducto);
router.delete('/:id', validarToken, productosController.eliminarProductoDelete);

module.exports = router;
