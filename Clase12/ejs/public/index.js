const socket = io();

socket.on("productList", data => {
    
  
   const tbody=  document.querySelector('#tbody')
   const htmlData = data.map((value) => {
    return `
        <tr>
            <td>${value.title}</td>
            <td>${value.number}</td>
            <td><img class='img-thumbnail' src='${value.thumbnail}' style="width:100px;"> </td>
        </tr> `
    }).join(' ');

    tbody.innerHTML = htmlData; 
})

document.querySelector('#emitirProducto').addEventListener('click',(e)=>{
    e.preventDefault();
    let title = document.querySelector('#title').value;
    let number = document.querySelector('#number').value;
    let thumbnail = document.querySelector('#thumbnail').value;

    socket.emit("getProducts", {title,number,thumbnail});

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



