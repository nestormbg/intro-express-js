const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const { validarUsuario } = require('../middlewares/validarUsuario');

router.post('/registro', validarUsuario, usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
