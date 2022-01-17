const Category = require('../models/category');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Category.getAll();
            console.log(`Categorias: ${JSON.stringify(data)}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al obtener las categorias',
                error: error
            });
        }
    },

    async create(req, res, next) {
        try {
            const category = req.body;
            console.log(`Categoria recibida: ${JSON.stringify(category)}`);

            const data = await Category.create(category);

            return res.status(201).json({
                success: true,
                message: 'Categoria creada correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear la categoria',
                error: error
            });
        }
    },
}