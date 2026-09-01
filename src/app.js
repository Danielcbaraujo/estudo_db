const express = require("express");

const productsController = require("./controllers/productsController");

const app = express();

app.get("/products/:id", productsController.findById);
app.get("/products", productsController.findAll);
module.exports = app;