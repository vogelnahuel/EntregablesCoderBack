
const multer = require("multer");
const {Router} = require('express');
const {inicializacionFile} = require("../utils/utils")
const storage =inicializacionFile();
const upload = multer({storage});

const { productoGet, productoPut, productoPost, productoDelete } = require('../controller/producto');

const router = Router();

router.get('/:id?', productoGet)

router.put('/:id', upload.single('foto'), productoPut)

router.post('/',upload.single('foto'),productoPost )

router.delete('/:id',  productoDelete)

module.exports=router;