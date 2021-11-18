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
    const resul= leerArch();
    res.send(resul)
})

const leerArch = () => {
    const contenedor = new Contenedor();
    const rta =  contenedor.getAll("producto.txt","utf-8");
    rta.then(data => {
        setTimeout(() => {
            const parseado = JSON.parse(data);
            const random =  parseInt( Math.floor(Math.random() * (parseado.length - 1 + 1) + 1) ) ;
            const mostrarRandom =   parseado.filter(element => element.id ===random);
            return mostrarRandom[0];
        }, 200);

    })
   
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})