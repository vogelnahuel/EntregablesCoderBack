
const {filtrar} = require("../utils/utils")

//configuracion para archivos file

//inicializacion de variables donde se guardan id y los productos
let productos = [];

const Producto = require('../model/productos');
const Archivo = require('../model/Archivo.js')
const rutaProductos = 'archivos/producto.txt';

const codificacion = 'utf-8';
const archivo = new Archivo();

const productoGet =  async(req,res,next) => {
    const idParam = parseInt(req.params.id);
    let contenidoProductosArchivo = await  archivo.leerArchivo(rutaProductos,codificacion);

    if(idParam){
        const filtrado = filtrar(contenidoProductosArchivo,idParam);
        if(filtrado?.httpStatusCode){
            return next(filtrado);
        }
        res.json(filtrado[0]);
    }
    else{
        res.json(contenidoProductosArchivo)
    }
  
}

//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
const productoPost = async (req,res,next) => {

    const foto = req.file ? req.file : req.body.foto;  // para saber si viene de postman o de un form

    if(!foto){
        const error = new Error(" enviar file :( ");
        error.httpStatusCode=400;
        return next(error);
    }
  
    const timestamp = Date.now();
    const {nombre,descripcion,codigo,precio,stock} = req.body;

    const nuevoProducto = new Producto();
    nuevoProducto.crearProducto({nombre,descripcion,codigo,precio,stock,foto:foto.filename,timestamp});
    
    productos.push(nuevoProducto);

    await archivo.crearArchivoYsobreEscribir(rutaProductos,productos);
   
    return res.json(nuevoProducto)
}


const productoPut = async (req,res,next) => {
    const foto = req.file ? req.file : req.body.foto;  

    const idParam = parseInt(req.params.id);
    const filtrado = filtrar(productos,idParam);
    if(filtrado?.httpStatusCode){
        return next(filtrado);
    }

    const {nombre,descripcion,codigo,precio,stock} = req.body;


   //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
    const nombreInsert = nombre ? nombre : filtrado[0].nombre;
    const descripcionInsert = descripcion ? descripcion : filtrado[0].descripcion;
    const codigoInsert = codigo ? codigo : filtrado[0].codigo;
    const precioInsert = precio ? precio : filtrado[0].precio;
    const stockInsert = stock ? stock : filtrado[0].stock;
    const fotoInsert = foto ? foto.filename : filtrado[0].foto;
    const timestamp = Date.now();

    const idAFiltrar = productos.findIndex(contenedor => contenedor.id == idParam)

    productos[idAFiltrar].actualizarProducto({nombre:nombreInsert,descripcion:descripcionInsert,codigo:codigoInsert,precio:precioInsert,stock:stockInsert,foto:fotoInsert,timestamp,id:(idParam)});
   await archivo.crearArchivoYsobreEscribir(rutaProductos,productos);

    res.json({nombre:nombreInsert,descripcion:descripcionInsert,codigo:codigoInsert,precio:precioInsert,stock:stockInsert,foto:fotoInsert,id:(idParam),timestamp})
}

const productoDelete = async (req,res,next) => {

    const idParam =  parseInt(req.params.id);

    const eliminado = filtrar(productos,idParam);

    if(eliminado?.httpStatusCode){
        return next(eliminado);
    }
    const todosMenosEliminado = productos.filter(producto => producto.id !== idParam)
    productos=todosMenosEliminado;
    await archivo.crearArchivoYsobreEscribir(rutaProductos,productos);
    res.json(eliminado[0]);
}


module.exports ={
    productoGet,
    productoPut,
    productoPost,
    productoDelete
}