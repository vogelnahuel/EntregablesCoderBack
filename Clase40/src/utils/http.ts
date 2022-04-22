import { InvalidParams } from "./errorsClass";
import { Response } from "express";
export class Http {
  static build(
    status: string,
    code: number,
    message: string,
    data: any,
    exceptions: any,
    res: Response
  ) {
    const isValidStatus = Object.values(RESULT).some((o) => o === status);
    const isValidCode = Object.values(HTTP_CODES).some((o) => o === code);
    const isValidMessage = typeof message === "string";

    if (!isValidStatus || !isValidCode || !isValidMessage) {
      throw new InvalidParams(message);
    }

    let response;
    response = {
      status,
      code,
      message,
    };

    if (data) {
      response.data = data;
    }

    if (exceptions) {
      response.exceptions = exceptions;
    }
    
    return res.status(code).json(response);
  }

  static Ok(data:any, res:Response) {
    return Http.build(RESULT.SUCCESS, HTTP_CODES.OK, "OK", data, null, res);
  }

  static BadRequest(exceptions:any, res:Response) {
    exceptions ||= [
      "No es posible procesar el requerimiento por errores en el mismo",
    ];

    return Http.build(
      RESULT.ERROR,
      HTTP_CODES.BAD_REQUEST,
      "Bad Request",
      null,
      exceptions,
      res
    );
  }

  static Conflict(exceptions:any,res:Response) {
    exceptions ||= ["Existe un conflicto con el recurso que se intenta crear"];

    return Http.build(
      RESULT.ERROR,
      HTTP_CODES.CONFLICT,
      "Conflict",
      null,
      exceptions,
      res
    );
  }

  static Forbidden(exceptions:any, res:Response) {
    exceptions ||= [
      "No posee permisos suficientes para acceder al recurso solicitado",
    ];

    return Http.build(
      RESULT.ERROR,
      HTTP_CODES.FORBIDDEN,
      "Forbidden",
      null,
      exceptions,
      res
    );
  }

  static NotFound(exceptions:any, res:Response) {
    exceptions ||= ["No es posible encontrar el recurso solicitado"];

    return Http.build(
      RESULT.ERROR,
      HTTP_CODES.NOT_FOUND,
      "Not Found",
      null,
      exceptions,
      res
    );
  }

  static MethodNotAllowed(exceptions:any, res:Response) {
    exceptions ||= ["El metodo utilizado no esta permitido"];

    return Http.build(
      RESULT.ERROR,
      HTTP_CODES.NOT_ALLOWED,
      "Method Not Allowed",
      null,
      exceptions,
      res
    );
  }

  static InternalServerError(exceptions:any, res:Response) {
    exceptions ||= ["Ocurrio un error interno en el servidor"];

    return Http.build(
      RESULT.ERROR,
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null,
      exceptions,
      res
    );
  }

  static Unauthorized(exceptions:any, res:Response) {
    exceptions ||= ["Requiere autorizacion para acceder al recurso solicitado"];

    return Http.build(
      RESULT.ERROR,
      HTTP_CODES.ACCESS_DENIED,
      "Unauthorized",
      null,
      exceptions,
      res
    );
  }

  static NoContent(exceptions:any, res:Response) {
    return Http.build(
      RESULT.SUCCESS,
      HTTP_CODES.NO_CONTENT,
      "No Content",
      null,
      exceptions,
      res
    );
  }
}

const RESULT = {
  SUCCESS: "success",
  ERROR: "error",
};

