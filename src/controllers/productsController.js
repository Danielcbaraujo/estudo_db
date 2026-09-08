const productsService = require("../services/productsService");

async function findById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "ID deve ser um número",
    });
  }

  try {
    const result = await productsService.findById(id);

    if (result.length === 0) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

async function findAll(req, res) {
  const { minPrice, maxPrice } = req.query;

  // Nenhum filtro
  if (minPrice === undefined && maxPrice === undefined) {
    try {
      const products = await productsService.findAll();

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  // minPrice vazio
  if (minPrice === "") {
    return res.status(400).json({
      error: "minPrice deve ser um número",
    });
  }

  // maxPrice vazio
  if (maxPrice === "") {
    return res.status(400).json({
      error: "maxPrice deve ser um número",
    });
  }

  // Converte minPrice se foi informado
  let minPriceNumber;

  if (minPrice !== undefined) {
    minPriceNumber = Number(minPrice);

    if (Number.isNaN(minPriceNumber)) {
      return res.status(400).json({
        error: "minPrice deve ser um número",
      });
    }

    if (minPriceNumber < 0) {
      return res.status(400).json({
        error: "minPrice deve ser um número positivo",
      });
    }
  }

  // Converte maxPrice se foi informado
  let maxPriceNumber;

  if (maxPrice !== undefined) {
    maxPriceNumber = Number(maxPrice);

    if (Number.isNaN(maxPriceNumber)) {
      return res.status(400).json({
        error: "maxPrice deve ser um número",
      });
    }

    if (maxPriceNumber < 0) {
      return res.status(400).json({
        error: "maxPrice deve ser um número positivo",
      });
    }
  }

  // Verifica se o intervalo é válido
  if (
    minPriceNumber !== undefined &&
    maxPriceNumber !== undefined &&
    minPriceNumber > maxPriceNumber
  ) {
    return res.status(400).json({
      error: "O preço mínimo não pode ser maior que o preço máximo",
    });
  }

  try {
    const products = await productsService.findAll(
      minPriceNumber,
      maxPriceNumber,
    );

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

async function create(req, res) {
  const { name, price } = req.body;

  const priceNumber = Number(price);

  if (Number.isNaN(priceNumber)) {
    return res.status(400).json({
      error: "price deve ser um número",
    });
  }

  try {
    const product = await productsService.create(name, priceNumber);

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      error: error.message,
    });
  }
}

async function update(req, res) {
  const id = Number(req.params.id);

  const { name, price } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "ID deve ser um número",
    });
  }

  if (name === undefined) {
    return res.status(400).json({
      error: "name é obrigatório",
    });
  }

  if (price === undefined) {
    return res.status(400).json({
      error: "price é obrigatório",
    });
  }

  const priceNumber = Number(price);

  if (Number.isNaN(priceNumber)) {
    return res.status(400).json({
      error: "price deve ser um número",
    });
  }

  try {
    const product = await productsService.update(id, name, priceNumber);

    if (product.length === 0) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      error: error.message,
    });
  }
}

async function remove(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "ID deve ser um número",
    });
  }

  try {
    const product = await productsService.remove(id);

    if (product.length === 0) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    return res.status(200).json({
      message: "Produto foi deletado",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

module.exports = {
  findById,
  findAll,
  create,
  update,
  remove,
};
