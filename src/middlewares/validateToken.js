const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .send({ statusCode: '401', message: 'Forbidden access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ statusCode: '401', message: 'Forbidden access' });
  }
};

module.exports = {
  validateToken,
};
