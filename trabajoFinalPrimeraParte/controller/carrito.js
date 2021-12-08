
const {filtrar} = require("../utils/utils")
const Archivo = require('../model/Archivo.js')
const Carrito = require("../model/carrito");
const rutaCarritos  = 'archivos/carrito.txt';

const codificacion = 'utf-8';
const archivo = new Archivo();

let contenedorCarritos = []

const carritoPost = async (req, res) => {
    const carrito = new Carrito();
    const creado = carrito.crearCarrito()
    contenedorCarritos.push({ id: Carrito.id, carrito });

    await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorCarritos);

    res.json({ id: Carrito.id, timestamp: creado.timestamp, productos: creado.productos });
}

 const carritoDelete = async(req, res, next) => {
    const idParam = parseInt(req.params.id);
    const eliminado = filtrar(contenedorCarritos, idParam);
    if (eliminado?.httpStatusCode) {
        return next(eliminado);
    }
    const todosMenosEliminado = contenedorCarritos.filter(carrito => carrito.id !== idParam)
    contenedorCarritos = todosMenosEliminado;
   await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorCarritos);
    res.json({ id: idParam, timestamp: eliminado[0].carrito.timestamp, productos: eliminado[0].carrito.productos });

}
const carritoGet = async (req, res, next) => {
    const idParam = parseInt(req.params.id);
    const seleccionado = filtrar(contenedorCarritos, idParam);
    if (seleccionado?.httpStatusCode) {
        return next(seleccionado);
    }
    res.json({ productos: seleccionado[0].carrito.productos })
}

//agrega de a 1 producto al carrito
const carritoProductoPost = async(req, res, next) => {
    const idParam = parseInt(req.params.id);
    const seleccionado = filtrar(contenedorCarritos, idParam);
    if (seleccionado?.httpStatusCode) {
        return next(seleccionado);
    }
    const foto = req.file ? req.file : req.body.foto;  // para saber si viene de postman o de un form
    if (!foto) {
        const error = new Error(" enviar file :( ");
        error.httpStatusCode = 400;
        return next(error);
    }
    const timestamp = Date.now();
    const { nombre, descripcion, codigo, precio, stock } = req.body;

    const idAFiltrar = contenedorCarritos.findIndex(contenedor => contenedor.id == idParam)


    const id = contenedorCarritos[(idAFiltrar)].carrito.insertarProducto({ nombre, descripcion, codigo, precio, stock, foto: foto.filename, timestamp })

    await archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorCarritos);

    res.json({ nombre, descripcion, codigo, precio, stock, foto: foto.filename, id, timestamp });
}



const carritoProductoDelete = async(req, res, next) => {
    const idParam = parseInt(req.params.id);

   
 

    const carritoSeleccionado = filtrar(contenedorCarritos, idParam);
    if (carritoSeleccionado?.httpStatusCode) {
        return next(carritoSeleccionado);
    }
    const idAFiltrar = contenedorCarritos.findIndex(contenedor => contenedor.id == idParam)

    const idParamProd = parseInt(req.params.id_prod);
    const productoSeleccionado = filtrar(contenedorCarritos[idAFiltrar].carrito.productos, idParamProd);
    if (productoSeleccionado?.httpStatusCode) {
        return next(productoSeleccionado);
    }
    const nombre = productoSeleccionado[0].nombre;
    const descripcion = productoSeleccionado[0].descripcion;
    const codigo = productoSeleccionado[0].codigo;
    const precio = productoSeleccionado[0].precio;
    const stock = productoSeleccionado[0].stock;
    const foto = productoSeleccionado[0].foto;
    const id = productoSeleccionado[0].id;
    const timestamp = productoSeleccionado[0].timestamp;

    contenedorCarritos[idAFiltrar].carrito.eliminarProducto(idParamProd) //elimino del array

    await  archivo.crearArchivoYsobreEscribir(rutaCarritos, contenedorCarritos);
    res.json({ nombre, descripcion, codigo, precio, stock, foto, id, timestamp });
}

module.exports ={
    carritoPost,
    carritoDelete,
    carritoGet,
    carritoProductoPost,
    carritoProductoDelete
}