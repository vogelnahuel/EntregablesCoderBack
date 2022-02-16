const faker = require('faker');

 class productsApi {
    constructor(){
        this.productos = []
    }
    get() {
        return this.productos;
    }
    generateProducts(){
        const generateProduct = {
            id: this.productos.length + 1,
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            photo: faker.image.imageUrl(),
            timestaps: faker.date.recent(),
            stock: faker.datatype.number({min: 1, max: 25})
        }
        this.productos.push(generateProduct);
        return generateProduct;

    }
}
module.exports =productsApi