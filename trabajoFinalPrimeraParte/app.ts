import Servidor from "./model/server";
require("dotenv").config();

const server = new Servidor();

server.listen();
