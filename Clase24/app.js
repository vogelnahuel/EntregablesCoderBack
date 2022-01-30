const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.set("views", "./views");
app.set("view engine", "ejs");

const tenMinutes = 10000 * 60;
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({
      mongoUrl: `mongodb+srv://nahuel:nahuel@cluster0.4gz4u.mongodb.net/clase22?retryWrites=true&w=majority`,
    }),
    secret: "thesecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: tenMinutes },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//base de datos
const Contenedor = require("./Daos/MensajesMongo.js");
const consultas = new Contenedor();

//sockets
httpServer.listen(process.env.PORT || 8080, () => {
  console.log("SERVER ON");
});

io.on("connection", async (socket) => {
  // socket.on("getProducts", async (obj) => {

  //   await consultas.add(obj)
  //   const arrayProductos  = await consultas.getAll();
  //   console.log(arrayProductos)
  //   io.emit("productList", arrayProductos);
  // });

  socket.on("getMensaje", async (obj) => {
    await consultas.add(obj);
    const arrayProductos = await consultas.getAll();
    io.emit("mensajesList", arrayProductos);
  });
});

const user = "nahuel";
const contrasena = "nahuel";

app.get("/api/users/login", (req, res) => {
  res.render("login");
});

app.post("/api/users/login", (req, res) => {
  const { nombre, password } = req.body;
  if (nombre === user && password == contrasena) {
    req.session.userName = nombre;
    res.render("formulario", { nombre: req.session.userName });
  } else {
    res.render("login", {
      error: "Las credenciales proporcionadas son invalidas",
    });
  }
});



app.post("/api/users/logout", (req, res) => {
  const userName = req.session.userName;
  req.session.destroy();
  res.render("logout", { nombre: userName });
});


app.get("/", (req, res) => {
  res.render("login");
});

//donde se van a guardar las imagenes
app.use(express.static("public"));
//ruta por defecto
app.use("/productos", router);
