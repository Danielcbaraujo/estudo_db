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

test("deve retornar produtos quando minPrice e maxPrice forem informados", async () => {
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
      maxPrice: "500",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(productsService.findAll).toHaveBeenCalledWith(100, 500);

  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.json).toHaveBeenCalledWith(products);
});

test("deve retornar 400 quando minPrice for inválido", async () => {
  const req = {
    query: {
      minPrice: "abc",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "minPrice deve ser um número",
  });

  expect(productsService.findAll).not.toHaveBeenCalled();
});

test("deve retornar 400 quando maxPrice for inválido", async () => {
  const req = {
    query: {
      maxPrice: "abc",
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

test("deve retornar 400 quando minPrice for negativo", async () => {
  const req = {
    query: {
      minPrice: "-10",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "minPrice deve ser um número positivo",
  });

  expect(productsService.findAll).not.toHaveBeenCalled();
});
/////
test("deve retornar 400 quando maxPrice for negativo", async () => {
  const req = {
    query: {
      maxPrice: "-10",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "maxPrice deve ser um número positivo",
  });

  expect(productsService.findAll).not.toHaveBeenCalled();
});

test("deve retornar 400 quando minPrice estiver vazio", async () => {
  const req = {
    query: {
      minPrice: "",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "minPrice deve ser um número",
  });

  expect(productsService.findAll).not.toHaveBeenCalled();
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

test("deve retornar 400 quando maxPrice não for um número", async () => {
  const req = {
    query: {
      maxPrice: "abc",
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

test("deve retornar 500 quando ocorrer um erro ao buscar produtos", async () => {
  const req = {
    query: {
      maxPrice: "100",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  productsService.findAll.mockRejectedValue(new Error("Erro no banco"));

  await productsController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(500);

  expect(res.json).toHaveBeenCalledWith({
    error: "Erro interno do servidor",
  });
});

test("deve retornar 500 quando ocorrer um erro ao buscar todos os produtos", async () => {
  const req = {
    query: {},
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  productsService.findAll.mockRejectedValue(new Error("Erro no banco"));
  await productsController.findAll(req, res);
  expect(res.status).toHaveBeenCalledWith(500);

  expect(res.json).toHaveBeenCalledWith({
    error: "Erro interno do servidor",
  });
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

test("deve retornar 500 quando ocorrer um erro ao buscar produto por id", async () => {
  const req = {
    params: {
      id: "1",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  productsService.findById.mockRejectedValue(new Error("Erro no banco"));

  await productsController.findById(req, res);

  expect(res.status).toHaveBeenCalledWith(500);

  expect(res.json).toHaveBeenCalledWith({
    error: "Erro interno do servidor",
  });
});

//test create

test("deve retornar 400 quando price não for válido", async () => {
  const req = {
    body: {
      name: "Mouse",
      price: "abc",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await productsController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "price deve ser um número",
  });

  expect(productsService.create).not.toHaveBeenCalled();
});

test("deve retornar 201 quando produto for criado", async () => {
  const req = {
    body: {
      name: "Mouse",
      price: "80",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  productsService.create.mockResolvedValue([
    {
      id: 1,
      name: "Mouse",
      price: 80,
    },
  ]);

  await productsController.create(req, res);

  expect(productsService.create).toHaveBeenCalledWith("Mouse", 80);

  expect(res.status).toHaveBeenCalledWith(201);

  expect(res.json).toHaveBeenCalledWith([
    {
      id: 1,
      name: "Mouse",
      price: 80,
    },
  ]);
});

test("deve retornar 400 quando o service lançar erro", async () => {
  const req = {
    body: {
      name: "",
      price: "80",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  productsService.create.mockRejectedValue(
    new Error("Nome do produto é obrigatório"),
  );

  await productsController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    error: "Nome do produto é obrigatório",
  });
});
