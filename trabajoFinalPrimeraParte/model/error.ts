class httpError {}

class httpForbidden extends httpError {
  httpStatusCode: number;
  message: any;
  stack: any;
 
  constructor(message: any, stack = null) {
    super();
    this.httpStatusCode = 403;
    this.message = message
    this.stack = stack;
  }
}
export default httpForbidden;

