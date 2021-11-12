
const fs = require('fs')

class Archivo {

     crearArchivoYsobreEscribir = async(ruta,contenido) => {
         let insertar = JSON.stringify(contenido);
        try {
            await fs.promises.writeFile(ruta,insertar)
        } catch (error) {
            console.log(error)
        }
    }

     leerArchivo = async(ruta,codificacion) => {
        try {
            const data =  await fs.promises.readFile(ruta,codificacion);
            return data;
        } catch (error) {
            console.log(error)
        }
    }

     agregarArchivo = async(contenido) => {

        try {
             await fs.promises.appendFile(ruta,contenido);
    
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = Archivo;



