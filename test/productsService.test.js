const productsService = require("../src/services/productsService");
const productsRepository = require("../src/repositories/productsRepository");

beforeEach(() => {
  jest.clearAllMocks();
}); //limpa os mocks antes de testar

jest.mock("../src/repositories/productsRepository");

test("deve chamar findAll do repository quando não houver filtros", async () => {
  await productsService.findAll();

  expect(productsRepository.findAll).toHaveBeenCalledWith();
});

test("deve chamar findMinPrice do repository somente com minPrice", async () => {
  await productsService.findAll(100);

  expect(productsRepository.findMinPrice).toHaveBeenCalledWith(100);
});

test("deve chamar findMaxPrice do repository somente com maxPrice", async () => {
  await productsService.findAll(undefined, 500);

  expect(productsRepository.findMaxPrice).toHaveBeenCalledWith(500);
});

test("deve chamar findByPriceRange(100, 500) do repository somente os valores dentro desse range", async () => {
  await productsService.findAll(100, 500);

  expect(productsRepository.findByPriceRange).toHaveBeenCalledWith(100, 500);
});

test("deve chamar create do repository com nome e preço válidos", async () => {
  await productsService.create("Mouse", 80);

  expect(productsRepository.create).toHaveBeenCalledWith("Mouse", 80);
});

test("deve rejeitar quando o nome estiver vazio", async () => {
  await expect(productsService.create("", 80)).rejects.toThrow(
    "Nome do produto não pode ser vazio",
  );
  expect(productsRepository.create).not.toHaveBeenCalled();
});

test("deve rejeitar quando o preço não for maior que zero", async () => {
  await expect(productsService.create("Mouse", 0)).rejects.toThrow(
    "Preço deve ser maior que zero",
  );

  expect(productsRepository.create).not.toHaveBeenCalled();
});

test("deve rejeitar quando o preço for menor que zero", async () => {
  await expect(productsService.create("mouse", -10)).rejects.toThrow(
    "Preço deve ser maior que zero",
  );

  expect(productsRepository.create).not.toHaveBeenCalled();
});

test("deve rejeitar quando o nome do prodto estiver vazio", async () => {
  await expect(productsService.create("   ", 80)).rejects.toThrow(
    "Nome do produto não pode ser vazio",
  );

  expect(productsRepository.create).not.toHaveBeenCalled();
});

test("deve atualizar quando todos os dados da requisição forem válidos", async () => {
  await productsService.update(1, "Leticia", 95);

  expect(productsRepository.update).toHaveBeenCalledWith(1, "Leticia", 95);
});

test("deve rejeitar quando o nome estiver vazio", async () => {
  await expect(productsService.update(1, "", 350)).rejects.toThrow(
    "Nome do produto não pode ser vazio",
  );

  expect(productsRepository.update).not.toHaveBeenCalled();
});

test("deve rejeitar quando o valor é menos que zero ", async () => {
  console.log("ESTOU EXECUTANDO ESTE TESTE")
  await expect(productsService.update(1, "Daniel", -35)).rejects.toThrow(
    "Preço deve ser maior que zero",
  );

  expect(productsRepository.update).not.toHaveBeenCalled();
});
