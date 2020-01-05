const jwt = require('jsonwebtoken');

const NoAccessError = require('../errors/NoAccessError');
const config = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new NoAccessError();
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : config.JWT_DEV,
    );
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};
