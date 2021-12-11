import { filtrar } from "../utils/utils";
import httpForbidden from '../model/error';

//inicializacion de variables donde se guardan id y los productos
let productos: any[] = [];

import Producto from "../model/productos";
import Archivo from "../model/Archivo";
const rutaProductos = "archivos/producto.txt";

const codificacion = "utf-8";
const archivo = new Archivo();

export const productoGet = async (req:any, res:any, next:any) => {
  const idParam = parseInt(req.params.id);
  let contenidoProductosArchivo = await archivo.leerArchivo(
    rutaProductos,
    codificacion
  );

  if (idParam) {
    const filtrado:any = filtrar(contenidoProductosArchivo, idParam);
    if (filtrado?.httpStatusCode) {
      return next(filtrado);
    }
    res.json(filtrado[0]);
  } else {
    res.json(contenidoProductosArchivo);
  }
};

//mandar como nombre thumbnail  el campo si se utiliza desde postman la key para el File
export const productoPost = async (req:any, res:any, next:any) => {
  const foto = req.file ? req.file : req.body.foto; // para saber si viene de postman o de un form

  if (!foto) {
    const error = new httpForbidden(" enviar file :( ");
    error.httpStatusCode = 400;
    return next(error);
  }

  const timestamp = Date.now();
  const { nombre, descripcion, codigo, precio, stock } = req.body;

  const nuevoProducto = new Producto();
  nuevoProducto.crearProducto({
    nombre,
    descripcion,
    codigo,
    precio,
    stock,
    foto: foto.filename,
    timestamp,
  });

  productos.push(nuevoProducto);

  await archivo.crearArchivoYsobreEscribir(rutaProductos, productos);

  return res.json(nuevoProducto);
};

export const productoPut = async (req:any, res:any, next:any) => {
  const foto = req.file ? req.file : req.body.foto;

  const idParam = parseInt(req.params.id);
  const filtrado:any  = filtrar(productos, idParam);
  if (filtrado?.httpStatusCode) {
    return next(filtrado);
  }

  const { nombre, descripcion, codigo, precio, stock } = req.body;

  //solamente cambio los pasados por parametro y si no estan dejo los que ya estaban
  const nombreInsert = nombre ? nombre : filtrado[0].nombre;
  const descripcionInsert = descripcion ? descripcion : filtrado[0].descripcion;
  const codigoInsert = codigo ? codigo : filtrado[0].codigo;
  const precioInsert = precio ? precio : filtrado[0].precio;
  const stockInsert = stock ? stock : filtrado[0].stock;
  const fotoInsert = foto ? foto.filename : filtrado[0].foto;
  const timestamp = Date.now();

  const idAFiltrar = productos.findIndex(
    (contenedor) => contenedor.id == idParam
  );

  productos[idAFiltrar].actualizarProducto({
    nombre: nombreInsert,
    descripcion: descripcionInsert,
    codigo: codigoInsert,
    precio: precioInsert,
    stock: stockInsert,
    foto: fotoInsert,
    timestamp,
    id: idParam,
  });
  await archivo.crearArchivoYsobreEscribir(rutaProductos, productos);

  res.json({
    nombre: nombreInsert,
    descripcion: descripcionInsert,
    codigo: codigoInsert,
    precio: precioInsert,
    stock: stockInsert,
    foto: fotoInsert,
    id: idParam,
    timestamp,
  });
};

export const productoDelete = async (req:any, res:any, next:any) => {
  const idParam = parseInt(req.params.id);

  const eliminado:any  = filtrar(productos, idParam);

  if (eliminado?.httpStatusCode) {
    return next(eliminado);
  }
  const todosMenosEliminado = productos.filter(
    (producto) => producto.id !== idParam
  );
  productos = todosMenosEliminado;
  await archivo.crearArchivoYsobreEscribir(rutaProductos, productos);
  res.json(eliminado[0]);
};


