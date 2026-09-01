const pool = require("../config/database");

async function findById(id) {
    const result = await pool.query(
        "SELECT * FROM products_filter WHERE id = $1",
        [id]
    );

    return result.rows;
}
async function findAll() {
    const result = await pool.query(
        "SELECT * FROM products_filter"
    );

    return result.rows;
}

async function findMinPrice(minPrice) {
    const result  = await pool.query(
        "SELECT * FROM products_filter WHERE price > $1 ",[minPrice]
    
    );

    return result.rows
}
module.exports = {
    findById,
    findAll,
    findMinPrice
};