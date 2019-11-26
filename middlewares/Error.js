// class Error {
//   constructor(message) {
//   }
// }

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

// class NotAuthError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 401;
//   }
// }

module.exports = NotFoundError;

// module.exports = {
//   NotFoundError,
//   NotAuthError,
// };
