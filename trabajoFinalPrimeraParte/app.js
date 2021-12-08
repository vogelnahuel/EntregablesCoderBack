const express = require("express")
const {Router} = express;
const app = express();
const router = Router();
const multer = require("multer");
const Carrito = require("./carrito");
const {inicializacionFile,filtrar} = require("./utils")

//configuracion para archivos file
const storage =inicializacionFile();
const upload = multer({storage});




//para los form como objetos
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//inicializacion de variables donde se guardan id y los productos
let productos = [];

const Producto = require('./productos');
const Archivo = require('./Archivo.js')
const rutaProductos = 'producto.txt';
const rutaCarritos  = 'carrito.txt';
const codificacion = 'utf-8';
const archivo = new Archivo();

router.get('/:id?', async(req,res,next) => {
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
  
})

//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
router.post('/',upload.single('foto'),(req,res,next) => {

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

    archivo.crearArchivoYsobreEscribir(rutaProductos,productos);
   
    return res.json(nuevoProducto)
})


router.put('/:id',upload.single('foto'),(req,res,next) => {
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

    productos[idParam-1].actualizarProducto({nombre:nombreInsert,descripcion:descripcionInsert,codigo:codigoInsert,precio:precioInsert,stock:stockInsert,foto:fotoInsert,timestamp,id:(idParam)});
    archivo.crearArchivoYsobreEscribir(rutaProductos,productos);

    res.json({nombre:nombreInsert,descripcion:descripcionInsert,codigo:codigoInsert,precio:precioInsert,stock:stockInsert,foto:fotoInsert,id:(idParam),timestamp})
})

router.delete('/:id',(req,res,next) => {

    const idParam =  parseInt(req.params.id);

    const eliminado = filtrar(productos,idParam);

    if(eliminado?.httpStatusCode){
        return next(eliminado);
    }
    const todosMenosEliminado = productos.filter(producto => producto.id !== idParam)
    productos=todosMenosEliminado;
    archivo.crearArchivoYsobreEscribir(rutaProductos,productos);
    res.json(eliminado[0]);
})


/********************carrito ************************/



const router2 = Router();

let contenedorCarritos = [];

router2.post('/',(req,res) => {
    const carrito = new Carrito();
    const creado = carrito.crearCarrito()
    contenedorCarritos.push({id:Carrito.id,carrito});

    archivo.crearArchivoYsobreEscribir(rutaCarritos,contenedorCarritos);

    res.json({id:Carrito.id,timestamp:creado.timestamp,productos:creado.productos});
})

router2.delete('/:id',(req,res,next) => {

    const idParam =  parseInt(req.params.id);
    const eliminado = filtrar(contenedorCarritos,idParam);
    if(eliminado?.httpStatusCode){
        return next(eliminado);
    }
    const todosMenosEliminado = contenedorCarritos.filter(carrito => carrito.id !== idParam)
    contenedorCarritos=todosMenosEliminado;

    archivo.crearArchivoYsobreEscribir(rutaCarritos,contenedorCarritos);

    res.json({id:idParam,timestamp:eliminado[0].carrito.timestamp,productos:eliminado[0].carrito.productos});
   
})
router2.get('/:id/productos',(req,res,next) => {
    const idParam =  parseInt(req.params.id);

    const seleccionado = filtrar(contenedorCarritos,idParam);

    if(seleccionado?.httpStatusCode){
        return next(seleccionado);
    }
    res.json({productos:seleccionado[0].carrito.productos})
})
//agrega de a 1 producto al carrito
router2.post('/:id/productos',upload.single('foto'),(req,res,next) => {
    const idParam =  parseInt(req.params.id);

    const seleccionado = filtrar(contenedorCarritos,idParam);
    if(seleccionado?.httpStatusCode){
        return next(seleccionado);
    }

    const foto = req.file ? req.file : req.body.foto;  // para saber si viene de postman o de un form

    if(!foto){
        const error = new Error(" enviar file :( ");
        error.httpStatusCode=400;
        return next(error);
    }
    
    const timestamp = Date.now();
    const {nombre,descripcion,codigo,precio,stock} = req.body;
    
    const idAFiltrar = contenedorCarritos.findIndex(contenedor => contenedor.id == idParam)


    const id=contenedorCarritos[(idAFiltrar)].carrito.insertarProducto({nombre,descripcion,codigo,precio,stock,foto:foto.filename,timestamp})
    
    archivo.crearArchivoYsobreEscribir(rutaCarritos,contenedorCarritos);

    res.json({nombre,descripcion,codigo,precio,stock,foto:foto.filename,id,timestamp});
})

router2.delete('/:id/productos/:id_prod',(req,res,next) => {
    const idParam =  parseInt(req.params.id);
    const carritoSeleccionado = filtrar(contenedorCarritos,idParam);
    if(carritoSeleccionado?.httpStatusCode){
        return next(carritoSeleccionado);
    }

    const idParamProd =  parseInt(req.params.id_prod);
    const productoSeleccionado = filtrar(contenedorCarritos[(idParam-1)].carrito.productos,idParamProd);
    if(productoSeleccionado?.httpStatusCode){
        return next(productoSeleccionado);
    }
    const nombre =  productoSeleccionado[0].nombre;
    const descripcion =  productoSeleccionado[0].descripcion;
    const codigo = productoSeleccionado[0].codigo;
    const precio = productoSeleccionado[0].precio;
    const stock = productoSeleccionado[0].stock;
    const foto = productoSeleccionado[0].foto;
    const id = productoSeleccionado[0].id;
    const timestamp = productoSeleccionado[0].timestamp;


    contenedorCarritos[(idParam-1)].carrito.eliminarProducto(idParamProd) //elimino del array

    archivo.crearArchivoYsobreEscribir(rutaCarritos,contenedorCarritos);

    res.json({nombre,descripcion,codigo,precio,stock,foto,id,timestamp});
   
})




//donde se van a guardar las imagenes
app.use(express.static('public'))

//ruta por defecto
app.use('/api/productos',router);
app.use('/api/carrito',router2);


app.listen(8080)