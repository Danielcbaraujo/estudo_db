const productsController = require("../../src/controllers/productsController");
const productsService = require("../../src/services/productsService");

jest.mock("../../src/services/productsService");

beforeEach(() => {
  jest.clearAllMocks();
});

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

test("deve retornar todos os produtos quando nenhum filtro for informado", async () => {
  const products = [
    {
      id: 1,
      name: "Mouse",
      price: "80.00",
    },
    {
      id: 2,
      name: "Teclado",
      price: "150.00",
    },
  ];

  productsService.findAll.mockResolvedValue(products);

  const req = {
    query: {},
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(productsService.findAll).toHaveBeenCalledWith();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(products);
});

test("deve retornar produtos quando apenas minPrice for informado", async () => {
  const products = [
    {
      id: 2,
      name: "Teclado",
      price: "150.00",
    },
    {
      id: 3,
      name: "Monitor",
      price: "500.00",
    },
  ];

  productsService.findAll.mockResolvedValue(products);

  const req = {
    query: {
      minPrice: "100",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(productsService.findAll).toHaveBeenCalledWith(100, undefined);

  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.json).toHaveBeenCalledWith(products);
});

test("deve retornar produtos quando apenas maxPrice for informado", async () => {
  const products = [
    {
      id: 1,
      name: "Mouse",
      price: "80.00",
    },
    {
      id: 2,
      name: "Teclado",
      price: "150.00",
    },
  ];

  productsService.findAll.mockResolvedValue(products);

  const req = {
    query: {
      maxPrice: "200",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(productsService.findAll).toHaveBeenCalledWith(undefined, 200);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(products);
});


test("deve retornar 400 quando maxPrice estiver vazio", async () => {
  const req = {
    query: {
      maxPrice: "",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "maxPrice deve ser um número",
  });

  expect(productsService.findAll).not.toHaveBeenCalled();
});


//tests findById

test("deve retornar 400 quando o id for inválido", async () => {
  const req = {
    params: {
      id: "abc",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findById(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "ID deve ser um número",
  });

  expect(productsService.findById).not.toHaveBeenCalled();
});

test("deve retornar 404 quando não encontrar um produto", async () => {
  productsService.findById.mockResolvedValue([]);

  const req = {
    params: {
      id: "999",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findById(req, res);

  expect(productsService.findById).toHaveBeenCalledWith(999);

  expect(res.status).toHaveBeenCalledWith(404);

  expect(res.json).toHaveBeenCalledWith({
    error: "Produto não encontrado",
  });
});

test("deve retornar 200 quando encontrar um produto", async () => {
  const product = [
    {
      id: 1,
      name: "Mouse",
      price: "80.00",
    },
  ];

  productsService.findById.mockResolvedValue(product);

  const req = {
    params: {
      id: "1",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findById(req, res);

  expect(productsService.findById).toHaveBeenCalledWith(1);

  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.json).toHaveBeenCalledWith(product);
});
