import path from 'path';
export  const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
  apis: [`${path.join(__dirname,'../../../src/routes/*/*.ts')}`]
  };