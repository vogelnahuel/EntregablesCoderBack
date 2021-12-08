const multer = require("multer");
const {Router} = require('express');
const {inicializacionFile} = require("../utils/utils")
const storage =inicializacionFile();
const upload = multer({storage});

const { carritoPost, carritoDelete, carritoGet, carritoProductoPost,carritoProductoDelete } = require('../controller/carrito');

const router2 = Router();

router2.post('/', carritoPost)

router2.delete('/:id',  carritoDelete)

router2.get('/:id/productos',carritoGet )

router2.post('/:id/productos', upload.single('foto'), carritoProductoPost)

router2.delete('/:id/productos/:id_prod',  carritoProductoDelete)

module.exports=router2;