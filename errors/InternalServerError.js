const ErrorMessage = require('../helpers/res-messages');

class InternalServerError extends Error {
  constructor(message = `${ErrorMessage.SERVER_ERR_INTERNAL}`) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
