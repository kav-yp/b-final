class BadRequestError extends Error {
  constructor(message = 'Sorry, Bad Request. Please try again.') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
