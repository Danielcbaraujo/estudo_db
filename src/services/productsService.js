const productsRepository = require("../repositories/productsRepository");

async function findById(id) {
  const products = await productsRepository.findById(id);

  return products;
}

async function findAll(minPrice, maxPrice) {
  if (minPrice === undefined && maxPrice === undefined) {
    return productsRepository.findAll();
  }

  if (minPrice !== undefined && maxPrice === undefined) {
    return productsRepository.findMinPrice(minPrice);
  }

  if (minPrice === undefined && maxPrice !== undefined) {
    return productsRepository.findMaxPrice(maxPrice);
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    return productsRepository.findByPriceRange(minPrice, maxPrice);
  }
}

async function create(name, price) {
  if (name.trim() === "") {
    throw new Error("Nome do produto não pode ser vazio");
  }

  if (price <= 0) {
    throw new Error("Preço deve ser maior que zero");
  }

  const product = await productsRepository.create(name, price);

  return product;
}

async function update(id, name, price) {
  if (name.trim() === "") {
    throw new Error("Nome do produto não pode ser vazio");
  }

  if (price <= 0) {
    throw new Error("Preço deve ser maior que zero");
  }

  const product = await productsRepository.update(id, name, price);

  return product;
}

async function remove(id) {
  const product = await productsRepository.remove(id);

  return product;
}

module.exports = {
  findById,
  findAll,
  create,
  update,
  remove,
};

