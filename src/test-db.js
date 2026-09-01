const pool = require("./config/database");

async function testConnection() {
    try {
        const result = await pool.query("SELECT NOW()");

        console.log("Conectado ao PostgreSQL!");
        console.log(result.rows);

    } catch (error) {
        console.error("Erro ao conectar:", error.message);

    } finally {
        await pool.end();
    }
}

testConnection();