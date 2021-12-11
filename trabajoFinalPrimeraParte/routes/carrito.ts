import multer from "multer";
import { Router } from "express";
import { inicializacionFile } from "../utils/utils";
const storage = inicializacionFile();
const upload = multer({ storage });

import { carritoPost, carritoDelete, carritoGet, carritoProductoPost, carritoProductoDelete } from "../controller/carrito";

const routerCarrito = Router();

routerCarrito.post("/", carritoPost);

routerCarrito.delete("/:id", carritoDelete);

routerCarrito.get("/:id/productos", carritoGet);

routerCarrito.post("/:id/productos", upload.single("foto"), carritoProductoPost);

routerCarrito.delete("/:id/productos/:id_prod", carritoProductoDelete);

export default routerCarrito;
