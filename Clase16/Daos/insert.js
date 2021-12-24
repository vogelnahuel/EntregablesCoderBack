const { options } = require('./config')
const knex = require('knex')(options)

const test = [
    {
        nombre:"Hola mundo bd",
        precio:25,
        foto:"https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
    },
    {
        nombre:"Pepito precio",
        precio:30,
        foto:"https://upload.wikimedia.org/wikipedia/commons/e/e4/Cuesta_del_obispo_01.jpg"
    }
]

knex('producto').insert(test)
    .then(()=>console.log("inserto"))
    .catch((e)=>console.log(e))
    .finally(()=>{
        knex.destroy()
    })