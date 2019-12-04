const ErrorMessage = require('../helpers/res-messages');

class UnauthorizedError extends Error {
  constructor(message = `${ErrorMessage.LOGIN_AUTH_ERR}`) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
