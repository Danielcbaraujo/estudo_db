const productsService = require("../src/services/productsService");
const pool = require("../src/config/database");

test("deve buscar os produtos no banco de dados e retornar um array", async () => {

  const products = await productsService.findAll();

  expect(products).toBeInstanceOf(Array);

  expect(products.length).toBeGreaterThan(0);

  expect(products[0]).toHaveProperty("id");
  expect(products[0]).toHaveProperty("name");
  expect(products[0]).toHaveProperty("price");

});

test("deve buscar um produto pelo id no banco de dados", async () => {
  const products = await productsService.findById(1);

  expect(products).toBeInstanceOf(Array);
  expect(products.length).toBeGreaterThan(0);
  expect(products[0]).toHaveProperty("id");
  expect(products[0]).toHaveProperty("name");
  expect(products[0]).toHaveProperty("price");
});





test("deve retornar array vazio quando o produto não existir", async () => {
  const products = await productsService.findById(999999);

  expect(products).toBeInstanceOf(Array);

  expect(products).toHaveLength(0);
});


test("deve criar e depois remover um produto no banco de dados", async () => {
  const products = await productsService.create(
    "Produto de teste de integração",
    50
  );

  expect(products).toBeInstanceOf(Array);

  expect(products).toHaveLength(1);

  expect(products[0]).toHaveProperty("id");
  expect(products[0]).toHaveProperty("name");
  expect(products[0]).toHaveProperty("price");

  expect(products[0].name).toBe("Produto de teste de integração");
  expect(Number(products[0].price)).toBe(50);

  await productsService.remove(products[0].id);
});

test("deve criar e depois remover um produto no banco de dados", async () => {
  const products = await productsService.create(
    "Produto de teste de integração",
    50
  );

  expect(products).toBeInstanceOf(Array);

  expect(products).toHaveLength(1);

  expect(products[0]).toHaveProperty("id");
  expect(products[0]).toHaveProperty("name");
  expect(products[0]).toHaveProperty("price");

  expect(products[0].name).toBe("Produto de teste de integração");
  expect(Number(products[0].price)).toBe(50);

  await productsService.remove(products[0].id);
});

test("deve atualizar um produto no banco de dados", async () => {
  const products = await productsService.update(
    1,
    "Produto atualizado na integração",
    99
  );

  expect(products).toBeInstanceOf(Array);

  expect(products).toHaveLength(1);

  expect(products[0]).toHaveProperty("id");
  expect(products[0]).toHaveProperty("name");
  expect(products[0]).toHaveProperty("price");

  expect(products[0].id).toBe(1);

  expect(products[0].name).toBe("Produto atualizado na integração");

  expect(Number(products[0].price)).toBe(99);
});



test("deve retornar array vazio ao atualizar um produto inexistente", async () => {
  const products = await productsService.update(
    999,
    "Produto inexistente",
    100
  );


  expect(products).toBeInstanceOf(Array);

  expect(products).toHaveLength(0);

 
});

test("deve buscar produtos por faixa de preço no banco de dados", async () => {
  const products = await productsService.findAll(50, 200);

  expect(products).toBeInstanceOf(Array);

  products.forEach((product) => {
    expect(Number(product.price)).toBeGreaterThanOrEqual(50);

    expect(Number(product.price)).toBeLessThanOrEqual(100);
  });
});


test("deve buscar produtos acima do preço mínimo", async () => {
  const products = await productsService.findAll(80);

  expect(products).toBeInstanceOf(Array);

  products.forEach((product) => {
    expect(Number(product.price)).toBeGreaterThan(80);
  });
});

test("deve buscar produtos até o preço máximo", async () => {
  const products = await productsService.findAll(undefined, 100);//undefined usado para podermos usar o segundo parametro

  expect(products).toBeInstanceOf(Array);

  products.forEach((product) => {
    expect(Number(product.price)).toBeLessThanOrEqual(100); //preço maximo
  });
});








afterAll(async () => {
  await pool.end();
});
