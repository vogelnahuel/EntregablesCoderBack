
const Archivo =require('./Archivo.js')

class Contenedor{
    constructor(){
        this.ContenedorObjetos=[];
        this.Archivo = new Archivo();
    }
    static contadorGlobal=0;

    save(Contenido){
        Contenedor.contadorGlobal++;
        Contenido.id=Contenedor.contadorGlobal;
        this.ContenedorObjetos.push(Contenido);
        this.Archivo.crearArchivoYsobreEscribir(ruta,this.ContenedorObjetos);
    }
    
    async getById(ruta,codificacion,numero){
        const contenidoArch = await this.Archivo.leerArchivo(ruta,codificacion);
        const  parseado = JSON.parse(contenidoArch);
        const rta =   parseado.filter(contenido => contenido.id===numero);
        const seleccionado = rta[0];
        return seleccionado;
    }

   async getAll(ruta,codificacion){
        const data = await this.Archivo.leerArchivo(ruta,codificacion);
        const  parseado = JSON.parse(data);
        return parseado;
    }
    async deleteById(numero){
        const contenidoArch = await this.Archivo.leerArchivo(ruta,codificacion);
        const  parseado = JSON.parse(contenidoArch);
        const rta =   parseado.filter(contenido => contenido.id!==numero);
        await this.Archivo.crearArchivoYsobreEscribir(ruta,rta);
    }
    async deleteAll(){
        await this.Archivo.crearArchivoYsobreEscribir(ruta,"");
    }
}

 const ruta = 'producto.txt';
 const codificacion = 'utf-8';
 const contenedor = new Contenedor();
 setTimeout(() => {
    contenedor.save({title : "titulo1" , price : 10 , thumbnail:"urlDelArchivo1"})
 }, 0);
 setTimeout(() => {
    contenedor.save({title : "titulo2" , price : 20 , thumbnail:"urlDelArchivo2"})
 }, 0);
 setTimeout(() => {
    contenedor.save({title : "titulo3" , price : 20 , thumbnail:"urlDelArchivo3"})
 }, 0);

 setTimeout(() => {
    contenedor.getById(ruta,codificacion,2).then(data => {
        console.log(data)
    })
 }, 100);

setTimeout(() => {
    contenedor.getAll(ruta,codificacion).then(data => {
        console.log(data);
    })
}, 100);

setTimeout(() => {
    contenedor.deleteById(2).then(data => {
        console.log(data)
    })
 }, 100);



