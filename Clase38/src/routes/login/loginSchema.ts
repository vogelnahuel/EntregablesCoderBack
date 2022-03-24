/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - document
 *         - password
 *       properties:
 *         document:
 *           type: string
 *           description: documento del usuario
 *         password:
 *           type: string
 *           description: contraseña del usuario
 *       example:
 *         document:12345678
 *         password:nahuel
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: nombre del usuario
 *         initialPass:
 *           type: boolean
 *           description: si es la primera contraseña del usuario
 *         lastAccessTs:
 *           type: string
 *           description: ultimo acceso del usuario
 *         lastName:
 *           type: string
 *           description: apellido del usuario
 *         loginRetries:
 *           type: number
 *           description: cantidad de reintentos
 *         nickName:
 *           type: string
 *           description: el documento del usuario
 *         passwordExpiredDate:
 *           type: number
 *           description: si vence o no la contraseña
 *         passwordWhitening:
 *           type: boolean
 *           description:  si es blancamiento de contraseña o no
 *         role:
 *           type: object
 *           description: rol y vistas del usuario
 *         savedQuestions:
 *           type: boolean
 *           description: si tiene preguntas de seguridad
 *         token:
 *           type: string
 *           description: token de acceso
 *         userId:
 *           type: number
 *           description: id del usuario
 *         userName:
 *           type: string
 *           description: el nombre del usuario
 */
