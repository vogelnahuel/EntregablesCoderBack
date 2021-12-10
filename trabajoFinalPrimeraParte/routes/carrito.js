const multer = require("multer");
const { Router } = require("express");
const { inicializacionFile } = require("../utils/utils");
const storage = inicializacionFile();
const upload = multer({ storage });

const {
  carritoPost,
  carritoDelete,
  carritoGet,
  carritoProductoPost,
  carritoProductoDelete,
} = require("../controller/carrito");

const routerCarrito = Router();

routerCarrito.post("/", carritoPost);

routerCarrito.delete("/:id", carritoDelete);

routerCarrito.get("/:id/productos", carritoGet);

routerCarrito.post("/:id/productos", upload.single("foto"), carritoProductoPost);

routerCarrito.delete("/:id/productos/:id_prod", carritoProductoDelete);

module.exports = routerCarrito;
