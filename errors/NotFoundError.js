const ErrorMessage = require('../helpers/res-messages');

class NotFoundError extends Error {
  constructor(message = `${ErrorMessage.SERVER_NO_SOURCE}`) {
    super(message);
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;
