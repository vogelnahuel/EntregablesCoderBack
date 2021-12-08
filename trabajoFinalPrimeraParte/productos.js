class Producto {
    constructor(obj){
        this.nombre =""
        this.descripcion = ""
        this.codigo = ""
        this.precio = 0
        this.stock = 0
        this.foto = ""
        this.timestamp = 0
    }
    static id = 0;
    crearProducto(obj){
        this.nombre = obj.nombre
        this.descripcion = obj.descripcion
        this.codigo = obj.codigo
        this.precio = obj.precio
        this.stock = obj.stock
        this.foto = obj.foto
        this.timestamp = obj.timestamp
        Producto.id++;
        this.id = Producto.id;
    }

    actualizarProducto(obj){
        this.nombre = obj.nombre
        this.descripcion = obj.descripcion
        this.codigo = obj.codigo
        this.precio = obj.precio
        this.stock = obj.stock
        this.foto = obj.foto
        this.timestamp = obj.timestamp
        this.id = obj.id;
    }
}
module.exports= Producto;