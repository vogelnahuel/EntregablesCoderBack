const mongoose = require("mongoose");





const mensajesSchema = new mongoose.Schema(
  {
    text: { type: String },
    author: {
      id: { type: String, required: true },
      nombre: { type: String, required: true },
      apellido: { type: String, required: true },
      edad:{ type: String, required: true },
      alias: { type: String, required: true },
      avatar: { type: String, required: true },
    },
  }
);

class ProductsMongo {
  mongoDB;
  mensajeModel;
  constructor() {
    this.mongoDB = `mongodb+srv://nahuel:nahuel@cluster0.4gz4u.mongodb.net/clase22?retryWrites=true&w=majority`;
    mongoose.connect(this.mongoDB);
    this.mensajeModel = mongoose.model("productos", mensajesSchema);
  }

  async getAll() {
    try {
      const mensajesList = await this.mensajeModel
        .find({})
      if (mensajesList.length == 0)
        throw {
          status: 404,
          msg: "Todavia no hay mensajes cargados en tu base de datos",
        };

      return mensajesList;
    } catch (error) {
      throw error;
    }
  }

  async add(data) {
    try {
      console.log("guardar",data);
      await this.mensajeModel.create(data);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ProductsMongo;