const HTTP_CODES = {
  CONTINUE: 100, // Continue.
  SWITCHING_PROTOCOLS: 101, // Switching protocols.
  OK: 200, // OK. The client request has succeeded.
  CREATED: 201, // Created.
  ACCEPTED: 202, // Accepted.
  NOT_AUTHORITATIVE_INFORMATION: 203, // Non-authoritative information.
  NO_CONTENT: 204, // No content.
  RESET_CONTENT: 205, // Reset content.
  PARTIAL_CONTENT: 206, // Partial content.
  MULTI_STATUS: 207, // Multi-Status (WebDay).
  MOVED_PERMANENTLY: 301, // Moved Permanently
  OBJECT_MOVED: 302, // Object moved.
  NOT_MODIFIED: 304, // Not modified.
  TEMPORARY_REDIRECT: 307, // Temporary redirect.
  BAD_REQUEST: 400, // Bad request.
  ACCESS_DENIED: 401, // Access denied.
  // 401.1, Logon failed.
  // 401.2, Logon failed due to server configuration.
  // 401.3, Unauthorized due to ACL on resource.
  // 401.4, Authorization failed by filter.
  // 401.5, Authorization failed by ISAPI/CGI application.
  // 401.7, Access denied by URL authorization policy on the Web server.
  FORBIDDEN: 403, // Forbidden.
  // 403.1, Execute access forbidden.
  // 403.2, Read access forbidden.
  // 403.3, Write access forbidden.
  // 403.4, SSL required.
  // 403.5, SSL 128 required.
  // 403.6, IP address rejected.
  // 403.7, Client certificate required.
  // 403.8, Site access denied.
  // 403.9, Too many users.
  // 403.10, Invalid configuration.
  // 403.11, Password change.
  // 403.12, Mapper denied access.
  // 403.13, Client certificate revoked.
  // 403.14, Directory listing denied.
  // 403.15, Client Access Licenses exceeded.
  // 403.16, Client certificate is untrusted or invalid.
  // 403.17, Client certificate has expired or is not yet valid.
  // 403.18, Cannot execute requested URL in the current application pool. This error code is specific to IIS 6.0.
  // 403.19, Cannot execute CGIs for the client in this application pool. This error code is specific to
  // 403.20, Passport logon failed. This error code is specific to IIS 6.0.
  NOT_FOUND: 404, // Not found.
  // 404.0, (None) – File or directory not found.
  // 404.1, Web site not accessible on the requested port.
  // 404.2, Web service extension lockdown policy prevents this request.
  // 404.3, MIME map policy prevents this request.
  NOT_ALLOWED: 405, // HTTP verb used to access this page is not allowed (method not allowed.)
  MIMETYPE_NOT_ACCEPTED: 406, // Client browser does not accept the MIME type of the requested page.
  PROXY_AUTHENTICATION_REQUIRED: 407, // Proxy authentication required.
  CONFLICT: 409, // Conflict.
  PRECONDITION_FAILED: 412, // Precondition failed.
  REQUEST_ENTITY_LARGE: 413, // Request entity too large.
  REQUEST_URI_LONG: 414, // Request-URI too long.
  UNSUPPORTED_MEDIA_TYPE: 415, // Unsupported media type.
  REQUESTED_RANGE_NOT_SATISFIABLE: 416, // Requested range not satisfiable.
  EXECUTION_FAILED: 417, // Execution failed.
  LOCKED_ERROR: 423, // Locked error.
  INTERNAL_SERVER_ERROR: 500, // Internal server error.
  // 500.12, Application is busy restarting on the Web server.
  // 500.13, Web server is too busy.
  // 500.15, Direct requests for Global.asa are not allowed.
  // 500.16, UNC authorization credentials incorrect. This error code is specific to IIS 6.0.
  // 500.18, URL authorization store cannot be opened. This error code is specific to IIS 6.0.
  // 500.19, Data for this file is configured improperly in the metabase.
  // 500.100, Internal ASP error.
  CONFIGURATION_HEADER_NOT_IMPLEMENTED: 501, // Header values specify a configuration that is not implemented.
  INVALID_RESPONSE: 502, // Web server received an invalid response while acting as a gateway or proxy.
  // 502.1, CGI application timeout.
  // 502.2, Error in CGI application.
  SERVICE_UNAVAILABLE: 503, // Service unavailable. This error code is specific to IIS 6.0.
  GATEWAY_TIMEOUT: 504, // Gateway timeout.
  VERSION_NOT_SUPPORTED: 505, // HTTP version not supported.
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
  OPTIONS: "OPTIONS",
};
