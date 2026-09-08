const pool = require("../config/database");

async function findById(id) {
  const result = await pool.query(
    "SELECT * FROM products_filter WHERE id = $1",
    [id],
  );

  return result.rows;
}
async function findAll() {
  const result = await pool.query("SELECT * FROM products_filter");

  return result.rows;
}

async function findMinPrice(minPrice) {
  const result = await pool.query(
    "SELECT * FROM products_filter WHERE price > $1 ",
    [minPrice],
  );

  return result.rows;
}
async function create(name, price) {
  const result = await pool.query(
    `INSERT INTO products_filter (name, price)
         VALUES ($1, $2)
         RETURNING *`,
    [name, price],
  );

  return result.rows;
}

async function update(id, name, price) {
  const result = await pool.query(
    `UPDATE products_filter
         SET name = $1, price = $2
         WHERE id = $3
         RETURNING *`,
    [name, price, id],
  );

  return result.rows;
}

async function remove(id) {
  const result = await pool.query(
    `DELETE FROM products_filter
     WHERE id = $1
     RETURNING *`,
    [id],
  );

  return result.rows;
}

async function findMaxPrice(maxPrice) {
  const result = await pool.query(
    `SELECT * FROM products_filter
   WHERE price <= $1
   `,
    [maxPrice],
  );

  return result.rows;
}

async function findByPriceRange(minPrice, maxPrice) {
  const result = await pool.query(
    `SELECT * FROM products_filter
         WHERE price >= $1 AND price <= $2`,
    [minPrice, maxPrice],
  );

  return result.rows;
}

module.exports = {
  findById,
  findAll,
  findMinPrice,
  create,
  update,
  remove,
  findMaxPrice,
  findByPriceRange,
};
