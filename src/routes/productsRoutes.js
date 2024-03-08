const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const { validateProduct } = require('../middlewares/validateProduct');
const { validateToken } = require('../middlewares/validateToken');
const { paginatedResults } = require('../middlewares/paginatedResults');
const Product = require('../models/Product');

router.get(
  '/',
  [validateToken, paginatedResults(Product)],
  productsController.getProducts
);
router.post(
  '/',
  [validateToken, validateProduct],
  productsController.createProduct
);
router.put('/:id', validateToken, productsController.updateProduct);
router.post('/:id', validateToken, productsController.deleteProduct);
router.delete('/:id', validateToken, productsController.deleteProduct);

module.exports = router;
