const filtrar = (productos,idParam) => {
    const filtrado =  productos.filter(producto => producto.id===idParam);
    if(filtrado.length===0){
        const error = new Error("producto no encontrado");
        error.httpStatusCode=404;
        return error; 
    }
    return filtrado;
}
const multer = require("multer")
const inicializacionFile = () => {
    const storage = multer.diskStorage({
        destination : function (req,file,callback){
            callback(null,'public')
        },
        filename: function(req,file,callback){
            callback(null,file.originalname)
        }
    })
    return storage;
}

module.exports ={filtrar,inicializacionFile}