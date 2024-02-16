const bcrypt = require('bcrypt');
const { v4: uuidv4, v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.registrarUsuario = async (req, res) => {
  const { name, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const usuario = { name, password: hashedPassword, id: v4() };

    const resultado = await Usuario.create({
      name: usuario.name,
      password: usuario.password,
    });

    res.status(201).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, error: 'No se pudo crear el usuario' });
  }
};

exports.loginUsuario = async (req, res) => {
  const { name, password } = req.body;
  const usuario = await Usuario.findOne({ name: name });

  if (!usuario) return res.status(400).send('No se encontro el usuario');

  try {
    const isValidPassword = await bcrypt.compare(password, usuario.password);

    if (!isValidPassword)
      return res
        .status(400)
        .json({ statusCode: 400, error: 'Contraseña incorrecta' });

    const payload = {
      id: usuario.id,
      name: usuario.name,
    };

    jwt.sign(payload, process.env.SECRET, { expiresIn: '5m' }, (err, token) => {
      if (err)
        return res
          .status(500)
          .json({ statusCode: 500, mensaje: 'Internal server error' });
      return res
        .status(200)
        .json({ mensaje: 'Usuario autenticado exitosamente', token });
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, mensaje: 'Internal server error' });
  }
};
