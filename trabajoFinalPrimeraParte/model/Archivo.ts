
import fs from 'fs';

class Archivo {

    crearArchivoYsobreEscribir = async (ruta: any, contenido: any) => {
        const insertar = JSON.stringify(contenido, null, '\t');
        try {
            await fs.promises.writeFile(ruta, insertar)
        } catch (error) {
            console.log(error)
        }
    }

    leerArchivo = async (ruta: any, codificacion: any) => {
        try {
            const data:any = await fs.promises.readFile(ruta, codificacion);
            return (JSON.parse(data));
        } catch (error) {
            console.log(error)
        }
    }
    eliminarArchivo = async (ruta: any) => {
        try {
            await fs.promises.unlink(ruta);
        } catch (error) {
            console.log(error)
        }
    }
}

export default Archivo;