const jwt = require('jsonwebtoken');

const NoAccessError = require('../errors/NoAccessError');


const handleAuthError = () => {
  throw new NoAccessError();
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : '1',
    );
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};
