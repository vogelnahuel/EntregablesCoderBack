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



