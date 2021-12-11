import express from "express";

class Servidor {
  app:any;
  port: string | undefined;
  productosPath: string;
  carritoPath: string;
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.productosPath = "/api/productos";
    this.carritoPath = "/api/carrito";
    //Middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    //parseo y lectura del body de lo que mande el front en cualquier verbo http
    this.app.use(express.json());
    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.productosPath, require("../routes/productos.ts"));
    this.app.use(this.carritoPath, require("../routes/carrito.ts"));
    //ruta por defecto en caso de no encontrarse
    this.app.all("*", (req:any, res:any) => {
      res
        .status(404)
        .json({ error: -2, descripcion: `ruta ${req.url} y  método  ${req.method} no implementados` });
    });

  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto:" + this.port);
    });
  }
}
export default  Servidor;
