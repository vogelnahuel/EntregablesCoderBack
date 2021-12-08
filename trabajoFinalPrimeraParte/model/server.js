const express = require('express')

class Servidor {
     
    constructor(){
        this.app =express();
        this.port = process.env.PORT;
        this.productosPath='/api/productos'
        this.carritoPath='/api/carrito'
        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended:true}))
        //parseo y lectura del body de lo que mande el front en cualquier verbo http
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
      this.app.use(this.productosPath,require('../routes/productos'))
      this.app.use(this.carritoPath,require('../routes/carrito.js'))
    }
    listen(){
         
        this.app.listen( this.port,() => {
            console.log("servidor corriendo en puerto:"+ this.port)
        } )
    }
}
module.exports = Servidor;