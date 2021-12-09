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

app.set('views','./views');
app.set('view engine','pug')

//para los form como objetos
app.use(express.urlencoded({extended:true}))
app.use(express.json())


router.get('/',(req,res) => {
    return res.render('list', {productos} )
})



router.get('/:id',(req,res,next) => {
    const idParam = parseInt(req.params.id);
    const filtrado = filtrar(productos,idParam);
    if(filtrado?.httpStatusCode){
        return next(filtrado);
    }
    res.json(filtrado);
})

//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
router.post('/',upload.single('thumbnail'),(req,res,next) => {

    const file = req.file ? req.file : req.body.thumbnail;  // para saber si viene de postman o de un form

    if(!file){
        const error = new Error(" enviar file :( ");
        error.httpStatusCode=400;
        return next(error);
    }
    id++;
    const {title,price} = req.body;
  
    productos.push({title,price,file:file.filename,id});

    return res.redirect("/list")
})
router.put('/:id',upload.single('thumbnail'),(req,res,next) => {
    const file = req.file;
    const idParam = parseInt(req.params.id);
    const filtrado = filtrar(productos,idParam);
    if(filtrado?.httpStatusCode){
        return next(filtrado);
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
    const eliminado = filtrar(productos,idParam);
    if(eliminado?.httpStatusCode){
        return next(eliminado);
    }
    productos.splice((idParam-1),1); //elimino del array
    res.json({eliminado});
})

app.get('/',(req,res)=>{
    res.render("formulario");
})
app.get('/list',(req,res)=>{
    return res.render('list', {productos} )
})

//donde se van a guardar las imagenes
app.use(express.static('public'))
//ruta por defecto
app.use('/productos',router);

app.listen(8080)