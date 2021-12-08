class Carrito {
    constructor() {
        this.productos = [];//es el array de obj que va a escribirse en el archivo
        this.idProductos = 0;
        this.timestamp = Date.now();
    }
    static id = 0;
    crearCarrito (){
        Carrito.id++;
        return {id:Carrito.id,timestamp:this.timestamp,productos:this.productos}
    }
    insertarProducto(producto){
        this.idProductos++;
        producto.id=this.idProductos;
        this.productos.push(producto);
        return this.idProductos;
    }
    eliminarProducto(id){
        
       const productosFiltrados = this.productos.filter(producto => producto.id !== id)
       this.productos =productosFiltrados;
       
    }

}
module.exports = Carrito;