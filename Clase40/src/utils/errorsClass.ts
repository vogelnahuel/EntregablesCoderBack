export class InvalidParams extends Error {
    constructor (message:string) {
      super(message || 'NO_PARAMS');
      this.name = 'InvalidParams';
    }
  }
  
  export class NotFound extends Error {
    constructor (message:string) {
      super(message || 'Not found');
      this.name = 'NotFound';
    }
  }
  
  export class BusinessError extends Error {
    constructor (message:string) {
      super(message || 'BusinessError');
      this.name = 'BusinessError';
    }
  }
  
  