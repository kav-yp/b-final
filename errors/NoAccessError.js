const ErrorMessage = require('../helpers/res-messages');

class NoAccessError extends Error {
  constructor(message = `${ErrorMessage.LOGIN_NO_ACCESS}`) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = NoAccessError;
