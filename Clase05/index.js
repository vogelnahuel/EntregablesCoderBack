const express = require("express");
const app = express();
const ruta = "producto.txt";
const codificacion = "utf-8";
const port = process.env.PORT || 8080; //para heroku
const Contenedor = require("./Contenedor.js");
const contenedor = new Contenedor();
let AllProduct = [];
//cargo todos los productos de entrada para no tener que estar llamando constantemente a leer archivo
const cargarProductos = async() => {
    AllProduct =  await contenedor.getAll(ruta, codificacion);
}
cargarProductos();

 

app.get("/", (req, res) => {
  res.send("seleccione ruta  /productos o /productoRandom!");
});
app.get("/productos", (req, res) => {
    res.send(AllProduct);
});

app.get("/productoRandom", (req, res) => {
    const random = parseInt(Math.random() * (AllProduct.length - 1 + 1) + 1);
    const filtrado = contenedor.getById(ruta, codificacion, random);
    filtrado.then((data) => {
      res.send(data);
    });
});

app.listen(port, () => {
  console.log(`Corriendo en el puerto:${port}`);
});
