import Router from "express";

import { LoginController } from "../../controllers/loginControllers";
import { LoginValidator } from "../../middlewares/loginMiddleware";
import './loginSchema'

/**
 *  @brief inicializa las rutas con su path por defecto y Login validator middleware que valida los datos pasados por el usuario
 *
 */
const routerLogin = Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: return login token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       500:
 *         description: Some server error
 */
routerLogin.post("/login", LoginValidator, LoginController.LoginPost);


export default routerLogin;
