
import { buildSchema } from 'graphql';


const schemaUser = buildSchema(`
    type User {
        id: ID!
        password: String,
        document:String,
        name: String,
        email: String,
        age: Int
    }
    input UserInput {
        password: String,
        document:String,
        name: String,
        email: String,
        age: Int
    }
    type Query {
        getUser(document:String):User
    }
`);

export default schemaUser;


