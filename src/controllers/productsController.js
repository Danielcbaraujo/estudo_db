const productsService = require("../services/productsService");

async function findById(req, res) {
    const id = Number(req.params.id);
    
    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: "ID deve ser um número"
        });
    }
    
    try {
        const result = await productsService.findById(id);

        if (result.length === 0) {
            return res.status(404).json({
                error: "Produto não encontrado"
            });
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
}


async function findAll(req, res) {

    const minPrice = req.query.minPrice;
    let price
    // Se não informou minPrice
    if (minPrice === undefined) {
        const products = await productsService.findAll();

        return res.status(200).json(products);
    }
    
    // Se informou vazio
    if (minPrice === "") {
        return res.status(400).json({
            error: "minPrice deve ser um número"
        });
    }
     
    // Converte para número
    const minPriceNumber = Number(minPrice);
    
    // Verifica se é um número válido
    if (Number.isNaN(minPriceNumber)) {
        return res.status(400).json({
            error: "minPrice deve ser um número"
        });
    }

    // Verifica se é negativo
    if (minPriceNumber < 0) {
        return res.status(400).json({
            error: "minPrice deve ser um número positivo"
        });
    }

    try {

        const products = await productsService.findAll(minPriceNumber);

        return res.status(200).json(products);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
}


module.exports = {
    findById,
    findAll
};