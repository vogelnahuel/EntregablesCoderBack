const socket = io();

//  import { denormalize, schema } from 'normalizr';

// const authorSchema = new schema.Entity('author');
// const mensajeSchema = new schema.Entity('mensaje',{
//   author:authorSchema,
//   text:String
// })

document.querySelector('#emitirMensaje').addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.querySelector('#Email').value;
    let nombre = document.querySelector('#Nombre').value;
    let apellido = document.querySelector('#Apellido').value;
    let edad = document.querySelector('#Edad').value;
    let alias = document.querySelector('#Alias').value;
    let avatar = document.querySelector('#Avatar').value;
    let mensaje = document.querySelector('#inputMensaje').value;
    socket.emit("getMensaje", { author: { id: email, nombre, apellido, edad, alias, avatar }, text: mensaje });
    mensaje = "";
})


socket.on("mensajesList", data => {

    const dataDesnormalizada = normalizr.denormalize(data.entities.mensaje, data, data)

    const div = document.querySelector('#mensajes')
    const  crear  = document.createElement('div')
    let htmlMensaje
    for (let i in dataDesnormalizada) {

        htmlMensaje += `
            <div class="display-flex">
                <p class="email">${dataDesnormalizada[i]._doc.author.id}</p>
                <p class="email">${dataDesnormalizada[i]._doc.author.nombre}</p>
                <p class="email">${dataDesnormalizada[i]._doc.author.apellido}</p>
                <p class="email">${dataDesnormalizada[i]._doc.author.edad}</p>
                <p class="email">${dataDesnormalizada[i]._doc.author.alias}</p>
                <p class="email">${dataDesnormalizada[i]._doc.author.avatar}</p>
                <p class="mensaje">${dataDesnormalizada[i]._doc.text}</p>
            </div>
          `

     
    }
    crear.innerHTML = htmlMensaje;
    div.appendChild(crear)
})



