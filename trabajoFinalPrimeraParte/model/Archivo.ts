
const fs = require('fs')

class Archivo {

    crearArchivoYsobreEscribir = async (ruta, contenido) => {
        const insertar = JSON.stringify(contenido, null, '\t');
        try {
            await fs.promises.writeFile(ruta, insertar)
        } catch (error) {
            console.log(error)
        }
    }

    leerArchivo = async (ruta, codificacion) => {
        try {
            const data = await fs.promises.readFile(ruta, codificacion);
            return (JSON.parse(data));
        } catch (error) {
            console.log(error)
        }
    }
    eliminarArchivo = async (ruta) => {
        try {
            await fs.promises.unlink(ruta);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Archivo;