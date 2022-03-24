import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Http } from "./http";

/**
 *
 *  @brief genera un token aplicando las reglas que se requieran
 *  @param document documento
 *  @returns  un JWT encriptado
 */
export const generateToken = (document: string): string => {
  const token: string = jwt.sign({ data: document }, process.env.PRIVATE_KEY, {
    expiresIn: process.env.EXPIRATION_TOKEN,
  });

  return token;
};

/**
 *
 *  @brief verifica el jwt pasado en el header
 *  @returns  un http error o sigue de largo
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!URLS_WITHOUT_TOKEN_SESSION[req.url]) {
    if (!req.url.includes("/api-docs/") ) {
      const authHeader: string = req?.headers?.token as string;

      if (!authHeader) {
        return Http.Unauthorized("Invalid authorization", res);
      }
      jwt.verify(authHeader, process.env.PRIVATE_KEY, (err) => {
        if (err) {
          return Http.Unauthorized("Invalid authorization", res);
        }
      });
    }
  }

  next();
};

const URLS_WITHOUT_TOKEN_SESSION = {
  "/users/login": String,
};
