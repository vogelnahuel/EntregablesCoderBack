const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
const { filtrar } = require("./utils");



const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//inicializacion de variables donde se guardan id y los productos
const productos = [
  {
    id: 1,
    title: "Fideos",
    number: 75.6,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_626878-MLA42886753623_072020-O.jpg",
  },
  {
    id: 2,
    title: "Atun",
    number: 590.6,
    thumbnail:
      "https://ardiaprod.vteximg.com.br/arquivos/ids/184140-1000-1000/Atun-en-Aceite-La-Campagnola-170-Gr-_1.jpg?v=637427537426970000",
  },
  {
    id: 3,
    title: "Arroz",
    number: 750,
    thumbnail: "https://maxiconsumo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/5/6/569.jpg",
  },
];


let id = 3;

app.set("views", "./views");
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Archivo = require('./Archivo.js')
const archivo = new Archivo();
const ruta = 'producto.txt';
const codificacion = 'utf-8';

//sockets
httpServer.listen(process.env.PORT || 8080, () => {
  console.log("SERVER ON");
});

io.on("connection", async (socket) => {

  socket.on("getProducts", (obj) => {
    productos.push(obj)
    io.emit("productList", productos);
  });
  socket.on("getMensaje", async (obj) => {
    let TodosMsj = await archivo.leerArchivo(ruta,codificacion);
    TodosMsj = JSON.parse(TodosMsj);
    TodosMsj.push(obj)
    await archivo.crearArchivoYsobreEscribir(ruta,TodosMsj);
    io.emit("mensajesList", TodosMsj);
  });

});










router.get("/", (req, res) => {
  return res.render("list", { productos });
});

router.get("/:id", (req, res, next) => {
  const idParam = parseInt(req.params.id);
  const filtrado = filtrar(productos, idParam);
  if (filtrado?.httpStatusCode) {
    return next(filtrado);
  }
  res.json(filtrado);
});

//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
router.post("/" , (req, res ) => {
 
  id++;
  const { title, price,thumbnail } = req.body;
  productos.push({ title, price, thumbnail, id });

  return res.redirect("/list");
});
router.put("/:id", (req, res) => {
  const file = req.file;
  const idParam = parseInt(req.params.id);
  const filtrado = filtrar(productos, idParam);
  if (filtrado?.httpStatusCode) {
    return next(filtrado);
  }

  const { title, price } = req.body;

  //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
  const titleInsert = title ? title : filtrado[0].title;
  const priceInsert = price ? price : filtrado[0].price;
  const fileInsert = file ? file : filtrado[0].thumbnail;

  //actualizo el array en la posicion pasada
  productos[idParam - 1] = {
    title: titleInsert,
    price: priceInsert,
    file: fileInsert,
    id: idParam,
  };
  res.json({
    title: titleInsert,
    price: priceInsert,
    file: fileInsert,
    id: idParam,
  });
});

router.delete("/:id", (req, res, next) => {
  const idParam = parseInt(req.params.id);
  const eliminado = filtrar(productos, idParam);
  if (eliminado?.httpStatusCode) {
    return next(eliminado);
  }
  productos.splice(idParam - 1, 1); //elimino del array
  res.json({ eliminado });
});

app.get("/", (req, res) => {
  res.render("formulario");
});
app.get("/list", (req, res) => {
  return res.render("list", { productos });
});

//donde se van a guardar las imagenes
app.use(express.static("public"));
//ruta por defecto
app.use("/productos", router);
