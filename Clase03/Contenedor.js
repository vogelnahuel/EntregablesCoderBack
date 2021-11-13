
const Archivo =require('./Archivo.js')

class Contenedor{
    constructor(){
        this.ContenedorObjetos=[];//es el array de obj que va a escribirse en el archivo
        this.Archivo = new Archivo();
    }
    static contadorGlobal=0;

    async save(ruta,Contenido){
        Contenedor.contadorGlobal++;
        Contenido.id=Contenedor.contadorGlobal;//crear propiedad id al obj
        this.ContenedorObjetos.push(Contenido);
        await this.Archivo.crearArchivoYsobreEscribir(ruta,this.ContenedorObjetos);
    }
    
    async getById(ruta,codificacion,idParam){
        //el archivo devuelve el vector en forma de string
        const contenidoArch = await this.Archivo.leerArchivo(ruta,codificacion);
        //el contenido del archivo lo convierto a vector y luego filtro por el id pasado
        const  rta =  (JSON.parse(contenidoArch) ).filter(contenido => contenido.id===idParam);
        return rta[0];
    }

   async getAll(ruta,codificacion){
        const contenidoArch = await this.Archivo.leerArchivo(ruta,codificacion);
        const  parseado = JSON.parse(contenidoArch);
        return parseado;
    }
    async deleteById(idParam){
        const contenidoArch = await this.Archivo.leerArchivo(ruta,codificacion);
        this.ContenedorObjetos = ( JSON.parse(contenidoArch) ).filter(contenido => contenido.id!==idParam);
        await this.Archivo.crearArchivoYsobreEscribir(ruta,this.ContenedorObjetos);
    }
    async deleteAll(ruta){
        this.ContenedorObjetos=[];
        await this.Archivo.eliminarArchivo(ruta);
    }
}



const FunctionsWrapper = (ms,nameFunction,params) => {
    setTimeout(() => {

        switch (nameFunction) {
            case "save":
                    const ruta= params.ruta;
                    delete params['ruta']
                    contenedor.save(ruta,params)
                break;

            case "getAll":
                contenedor.getAll(params.ruta,params.codificacion).then(data => {
                    console.log(data);
                })
               break;
            case "getById":
                contenedor.getById(params.ruta,params.codificacion,params.id).then(data => {
                    if(data){
                        console.log(`se selecciono por id el numero : ${params.id}`)
                        console.log(data)
                    }else{
                        console.log(`no se encontro el id : ${params.id}`)
                    }
              
                })
                break;
            case "deleteById":
                contenedor.deleteById(params.id).then( () => {
                    console.log(`se elimino el numero : ${params.id}`)
                })
                 break;
            case "deleteAll":
                    contenedor.deleteAll(params.ruta)
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
FunctionsWrapper(0,"save",{ruta:ruta, title : "titulo1" , price : 10 , thumbnail:"urlDelArchivo1"});
FunctionsWrapper(0,"save",{ruta:ruta, title : "titulo2" , price : 10 , thumbnail:"urlDelArchivo2"});
FunctionsWrapper(0,"save",{ruta:ruta, title : "titulo3" , price : 10 , thumbnail:"urlDelArchivo3"});
FunctionsWrapper(100,"getAll",{ruta:ruta,codificacion:codificacion});
FunctionsWrapper(100,"getById",{ruta:ruta,codificacion:codificacion,id:2});
FunctionsWrapper(100,"deleteById",{id:2});
FunctionsWrapper(200,"getById",{ruta:ruta,codificacion:codificacion,id:2});
// FunctionsWrapper(300,"deleteAll",{ruta:ruta});








