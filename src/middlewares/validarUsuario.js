const validarUsuario = (req, res, next) => {
  const { name, password } = req.body;

  if (!(name && password))
    return res
      .status(400)
      .json({ statusCode: 400, error: 'Falta nombre o contraseña' });

  next();
};

module.exports = {
  validarUsuario,
};
