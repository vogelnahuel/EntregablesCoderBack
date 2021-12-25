const socket = io();

socket.on("productList", data => {
    
  
   const tbody=  document.querySelector('#tbody')
   const htmlData = data.map((value) => {
    return `
        <tr>
            <td>${value.nombre}</td>
            <td>${value.precio}</td>
            <td><img class='img-thumbnail' src='${value.foto}' style="width:100px;"> </td>
        </tr> `
    }).join(' ');

    tbody.innerHTML = htmlData; 
})

document.querySelector('#emitirProducto').addEventListener('click',(e)=>{
    e.preventDefault();
    let nombre = document.querySelector('#title').value;
    let precio = document.querySelector('#number').value;
    let foto = document.querySelector('#thumbnail').value;


    socket.emit("getProducts", {nombre,precio,foto});

    title= "";
    number = "";
    thumbnail = "";

})


document.querySelector('#emitirMensaje').addEventListener('click',(e)=>{
    e.preventDefault();
    let day = new Date();
    let dd = String(day.getDate()).padStart(2, '0');
    let mm = String(day.getMonth() + 1).padStart(2, '0');
    let yyyy = day.getFullYear();
    let hora = new Date().toLocaleTimeString();

    day = yyyy+'/'+mm + '/' + dd + '/' +hora ;

   
    let email = document.querySelector('#Email').value;
    let mensaje = document.querySelector('#inputMensaje').value;
    socket.emit("getMensaje", {email,mensaje,day} );
    mensaje="";
})


socket.on("mensajesList", data => {
    
  
    const div=  document.querySelector('#mensajes')
    const htmlData = data.map((value) => {
     return `
            <div class="display-flex">
                <p class="email">${value.email}</p>
                <p class="hora">[${value.day}]:</p>
                <p class="mensaje">${value.mensaje}</p>
                
            </div>
          `
     }).join(' ');
 
     div.innerHTML = htmlData; 
 })



