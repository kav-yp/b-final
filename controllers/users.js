/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ErrorMessage = require('../helpers/res-messages');
const config = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin

module.exports.login = (req, res, next) => {
  const { email, password, name } = req.body;

  return User.findUserByCredentials(email, password, name)
    // eslint-disable-next-line no-unused-vars
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : config.JWT_DEV,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      });

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(ErrorMessage.LOGIN_ERR));
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
      next(new UnauthorizedError(ErrorMessage.LOGIN_USER_EXIST));
    });
};

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

module.exports.getUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (user == null) {
        throw new NotFoundError();
      }

      res.send({ data: user });
    })
    .catch(next);
};
