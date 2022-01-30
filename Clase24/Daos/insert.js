const { options } = require('./config')
const knex = require('knex')(options)



const insertDB = async (obj) => {

    knex('producto').insert(obj)
        .then(()=>console.log("inserto"))
        .catch((e)=>console.log(e))
        .finally(()=>{
            knex.destroy()
        })
}

module.exports = {insertDB}