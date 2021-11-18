const express = require('express')
const app = express()
const port = 8080
const fs = require('fs')
const Contenedor = require('./Contenedor.js');

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/productos', (req, res) => {
    const contenedor = new Contenedor();
    const rta = contenedor.getAll("producto.txt","utf-8");
    rta.then(data => {
        res.send(data)
    })
   
})
app.get('/productoRandom',  (req, res) => {
    const contenedor = new Contenedor();
    const rta2 = contenedor.getAll("producto.txt","utf-8");
    rta2.then(data => {
        const random =  parseInt( Math.floor(Math.random() * (data.length - 1 + 1) + 1) ) ;
        const rta =  contenedor.getById("producto.txt","utf-8",random);
        rta.then(data => {
            res.send(data)
        })
    })
    
   
})

app.listen(port, () => {
  console.log(`Corriendo en el puerto:${port}`)
})