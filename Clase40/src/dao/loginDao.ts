
import { Database_Users} from "../interfaces/loginInterface";
import { NotFound } from "../utils/errorsClass";

const dato:Database_Users={
  document: "12345678",
  country: "AR",
  store: "AR",
  users: {
    user_id: 1,
    password:["admin"],
    stores:["AR","BRA"], 
    creation_ts: "20220304095506",
    active: 1,
    system_pass: 0,
    expirate: 1,
    user_name: "admin",
    role_id: 1,
    role_name:"admin",
    status_id: 1,
    last_access_ts: null,
    lockable: 1,
    retries: 0,
    retries_timestamp: "20220307103305",
    first_name: "admin",
    last_name: "admin",
    language_id: null       
},
  status: {id:1,name:"ACTIVE"},
  security_questions: {
    user_id: 1,
    user_question: null,
    answer: "admin",
    system_question_key: "FAVORITE_COLOR"
},
  sessions: {
    user_id: "1",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMzk3NjY1MDEiLCJpYXQiOjE2NDcyNzg2Nzd9",
    expiration: "20300515142234"
}
}

/**
 *  UserDao
 *  @brief hace peticiones a la base de users
 */
export class UserDao {
  databaseUser:Database_Users[]
  /**
   *
   *  @brief busca si el document pasado por el usuario coincide con alguno almacenado en la base
   *  @param document
   *  @returns retorna el objeto de la fila de la tabla users
   */

    constructor(){

      this.databaseUser=[];
      this.databaseUser.push(dato)
    }
    getdatabase(){
      return this.databaseUser;
    }

  static async findByDocument(document: string): Promise<Database_Users> {
    const bd = new UserDao();
    const data = bd.getdatabase();
    const result = data.map(user => user.document===document && user );
    if (result.length <= 0) 
    throw new NotFound('The document or password is invalid');
    return result[0];
  }

}
