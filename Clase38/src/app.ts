
import Server from './models/server'

import * as DotEnv from "dotenv";


try {
    DotEnv.config();

    // Pool de conexiones a la DB

    const server: Server = new Server();

    server.listen();

} catch (error) {
    console.error( error )
}
