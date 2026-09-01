const productsRepository = require("../repositories/productsRepository");

async function findById(id) {
    const products = await productsRepository.findById(id);

    return products;
}

async function findAll(minPrice) {
    if (minPrice === undefined){
    const products = await productsRepository.findAll()

     return products;
}
    const products=await productsRepository.findMinPrice(minPrice)
    return products;
}


module.exports = {
    findById,
    findAll
    
};