const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
const multer = require("multer");
const { inicializacionFile, filtrar } = require("./utils");

//configuracion para archivos file
const storage = inicializacionFile();
const upload = multer({ storage });

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//inicializacion de variables donde se guardan id y los productos
const productos = [
  {
    id: 1,
    title: "Lapicera",
    number: 75.6,
    thumbnail:
      "https://www.bikabik.com.ar/wp-content/uploads/2020/07/lapicera-bic-trazo-fino1-71ebc33f028281085915864477484945-640-0-min.jpg",
  },
  {
    id: 2,
    title: "Cartuchera",
    number: 590.6,
    thumbnail:
      "http://d3ugyf2ht6aenh.cloudfront.net/stores/822/270/products/aliens21-1bebf4f1f2a6f4501c15844666646646-640-0.png",
  },
  {
    id: 3,
    title: "Taza",
    number: 750,
    thumbnail: "https://m.media-amazon.com/images/I/41gdpnvdSQL._AC_SX425_.jpg",
  },
];
const mensajes = [];

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
