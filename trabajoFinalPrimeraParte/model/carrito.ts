class Carrito {
  productos: any[];
  idProductos: number;
  timestamp: number;

  
  constructor() {
    this.productos = []; //es el array de obj que va a escribirse en el archivo
    this.idProductos = 0;
    this.timestamp = Date.now();
  }
  static id = 0;
  crearCarrito() {
    Carrito.id++;
    return {
      id: Carrito.id,
      timestamp: this.timestamp,
      productos: this.productos,
    };
  }
  insertarProducto(producto: any) {
    this.idProductos++;
    producto.id = this.idProductos | 0;
    this.productos.push(producto);
    return this.idProductos;
  }
  eliminarProducto(id:any) {
    const productosFiltrados = this.productos.filter(
      (producto) => producto.id !== id
    );
    this.productos = productosFiltrados;
  }
}
export default Carrito;
