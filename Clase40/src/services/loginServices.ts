import { LoginRequest } from "../models/loginRequest";
import {
  Database_Users,
  LoginResponseError,
  Login_Response_Data,
} from "../interfaces/loginInterface";
import { generateToken } from "../utils/token";
import { UserDao } from "../dao/loginDao";
import { InvalidParams, NotFound } from "../utils/errorsClass";

/**
 *  LoginService
 *  @brief esta clase hace toda la logica de negocio de los endpoint de login
 *
 */
export class LoginService {
  /**
   *  LoginPostService
   *  @brief valida si el documento existe y su constraseña coinciden  tambien almacena el jwt en la base
   *  @param data documento y contraseña
   *  @returns  un obj  con el token o un error
   */
  public static async LoginPostService(
    data: LoginRequest
  ): Promise<Login_Response_Data | LoginResponseError > {
    const { document, password } = data;

    //busca ese documento en la base
    const res: Database_Users = await UserDao.findByDocument(document);

    //si no encontro ese documento
    if (!res) {
      throw new NotFound("The document or password is invalid"); //usuario no existe
    }

    //si no es la ultima contraseña
    else if (password !== res.users.password[res.users.password.length - 1]) {
      throw new InvalidParams("The document or password is invalid");
    }

    //generar token
    const access_token: string = generateToken(document);

    //generar respuesta
    const dataResponse: Login_Response_Data = {
      firstName: res.users.first_name,
      initialPass:
        res.users.system_pass === 1 && res.users.password.length === 1
          ? true
          : false,
      lastAccessTs: res.users.last_access_ts,
      lastName: res.users.last_name,
      loginRetries: res.users.retries,
      nickName: res.document,
      passwordExpiredDate: res.users.expirate,
      passwordWhitening:
        res.users.system_pass === 1 && res.users.password.length > 1
          ? true
          : false,
      role: {},
      savedQuestions: res.security_questions.answer ? true : false,
      token: access_token,
      userId: res.users.user_id,
      userName: res.users.user_name,
    };
    return dataResponse;
  }
}
