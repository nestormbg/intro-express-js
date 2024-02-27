const validateToken = (req, res, next) => {
  const token = req.get('Authorization');

  if (!token)
    return res
      .status(401)
      .json({ statusCode: 401, mensaje: 'Not permission given' });

  next();
};

module.exports = {
  validateToken,
};
