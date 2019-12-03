class NotFoundError extends Error {
  constructor(message = 'Sorry, the source you are looking for cannot be found.') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
