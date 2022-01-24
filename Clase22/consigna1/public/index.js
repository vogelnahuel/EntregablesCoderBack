const socket = io();

// socket.on("productList", data => {
    
  
//    const tbody=  document.querySelector('#tbody')
//    const htmlData = data.map((value) => {
//     return `
//         <tr>
//             <td>${value.nombre}</td>
//             <td>${value.precio}</td>
//             <td><img class='img-thumbnail' src='${value.foto}' style="width:100px;"> </td>
//         </tr> `
//     }).join(' ');

//     tbody.innerHTML = htmlData; 
// })

// document.querySelector('#emitirProducto').addEventListener('click',(e)=>{
//     e.preventDefault();
//     let nombre = document.querySelector('#title').value;
//     let precio = document.querySelector('#number').value;
//     let foto = document.querySelector('#thumbnail').value;


//     socket.emit("getProducts", {nombre,precio,foto});

//     title= "";
//     number = "";
//     thumbnail = "";

// })


document.querySelector('#emitirMensaje').addEventListener('click',(e)=>{
    e.preventDefault();
    let email = document.querySelector('#Email').value;
    let nombre = document.querySelector('#Nombre').value;
    let apellido = document.querySelector('#Apellido').value;
    let edad = document.querySelector('#Edad').value;
    let alias = document.querySelector('#Alias').value;
    let avatar = document.querySelector('#Avatar').value;
    let mensaje = document.querySelector('#inputMensaje').value;
    socket.emit("getMensaje", {author:{id:email,nombre,apellido,edad,alias,avatar} ,text:mensaje} );
    mensaje="";
})


socket.on("mensajesList", data => {
    
  
    const div=  document.querySelector('#mensajes')
    const htmlData = data.map((value) => {
     return `
            <div class="display-flex">
                <p class="email">${value.author.id}</p>
                <p class="email">${value.author.nombre}</p>
                <p class="email">${value.author.apellido}</p>
                <p class="email">${value.author.edad}</p>
                <p class="email">${value.author.alias}</p>
                <p class="email">${value.author.avatar}</p>
                <p class="mensaje">${value.text}</p>
            </div>
          `
     }).join(' ');
 
     div.innerHTML = htmlData; 
 })



