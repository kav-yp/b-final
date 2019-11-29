/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../middlewares/NotFoundError');
const UnauthorizedError = require('../middlewares/UnauthorizedError');

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin

module.exports.login = (req, res, next) => {
  const { email, password, name } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password, name)
    // eslint-disable-next-line no-unused-vars
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : '1',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
      });

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Invalid email name or password.'));
    });
};

// # создаёт пользователя с переданными в теле
// # email, password и name
// POST /signup

module.exports.createUser = (req, res, next) => {
  const {
    email,
    name,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((password) => User.create({
      password,
      email,
      name,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id, name: user.name, email: user.email,
      });
    })
    .catch(() => {
      next(new UnauthorizedError('Username already exists.'));
    });
};

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

module.exports.getUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (user == null) {
        throw new NotFoundError('');
      }

      res.send({ data: user });
    })
    .catch(next);
};
