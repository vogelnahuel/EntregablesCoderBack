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
        if(typeof mascota ==="string")
        this.mascotas.push(mascota);
        else console.error("tiene que ingresar un string !!!");
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre,autor){
        if(typeof nombre !=="string"  || typeof autor  !=="string" )
        console.error("tiene que ingresar un string en nombre y autor !!!");

        else this.libros.push({nombre:nombre,autor:autor})
    }
    getBookNames(){
        
        return this.libros.map(book => book.nombre );
        
    }

}

let usuario  = new Usuario("Elon","Musk" ,[{nombre:"El señor de las moscas",autor:"William Golding"},{nombre:"Fundacion",autor:"Isaac Asimov"}],["perro","gato"])

console.log(usuario .getFullName());
console.log("---------------------------------");
console.log(usuario .countMascotas());
usuario.addMascota("nuevaMascota");
console.log(usuario .countMascotas());
console.log("---------------------------------");
console.log(usuario .getBookNames());
usuario.addBook("libro3","autor3");
console.log(usuario .getBookNames());


console.log("---------------------------------");
console.log("---------------------------------");
console.log("---------------------------------");

//test de tipos
let usuario2  = new Usuario("nahuel","vogel",[],[])

console.log(usuario2 .getFullName());
console.log("---------------------------------");
console.log(usuario2 .countMascotas());
usuario2.addMascota(23);
usuario2.addMascota("23");
console.log(usuario2 .countMascotas());
console.log("---------------------------------");
console.log(usuario2 .getBookNames());
usuario2.addBook(true,"autor");
usuario2.addBook("libro3","autor3");
console.log(usuario2 .getBookNames());