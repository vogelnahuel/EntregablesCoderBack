
class Contenedor{
    constructor(){
        this.ContenedorObjetos=[];
        crearArchivoYsobreEscribir("");
    }
    static contadorGlobal=0;
    save(Contenido){
        Contenedor.contadorGlobal++;
        Contenido.id=Contenedor.contadorGlobal;
        this.ContenedorObjetos.push(Contenido);
        agregarArchivo(this.ContenedorObjetos[Contenido.id-1])
    }
    getById(numero){
        const contenidoArch = leerArchivo(ruta,codificacion);
        return contenidoArch.filter(contenido => contenido.id===numero);
    }
    getAll(){
        return leerArchivo(ruta,codificacion);
    }
    deleteById(numero){
        const contenidoArch = leerArchivo(ruta,codificacion);
        const restantes = contenidoArch.filter(contenido => contenido.id!==numero);
        crearArchivoYsobreEscribir(restantes)
    }
    deleteAll(){
        crearArchivoYsobreEscribir("");
    }
}

const ruta = 'salida.txt';
const codificacion = 'utf-8';
const fs = require('fs')

const crearArchivoYsobreEscribir = async(contenido) => {
    try {
        await fs.promises.writeFile(ruta,contenido)
    } catch (error) {
        console.log(error)
    }
}



const leerArchivo = async(ruta,codificacion) => {
    try {
        const contenido = await fs.promises.readFile(ruta,codificacion);
        console.log(contenido)
        return contenido;
        
    } catch (error) {
        console.log(error)
    }
}



const agregarArchivo = async(contenido) => {
    let insertar = JSON.stringify(contenido);
     insertar = insertar + ",\n";
    try {
         await fs.promises.appendFile(ruta,insertar);

    } catch (error) {
        console.log(error)
    }
}


const contenedor = new Contenedor();
contenedor.save({title : "titulo1" , price : 10 , thumbnail:"urlDelArchivo1"})
contenedor.save({title : "titulo2" , price : 20 , thumbnail:"urlDelArchivo2"})
contenedor.save({title : "titulo3" , price : 30 , thumbnail:"urlDelArchivo3"})
console.log(contenedor.getAll())
