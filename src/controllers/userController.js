const bcrypt = require('bcrypt');
const { v4: uuidv4, v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = { name, password: hashedPassword, id: v4() };

    await User.create({
      name: user.name,
      password: user.password,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name: name });

  if (!user) return res.status(400).send('User not found');

  try {
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res
        .status(400)
        .json({ statusCode: 400, error: 'Invalid password or username' });

    const payload = {
      id: user.id,
      name: user.name,
    };

    jwt.sign(payload, process.env.SECRET, { expiresIn: '5m' }, (err, token) => {
      if (err)
        return res
          .status(500)
          .json({ statusCode: 500, mensaje: 'Internal server error' });
      return res
        .status(200)
        .json({ mensaje: 'User authenticated successfully', token });
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, mensaje: 'Internal server error' });
  }
};
