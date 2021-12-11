const multer = require("multer");
const { Router } = require("express");
const { inicializacionFile } = require("../utils/utils.ts");
const storage = inicializacionFile();
const upload = multer({ storage });

const {
  productoGet,
  productoPut,
  productoPost,
  productoDelete,
} = require("../controller/producto.ts");

const routerProductos = Router();

routerProductos.get("/:id?", productoGet);

routerProductos.put("/:id", upload.single("foto"), productoPut);

routerProductos.post("/", upload.single("foto"), productoPost);

routerProductos.delete("/:id", productoDelete);

module.exports = routerProductos;
