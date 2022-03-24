import { IsNotEmpty, IsString } from "class-validator";

/**
 *  LoginRequest
 *  @brief valida los datos del usuario en base a condiciones
 *  @coment validar el password con la encriptacion del front end
 *
 */
export class LoginRequest {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  document: string;


  /**
   *
   * @param body documento y constraseña
   */
  constructor(body: LoginRequest) {
    this.password = body.password;
    this.document = body.document;

  }
}
