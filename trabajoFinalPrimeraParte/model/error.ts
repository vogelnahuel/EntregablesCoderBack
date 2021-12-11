class httpError {}

class httpForbidden extends httpError {
  httpStatusCode
  message
  stack
  constructor(message, stack = null) {
    super();
    this.httpStatusCode = 403;
    this.message = message
    this.stack = stack;
  }
}

module.exports = httpForbidden;

