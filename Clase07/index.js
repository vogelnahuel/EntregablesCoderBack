const express = require("express")
const {Router} = express;
const app = express();
const router = Router();
const multer = require("multer")

//configuracion para archivos file
const storage = multer.diskStorage({
    destination : function (req,file,callback){
        callback(null,'public')
    },
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})
const upload = multer({storage});

//inicializacion de variables donde se guardan id y los productos
const productos = [];
let id =0;

//para los form como objetos
app.use(express.urlencoded({extended:true}))
app.use(express.json())

router.get('/',(req,res) => {
    res.json(productos)
})

router.get('/:id',(req,res,next) => {
    const id = parseInt(req.params.id);
    const filtrado =  productos.filter(producto => producto.id===id);
    if(filtrado.length===0){
        const error = new Error("producto no encontrado");
        error.httpStatusCode=404;
        return next(error); 
    }
    res.json(filtrado);
})
//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
router.post('/',upload.single('thumbnail'),(req,res,next) => {
    const file = req.file;

    if(!file){
        const error = new Error(" enviar file :( ");
        error.httpStatusCode=400;
        return next(error);
    }
    id++;
    const {title,price} = req.body;
    productos.push({title,price,file,id});
    res.json({title,price,file,id})
 
})
router.put('/:id',upload.single('thumbnail'),(req,res,next) => {
    const file = req.file;
    const idParam = parseInt(req.params.id);
    const filtrado =  productos.filter(producto => producto.id===idParam);

    if(filtrado.length===0){
        const error = new Error("producto no encontrado");
        error.httpStatusCode=404;
        return next(error);
    }

    const {title,price} = req.body;

   //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
    const titleInsert = title ? title : filtrado[0].title;
    const priceInsert = price ? price : filtrado[0].price;
    const fileInsert = file ? file : filtrado[0].file;

    //actualizo el array en la posicion pasada
    productos[idParam-1] = {title:titleInsert ,price:priceInsert,file:fileInsert,id:idParam}; 
    res.json({title:titleInsert ,price:priceInsert,file:fileInsert,id:idParam})
})
router.delete('/:id',(req,res,next) => {

    const idParam =  parseInt(req.params.id);
    const eliminado =  productos.filter(producto => producto.id===idParam);

    if(eliminado.length===0){
        const error = new Error("producto no encontrado");
        error.httpStatusCode=404;
        return next(error);
    }
    productos.splice((idParam-1),1); //elimino del array
    res.json({eliminado});
})

// app.use(express.static(__dirname+'public'))

//donde se van a guardar las imagenes
app.use(express.static('public'))
//ruta por defecto
app.use('/api/productos',router);

app.listen(3000)

