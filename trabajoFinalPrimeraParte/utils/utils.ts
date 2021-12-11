const httpForbidden  = require('../model/error.ts')

const filtrar = (array, idParam) => {
  if (array === undefined || array.length === 0) {
    const error = new httpForbidden("elemento  no encontrado");
    error.httpStatusCode = 404;
    return error;
  }
  const filtrado = array.filter((array) => array.id === idParam);
  if (filtrado.length === 0) {
    const error = new httpForbidden("elemento  no encontrado");
    error.httpStatusCode = 404;
    return error;
  }
  return filtrado;
};
const multer = require("multer");
const inicializacionFile = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  });
  return storage;
};

module.exports = { filtrar, inicializacionFile };
