const validarToken = (req, res, next) => {
  const token = req.get('Authorization');

  if (!token)
    return res
      .status(401)
      .json({ statusCode: 401, mensaje: 'No tiene acceso' });

  next();
};

module.exports = {
  validarToken,
};
