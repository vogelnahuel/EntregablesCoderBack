const express = require("express")
const {Router} = express;
const app = express();
const router = Router();
const multer = require("multer")
const {inicializacionFile,filtrar} = require("./utils")

//configuracion para archivos file
const storage =inicializacionFile();
const upload = multer({storage});


//inicializacion de variables donde se guardan id y los productos
const productos = [];
let id =0;

//para los form como objetos
app.use(express.urlencoded({extended:true}))
app.use(express.json())


router.get('/:id?',(req,res,next) => {
    const idParam = parseInt(req.params.id);
    if(idParam){
        const filtrado = filtrar(productos,idParam);
        if(filtrado?.httpStatusCode){
            return next(filtrado);
        }
        res.json(filtrado);
    }
    else{
        res.json(productos)
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
    id++;
    const timestamp = Date.now();
    const {nombre,descripcion,codigo,precio,stock} = req.body;
    productos.push({nombre,descripcion,codigo,precio,stock,foto:foto.filename,id,timestamp});

    return res.json({nombre,descripcion,codigo,precio,stock,foto:foto.filename,id,timestamp})
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
    const fotoInsert = foto ? foto : filtrado[0].foto;
    const timestamp = Date.now();

    //actualizo el array en la posicion pasada

    productos[idParam-1]={nombre:nombreInsert,descripcion:descripcionInsert,codigo:codigoInsert,precio:precioInsert,stock:stockInsert,foto:fotoInsert,timestamp,id:(idParam)}; 
    res.json({nombre:nombreInsert,descripcion:descripcionInsert,codigo:codigoInsert,precio:precioInsert,stock:stockInsert,foto:fotoInsert,id:(idParam-1),timestamp})
})

router.delete('/:id',(req,res,next) => {

    const idParam =  parseInt(req.params.id);
    const eliminado = filtrar(productos,idParam);
    if(eliminado?.httpStatusCode){
        return next(eliminado);
    }
    productos.splice((idParam-1),1); //elimino del array
    res.json({eliminado});
})


/********************carrito ************************/
let idCarrito = 0;
let idProductosCarrito=0;
let carrito =[];

const router2 = Router();

router2.post('/',(req,res) => {
    let productos =[];
    idCarrito++;
    const timestamp = Date.now();
    carrito.push({id:idCarrito,timestamp,productos})
    res.json({id:idCarrito,timestamp,productos});
})
router2.delete('/:id',(req,res,next) => {

    const idParam =  parseInt(req.params.id);
    const eliminado = filtrar(carrito,idParam);
    if(eliminado?.httpStatusCode){
        return next(eliminado);
    }
    carrito.splice((idParam-1),1); //elimino del array
    res.json({eliminado});
   
})
router2.get('/:id/productos',(req,res,next) => {
    const idParam =  parseInt(req.params.id);
    const seleccionado = filtrar(carrito,idParam);
    if(seleccionado?.httpStatusCode){
        return next(seleccionado);
    }
    res.json({productos:seleccionado[0].productos})
})
//agrega de a 1 producto al carrito
router2.post('/:id/productos',upload.single('foto'),(req,res,next) => {
    const idParam =  parseInt(req.params.id);

    const seleccionado = filtrar(carrito,idParam);
    if(seleccionado?.httpStatusCode){
        return next(seleccionado);
    }

    const foto = req.file ? req.file : req.body.foto;  // para saber si viene de postman o de un form

    if(!foto){
        const error = new Error(" enviar file :( ");
        error.httpStatusCode=400;
        return next(error);
    }

    idProductosCarrito++;
    const timestamp = Date.now();
    const {nombre,descripcion,codigo,precio,stock} = req.body;

    carrito[(idParam-1)].productos.push({nombre,descripcion,codigo,precio,stock,foto:foto.filename,id:idProductosCarrito,timestamp}) ;
    res.json({nombre,descripcion,codigo,precio,stock,foto:foto.filename,id:idProductosCarrito,timestamp});
})

router2.delete('/:id/productos/:id_prod',(req,res,next) => {
    const idParam =  parseInt(req.params.id);
    const carritoSeleccionado = filtrar(carrito,idParam);
    if(carritoSeleccionado?.httpStatusCode){
        return next(carritoSeleccionado);
    }
    const idParamProd =  parseInt(req.params.id_prod);
    const productoSeleccionado = filtrar(carrito[(idParam-1)].productos,idParamProd);
    if(productoSeleccionado?.httpStatusCode){
        return next(productoSeleccionado);
    }
    
    carrito[(idParam-1)].productos.splice((idParamProd-1),1); //elimino del array
    res.json({productoSeleccionado});
   
})




//donde se van a guardar las imagenes
app.use(express.static('public'))

//ruta por defecto
app.use('/api/productos',router);
app.use('/api/carrito',router2);


app.listen(8080)