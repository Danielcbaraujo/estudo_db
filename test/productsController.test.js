const { Query } = require("pg");
const productsController = require("../src/controllers/productsController");
const productsService = require("../src/services/productsService");

jest.mock("../src/services/productsService");

test("deve retornar 400 quando minPrice for maior que maxPrice", async () => {
  const req = {
    query: {
      minPrice: "1000",
      maxPrice: "500",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "O preço mínimo não pode ser maior que o preço máximo",
  });

  expect(productsService.findAll).not.toHaveBeenCalled();
});



