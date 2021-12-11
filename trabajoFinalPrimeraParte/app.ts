const Server = require("./model/server.ts");
require("dotenv").config();

const server = new Server();

server.listen();
