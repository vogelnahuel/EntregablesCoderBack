
const Archivo = require('./Archivo.js')

class Contenedor {
    constructor() {
        this.ContenedorObjetos = [];//es el array de obj que va a escribirse en el archivo
        this.Archivo = new Archivo();
    }
    static contadorGlobal = 0;

    async save(ruta, Contenido) {
        Contenedor.contadorGlobal++;
        Contenido.id = Contenedor.contadorGlobal;//crear propiedad id al obj
        this.ContenedorObjetos.push(Contenido);
        await this.Archivo.crearArchivoYsobreEscribir(ruta, this.ContenedorObjetos);
    }

    async getById(ruta, codificacion, idParam) {
        //el archivo devuelve el vector en forma de string
        const contenidoArch = await this.Archivo.leerArchivo(ruta, codificacion);
        //el contenido del archivo lo convierto a vector y luego filtro por el id pasado
        const rta = (JSON.parse(contenidoArch)).filter(contenido => contenido.id === idParam);
        return rta[0];
    }

    async getAll(ruta, codificacion) {
        const contenidoArch = await this.Archivo.leerArchivo(ruta, codificacion);
        const parseado = JSON.parse(contenidoArch);
        return parseado; //retorno la promesa que tiene el array de obj
    }
    async deleteById(idParam) {
        const contenidoArch = await this.Archivo.leerArchivo(ruta, codificacion);
        this.ContenedorObjetos = (JSON.parse(contenidoArch)).filter(contenido => contenido.id !== idParam);
        await this.Archivo.crearArchivoYsobreEscribir(ruta, this.ContenedorObjetos);
        return this.ContenedorObjetos;
    }
    async deleteAll(ruta) {
        this.ContenedorObjetos = [];
        await this.Archivo.eliminarArchivo(ruta);
    }
}

const ruta = 'producto.txt';
const codificacion = 'utf-8';
module.exports = Contenedor;







