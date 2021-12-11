import multer from "multer";
import { Router } from "express";
import { inicializacionFile } from "../utils/utils";
const storage = inicializacionFile();
const upload = multer({ storage });

import { productoGet, productoPut, productoPost, productoDelete } from "../controller/producto";

const routerProductos = Router();

routerProductos.get("/:id?", productoGet);

routerProductos.put("/:id", upload.single("foto"), productoPut);

routerProductos.post("/", upload.single("foto"), productoPost);

routerProductos.delete("/:id", productoDelete);

export default routerProductos;
