const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || typeof name !== 'string' || name === '') {
    return res.json({
      error: 'invalid name',
    });
  }

  if (!price || typeof price !== 'number' || price === 0) {
    return res.json({
      error: 'invalid price',
    });
  }

  next();
};

module.exports = {
  validateProduct,
};
