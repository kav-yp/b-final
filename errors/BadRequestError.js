const ErrorMessage = require('../helpers/res-messages');

class BadRequestError extends Error {
  constructor(message = `${ErrorMessage.SERVER_BAD_REQUEST}`) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
