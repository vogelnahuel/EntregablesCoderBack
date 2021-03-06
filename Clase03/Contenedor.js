
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



const FunctionsWrapper = (ms, nameFunction, params) => {
    setTimeout(() => {

        switch (nameFunction) {
            case "save":
                const ruta = params.ruta;
                delete params['ruta']
                contenedor.save(ruta, params)
                console.log("---------------------------------------------------------------------")
                console.log(`se guardo el siguiente objeto ${JSON.stringify(params)}`)
                console.log("---------------------------------------------------------------------")
                break;

            case "getAll":
                contenedor.getAll(params.ruta, params.codificacion).then(data => {
                    console.log("---------------------------------------------------------------------")
                    console.log(data);
                    console.log("---------------------------------------------------------------------")
                })
                break;
            case "getById":
                contenedor.getById(params.ruta, params.codificacion, params.id).then(data => {
                    if (data) {
                        console.log("---------------------------------------------------------------------")
                        console.log(`se selecciono por id el numero : ${params.id}`)
                        console.log(data)
                        console.log("---------------------------------------------------------------------")
                    } else {
                        console.log("---------------------------------------------------------------------")
                        console.log(`no se encontro el id : ${params.id}`)
                        console.log("---------------------------------------------------------------------")
                    }

                })
                break;
            case "deleteById":
                const anterior = contenedor.ContenedorObjetos;
                contenedor.deleteById(params.id).then((res) => {
                    if (anterior.length != res.length) {
                        console.log("---------------------------------------------------------------------")
                        console.log(`se elimino el numero : ${params.id}`)
                        console.log("---------------------------------------------------------------------")
                    } else {
                        console.log("---------------------------------------------------------------------")
                        console.log(`no se encontro el id a eliminar : ${params.id}`)
                        console.log("---------------------------------------------------------------------")
                    }

                })
                break;
            case "deleteAll":
                console.log("---------------------------------------------------------------------")
                console.log("Se elimino todo el archivo")
                contenedor.deleteAll(params.ruta)
                console.log("---------------------------------------------------------------------")
                break;

            default:
                break;
        }

    }, ms);
}

const ruta = 'producto.txt';
const codificacion = 'utf-8';
const contenedor = new Contenedor();

/********************************************** PRUEBAS******************************************************** */
FunctionsWrapper(0, "save", { ruta: ruta, title: "titulo1", price: 10, thumbnail: "urlDelArchivo1" });
FunctionsWrapper(0, "save", { ruta: ruta, title: "titulo2", price: 20, thumbnail: "urlDelArchivo2" });
FunctionsWrapper(0, "save", { ruta: ruta, title: "titulo3", price: 30, thumbnail: "urlDelArchivo3" });
FunctionsWrapper(0, "save", { ruta: ruta, title: "titulo4", price: 40, thumbnail: "urlDelArchivo4" });
FunctionsWrapper(0, "save", { ruta: ruta, title: "titulo5", price: 50, thumbnail: "urlDelArchivo5" });
FunctionsWrapper(100, "getAll", { ruta: ruta, codificacion: codificacion });
FunctionsWrapper(100, "getById", { ruta: ruta, codificacion: codificacion, id: 2 });
FunctionsWrapper(100, "deleteById", { id: 6 });// no existe
FunctionsWrapper(200, "deleteById", { id: 2 });
FunctionsWrapper(400, "getById", { ruta: ruta, codificacion: codificacion, id: 2 });
FunctionsWrapper(400, "getAll", { ruta: ruta, codificacion: codificacion });
// FunctionsWrapper(500,"deleteAll",{ruta:ruta});








