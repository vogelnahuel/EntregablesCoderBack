const Servidor = require('./model/server')
require('dotenv').config();

const server= new Servidor()

server.listen()