import httpForbidden from '../model/error';


export  const filtrar = (array: any[] | undefined, idParam: any) => {
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

export const inicializacionFile = () => {
  const storage = multer.diskStorage({
    destination: function (req:any, file:any, callback:any) {
      callback(null, "public");
    },
    filename: function (req:any, file:any, callback:any) {
      callback(null, file.originalname);
    },
  });
  return storage;
};

