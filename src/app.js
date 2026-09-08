const express = require("express");

const productsController = require("./controllers/productsController");

const app = express();
app.use(express.json());

app.get("/products/:id", productsController.findById);
app.get("/products", productsController.findAll);
app.post("/products", productsController.create);
app.put("/products/:id", productsController.update);
app.delete("/products/:id", productsController.remove);

module.exports = app;
