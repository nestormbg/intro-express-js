const validateUser = (req, res, next) => {
  const { name, password } = req.body;

  if (!(name && password))
    return res
      .status(400)
      .json({ statusCode: 400, error: 'Name or password are missing' });

  next();
};

module.exports = {
  validateUser,
};
