class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre =nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre,autor){
    this.libros.push({nombre:nombre,autor:autor})
    }
    getBookNames(){
        const bookNames=[];
        this.libros.forEach(book =>bookNames.push(book.nombre) );
        return bookNames;
    }

}
let user = new Usuario("nahuel","vogel",[{nombre:"libro",autor:"autor"},{nombre:"libro2",autor:"autor2"}],["ati","tomas"])

console.log(user.getFullName());

console.log(user.countMascotas());
user.addMascota("nuevaMascota");
console.log(user.countMascotas());

user.addBook("libro3","autor3");
console.log(user.getBookNames());