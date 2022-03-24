import { validate } from "class-validator";
import { LoginRequest } from "../models/loginRequest";
import { Request, Response, NextFunction } from "express";
import { Http } from "../utils/http";

/**
 * @brief verifica los datos del usuario contenga algun error
 * @params req.body recibe los datos a validar documento y password
 * @returns retorna error o sigue de largo en caso de no tenerlo
 *
 */
export const LoginValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  //invoco la validacion de esta clase al hacer un new class
  let body = new LoginRequest(req.body);

  //verifico los errores que tenga
  const errorRes = await validate(body).then((errors) => {
    if (errors.length > 0) {
      return errors.map((element) => element.constraints);
    }
  });
  //devuelvo un error
  if (errorRes) {

    if (errorRes.length > 1) {
      Http.BadRequest(
        Object.values(errorRes[0]).concat(Object.values(errorRes[1])),
        res
      );
    } else {
      Http.BadRequest(Object.values(errorRes[0]), res);
    }
  } else {
    next();
  }
};
