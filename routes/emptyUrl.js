const NotFoundError = require('../errors/NotFoundError');

// eslint-disable-next-line no-unused-vars
module.exports = (req, res) => {
  throw new NotFoundError();
};
