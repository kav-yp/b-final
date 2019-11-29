class InternalServerError extends Error {
  constructor(message = 'Sorry, Server Error. Please try again.') {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
