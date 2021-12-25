const { options } = require('./config')
const knex = require('knex')(options)


const selectDB = async () => (
     knex.from('producto').select("*")
        .then((rows) => {

          return  rows.map(element =>
                element
            );
        })
        .catch((e) => console.log(e))
        .finally(() => {
            knex.destroy()
        })
   
)


module.exports = { selectDB }