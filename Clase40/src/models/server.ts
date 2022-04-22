import express from "express";
import routerLogin from "../routes/login/login";
import { Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "../constants/swaggerConfig";
import { verifyToken } from "../utils/token";
import { graphqlHTTP } from 'express-graphql';
import schemaUser from "./UserSchema";
import { getUser } from "../dao/UserDao";
/**
 * Server
 * @brief inicializa el servidor
 *
 */
export default class Server {
  private readonly app: any;
  private readonly port: string;
  private readonly loginPath: string;
  /**
   * @brief inicializa las rutas y middlewares
   */

  constructor() {
    this.app = express();


    this.port = process.env.PORT || '3000';
    this.loginPath = "/users";

    //Middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();
  }
  /**
   * @brief inicializa los  middlewares
   *
   */
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    //parseo y lectura del body de lo que mande el front en cualquier verbo http
    this.app.use(express.json());
    this.app.use(verifyToken)
  }
  /**
   * @brief inicializa los  rutas
   *
   */
  routes() {
    this.app.use('/graphql',graphqlHTTP({
      schema:schemaUser,
      rootValue:{getUser},
      graphiql:true
    }))
    //this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
    //this.app.use(this.loginPath,routerLogin);
    //ruta por defecto en caso de no encontrarse
    /*this.app.all("*", (req:Request, res:Response) => {
      res.status(404).json({
        error: -2,
        descripcion: `ruta ${req.url} y  método  ${req.method} no implementados`,
      });
    });*/
  }
  /**
   * @brief metodo que inicia  el servidor
   *
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto:" + this.port);
    });
  }
}

