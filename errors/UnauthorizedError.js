class UnauthorizedError extends Error {
  constructor(message = 'Sorry, Authentication failed. Please try again.') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
