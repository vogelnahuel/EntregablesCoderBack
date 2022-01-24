const { insertDB } = require("./Daos/insert");
const { selectDB } = require("./Daos/select");


class Contenedor {

    async save(Contenido) {

        await insertDB(Contenido);
    }
    async getAll() {

        const array = await selectDB();
        return array
    }

}


module.exports = Contenedor;