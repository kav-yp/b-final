class NoAccessError extends Error {
  constructor(message = 'Sorry, No access rights.') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = NoAccessError;
